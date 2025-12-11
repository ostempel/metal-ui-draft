// interceptors/AuthInterceptor.ts
import {
  Code,
  ConnectError,
  Interceptor,
} from "@connectrpc/connect";

type OnUnauthenticated = () => void;

export class AuthInterceptor {
  private authToken: string;
  private onUnauthenticated: OnUnauthenticated;

  constructor(authToken: string, onUnauthenticated: OnUnauthenticated) {
    this.authToken = authToken;
    this.onUnauthenticated = onUnauthenticated;
  }

  interceptor: Interceptor = (next) => async (req) => {
    if (!this.authToken) {
      this.onUnauthenticated();
      throw new ConnectError("Missing auth token", Code.Unauthenticated);
    }

    req.header.append("Authorization", `Bearer ${this.authToken}`);

    try {
      const res = await next(req);
      return res;
    } catch (e) {
      if (e instanceof ConnectError && e.code === Code.Unauthenticated) {
        // z.B. message: "token has expired"
        this.onUnauthenticated();
      }
      throw e;
    }
  };
}

import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./AuthProvider";
import { AuthInterceptor } from "@/interceptors/AuthInterceptor";
import { createConnectTransport } from "@connectrpc/connect-web";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

const queryClient = new QueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const navigate = useNavigate();

  // Redirect immer über einen Effekt, nicht im Render
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  const transport = useMemo(() => {
    // hier Union-Type narrowen
    if (!auth.isAuthenticated) {
      return null;
    }

    const interceptor = new AuthInterceptor(auth.token, () => {
      // Wird bei "unauthenticated" (token expired, etc.) aufgerufen
      auth.logout();
      queryClient.clear();
      navigate("/login");
    }).interceptor;

    return createConnectTransport({
      baseUrl: auth.apiUrl,
      interceptors: [interceptor],
      useBinaryFormat: false,
    });
  }, [auth, navigate]); // nur `auth` als Ganzes, nicht auth.token / auth.apiUrl einzeln

  if (!auth.isAuthenticated || !transport) {
    return null;
  }

  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TransportProvider>
  );
}

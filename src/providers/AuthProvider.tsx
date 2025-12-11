import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { CliConfig, loadCliConfig } from "@/lib/cli-config";
import { toast } from "sonner";
import { listen } from "@tauri-apps/api/event";

// --------------------
// Typen
// --------------------

type AuthenticatedState = {
  isAuthenticated: true;
  token: string;
  apiUrl: string;
  projectId: string;
  contextName: string;
  reload: () => Promise<void>;
  logout: () => void;
};

type UnauthenticatedState = {
  isAuthenticated: false;
  reload: () => Promise<void>;
  logout: () => void;
};

export type AuthState = AuthenticatedState | UnauthenticatedState;

// interner State ohne Funktionen
type InternalAuthState =
  | {
      isAuthenticated: false;
    }
  | {
      isAuthenticated: true;
      token: string;
      apiUrl: string;
      projectId: string;
      contextName: string;
    };

// --------------------
// Context
// --------------------

const AuthContext = createContext<AuthState | undefined>(undefined);

// --------------------
// Provider
// --------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<InternalAuthState>({
    isAuthenticated: false,
  });

  const reload = useCallback(async () => {
    const config: CliConfig = await loadCliConfig();

    const ctx = config.contexts.find((c) => c.name === config.currentContext);

    if (!ctx) {
      toast.warning("Auth", {
        id: "no-context-selected",
        richColors: true,
        description: "No context selected in CLI config.",
      });

      setAuthState({ isAuthenticated: false });
      return;
    }

    setAuthState({
      isAuthenticated: true,
      token: ctx.apiToken,
      apiUrl: ctx.apiUrl,
      projectId: ctx.defaultProject,
      contextName: ctx.name,
    });

    toast.info("Auth", {
      id: "context-switched",
      richColors: true,
      description: `Context switched to ${ctx.name}`,
    });
  }, []);

  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false });

    toast.info("Auth", {
      id: "logged-out",
      richColors: true,
      description: "Logged out.",
    });
  }, []);

  // initiales Laden
  useEffect(() => {
    void reload();
  }, [reload]);

  // OAuth-Event-Listener
  useEffect(() => {
    const unlistenPromise = listen("oauth-token", async () => {
      toast.success("Auth", {
        id: "oauth-token-received",
        richColors: true,
        description: "OAuth token received, reloading context.",
      });
      await reload();
    });

    return () => {
      unlistenPromise.then((unlisten) => unlisten());
    };
  }, [reload]);

  // aus internem State → öffentliches AuthState (Union)
  const value: AuthState = authState.isAuthenticated
    ? {
        isAuthenticated: true,
        token: authState.token,
        apiUrl: authState.apiUrl,
        projectId: authState.projectId,
        contextName: authState.contextName,
        reload,
        logout,
      }
    : {
        isAuthenticated: false,
        reload,
        logout,
      };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// --------------------
// Hook
// --------------------

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

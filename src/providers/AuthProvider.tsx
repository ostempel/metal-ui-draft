import { createContext, useContext, useEffect, useState } from "react";
import { CliConfig, loadCliConfig } from "@/lib/cli-config";
import { toast } from "sonner";
import { listen } from "@tauri-apps/api/event";

type AuthState = {
  token: string | null;
  apiUrl: string | null;
  projectId: string | null;
  contextName: string | null;
  reload: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [contextName, setContextName] = useState<string | null>(null);

  async function reload() {
    const config: CliConfig = await loadCliConfig();
    console.log("CLI-Config loaded:", config);
    console.log("Current context:", config.currentContext);

    const ctx = config.contexts.find((c) => c.name === config.currentContext);

    if (!ctx) {
      toast.warning("Auth", {
        id: "no-context-selected",
        richColors: true,
        description: "No context selected in CLI config.",
      });
      setToken(null);
      return;
    }

    setToken(ctx.apiToken);
    setApiUrl(ctx.apiUrl);
    setProjectId(ctx.defaultProject);
    setContextName(ctx.name);

    toast.info("Auth", {
      id: "context-switched",
      richColors: true,
      description: `Context switched to ${ctx.name}`,
    });
  }

  function logout() {
    setToken(null);
    setApiUrl(null);
    setProjectId(null);
    setContextName(null);
  }

  useEffect(() => {
    reload();
  }, []);

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
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, apiUrl, projectId, contextName, reload, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

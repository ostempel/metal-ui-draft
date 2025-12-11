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

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  const transport = useMemo(() => {
    if (!auth.isAuthenticated) {
      return null;
    }

    const interceptor = new AuthInterceptor(auth.token, () => {
      auth.logout();
      queryClient.clear();
      navigate("/login");
    }).interceptor;

    return createConnectTransport({
      baseUrl: auth.apiUrl,
      interceptors: [interceptor],
      useBinaryFormat: false,
    });
  }, [auth, navigate]);

  if (!auth.isAuthenticated || !transport) {
    return null;
  }

  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TransportProvider>
  );
}

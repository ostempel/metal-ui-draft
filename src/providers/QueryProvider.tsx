import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthenticatedAuth } from "./AuthProvider";
import { AuthInterceptor } from "@/interceptors/AuthInterceptor";
import { createConnectTransport } from "@connectrpc/connect-web";
import { useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthenticatedAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/login");
  }, [auth.isAuthenticated, navigate]);

  const onUnauthorized = useCallback(() => {
    auth.logout();
    queryClient.clear();
    navigate("/login");
  }, [auth.logout, navigate]);

  const transport = useMemo(() => {
    if (!auth.isAuthenticated) return null;

    const interceptor = new AuthInterceptor(auth.token, onUnauthorized)
      .interceptor;

    return createConnectTransport({
      baseUrl: auth.apiUrl,
      interceptors: [interceptor],
      useBinaryFormat: false,
    });
  }, [auth.isAuthenticated, auth.token, auth.apiUrl, onUnauthorized]);

  if (!auth.isAuthenticated || !transport) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <TransportProvider transport={transport}>{children}</TransportProvider>
    </QueryClientProvider>
  );
}

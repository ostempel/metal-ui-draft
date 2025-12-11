import { AuthProvider } from "@/providers/AuthProvider";
import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

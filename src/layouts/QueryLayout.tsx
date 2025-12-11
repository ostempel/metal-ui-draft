import { QueryProvider } from "@/providers/QueryProvider";
import { Outlet } from "react-router";

export function QueryLayout() {
  return (
    <QueryProvider>
      <Outlet />
    </QueryProvider>
  );
}

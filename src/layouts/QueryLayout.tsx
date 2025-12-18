import { ProjectProvider } from "@/providers/ProjectProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { TenantProvider } from "@/providers/TenantProvider";
import { UserProvider } from "@/providers/UserProvider";
import { Outlet } from "react-router";

export function QueryLayout() {
  return (
    <QueryProvider>
      <UserProvider>
        <TenantProvider>
          <ProjectProvider>
            <Outlet />
          </ProjectProvider>
        </TenantProvider>
      </UserProvider>
    </QueryProvider>
  );
}

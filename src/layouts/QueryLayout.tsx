import { ProjectProvider } from "@/providers/ProjectProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { UserProvider } from "@/providers/UserProvider";
import { Outlet } from "react-router";

export function QueryLayout() {
  return (
    <QueryProvider>
      <UserProvider>
        <ProjectProvider>
          <Outlet />
        </ProjectProvider>
      </UserProvider>
    </QueryProvider>
  );
}

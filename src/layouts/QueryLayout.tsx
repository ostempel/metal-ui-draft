import { QueryProvider } from "@/providers/QueryProvider";
// import { UserProvider } from "@/providers/UserProvider";
import { Outlet } from "react-router";

export function QueryLayout() {
  return (
    <QueryProvider>
      {/* TODO user get describe currently unimplemented */}
      {/* <UserProvider> */}
      <Outlet />
      {/* </UserProvider> */}
    </QueryProvider>
  );
}

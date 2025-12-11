import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { QueryLayout } from "./layouts/QueryLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import TenantList from "./pages/Tenants/TenantList";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <QueryLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/tenants",
            element: <TenantList />,
          },
        ],
      },
    ],
  },
]);

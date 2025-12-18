import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { QueryLayout } from "./layouts/QueryLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { PageLayout } from "./layouts/PageLayout";
import TenantList from "./pages/Tenants/TenantList";
import ProjectList from "./pages/Projects/ProjectList";

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
            element: <PageLayout />,
            children: [
              {
                path: "/",
                element: <Dashboard />,
                handle: { title: "Dashboard" },
              },
              {
                path: "/tenants",
                element: <TenantList />,
                handle: { title: "Tenant List" },
              },
              {
                path: "/projects",
                element: <ProjectList />,
                handle: { title: "Projects" },
              },
            ],
          },
        ],
      },
    ],
  },
]);

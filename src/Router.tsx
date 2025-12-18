import { createBrowserRouter } from "react-router";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { QueryLayout } from "./layouts/QueryLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { PageLayout } from "./layouts/PageLayout";
import TenantsPage from "./pages/Tenants/tenants-page";
import ProjectsPage from "./pages/Projects/projects-page";
import MachinesPage from "./pages/Machines/machines-page";
import ImagesPage from "./pages/Images/images-page";
import IPsPage from "./pages/IPs/ips-page";
import PartitionsPage from "./pages/Partition/partitions-page";

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
                element: <TenantsPage />,
                handle: { title: "Tenant List" },
              },
              {
                path: "/projects",
                element: <ProjectsPage />,
                handle: { title: "Projects" },
              },
              {
                path: "/machines",
                element: <MachinesPage />,
                handle: { title: "Machines", withProjectSelector: true },
              },
              {
                path: "/images",
                element: <ImagesPage />,
                handle: { title: "Images" },
              },
              {
                path: "/ips",
                element: <IPsPage />,
                handle: { title: "IPs", withProjectSelector: true },
              },
              {
                path: "/partitions",
                element: <PartitionsPage />,
                handle: { title: "Partitions" },
              },
            ],
          },
        ],
      },
    ],
  },
]);

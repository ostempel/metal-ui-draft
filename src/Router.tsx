// Router.tsx
import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { requireAuthLoader } from "./lib/require-auth";
import { QueryLayout } from "./layouts/QueryLayout";

export const router = createBrowserRouter([
  // Public route: kein QueryProvider, kein Auth-Zwang (ausser evtl. im Loader)
  {
    path: "/login",
    element: <Login />,
  },

  // Geschützte Routen: hängen unter QueryLayout → QueryProvider aktiv
  {
    element: <QueryLayout />,
    children: [
      {
        path: "/",
        loader: requireAuthLoader,
        element: <Dashboard />,
      },
      // hier kannst du weitere protected routes einhängen:
      // { path: "/projects", element: <ProjectsPage /> },
    ],
  },
]);

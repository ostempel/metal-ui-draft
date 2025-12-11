import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { requireAuthLoader } from "./lib/require-auth";
import { QueryLayout } from "./layouts/QueryLayout";
import { AuthLayout } from "./layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />, // 👈 globaler Wrapper für ALLE Routen
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <QueryLayout />, // nur protected routes
        children: [
          {
            path: "/",
            loader: requireAuthLoader,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

import Login from "./pages/Login";
import { createBrowserRouter, redirect } from "react-router";
import { requireAuthLoader } from "./lib/require-auth";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        loader: requireAuthLoader, // 🔐 Schutz
        element: <Dashboard />,
      },
    ],
  },
]);

// export function AppRouter() {
//   return (
//     <Routes>
//       <Route path="*" element={<Login />} />
//       {/* <Route index element={<Home />} />
//       <Route path="about" element={<About />} />

//       <Route element={<AuthLayout />}>
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//       </Route>

//       <Route path="concerts">
//         <Route index element={<ConcertsHome />} />
//         <Route path=":city" element={<City />} />
//         <Route path="trending" element={<Trending />} />
//       </Route> */}
//     </Routes>
//   );
// }

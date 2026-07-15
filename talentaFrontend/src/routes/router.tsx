import { createBrowserRouter } from "react-router-dom";
import GuestGuard from "../guards/GuestGuard/GuestGuard";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import AuthGuard from "../guards/AuthGuard/AuthGuard";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardContent from "../pages/Dashboard/DashboardContent/DashboardContent";
import RoleGuard from "../guards/RoleGuard/RoleGuard";
import ManageCandidates from "../pages/Dashboard/DashboardContent/AdminDashboardContent/ManageCandidates/ManageCandidates";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuestGuard>
        <HomePage />
      </GuestGuard>
    )
  },
  {
    path: "/login",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    )
  },
  {
    path: "/dashboard",
    element: <AuthGuard />,
    children: [
      {
        element: <Dashboard />,
        children: [
          { index: true, element: <DashboardContent /> },
          {
            path: "manageCandidates",
            element: (
              <RoleGuard roles={["ADMIN"]}>
                <ManageCandidates />
              </RoleGuard>
            )
          }

        ],
      },
    ],
  },
]);
export default router;









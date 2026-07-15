import { useAppSelector } from "../../../store/hooks";
import AdminDashboardContent from "./AdminDashboardContent/AdminDashboardContent";
import CandidateDashboardContent from "./CandidateDashboardContent/CandidateDashboardContent";
import RecruiterDashboardContent from "./RecruiterDashboardContent/RecruiterDashboardContent";

const DashboardContent = () => {
  const role = useAppSelector((state) => state.auth.role);

  switch (role) {
    case "CANDIDATE":
      return <CandidateDashboardContent />;
    case "RECRUITER":
      return <RecruiterDashboardContent />;
    case "ADMIN":
      return <AdminDashboardContent />;
    default:
      return null;
  }
};

export default DashboardContent
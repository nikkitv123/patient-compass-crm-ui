
import { useUser } from "@/contexts/UserContext";
import { FrontlineStaffDashboard } from "@/components/dashboard/FrontlineStaffDashboard";
import { SupportStaffDashboard } from "@/components/dashboard/SupportStaffDashboard";
import { ManagementDashboard } from "@/components/dashboard/ManagementDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

const Dashboard = () => {
  const { currentUser } = useUser();
  
  const renderDashboardByRole = () => {
    switch (currentUser.role) {
      case "admin":
        return <AdminDashboard currentUser={currentUser} />;
      case "doctor":
        return <FrontlineStaffDashboard currentUser={currentUser} />;
      case "marketing":
        return <ManagementDashboard currentUser={currentUser} />;
      case "crm_user":
      default:
        return <SupportStaffDashboard currentUser={currentUser} />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      {renderDashboardByRole()}
    </div>
  );
};

export default Dashboard;

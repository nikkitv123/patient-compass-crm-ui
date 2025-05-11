
import { useUser } from "@/contexts/UserContext";
import { FrontlineStaffDashboard } from "@/components/dashboard/FrontlineStaffDashboard";
import { SupportStaffDashboard } from "@/components/dashboard/SupportStaffDashboard";
import { ManagementDashboard } from "@/components/dashboard/ManagementDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { currentUser } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Small delay for animation to trigger properly
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
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
    <div className={`space-y-6 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <h1 className="text-3xl font-bold tracking-tight animate-fade-in">Dashboard</h1>
      <div className="animate-fade-in">{renderDashboardByRole()}</div>
    </div>
  );
};

export default Dashboard;

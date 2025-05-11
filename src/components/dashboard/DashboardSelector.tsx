
import { User } from "@/types/user";
import { FrontlineStaffDashboard } from "@/components/dashboard/FrontlineStaffDashboard";
import { SupportStaffDashboard } from "@/components/dashboard/SupportStaffDashboard";
import { ManagementDashboard } from "@/components/dashboard/ManagementDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

interface DashboardSelectorProps {
  currentUser: User;
}

export const DashboardSelector = ({ currentUser }: DashboardSelectorProps) => {
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

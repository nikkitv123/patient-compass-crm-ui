
import { useUser } from "@/contexts/UserContext";
import { DashboardSelector } from "@/components/dashboard/DashboardSelector";
import { useFadeInAnimation } from "@/hooks/useFadeInAnimation";

const Dashboard = () => {
  const { currentUser } = useUser();
  const isLoaded = useFadeInAnimation();
  
  return (
    <div className={`space-y-6 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <h1 className="text-3xl font-bold tracking-tight animate-fade-in">Dashboard</h1>
      <div className="animate-fade-in">
        <DashboardSelector currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Dashboard;

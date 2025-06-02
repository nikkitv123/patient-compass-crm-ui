
import { TaskList } from "@/components/dashboard/TaskList";
import { PatientList } from "@/components/dashboard/PatientList";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { PatientSearch } from "./PatientSearch";
import { StatsCardGrid } from "./StatsCardGrid";
import { AppointmentList } from "./AppointmentList";
import { QuickActions } from "./QuickActions";
import { RecentCommunications } from "./RecentCommunications";
import { PatientStatusManager } from "./PatientStatusManager";
import { RecentReports } from "./RecentReports";
import { FeedbackProtocols } from "./FeedbackProtocols";
import { mockTasks, mockAppointments, mockPatients } from "@/data/mockDashboardData";

interface DoctorDashboardProps {
  currentUser: User;
}

export const DoctorDashboard = ({ currentUser }: DoctorDashboardProps) => {
  const navigate = useNavigate();

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    console.log(`Task ${taskId} marked as ${completed ? "completed" : "incomplete"}`);
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <div className="space-y-6">
      {/* Patient Search */}
      <PatientSearch />

      {/* Key Metrics */}
      <StatsCardGrid />

      {/* Patient Status Management */}
      <PatientStatusManager />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Tasks & Appointments */}
        <div className="space-y-6">
          <TaskList 
            title="Clinical Tasks" 
            description="Urgent clinical tasks requiring attention"
            tasks={mockTasks}
            onTaskComplete={handleTaskComplete}
          />
          <AppointmentList appointments={mockAppointments} />
        </div>

        {/* Middle Column - Communications & Reports */}
        <div className="space-y-6">
          <RecentCommunications />
          <RecentReports />
        </div>

        {/* Right Column - Protocols & Patients */}
        <div className="space-y-6">
          <FeedbackProtocols />
          <PatientList
            title="Recent Patients"
            patients={mockPatients.slice(0, 5)}
            onViewPatient={handleViewPatient}
            onViewAllPatients={() => navigate('/patients')}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};

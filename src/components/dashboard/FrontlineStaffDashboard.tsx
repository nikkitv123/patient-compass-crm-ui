
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { PatientList } from "@/components/dashboard/PatientList";
import { User } from "@/types/user";
import { UserPlus, Clock, Calendar, PhoneCall, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface FrontlineStaffDashboardProps {
  currentUser: User;
}

export const FrontlineStaffDashboard = ({ currentUser }: FrontlineStaffDashboardProps) => {
  const navigate = useNavigate();

  // Mock data for demonstration purposes
  const tasks = [
    {
      id: "1",
      title: "Follow up with patient Sarah Johnson about appointment",
      priority: "high" as const,
      patient: { id: "p1", name: "Sarah Johnson" },
      dueDate: "Today, 2:00 PM",
      completed: false,
    },
    {
      id: "2",
      title: "Call Michael Williams to confirm appointment",
      priority: "medium" as const,
      patient: { id: "p2", name: "Michael Williams" },
      dueDate: "Today, 4:30 PM",
      completed: false,
    },
    {
      id: "3",
      title: "Remind David Brown about insurance forms",
      priority: "medium" as const,
      patient: { id: "p3", name: "David Brown" },
      dueDate: "Tomorrow, 10:00 AM",
      completed: false,
    },
  ];

  const appointments = [
    {
      id: "a1",
      patient: { id: "p1", name: "Sarah Johnson" },
      time: "Today, 2:30 PM",
      provider: "Dr. Michael Chen",
      type: "Check-up"
    },
    {
      id: "a2",
      patient: { id: "p5", name: "Robert Wilson" },
      time: "Today, 3:15 PM",
      provider: "Dr. Jane Smith",
      type: "Follow-up"
    },
    {
      id: "a3",
      patient: { id: "p2", name: "Michael Williams" },
      time: "Tomorrow, 11:00 AM",
      provider: "Dr. Michael Chen",
      type: "Initial Consultation"
    }
  ];

  const patients = [
    {
      id: "p1",
      name: "Sarah Johnson",
      crn: "CRN-12345",
      lastInteraction: "10 minutes ago",
      isHighRisk: true,
    },
    {
      id: "p2",
      name: "Michael Williams",
      crn: "CRN-23456",
      lastInteraction: "2 hours ago",
    },
    {
      id: "p3",
      name: "David Brown",
      crn: "CRN-34567",
      lastInteraction: "Yesterday",
    },
    {
      id: "p4",
      name: "Emily Davis",
      crn: "CRN-45678",
      lastInteraction: "2 days ago",
      isVIP: true,
    }
  ];

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    console.log(`Task ${taskId} marked as ${completed ? "completed" : "incomplete"}`);
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <div className="space-y-6">
      {/* Prominent Search Bar */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search patients by name or CRN..."
          className="w-full h-12 pl-10 pr-4 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <UserPlus className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Key Immediate Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tasks Due Today"
          value="5"
          icon={Clock}
          description="2 high priority"
        />
        <StatsCard
          title="Upcoming Appointments"
          value="8"
          icon={Calendar}
          description="Today"
        />
        <StatsCard
          title="Calls Waiting"
          value="3"
          icon={PhoneCall}
          trend={{ value: 2, isPositive: false }}
          description="in Queue"
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">My Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Badge className="bg-green-500 mr-2" />
              <span className="text-xl font-bold">Available</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Since 9:30 AM
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks and Appointments */}
      <div className="grid gap-6 md:grid-cols-2">
        <TaskList 
          title="My Tasks" 
          description="Tasks requiring your attention today"
          tasks={tasks}
          onTaskComplete={handleTaskComplete}
        />
        <Card>
          <CardHeader>
            <CardTitle>My Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-1">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start justify-between px-6 py-4 hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <div className="font-medium">
                      {appointment.patient.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.time} • {appointment.provider} • {appointment.type}
                    </div>
                  </div>
                  <button
                    className="text-sm text-primary hover:underline"
                    onClick={() => navigate(`/patients/${appointment.patient.id}`)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recently Viewed Patients */}
      <div>
        <PatientList
          title="Recently Viewed Patients"
          patients={patients}
          onViewPatient={handleViewPatient}
          onViewAllPatients={() => navigate('/patients')}
        />
      </div>

      {/* Quick Action Buttons */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-2 p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                <UserIcon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Change Status</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-2 p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                <PhoneCall className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Initiate Call</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-2 p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Log Interaction</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

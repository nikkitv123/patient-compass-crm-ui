
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { CaseList } from "@/components/dashboard/CaseList";
import { PatientList } from "@/components/dashboard/PatientList";
import { CasesLineChart } from "@/components/charts/CasesLineChart";
import { Activity, ClipboardCheck, ClipboardList, Clock, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for demonstration purposes
  const tasks = [
    {
      id: "1",
      title: "Follow up with patient Sarah Johnson about medication",
      priority: "high" as const,
      patient: { id: "p1", name: "Sarah Johnson" },
      dueDate: "Today, 2:00 PM",
      completed: false,
    },
    {
      id: "2",
      title: "Review lab results for Michael Williams",
      priority: "medium" as const,
      patient: { id: "p2", name: "Michael Williams" },
      dueDate: "Today, 4:30 PM",
      completed: false,
    },
    {
      id: "3",
      title: "Call pharmacy about prescription refill",
      priority: "medium" as const,
      patient: { id: "p3", name: "David Brown" },
      dueDate: "Tomorrow, 10:00 AM",
      completed: false,
    },
    {
      id: "4",
      title: "Schedule follow-up appointment",
      priority: "low" as const,
      patient: { id: "p4", name: "Emily Davis" },
      dueDate: "Tomorrow, 1:00 PM",
      completed: false,
    },
    {
      id: "5",
      title: "Update patient notes in EHR",
      priority: "low" as const,
      patient: { id: "p5", name: "Robert Wilson" },
      dueDate: "Apr 12, 3:00 PM",
      completed: true,
    },
  ];

  const cases = [
    {
      id: "c1",
      caseId: "CSE-1234",
      subject: "Post-surgery follow-up inquiry",
      status: "in-progress" as const,
      patient: { id: "p1", name: "Sarah Johnson" },
      priority: "high" as const,
      createdDate: "Apr 10, 2023",
      sla: { status: "at-risk" as const, timeRemaining: "2 hours remaining" },
    },
    {
      id: "c2",
      caseId: "CSE-1235",
      subject: "Insurance claim dispute",
      status: "open" as const,
      patient: { id: "p2", name: "Michael Williams" },
      priority: "medium" as const,
      createdDate: "Apr 9, 2023",
      sla: { status: "on-track" as const, timeRemaining: "1 day remaining" },
    },
    {
      id: "c3",
      caseId: "CSE-1236",
      subject: "Appointment rescheduling request",
      status: "pending" as const,
      patient: { id: "p3", name: "David Brown" },
      priority: "low" as const,
      createdDate: "Apr 8, 2023",
    },
    {
      id: "c4",
      caseId: "CSE-1237",
      subject: "Medication side effects report",
      status: "open" as const,
      patient: { id: "p4", name: "Emily Davis" },
      priority: "high" as const,
      createdDate: "Apr 7, 2023",
      sla: { status: "breached" as const },
    },
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
    },
    {
      id: "p5",
      name: "Robert Wilson",
      crn: "CRN-56789",
      lastInteraction: "5 days ago",
    },
  ];

  const caseChartData = [
    { name: "Jan", created: 65, resolved: 40 },
    { name: "Feb", created: 59, resolved: 48 },
    { name: "Mar", created: 80, resolved: 65 },
    { name: "Apr", created: 81, resolved: 90 },
    { name: "May", created: 56, resolved: 85 },
    { name: "Jun", created: 55, resolved: 53 },
    { name: "Jul", created: 40, resolved: 45 },
  ];

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    toast({
      title: completed ? "Task completed" : "Task marked as incomplete",
      description: `Task ${taskId} has been updated`,
    });
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  const handleViewCase = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value="2,452"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          description="vs. last month"
        />
        <StatsCard
          title="Open Cases"
          value="124"
          icon={ClipboardList}
          trend={{ value: 5, isPositive: false }}
          description="vs. last month"
        />
        <StatsCard
          title="Tasks Due Today"
          value="23"
          icon={ClipboardCheck}
          description="4 high priority"
        />
        <StatsCard
          title="Avg. Resolution Time"
          value="1.2 days"
          icon={Clock}
          trend={{ value: 15, isPositive: true }}
          description="vs. last month"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-1 lg:col-span-4">
          <CasesLineChart 
            data={caseChartData}
            title="Case Volume Trend"
            description="Created vs Resolved Cases"
          />
        </div>
        <div className="md:col-span-1 lg:col-span-3">
          <PatientList
            title="Recently Viewed Patients"
            patients={patients}
            onViewPatient={handleViewPatient}
            onViewAllPatients={() => navigate('/patients')}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TaskList 
          title="My Tasks" 
          description="Tasks requiring your attention"
          tasks={tasks}
          onTaskComplete={handleTaskComplete}
        />
        <CaseList 
          title="My Open Cases"
          description="Cases assigned to you"
          cases={cases}
          onViewCase={handleViewCase}
        />
      </div>
    </div>
  );
};

export default Dashboard;

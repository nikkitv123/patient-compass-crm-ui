
import { StatsCard } from "@/components/dashboard/StatsCard";
import { User } from "@/types/user";
import { 
  Activity, Users, Database, Server, Clock, ClipboardList, 
  BellRing, FileText, Settings, MessageSquare, Shield 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface AdminDashboardProps {
  currentUser: User;
}

export const AdminDashboard = ({ currentUser }: AdminDashboardProps) => {
  const navigate = useNavigate();
  
  // Mock data for system activities
  const systemActivities = [
    {
      id: "act1",
      type: "security",
      message: "User account 'john.doe' locked after multiple failed login attempts",
      timestamp: "Today, 10:23 AM",
      severity: "high"
    },
    {
      id: "act2",
      type: "config",
      message: "SLA rule 'Urgent Care Follow-up' modified by admin user",
      timestamp: "Today, 9:15 AM",
      severity: "medium"
    },
    {
      id: "act3",
      type: "integration",
      message: "EMR integration sync completed successfully - 234 records processed",
      timestamp: "Today, 8:30 AM",
      severity: "low"
    },
    {
      id: "act4",
      type: "security",
      message: "Role permission 'Case.Delete' added to 'Manager' role",
      timestamp: "Yesterday, 4:45 PM",
      severity: "medium"
    },
    {
      id: "act5",
      type: "system",
      message: "System backup completed successfully",
      timestamp: "Yesterday, 2:00 AM",
      severity: "low"
    }
  ];

  // Health status indicators
  const systemComponents = [
    { name: "Database", status: "healthy", icon: Database },
    { name: "Message Queue", status: "healthy", icon: MessageSquare },
    { name: "Email Gateway", status: "degraded", icon: BellRing },
    { name: "Telephony Integration", status: "healthy", icon: Server }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500">Healthy</Badge>;
      case "degraded":
        return <Badge className="bg-amber-500">Degraded</Badge>;
      case "down":
        return <Badge className="bg-red-500">Down</Badge>;
      default:
        return <Badge className="bg-slate-500">Unknown</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-slate-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative w-full max-w-md mx-auto lg:mx-0">
        <input
          type="text"
          placeholder="Search audit logs, users or configurations..."
          className="w-full h-10 pl-10 pr-4 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Activity className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Key System Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <StatsCard
          title="Total Users"
          value="127"
          icon={Users}
          trend={{ value: 3, isPositive: true }}
          description="active accounts"
        />
        <StatsCard
          title="Failed Logins"
          value="12"
          icon={Shield}
          trend={{ value: 5, isPositive: false }}
          description="last 24 hours"
        />
        <StatsCard
          title="Audit Log Events"
          value="1,432"
          icon={FileText}
          description="last 24 hours"
        />
        <StatsCard
          title="Open Cases"
          value="178"
          icon={ClipboardList}
          trend={{ value: 12, isPositive: false }}
          description="system-wide"
        />
        <StatsCard
          title="Tasks Overdue"
          value="34"
          icon={Clock}
          trend={{ value: 9, isPositive: false }}
          description="system-wide"
        />
        <StatsCard
          title="Integration Status"
          value="3/4"
          icon={Activity}
          description="systems operational"
        />
      </div>

      {/* System Health and Configuration Summaries */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Status of critical system components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemComponents.map((component, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <component.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{component.name}</span>
                  </div>
                  {getStatusBadge(component.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Configuration Summary</CardTitle>
            <CardDescription>Overview of system configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Case Types Configured</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">SLA Rules Configured</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">User Roles Defined</span>
                <span className="font-semibold">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Notification Templates</span>
                <span className="font-semibold">15</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent System Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
          <CardDescription>Recent critical system events from the audit log</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-1">
            {systemActivities.map((activity) => (
              <div
                key={activity.id}
                className="px-6 py-4 hover:bg-muted/50"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className={`font-medium ${getSeverityColor(activity.severity)}`}>
                      {activity.message}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{activity.type}</Badge>
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Admin Links */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <Card className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => navigate("/admin/users")}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-2 p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">User Management</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => navigate("/admin/role-permissions")}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-2 p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Role Permissions</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => navigate("/admin/notifications")}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-2 p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                <BellRing className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Notifications</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => navigate("/admin/case-config")}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-2 p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Case Config</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => navigate("/admin/sla-rules")}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-2 p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">SLA Rules</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => navigate("/admin/settings")}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-2 p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm">System Settings</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

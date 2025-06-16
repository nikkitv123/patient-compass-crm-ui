
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Users, Activity, TestTube, Pill } from "lucide-react";

export default function EHRDashboard() {
  const recentAppointments = [
    { id: '1', patient: 'John Doe', time: '09:00 AM', type: 'Consultation', status: 'confirmed' },
    { id: '2', patient: 'Jane Smith', time: '10:30 AM', type: 'Follow-up', status: 'in-progress' },
    { id: '3', patient: 'Bob Johnson', time: '02:00 PM', type: 'Check-up', status: 'scheduled' }
  ];

  const pendingResults = [
    { id: '1', patient: 'Alice Brown', test: 'Blood Test', ordered: '2 hours ago' },
    { id: '2', patient: 'Mike Wilson', test: 'X-Ray Chest', ordered: '4 hours ago' },
    { id: '3', patient: 'Sarah Davis', test: 'ECG', ordered: '1 day ago' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-healthcare-dark">Electronic Health Records</h1>
        <div className="flex gap-2">
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Record
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Results</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 urgent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medications</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Active prescriptions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
          <TabsTrigger value="results">Pending Results</TabsTrigger>
          <TabsTrigger value="patients">Recent Patients</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Manage your appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{appointment.patient}</div>
                      <div className="text-sm text-muted-foreground">{appointment.time} • {appointment.type}</div>
                    </div>
                    <Badge variant={appointment.status === 'confirmed' ? 'default' : appointment.status === 'in-progress' ? 'secondary' : 'outline'}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Lab Results</CardTitle>
              <CardDescription>Review and approve test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{result.patient}</div>
                      <div className="text-sm text-muted-foreground">{result.test} • Ordered {result.ordered}</div>
                    </div>
                    <Button size="sm">Review</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Patient Records</CardTitle>
              <CardDescription>Recently accessed patient files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Patient records will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

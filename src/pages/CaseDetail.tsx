
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  ClockIcon,
  Edit,
  History,
  Link,
  MessageCircle,
  User,
} from "lucide-react";
import { TaskList } from "@/components/dashboard/TaskList";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // Mock case data for demonstration
  const caseData = {
    id: id || "c1",
    caseId: "CSE-1234",
    subject: "Post-surgery follow-up inquiry",
    description:
      "Patient is experiencing increased pain at the incision site and is concerned about potential infection. Needs urgent medical advice.",
    status: "in-progress",
    priority: "high",
    type: "Medical Concern",
    subType: "Post-Procedure Complication",
    channel: "Phone",
    createdDate: "April 10, 2023 - 10:45 AM",
    createdBy: "Dr. Jane Smith",
    assignee: {
      id: "u1",
      name: "Dr. Jane Smith",
      role: "Cardiologist",
    },
    patient: {
      id: "p1",
      name: "Sarah Johnson",
      crn: "CRN-12345",
      isHighRisk: true,
    },
    sla: {
      status: "at-risk",
      target: "April 11, 2023 - 10:45 AM",
      timeRemaining: "2 hours remaining",
      progress: 80,
    },
  };

  // Mock data for the tabs
  const tasks = [
    {
      id: "1",
      title: "Call patient to discuss pain management options",
      priority: "high" as const,
      patient: { id: "p1", name: caseData.patient.name },
      dueDate: "Today, 2:00 PM",
      completed: false,
    },
    {
      id: "2",
      title: "Schedule emergency appointment if needed",
      priority: "medium" as const,
      patient: { id: "p1", name: caseData.patient.name },
      dueDate: "Today, 5:00 PM",
      completed: false,
    },
    {
      id: "3",
      title: "Follow up with patient about symptoms",
      priority: "medium" as const,
      patient: { id: "p1", name: caseData.patient.name },
      dueDate: "Tomorrow, 10:00 AM",
      completed: false,
    },
  ];

  const communications = [
    {
      id: "com1",
      type: "System",
      date: "April 10, 2023 - 10:45 AM",
      content: "Case created and assigned to Dr. Jane Smith",
      user: "System",
    },
    {
      id: "com2",
      type: "Note",
      date: "April 10, 2023 - 11:15 AM",
      content:
        "Called patient to discuss concerns. Patient reports increased pain and redness around incision site. Advised to monitor temperature and take prescribed pain medication. Will schedule urgent appointment if symptoms worsen.",
      user: "Dr. Jane Smith",
    },
    {
      id: "com3",
      type: "Email",
      date: "April 10, 2023 - 11:30 AM",
      content:
        "Email sent to patient with post-surgical care instructions and contact information for emergency services if needed.",
      user: "Dr. Jane Smith",
    },
    {
      id: "com4",
      type: "System",
      date: "April 10, 2023 - 2:30 PM",
      content: "Case escalated due to high priority",
      user: "System",
    },
  ];

  const history = [
    {
      id: "h1",
      date: "April 10, 2023 - 10:45 AM",
      action: "Case Created",
      user: "Dr. Jane Smith",
      details: "Case created with high priority",
    },
    {
      id: "h2",
      date: "April 10, 2023 - 10:45 AM",
      action: "Assignment",
      user: "System",
      details: "Case assigned to Dr. Jane Smith",
    },
    {
      id: "h3",
      date: "April 10, 2023 - 11:00 AM",
      action: "Status Change",
      user: "Dr. Jane Smith",
      details: 'Status changed from "Open" to "In Progress"',
    },
    {
      id: "h4",
      date: "April 10, 2023 - 11:15 AM",
      action: "Note Added",
      user: "Dr. Jane Smith",
      details: "Communication note added to case",
    },
    {
      id: "h5",
      date: "April 10, 2023 - 11:30 AM",
      action: "Email Sent",
      user: "Dr. Jane Smith",
      details: "Email sent to patient",
    },
    {
      id: "h6",
      date: "April 10, 2023 - 2:30 PM",
      action: "Escalation",
      user: "System",
      details: "Case escalated due to high priority",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge className="bg-blue-500 text-white">
            Open
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-indigo-500 text-white">
            In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500 text-white">
            Pending
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-green-500 text-white">
            Resolved
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-gray-500 text-white">
            Closed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-healthcare-danger text-white">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-healthcare-warning text-black">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-healthcare-primary text-white">
            Low
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {priority}
          </Badge>
        );
    }
  };

  const getSLAIndicator = (sla: typeof caseData.sla) => {
    switch (sla.status) {
      case "on-track":
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-healthcare-success" />
              <span className="text-healthcare-success font-medium">
                On Track
              </span>
              <span className="text-sm text-muted-foreground">
                {sla.timeRemaining}
              </span>
            </div>
            <Progress
              value={sla.progress}
              className="h-2 bg-muted"
              indicatorClassName="bg-healthcare-success"
            />
          </div>
        );
      case "at-risk":
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-healthcare-warning" />
              <span className="text-healthcare-warning font-medium">
                At Risk
              </span>
              <span className="text-sm text-muted-foreground">
                {sla.timeRemaining}
              </span>
            </div>
            <Progress
              value={sla.progress}
              className="h-2 bg-muted"
              indicatorClassName="bg-healthcare-warning"
            />
          </div>
        );
      case "breached":
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-healthcare-danger" />
              <span className="text-healthcare-danger font-medium">
                SLA Breached
              </span>
            </div>
            <Progress
              value={100}
              className="h-2 bg-muted"
              indicatorClassName="bg-healthcare-danger"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const noteContent = form.noteContent.value;

    toast({
      title: "Note Added",
      description: "Your note has been added to the case.",
    });

    // Clear the form
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <a href="/cases" className="hover:underline">Cases</a>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>{caseData.caseId}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight">
                {caseData.subject}
              </h1>
              <div className="flex items-center gap-1">
                {getStatusBadge(caseData.status as string)}
                {getPriorityBadge(caseData.priority as string)}
              </div>
            </div>
            <div className="text-muted-foreground mt-1">
              Case #{caseData.caseId} • Created {caseData.createdDate} • {caseData.type} / {caseData.subType}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button variant="outline">
              Update Status
            </Button>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Case
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="details">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Case Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{caseData.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Case Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium capitalize">{caseData.status.replace("-", " ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Priority:</span>
                      <span className="font-medium capitalize">{caseData.priority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{caseData.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sub-Type:</span>
                      <span className="font-medium">{caseData.subType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created By:</span>
                      <span className="font-medium">{caseData.createdBy}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source Channel:</span>
                      <span className="font-medium">{caseData.channel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created Date:</span>
                      <span className="font-medium">{caseData.createdDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resolution Target:</span>
                      <span className="font-medium">{caseData.sla.target}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SLA Status:</span>
                      <div className="flex items-center gap-2">
                        <Clock className={cn(
                          "h-4 w-4",
                          caseData.sla.status === "on-track" ? "text-healthcare-success" :
                          caseData.sla.status === "at-risk" ? "text-healthcare-warning" :
                          "text-healthcare-danger"
                        )} />
                        <span className="font-medium capitalize">{caseData.sla.status.replace("-", " ")}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Remaining:</span>
                      <span className={cn(
                        "font-medium",
                        caseData.sla.status === "on-track" ? "text-healthcare-success" :
                        caseData.sla.status === "at-risk" ? "text-healthcare-warning" :
                        "text-healthcare-danger"
                      )}>{caseData.sla.timeRemaining}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add Communication Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddNote}>
                    <div className="space-y-4">
                      <Textarea
                        name="noteContent"
                        placeholder="Enter your case notes here..."
                        className="min-h-32"
                      />
                      <div className="flex justify-end">
                        <Button type="submit">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Add Note
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Communication Log</CardTitle>
                  <CardDescription>
                    Complete history of all case communications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {communications.map((comm) => (
                      <div key={comm.id} className="border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                comm.type === "Note" ? "bg-blue-500 text-white" :
                                comm.type === "Email" ? "bg-indigo-500 text-white" :
                                comm.type === "Call" ? "bg-green-500 text-white" :
                                "bg-gray-500 text-white"
                              )}
                            >
                              {comm.type}
                            </Badge>
                            <div className="text-sm font-medium">{comm.date}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">{comm.user}</div>
                        </div>
                        <div className="text-sm whitespace-pre-wrap">{comm.content}</div>
                      </div>
                    ))}

                    <form onSubmit={handleAddNote} className="pt-6 border-t">
                      <div className="space-y-4">
                        <Textarea
                          name="noteContent"
                          placeholder="Add a new communication note..."
                          className="min-h-32"
                        />
                        <div className="flex justify-end">
                          <Button type="submit">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Add Note
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Case Tasks</CardTitle>
                    <CardDescription>Tasks associated with this case</CardDescription>
                  </div>
                  <Button>Create Task</Button>
                </CardHeader>
                <CardContent>
                  <TaskList
                    title=""
                    tasks={tasks}
                    onTaskComplete={() => {}}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Case History</CardTitle>
                  <CardDescription>
                    Audit trail of all changes made to this case
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l border-muted ml-4 pl-6 pb-2">
                    {history.map((event, index) => (
                      <div key={event.id} className="mb-6 last:mb-0 relative">
                        <div className="absolute -left-[10px] h-5 w-5 rounded-full border border-muted bg-background"></div>
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-sm font-medium">{event.action}</span>
                          <span className="text-xs text-muted-foreground">{event.date}</span>
                        </div>
                        <div className="mt-1 text-sm">{event.details}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          By: {event.user}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SLA Status</CardTitle>
            </CardHeader>
            <CardContent>
              {getSLAIndicator(caseData.sla)}
              <div className="mt-2 text-xs text-muted-foreground">
                Target: {caseData.sla.target}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>
                    {caseData.patient.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium flex items-center gap-1">
                    {caseData.patient.name}
                    {caseData.patient.isHighRisk && (
                      <Badge variant="outline" className="bg-patient-highrisk text-white border-none ml-1">
                        <AlertTriangle className="h-3 w-3 mr-1" /> High Risk
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    CRN: {caseData.patient.crn}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  <User className="h-4 w-4 mr-1" />
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <History className="h-4 w-4 mr-1" />
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assigned To</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>
                    {caseData.assignee.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{caseData.assignee.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {caseData.assignee.role}
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full">
                Reassign Case
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Patient
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ClockIcon className="h-4 w-4 mr-2" />
                Extend SLA
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Link className="h-4 w-4 mr-2" />
                Link Related Case
              </Button>
              <Button variant="outline" className="w-full justify-start text-healthcare-danger hover:text-healthcare-danger">
                <AlertCircle className="h-4 w-4 mr-2" />
                Escalate Case
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;

import React, { useState } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  AlertTriangle, 
  Calendar, 
  ClipboardList, 
  Edit, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Star,
  Clock,
  FileText,
  Download,
  User,
  FileCheck,
  ThumbsUp,
  Stethoscope,
  Building,
  History,
  HeartPulse,
  IdCard,  // Replacing ID with IdCard
} from "lucide-react";
import { TaskList } from "@/components/dashboard/TaskList";
import { CaseList } from "@/components/dashboard/CaseList";
import { Separator } from "@/components/ui/separator";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // State for modal visibility
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [isCreateCaseDialogOpen, setIsCreateCaseDialogOpen] = useState(false);
  const [isEditPreferencesDialogOpen, setIsEditPreferencesDialogOpen] = useState(false);

  // Mock patient data for demonstration
  const patient = {
    id: id || 'p1',
    name: "Sarah Johnson",
    crn: "CRN-12345",
    dateOfBirth: "12/24/1985",
    gender: "Female",
    contactNumber: "+1 (555) 123-4567",
    email: "sarah.johnson@example.com",
    address: "123 Main Street, Anytown, USA",
    medicalRecordNumber: "MRN-98765",
    healthId: "NHI-5432109", // Added health ID
    insuranceProvider: "BlueCross Health",
    insurancePolicyNumber: "BC-567890",
    primaryPhysician: "Dr. Robert Chen",
    isVIP: false,
    isHighRisk: true,
    preferredContactMethod: "Phone",
    preferredLanguage: "English",
    lastVisit: "March 15, 2023",
    registrationDate: "January 10, 2015",
    allergies: ["Penicillin", "Sulfa drugs"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
  };

  // Mock data for the tabs
  const tasks = [
    {
      id: "1",
      title: "Follow up about medication side effects",
      priority: "high" as const,
      patient: { id: id || "p1", name: patient.name },
      dueDate: "Today, 2:00 PM",
      completed: false,
    },
    {
      id: "2",
      title: "Schedule follow-up appointment",
      priority: "medium" as const,
      patient: { id: id || "p1", name: patient.name },
      dueDate: "Tomorrow, 10:00 AM",
      completed: false,
    },
    {
      id: "3",
      title: "Review new lab results",
      priority: "low" as const,
      patient: { id: id || "p1", name: patient.name },
      dueDate: "Apr 15, 9:00 AM",
      completed: true,
    },
  ];

  const cases = [
    {
      id: "c1",
      caseId: "CSE-1234",
      subject: "Post-surgery follow-up inquiry",
      status: "in-progress" as const,
      patient: { id: id || "p1", name: patient.name },
      priority: "high" as const,
      createdDate: "Apr 10, 2023",
      sla: { status: "at-risk" as const, timeRemaining: "2 hours remaining" },
    },
    {
      id: "c4",
      caseId: "CSE-1237",
      subject: "Medication side effects report",
      status: "open" as const,
      patient: { id: id || "p1", name: patient.name },
      priority: "high" as const,
      createdDate: "Mar 27, 2023",
      sla: { status: "breached" as const },
    },
    {
      id: "c5",
      caseId: "CSE-1195",
      subject: "Insurance coverage question",
      status: "resolved" as const,
      patient: { id: id || "p1", name: patient.name },
      priority: "medium" as const,
      createdDate: "Feb 15, 2023",
    },
  ];

  // Mock data for the new tabs
  const interactions = [
    {
      id: "i1",
      type: "Call",
      date: "April 10, 2023 - 10:30 AM",
      description: "Patient called to discuss medication side effects.",
      agent: "Dr. Jane Smith",
    },
    {
      id: "i2",
      type: "Case Created",
      date: "April 10, 2023 - 10:45 AM",
      description: "Created case CSE-1234 for post-surgery follow-up inquiry.",
      agent: "Dr. Jane Smith",
      caseId: "CSE-1234",
    },
    {
      id: "i3",
      type: "Email",
      date: "April 8, 2023 - 2:15 PM",
      description: "Sent appointment reminder email for upcoming checkup.",
      agent: "System",
    },
    {
      id: "i4",
      type: "Visit",
      date: "March 15, 2023 - 9:00 AM",
      description: "Post-surgery checkup. Healing well, minor discomfort reported.",
      agent: "Dr. Robert Chen",
    },
    {
      id: "i5",
      type: "Case Created",
      date: "March 27, 2023 - 11:20 AM",
      description: "Created case CSE-1237 for medication side effects report.",
      agent: "Nurse Wilson",
      caseId: "CSE-1237",
    },
    {
      id: "i6",
      type: "SMS",
      date: "March 26, 2023 - 3:45 PM",
      description: "Sent medication reminder via SMS.",
      agent: "System",
    },
    {
      id: "i7",
      type: "Feedback",
      date: "March 16, 2023 - 10:00 AM",
      description: "Patient submitted feedback on recent hospital visit. CSAT Score: 4/5",
      agent: "System",
    },
  ];

  const appointments = [
    {
      id: "a1",
      date: "April 20, 2023 - 10:30 AM",
      purpose: "Follow-up checkup",
      provider: "Dr. Robert Chen",
      department: "Cardiology",
      status: "Scheduled",
    },
    {
      id: "a2",
      date: "March 15, 2023 - 9:00 AM",
      purpose: "Post-surgery checkup",
      provider: "Dr. Robert Chen",
      department: "Cardiology",
      status: "Completed",
      notes: "Patient is recovering well from surgery. Blood pressure is now within normal range. Prescribed continued medication and scheduled a follow-up in one month."
    },
    {
      id: "a3",
      date: "February 1, 2023 - 11:15 AM",
      purpose: "Surgery",
      provider: "Dr. Elizabeth Lee",
      department: "Surgery",
      status: "Completed",
      notes: "Coronary artery bypass grafting performed successfully. Patient tolerated the procedure well. No immediate complications."
    },
  ];
  
  const medicalRecords = [
    {
      id: "m1",
      date: "March 15, 2023",
      type: "Clinical Note",
      provider: "Dr. Robert Chen",
      summary: "Post-surgery follow-up. Patient recovering well with expected progress.",
      details: "Patient reports mild discomfort at incision site but no signs of infection. Vital signs stable. Cardiac function improving based on latest echocardiogram."
    },
    {
      id: "m2",
      date: "February 1, 2023",
      type: "Procedure Note",
      provider: "Dr. Elizabeth Lee",
      summary: "Coronary artery bypass grafting. Procedure completed successfully without complications.",
      details: "Triple bypass performed using left internal mammary artery and saphenous vein grafts. Total bypass time: 112 minutes. Patient transferred to ICU in stable condition."
    },
    {
      id: "m3",
      date: "January 25, 2023",
      type: "Lab Results",
      provider: "Dr. Robert Chen",
      summary: "Pre-surgery blood work and diagnostics. All values within acceptable ranges for procedure.",
      details: "Complete blood count, metabolic panel, coagulation studies, and cardiac enzymes reviewed. All parameters acceptable for scheduled procedure."
    },
    {
      id: "m4",
      date: "January 10, 2023",
      type: "Clinical Note",
      provider: "Dr. Robert Chen",
      summary: "Initial consultation for coronary artery disease. Recommended CABG procedure.",
      details: "Patient presents with stable angina, unresponsive to medical therapy. Cardiac catheterization shows significant three-vessel disease. CABG recommended as optimal treatment strategy."
    },
  ];

  const visitHistory = [
    {
      id: "v1",
      date: "March 15, 2023",
      type: "Outpatient",
      department: "Cardiology",
      provider: "Dr. Robert Chen",
      summary: "Post-surgery follow-up visit",
      details: "Patient recovering well. Medication adjusted."
    },
    {
      id: "v2",
      date: "February 1-8, 2023",
      type: "Inpatient",
      department: "Cardiothoracic Surgery",
      provider: "Dr. Elizabeth Lee",
      summary: "Coronary artery bypass grafting",
      details: "Successful triple bypass surgery. 7-day hospital stay."
    },
    {
      id: "v3",
      date: "January 10, 2023",
      type: "Outpatient",
      department: "Cardiology",
      provider: "Dr. Robert Chen",
      summary: "Consultation",
      details: "Initial consultation for coronary artery disease."
    },
  ];

  const feedbackHistory = [
    {
      id: "f1",
      date: "March 16, 2023",
      type: "Post-Visit Survey",
      overallScore: 4.5,
      submittedFor: "Cardiology Visit (March 15, 2023)",
      responses: [
        { question: "How would you rate your overall experience?", answer: "4/5" },
        { question: "Was the doctor attentive to your concerns?", answer: "5/5" },
        { question: "How would you rate the facility cleanliness?", answer: "4/5" },
        { question: "How likely are you to recommend us to family or friends?", answer: "5/5" },
        { question: "Any additional comments?", answer: "Dr. Chen was very thorough and explained everything clearly." }
      ]
    },
    {
      id: "f2",
      date: "February 10, 2023",
      type: "Inpatient Experience",
      overallScore: 4.0,
      submittedFor: "Hospital Stay (February 1-8, 2023)",
      responses: [
        { question: "How would you rate your overall hospital stay?", answer: "4/5" },
        { question: "How would you rate the nursing care?", answer: "5/5" },
        { question: "How would you rate the food quality?", answer: "3/5" },
        { question: "How well was your pain managed?", answer: "4/5" },
        { question: "Any suggestions for improvement?", answer: "The food could be better, but the care was excellent." }
      ]
    }
  ];

  // Function to download appointment notes as PDF
  const downloadNotes = (appointmentId: string) => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "PDF Download Started",
      description: "Your appointment notes are being downloaded.",
    });
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "Call":
        return <Phone className="h-4 w-4 text-blue-500" />;
      case "Email":
        return <Mail className="h-4 w-4 text-indigo-500" />;
      case "SMS":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "Visit":
        return <MapPin className="h-4 w-4 text-purple-500" />;
      case "Case Created":
        return <ClipboardList className="h-4 w-4 text-amber-500" />;
      case "Feedback":
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Handle creating a new case
  const handleCreateCase = () => {
    toast({
      title: "Case Created",
      description: "New case has been created successfully.",
    });
    setIsCreateCaseDialogOpen(false);
  };

  // Handle scheduling/rescheduling an appointment
  const handleScheduleAppointment = () => {
    toast({
      title: "Appointment Scheduled",
      description: "The appointment has been scheduled successfully.",
    });
    setIsAppointmentDialogOpen(false);
  };
  
  const handleRescheduleAppointment = () => {
    toast({
      title: "Appointment Rescheduled",
      description: "The appointment has been rescheduled successfully.",
    });
    setIsRescheduleDialogOpen(false);
  };
  
  // Handle updating patient preferences
  const handleUpdatePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Patient preferences have been updated successfully.",
    });
    setIsEditPreferencesDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <BackNavigationHeader title="Patient Profile" />

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {patient.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              {patient.name}
              {patient.isVIP && <span className="vip-badge ml-2">VIP</span>}
              {patient.isHighRisk && (
                <Badge variant="outline" className="bg-patient-highrisk text-white border-none ml-1">
                  <AlertTriangle className="h-3 w-3 mr-1" /> High Risk
                </Badge>
              )}
            </h1>
            <div className="text-muted-foreground space-x-2">
              <span>CRN: {patient.crn}</span>
              <span>•</span>
              <span>DOB: {patient.dateOfBirth}</span>
              <span>•</span>
              <span>MRN: {patient.medicalRecordNumber}</span>
              <span>•</span>
              <span className="flex items-center"><IdCard className="h-3 w-3 mr-1" /> Health ID: {patient.healthId}</span>
            </div>
            <div className="text-muted-foreground flex gap-3 mt-1">
              <span className="flex items-center"><Phone className="h-3 w-3 mr-1" /> {patient.contactNumber}</span>
              <span className="flex items-center"><Mail className="h-3 w-3 mr-1" /> {patient.email}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button onClick={() => setIsCreateCaseDialogOpen(true)}>
            <ClipboardList className="h-4 w-4 mr-2" />
            Create Case
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="visits">Visit History</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>Personal and contact details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Full Name:</span>
                  <span className="font-medium">{patient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="font-medium">{patient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date of Birth:</span>
                  <span className="font-medium">{patient.dateOfBirth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact Number:</span>
                  <span className="font-medium">{patient.contactNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{patient.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address:</span>
                  <span className="font-medium">{patient.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Health ID:</span>
                  <span className="font-medium">{patient.healthId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration Date:</span>
                  <span className="font-medium">{patient.registrationDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  <div className="flex gap-2">
                    {patient.isVIP && <span className="vip-badge">VIP</span>}
                    {patient.isHighRisk && <span className="high-risk-badge">High Risk</span>}
                    {!patient.isVIP && !patient.isHighRisk && <span className="font-medium">Standard</span>}
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Information
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
                <CardDescription>Healthcare and insurance details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Primary Physician:</span>
                  <span className="font-medium">{patient.primaryPhysician}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Insurance Provider:</span>
                  <span className="font-medium">{patient.insuranceProvider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Policy Number:</span>
                  <span className="font-medium">{patient.insurancePolicyNumber}</span>
                </div>
                <div className="flex justify-between flex-col">
                  <span className="text-muted-foreground mb-1">Allergies:</span>
                  <div className="flex flex-wrap gap-1">
                    {patient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="secondary">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between flex-col">
                  <span className="text-muted-foreground mb-1">Chronic Conditions:</span>
                  <div className="flex flex-wrap gap-1">
                    {patient.chronicConditions.map((condition, index) => (
                      <Badge key={index} variant="secondary">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Visit:</span>
                  <span className="font-medium">{patient.lastVisit}</span>
                </div>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    View Full Medical History
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-healthcare-primary">3</div>
                  <div className="text-sm text-muted-foreground">Active Cases</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-healthcare-secondary">8</div>
                  <div className="text-sm text-muted-foreground">Total Interactions</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-healthcare-accent">3</div>
                  <div className="text-sm text-muted-foreground">Upcoming Appointments</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-healthcare-success">4/5</div>
                  <div className="text-sm text-muted-foreground">Avg. CSAT Score</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <CaseList
                  title=""
                  cases={cases.slice(0, 2)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList
                  title=""
                  tasks={tasks.filter(t => !t.completed).slice(0, 2)}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cases">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Patient Cases</CardTitle>
                <CardDescription>All cases associated with {patient.name}</CardDescription>
              </div>
              <Button onClick={() => setIsCreateCaseDialogOpen(true)}>
                <ClipboardList className="h-4 w-4 mr-2" />
                Create Case
              </Button>
            </CardHeader>
            <CardContent>
              <CaseList
                title=""
                cases={cases}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Patient Tasks</CardTitle>
                <CardDescription>All tasks associated with {patient.name}</CardDescription>
              </div>
              <Button>
                Create Task
              </Button>
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

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Interaction Timeline</CardTitle>
              <CardDescription>Complete history of patient interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-muted ml-4 pl-6 pb-2">
                {interactions.map((interaction, index) => (
                  <div key={interaction.id} className="mb-8 relative">
                    <div className="absolute -left-[38px] bg-white border border-muted rounded-full p-1 flex items-center justify-center">
                      {getInteractionIcon(interaction.type)}
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm font-medium">{interaction.type}</span>
                      <span className="text-xs text-muted-foreground">{interaction.date}</span>
                    </div>
                    <div className="mt-1 text-sm">{interaction.description}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                      <span>By: {interaction.agent}</span>
                      {interaction.caseId && <span>Case: #{interaction.caseId}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Patient Appointments</CardTitle>
                <CardDescription>Upcoming and past appointments</CardDescription>
              </div>
              <Button onClick={() => setIsAppointmentDialogOpen(true)}>
                Schedule Appointment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Upcoming Appointments</h3>
                  {appointments.filter(a => a.status === "Scheduled").length === 0 ? (
                    <div className="text-muted-foreground">No upcoming appointments</div>
                  ) : (
                    <div className="space-y-4">
                      {appointments.filter(a => a.status === "Scheduled").map(appointment => (
                        <div key={appointment.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{appointment.purpose}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {appointment.date} • {appointment.department} • {appointment.provider}
                              </div>
                            </div>
                            <Badge>{appointment.status}</Badge>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" onClick={() => setIsRescheduleDialogOpen(true)}>
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">Cancel</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-3">Past Appointments</h3>
                  <div className="space-y-4">
                    {appointments.filter(a => a.status === "Completed").map(appointment => (
                      <div key={appointment.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{appointment.purpose}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {appointment.date} • {appointment.department} • {appointment.provider}
                            </div>
                          </div>
                          <Badge variant="outline">{appointment.status}</Badge>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setIsNotesDialogOpen(true);
                            }}
                          >
                            View Notes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Healthcare information from the HIS system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalRecords.map(record => (
                  <div key={record.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{record.type}</div>
                        <div className="text-sm mt-1">
                          {record.summary}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {record.date} • {record.provider}
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Details</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{record.type} - {record.date}</DialogTitle>
                            <DialogDescription>Provider: {record.provider}</DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 space-y-4">
                            <div>
                              <h4 className="text-sm font-medium">Summary</h4>
                              <p className="mt-1">{record.summary}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Details</h4>
                              <p className="mt-1">{record.details}</p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => downloadNotes(record.id)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button variant="outline">Load More Records</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visits">
          <Card>
            <CardHeader>
              <CardTitle>Visit History</CardTitle>
              <CardDescription>Record of patient hospital/clinic visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">


import { Button } from "@/components/ui/button";
import { CaseList } from "@/components/dashboard/CaseList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CaseManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would filter the cases list
  };

  // Mock data for demonstration purposes
  const myCases = [
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

  const teamCases = [
    {
      id: "c5",
      caseId: "CSE-1238",
      subject: "Medical records transfer request",
      status: "open" as const,
      patient: { id: "p5", name: "Robert Wilson" },
      priority: "medium" as const,
      createdDate: "Apr 10, 2023",
      sla: { status: "on-track" as const, timeRemaining: "8 hours remaining" },
    },
    {
      id: "c6",
      caseId: "CSE-1239",
      subject: "Billing inquiry",
      status: "in-progress" as const,
      patient: { id: "p6", name: "Jennifer Taylor" },
      priority: "low" as const,
      createdDate: "Apr 9, 2023",
      sla: { status: "on-track" as const, timeRemaining: "3 days remaining" },
    },
    {
      id: "c7",
      caseId: "CSE-1240",
      subject: "Specialist referral request",
      status: "pending" as const,
      patient: { id: "p7", name: "James Anderson" },
      priority: "high" as const,
      createdDate: "Apr 8, 2023",
      sla: { status: "at-risk" as const, timeRemaining: "1 hour remaining" },
    },
    ...myCases,
  ];

  const handleViewCase = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage patient cases
          </p>
        </div>
        <Button>Create Case</Button>
      </div>

      <Tabs defaultValue="my-cases">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="my-cases">My Cases</TabsTrigger>
          <TabsTrigger value="team-cases">Team Cases</TabsTrigger>
        </TabsList>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cases by ID, subject, or patient..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="newest">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="sla">SLA Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="my-cases" className="mt-4">
          <CaseList
            title=""
            cases={myCases}
            onViewCase={handleViewCase}
          />
        </TabsContent>
        
        <TabsContent value="team-cases" className="mt-4">
          <CaseList
            title=""
            cases={teamCases}
            onViewCase={handleViewCase}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseManagement;

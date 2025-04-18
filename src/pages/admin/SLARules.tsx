
import { useState } from "react";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSLABadge, getPriorityBadge } from "@/components/case/CaseUtils";
import { RoleGuard } from "@/components/auth/RoleGuard";

// Sample SLA rules data
const slaRules = [
  {
    id: "1",
    name: "High Priority Resolution",
    caseTypes: ["Complaint", "Medical Emergency"],
    priority: "high",
    responseTime: "1 hour",
    resolutionTime: "4 hours",
    escalationThreshold: "2 hours",
    status: "Active",
  },
  {
    id: "2",
    name: "Medium Priority Resolution",
    caseTypes: ["Billing Issue", "Appointment Request"],
    priority: "medium",
    responseTime: "4 hours",
    resolutionTime: "24 hours",
    escalationThreshold: "12 hours",
    status: "Active",
  },
  {
    id: "3",
    name: "Low Priority Resolution",
    caseTypes: ["General Inquiry", "Feedback"],
    priority: "low",
    responseTime: "24 hours",
    resolutionTime: "72 hours",
    escalationThreshold: "48 hours",
    status: "Active",
  },
  {
    id: "4",
    name: "VIP Patient Response",
    caseTypes: ["All"],
    priority: "high",
    responseTime: "30 minutes",
    resolutionTime: "2 hours",
    escalationThreshold: "1 hour",
    status: "Active",
  },
];

// Sample escalation rules
const escalationRules = [
  {
    id: "1",
    name: "First Level Escalation",
    condition: "Response Time Breach",
    target: "Team Lead",
    notificationMethod: "Email, SMS",
    status: "Active",
  },
  {
    id: "2",
    name: "Second Level Escalation",
    condition: "Resolution Time at 75%",
    target: "Department Manager",
    notificationMethod: "Email, SMS",
    status: "Active",
  },
  {
    id: "3",
    name: "Critical Escalation",
    condition: "SLA Breach",
    target: "Hospital Director",
    notificationMethod: "Email, SMS, Phone Call",
    status: "Active",
  },
];

const AddSLARuleDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add SLA Rule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New SLA Rule</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="ruleName">Rule Name</Label>
            <Input id="ruleName" placeholder="SLA Rule Name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="caseTypes">Applicable Case Types</Label>
            <Select>
              <SelectTrigger id="caseTypes">
                <SelectValue placeholder="Select case types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Case Types</SelectItem>
                <SelectItem value="complaint">Complaint</SelectItem>
                <SelectItem value="medical-emergency">Medical Emergency</SelectItem>
                <SelectItem value="billing-issue">Billing Issue</SelectItem>
                <SelectItem value="appointment-request">Appointment Request</SelectItem>
                <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responseTime">Response Time</Label>
              <div className="flex gap-2">
                <Input id="responseTime" type="number" placeholder="Time" />
                <Select defaultValue="hours">
                  <SelectTrigger id="responseTimeUnit" className="w-24">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resolutionTime">Resolution Time</Label>
              <div className="flex gap-2">
                <Input id="resolutionTime" type="number" placeholder="Time" />
                <Select defaultValue="hours">
                  <SelectTrigger id="resolutionTimeUnit" className="w-24">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="escalationThreshold">Escalation Threshold</Label>
            <div className="flex gap-2">
              <Input id="escalationThreshold" type="number" placeholder="Time" />
              <Select defaultValue="hours">
                <SelectTrigger id="escalationThresholdUnit" className="w-24">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AddEscalationRuleDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Escalation Rule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Escalation Rule</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="escalationName">Rule Name</Label>
            <Input id="escalationName" placeholder="Escalation Rule Name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Escalation Condition</Label>
            <Select>
              <SelectTrigger id="condition">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="response-time-breach">Response Time Breach</SelectItem>
                <SelectItem value="resolution-time-75">Resolution Time at 75%</SelectItem>
                <SelectItem value="resolution-time-breach">Resolution Time Breach</SelectItem>
                <SelectItem value="sla-breach">SLA Breach</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="escalationTarget">Escalation Target</Label>
            <Select>
              <SelectTrigger id="escalationTarget">
                <SelectValue placeholder="Select target" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team-lead">Team Lead</SelectItem>
                <SelectItem value="department-manager">Department Manager</SelectItem>
                <SelectItem value="hospital-director">Hospital Director</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Notification Methods</Label>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifyEmail" className="rounded border-gray-300" />
                <Label htmlFor="notifyEmail">Email</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifySMS" className="rounded border-gray-300" />
                <Label htmlFor="notifySMS">SMS</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifyPhone" className="rounded border-gray-300" />
                <Label htmlFor="notifyPhone">Phone Call</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function SLARules() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("sla");

  return (
    <RoleGuard allowedRoles="admin" fallback={<div>You do not have permission to access this page.</div>}>
      <div className="p-6">
        <BackNavigationHeader title="SLA Rules" />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h1 className="text-3xl font-bold">SLA Rules</h1>
            <p className="text-muted-foreground mt-2">
              Configure service level agreement rules and escalations
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-6 border-b">
          <Button
            variant="ghost"
            className={`pb-2 rounded-none ${
              activeTab === "sla"
                ? "border-b-2 border-primary"
                : ""
            }`}
            onClick={() => setActiveTab("sla")}
          >
            SLA Rules
          </Button>
          <Button
            variant="ghost"
            className={`pb-2 rounded-none ${
              activeTab === "escalation"
                ? "border-b-2 border-primary"
                : ""
            }`}
            onClick={() => setActiveTab("escalation")}
          >
            Escalation Rules
          </Button>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab === "sla" ? "SLA" : "escalation"} rules...`}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {activeTab === "sla" && <AddSLARuleDialog />}
          {activeTab === "escalation" && <AddEscalationRuleDialog />}
        </div>

        {activeTab === "sla" && (
          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Case Types</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Resolution Time</TableHead>
                  <TableHead>Escalation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slaRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>
                      {rule.caseTypes.map((type, index) => (
                        <span key={index}>
                          {index > 0 && ", "}
                          {type}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>{getPriorityBadge(rule.priority)}</TableCell>
                    <TableCell>{rule.responseTime}</TableCell>
                    <TableCell>{rule.resolutionTime}</TableCell>
                    <TableCell>{rule.escalationThreshold}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === "escalation" && (
          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Escalation Target</TableHead>
                  <TableHead>Notification Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {escalationRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>{rule.condition}</TableCell>
                    <TableCell>{rule.target}</TableCell>
                    <TableCell>{rule.notificationMethod}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          rule.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {rule.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}

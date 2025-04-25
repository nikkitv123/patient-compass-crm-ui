import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Eye, PencilIcon, Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in-progress" | "completed";
  dueDate: string;
  patient?: {
    id: string;
    name: string;
  };
  case?: {
    id: string;
    caseId: string;
  };
  assignee: {
    id: string;
    name: string;
  };
  completed: boolean;
}

const TaskManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogState, setDialogState] = useState<{
    mode: "create" | "edit" | "view";
    open: boolean;
    taskId?: string;
    initialData?: any;
  }>({
    mode: "create",
    open: false,
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would filter the tasks list
  };

  const myTasks: Task[] = [
    {
      id: "t1",
      title: "Follow up with patient Sarah Johnson about medication",
      description: "Call to check on side effects and compliance",
      priority: "high",
      status: "open",
      dueDate: "Today, 2:00 PM",
      patient: { id: "p1", name: "Sarah Johnson" },
      case: { id: "c1", caseId: "CSE-1234" },
      assignee: { id: "u1", name: "Dr. Jane Smith" },
      completed: false,
    },
    {
      id: "t2",
      title: "Review lab results for Michael Williams",
      priority: "medium",
      status: "in-progress",
      dueDate: "Today, 4:30 PM",
      patient: { id: "p2", name: "Michael Williams" },
      assignee: { id: "u1", name: "Dr. Jane Smith" },
      completed: false,
    },
    {
      id: "t3",
      title: "Call pharmacy about prescription refill",
      description: "Verify dosage and insurance coverage",
      priority: "medium",
      status: "open",
      dueDate: "Tomorrow, 10:00 AM",
      patient: { id: "p3", name: "David Brown" },
      case: { id: "c3", caseId: "CSE-1236" },
      assignee: { id: "u1", name: "Dr. Jane Smith" },
      completed: false,
    },
    {
      id: "t4",
      title: "Schedule follow-up appointment",
      priority: "low",
      status: "open",
      dueDate: "Tomorrow, 1:00 PM",
      patient: { id: "p4", name: "Emily Davis" },
      assignee: { id: "u1", name: "Dr. Jane Smith" },
      completed: false,
    },
    {
      id: "t5",
      title: "Update patient notes in EHR",
      priority: "low",
      status: "completed",
      dueDate: "Apr 12, 3:00 PM",
      patient: { id: "p5", name: "Robert Wilson" },
      assignee: { id: "u1", name: "Dr. Jane Smith" },
      completed: true,
    },
  ];

  const teamTasks: Task[] = [
    ...myTasks,
    {
      id: "t6",
      title: "Process insurance claim for Jennifer Taylor",
      description: "Verify forms and submit documentation",
      priority: "high",
      status: "open",
      dueDate: "Today, 3:00 PM",
      patient: { id: "p6", name: "Jennifer Taylor" },
      case: { id: "c6", caseId: "CSE-1239" },
      assignee: { id: "u2", name: "Dr. Robert Chen" },
      completed: false,
    },
    {
      id: "t7",
      title: "Schedule MRI for James Anderson",
      priority: "medium",
      status: "in-progress",
      dueDate: "Tomorrow, 9:00 AM",
      patient: { id: "p7", name: "James Anderson" },
      assignee: { id: "u3", name: "Nurse Wilson" },
      completed: false,
    },
    {
      id: "t8",
      title: "Follow up on specialist referral",
      description: "Check if appointment has been scheduled",
      priority: "low",
      status: "open",
      dueDate: "Apr 15, 11:00 AM",
      patient: { id: "p8", name: "Patricia Martinez" },
      assignee: { id: "u4", name: "Dr. Elizabeth Lee" },
      completed: false,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-healthcare-danger text-white";
      case "medium":
        return "bg-healthcare-warning text-black";
      case "low":
        return "bg-healthcare-primary text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500 text-white";
      case "in-progress":
        return "bg-indigo-500 text-white";
      case "completed":
        return "bg-green-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    toast({
      title: completed ? "Task completed" : "Task marked as incomplete",
      description: `Task ${taskId} has been updated`,
    });
  };

  const handleCreateTask = (data: any) => {
    console.log("Creating task:", data);
    toast({
      title: "Task created",
      description: "The task has been created successfully.",
    });
    setDialogState((prev) => ({ ...prev, open: false }));
  };

  const handleEditTask = (data: any) => {
    console.log("Updating task:", data);
    toast({
      title: "Task updated",
      description: "The task has been updated successfully.",
    });
    setDialogState((prev) => ({ ...prev, open: false }));
  };

  const TaskItem = ({ task }: { task: Task }) => {
    return (
      <div className="border-b last:border-0 px-6 py-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked: boolean) => {
              handleTaskComplete(task.id, !!checked);
            }}
            className="mt-1.5"
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className={cn(
                "font-medium",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={cn(
                  "rounded-md",
                  getPriorityColor(task.priority)
                )}>
                  {task.priority}
                </Badge>
                <Badge className={cn(
                  "rounded-md",
                  getStatusColor(task.status)
                )}>
                  {task.status.replace("-", " ")}
                </Badge>
              </div>
            </div>
            
            {task.description && (
              <p className={cn(
                "text-sm mt-1 text-muted-foreground",
                task.completed && "line-through"
              )}>
                {task.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-x-4 mt-2 text-sm text-muted-foreground">
              <div>Due: {task.dueDate}</div>
              {task.patient && <div>Patient: {task.patient.name}</div>}
              {task.case && <div>Case: #{task.case.caseId}</div>}
              <div>Assignee: {task.assignee.name}</div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setDialogState({
                  mode: "edit",
                  open: true,
                  taskId: task.id,
                  initialData: {
                    ...task,
                    dueDate: new Date(task.dueDate),
                  },
                })}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setDialogState({
                  mode: "view",
                  open: true,
                  taskId: task.id,
                  initialData: task,
                })}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your tasks and team tasks
          </p>
        </div>
        <Button onClick={() => setDialogState({ mode: "create", open: true })}>
          <Plus className="h-4 w-4 mr-2" />
          Create Task
        </Button>
      </div>

      <Tabs defaultValue="my-tasks">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="team-tasks">Team Tasks</TabsTrigger>
        </TabsList>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tasks by title or patient..."
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
                <SelectItem value="completed">Completed</SelectItem>
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

            <Select defaultValue="due-date">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="due-date">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="my-tasks" className="mt-4">
          <Card>
            <CardHeader className="px-6 py-4 text-lg font-medium">
              My Tasks ({myTasks.length})
            </CardHeader>
            <CardContent className="p-0">
              {myTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team-tasks" className="mt-4">
          <Card>
            <CardHeader className="px-6 py-4 text-lg font-medium">
              Team Tasks ({teamTasks.length})
            </CardHeader>
            <CardContent className="p-0">
              {teamTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskManagement;

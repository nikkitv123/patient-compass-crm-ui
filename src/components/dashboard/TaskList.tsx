
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  patient?: {
    id: string;
    name: string;
  };
  dueDate: string;
  completed: boolean;
}

interface TaskListProps {
  title: string;
  description?: string;
  tasks: Task[];
  onTaskComplete?: (taskId: string, completed: boolean) => void;
}

export function TaskList({
  title,
  description,
  tasks,
  onTaskComplete,
}: TaskListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-healthcare-danger text-white";
      case "medium":
        return "bg-healthcare-warning text-black";
      case "low":
        return "bg-healthcare-secondary text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="px-6 py-3 text-center text-muted-foreground">
              No tasks found
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-start justify-between px-6 py-3 hover:bg-muted/50",
                  task.completed && "opacity-60"
                )}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={(checked: boolean) => {
                      if (onTaskComplete) {
                        onTaskComplete(task.id, checked);
                      }
                    }}
                    className="mt-0.5"
                  />
                  <div>
                    <div
                      className={cn(
                        "font-medium",
                        task.completed && "line-through"
                      )}
                    >
                      {task.title}
                    </div>
                    {task.patient && (
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Tag className="h-3 w-3 mr-1" />
                        Patient: {task.patient.name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={cn(
                      "rounded-md capitalize",
                      getPriorityColor(task.priority)
                    )}
                  >
                    {task.priority}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {task.dueDate}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TaskList } from "@/components/dashboard/TaskList";

interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  patient: { id: string; name: string };
  dueDate: string;
  completed: boolean;
}

interface TasksTabProps {
  tasks: Task[];
}

export const TasksTab = ({ tasks }: TasksTabProps) => {
  return (
    <Card className="mt-4">
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
  );
};

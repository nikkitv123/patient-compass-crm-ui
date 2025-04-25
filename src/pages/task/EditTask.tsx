
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskForm } from "@/components/task/TaskForm";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in a real app, you would fetch this from an API
  const task = {
    id: "t1",
    title: "Follow up with patient Sarah Johnson about medication",
    description: "Call to check on side effects and compliance",
    priority: "high" as const,
    status: "open" as const,
    dueDate: "2024-04-25T14:00",
    patientId: "p1",
    caseId: "c1",
    assigneeId: "u1",
  };

  const handleSubmit = (data: any) => {
    console.log("Updating task:", data);
    // In a real app, you would make an API call here
    navigate("/tasks");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm
            initialData={task}
            onSubmit={handleSubmit}
            isEditing
          />
        </CardContent>
      </Card>
    </div>
  );
}

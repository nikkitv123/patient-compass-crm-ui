
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskForm } from "@/components/task/TaskForm";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log("Creating task:", data);
    // In a real app, you would make an API call here
    navigate("/tasks");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}


import { TaskDetail } from "@/components/task/TaskDetail";
import { useParams } from "react-router-dom";

export default function ViewTask() {
  const { id } = useParams();

  // Mock data - in a real app, you would fetch this from an API
  const task = {
    id: "t1",
    title: "Follow up with patient Sarah Johnson about medication",
    description: "Call to check on side effects and compliance",
    priority: "high" as const,
    status: "open" as const,
    dueDate: "Today, 2:00 PM",
    patient: { id: "p1", name: "Sarah Johnson" },
    case: { id: "c1", caseId: "CSE-1234" },
    assignee: { id: "u1", name: "Dr. Jane Smith" },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <TaskDetail task={task} />
    </div>
  );
}

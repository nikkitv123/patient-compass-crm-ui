
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "open":
      return <Badge className="bg-blue-500 text-white">Open</Badge>;
    case "in-progress":
      return <Badge className="bg-indigo-500 text-white">In Progress</Badge>;
    case "pending":
      return <Badge className="bg-amber-500 text-white">Pending</Badge>;
    case "resolved":
      return <Badge className="bg-green-500 text-white">Resolved</Badge>;
    case "closed":
      return <Badge className="bg-gray-500 text-white">Closed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge className="bg-healthcare-danger text-white">High</Badge>;
    case "medium":
      return <Badge className="bg-healthcare-warning text-black">Medium</Badge>;
    case "low":
      return <Badge className="bg-healthcare-primary text-white">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};

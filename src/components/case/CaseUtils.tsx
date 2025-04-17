
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "open":
      return <Badge className="bg-healthcare-accent text-white font-medium px-2.5 py-1">Open</Badge>;
    case "in-progress":
      return <Badge className="bg-healthcare-secondary text-healthcare-dark font-medium px-2.5 py-1">In Progress</Badge>;
    case "pending":
      return <Badge className="bg-healthcare-warning text-black font-medium px-2.5 py-1">Pending</Badge>;
    case "resolved":
      return <Badge className="bg-healthcare-success text-white font-medium px-2.5 py-1">Resolved</Badge>;
    case "closed":
      return <Badge className="bg-gray-500 text-white font-medium px-2.5 py-1">Closed</Badge>;
    default:
      return <Badge variant="outline" className="font-medium px-2.5 py-1">{status}</Badge>;
  }
};

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge className="bg-healthcare-danger text-white font-medium px-2.5 py-1">High</Badge>;
    case "medium":
      return <Badge className="bg-healthcare-warning text-black font-medium px-2.5 py-1">Medium</Badge>;
    case "low":
      return <Badge className="bg-healthcare-primary text-white font-medium px-2.5 py-1">Low</Badge>;
    default:
      return <Badge variant="outline" className="font-medium px-2.5 py-1">{priority}</Badge>;
  }
};

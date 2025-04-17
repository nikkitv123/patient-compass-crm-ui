
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface SLAStatusProps {
  sla: {
    status: string;
    target: string;
    timeRemaining: string;
    progress: number;
  };
}

export const SLAStatusCard = ({ sla }: SLAStatusProps) => {
  const getSLAIndicator = () => {
    switch (sla.status) {
      case "on-track":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-healthcare-success" />
              <span className="text-healthcare-success font-medium">
                On Track
              </span>
              <span className="text-sm text-muted-foreground ml-auto">
                {sla.timeRemaining}
              </span>
            </div>
            <Progress
              value={sla.progress}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-healthcare-success"
            />
          </div>
        );
      case "at-risk":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-healthcare-warning" />
              <span className="text-healthcare-warning font-medium">
                At Risk
              </span>
              <span className="text-sm text-muted-foreground ml-auto">
                {sla.timeRemaining}
              </span>
            </div>
            <Progress
              value={sla.progress}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-healthcare-warning"
            />
          </div>
        );
      case "breached":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-healthcare-danger" />
              <span className="text-healthcare-danger font-medium">
                SLA Breached
              </span>
            </div>
            <Progress
              value={100}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-healthcare-danger"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">SLA Status</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {getSLAIndicator()}
        <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Target: {sla.target}</span>
        </div>
      </CardContent>
    </Card>
  );
};

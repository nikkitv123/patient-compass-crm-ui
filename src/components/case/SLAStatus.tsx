
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
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-healthcare-success" />
              <span className="text-healthcare-success font-medium">
                On Track
              </span>
              <span className="text-sm text-muted-foreground">
                {sla.timeRemaining}
              </span>
            </div>
            <Progress
              value={sla.progress}
              className="h-2 bg-muted"
              indicatorClassName="bg-healthcare-success"
            />
          </div>
        );
      case "at-risk":
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-healthcare-warning" />
              <span className="text-healthcare-warning font-medium">
                At Risk
              </span>
              <span className="text-sm text-muted-foreground">
                {sla.timeRemaining}
              </span>
            </div>
            <Progress
              value={sla.progress}
              className="h-2 bg-muted"
              indicatorClassName="bg-healthcare-warning"
            />
          </div>
        );
      case "breached":
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-healthcare-danger" />
              <span className="text-healthcare-danger font-medium">
                SLA Breached
              </span>
            </div>
            <Progress
              value={100}
              className="h-2 bg-muted"
              indicatorClassName="bg-healthcare-danger"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SLA Status</CardTitle>
      </CardHeader>
      <CardContent>
        {getSLAIndicator()}
        <div className="mt-2 text-xs text-muted-foreground">
          Target: {sla.target}
        </div>
      </CardContent>
    </Card>
  );
};

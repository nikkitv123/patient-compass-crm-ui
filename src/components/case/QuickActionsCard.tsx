
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ClockIcon, Link, MessageCircle } from "lucide-react";

export const QuickActionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full justify-start">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Patient
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <ClockIcon className="h-4 w-4 mr-2" />
          Extend SLA
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Link className="h-4 w-4 mr-2" />
          Link Related Case
        </Button>
        <Button variant="outline" className="w-full justify-start text-healthcare-danger hover:text-healthcare-danger">
          <AlertCircle className="h-4 w-4 mr-2" />
          Escalate Case
        </Button>
      </CardContent>
    </Card>
  );
};

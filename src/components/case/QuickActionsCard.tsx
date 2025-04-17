
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ClockIcon, Link, MessageCircle } from "lucide-react";

export const QuickActionsCard = () => {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <Button className="w-full justify-start bg-healthcare-primary text-white hover:bg-healthcare-dark">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Patient
        </Button>
        <Button variant="outline" className="w-full justify-start border-healthcare-primary text-healthcare-primary hover:bg-healthcare-light hover:text-healthcare-dark">
          <ClockIcon className="h-4 w-4 mr-2" />
          Extend SLA
        </Button>
        <Button variant="outline" className="w-full justify-start border-healthcare-primary text-healthcare-primary hover:bg-healthcare-light hover:text-healthcare-dark">
          <Link className="h-4 w-4 mr-2" />
          Link Related Case
        </Button>
        <Button variant="outline" className="w-full justify-start text-healthcare-danger border-healthcare-danger hover:bg-red-50 hover:text-healthcare-danger">
          <AlertCircle className="h-4 w-4 mr-2" />
          Escalate Case
        </Button>
      </CardContent>
    </Card>
  );
};

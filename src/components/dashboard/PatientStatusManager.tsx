
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserX, AlertTriangle, Search } from "lucide-react";
import { useState } from "react";
import { PatientStatusDialog } from "./PatientStatusDialog";

export const PatientStatusManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"inactive" | "deceased" | null>(null);

  const handleStatusChange = (action: "inactive" | "deceased") => {
    setSelectedAction(action);
    setIsDialogOpen(true);
  };

  const criticalPatients = [
    {
      id: "p1",
      name: "Sarah Johnson",
      status: "Critical",
      lastSeen: "2 hours ago"
    },
    {
      id: "p2",
      name: "Michael Chen",
      status: "Stable",
      lastSeen: "1 day ago"
    },
    {
      id: "p3",
      name: "Emma Davis",
      status: "Monitoring",
      lastSeen: "3 hours ago"
    }
  ];

  return (
    <>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserX className="h-5 w-5 text-blue-600" />
            Patient Status Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1">
              <div className="grid gap-2 sm:grid-cols-3">
                {criticalPatients.map(patient => (
                  <div key={patient.id} className="flex items-center gap-2 p-2 bg-white rounded border">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{patient.name}</div>
                      <div className="text-xs text-muted-foreground">{patient.lastSeen}</div>
                    </div>
                    <Badge 
                      variant={patient.status === "Critical" ? "destructive" : "secondary"} 
                      className="text-xs"
                    >
                      {patient.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleStatusChange("inactive")}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <UserX className="h-4 w-4 mr-2" />
                Mark Inactive
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleStatusChange("deceased")}
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Mark Deceased
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <PatientStatusDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        action={selectedAction} 
      />
    </>
  );
};

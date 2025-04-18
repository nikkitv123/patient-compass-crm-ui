
import { PatientSearch, PatientSearchFilters } from "@/components/patient/PatientSearch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PatientList } from "@/components/dashboard/PatientList";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { AddPatientDialog } from "@/components/patient/AddPatientDialog";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { useUser } from "@/contexts/UserContext";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState<PatientSearchFilters>({
    searchBy: "all"
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const handleSearch = (query: string, filters: PatientSearchFilters) => {
    setSearchQuery(query);
    setSearchFilters(filters);
    
    toast({
      title: "Searching for patients",
      description: `Query: ${query} (Filter: ${filters.searchBy})`,
    });
    // In a real application, this would filter the patients list
  };

  // Mock data for demonstration purposes
  const patients = [
    {
      id: "p1",
      name: "Sarah Johnson",
      crn: "CRN-12345",
      lastInteraction: "10 minutes ago",
      isHighRisk: true,
    },
    {
      id: "p2",
      name: "Michael Williams",
      crn: "CRN-23456",
      lastInteraction: "2 hours ago",
    },
    {
      id: "p3",
      name: "David Brown",
      crn: "CRN-34567",
      lastInteraction: "Yesterday",
    },
    {
      id: "p4",
      name: "Emily Davis",
      crn: "CRN-45678",
      lastInteraction: "2 days ago",
      isVIP: true,
    },
    {
      id: "p5",
      name: "Robert Wilson",
      crn: "CRN-56789",
      lastInteraction: "5 days ago",
    },
    {
      id: "p6",
      name: "Jennifer Taylor",
      crn: "CRN-67890",
      lastInteraction: "1 week ago",
    },
    {
      id: "p7",
      name: "James Anderson",
      crn: "CRN-78901",
      lastInteraction: "2 weeks ago",
      isVIP: true,
    },
    {
      id: "p8",
      name: "Patricia Martinez",
      crn: "CRN-89012",
      lastInteraction: "3 weeks ago",
    },
    {
      id: "p9",
      name: "John Thompson",
      crn: "CRN-90123",
      lastInteraction: "1 month ago",
      isHighRisk: true,
    },
    {
      id: "p10",
      name: "Linda Garcia",
      crn: "CRN-01234",
      lastInteraction: "2 months ago",
    },
  ];

  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <div className="space-y-6">
      <BackNavigationHeader title="Patient Management" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Management</h1>
          <p className="text-muted-foreground mt-1">
            Search, view, and manage patient profiles
          </p>
        </div>
        
        {/* Only CRM users and admins can add patients */}
        <RoleGuard allowedRoles={["admin", "crm_user"]}>
          <AddPatientDialog />
        </RoleGuard>
      </div>

      {currentUser.role === "marketing" && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle>Limited Access</AlertTitle>
          <AlertDescription>
            Marketing users have view-only access to patient data for reporting purposes.
          </AlertDescription>
        </Alert>
      )}

      <PatientSearch onSearch={handleSearch} />

      <div className="bg-white rounded-lg border">
        <PatientList
          title="All Patients"
          patients={patients}
          onViewPatient={handleViewPatient}
        />
      </div>
    </div>
  );
};

export default PatientManagement;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";
import { useState } from "react";
import { PatientList } from "@/components/dashboard/PatientList";
import { useNavigate } from "react-router-dom";

const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Searching for patients",
      description: `Query: ${searchQuery}`,
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Management</h1>
          <p className="text-muted-foreground mt-1">
            Search, view, and manage patient profiles
          </p>
        </div>
        <Button>Add Patient</Button>
      </div>

      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by CRN, name, contact number, email, or National Health ID..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

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

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import PatientManagement from "./pages/PatientManagement";
import PatientProfile from "./pages/PatientProfile";
import CaseManagement from "./pages/CaseManagement";
import CaseDetail from "./pages/CaseDetail";
import TaskManagement from "./pages/TaskManagement";
import Reporting from "./pages/Reporting";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "next-themes";
import { BackNavigationHeader } from "./components/navigation/BackNavigationHeader";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } />
            <Route path="/patients" element={
              <AppLayout>
                <PatientManagement />
              </AppLayout>
            } />
            <Route path="/patients/:id" element={
              <AppLayout>
                <PatientProfile />
              </AppLayout>
            } />
            <Route path="/cases" element={
              <AppLayout>
                <CaseManagement />
              </AppLayout>
            } />
            <Route path="/cases/:id" element={
              <AppLayout>
                <CaseDetail />
              </AppLayout>
            } />
            <Route path="/tasks" element={
              <AppLayout>
                <TaskManagement />
              </AppLayout>
            } />
            <Route path="/reporting" element={
              <AppLayout>
                <Reporting />
              </AppLayout>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/doctors" element={
              <AppLayout>
                <div className="p-6">
                  <BackNavigationHeader title="Doctor Management" />
                  <h1 className="text-3xl font-bold mt-6">Doctor Management</h1>
                  <p className="text-muted-foreground mt-2">
                    Manage doctor profiles and privileges
                  </p>
                </div>
              </AppLayout>
            } />
            <Route path="/admin/teams" element={
              <AppLayout>
                <div className="p-6">
                  <BackNavigationHeader title="Team Management" />
                  <h1 className="text-3xl font-bold mt-6">Team Management</h1>
                  <p className="text-muted-foreground mt-2">
                    Manage emergency response teams
                  </p>
                </div>
              </AppLayout>
            } />
            <Route path="/admin/notifications" element={
              <AppLayout>
                <div className="p-6">
                  <BackNavigationHeader title="Notification Management" />
                  <h1 className="text-3xl font-bold mt-6">Notifications</h1>
                  <p className="text-muted-foreground mt-2">
                    Manage notification templates and delivery
                  </p>
                </div>
              </AppLayout>
            } />
            <Route path="/admin/templates" element={
              <AppLayout>
                <div className="p-6">
                  <BackNavigationHeader title="Template Management" />
                  <h1 className="text-3xl font-bold mt-6">Templates</h1>
                  <p className="text-muted-foreground mt-2">
                    Manage task and feedback templates
                  </p>
                </div>
              </AppLayout>
            } />
            <Route path="/admin/case-config" element={
              <AppLayout>
                <div className="p-6">
                  <BackNavigationHeader title="Case Configuration" />
                  <h1 className="text-3xl font-bold mt-6">Case Configuration</h1>
                  <p className="text-muted-foreground mt-2">
                    Manage case types, statuses, and priorities
                  </p>
                </div>
              </AppLayout>
            } />
            <Route path="/admin/sla-rules" element={
              <AppLayout>
                <div className="p-6">
                  <BackNavigationHeader title="SLA Rules" />
                  <h1 className="text-3xl font-bold mt-6">SLA Rules</h1>
                  <p className="text-muted-foreground mt-2">
                    Configure service level agreement rules and escalations
                  </p>
                </div>
              </AppLayout>
            } />
            <Route path="/admin/settings" element={
              <AppLayout>
                <div className="p-6">
                  <BackNavigationHeader title="System Settings" />
                  <h1 className="text-3xl font-bold mt-6">System Settings</h1>
                  <p className="text-muted-foreground mt-2">
                    Configure global CRM system settings
                  </p>
                </div>
              </AppLayout>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

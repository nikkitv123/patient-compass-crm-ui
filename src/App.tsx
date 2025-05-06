
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
import Messages from "./pages/Messages";
import Reporting from "./pages/Reporting";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "next-themes";
import { BackNavigationHeader } from "./components/navigation/BackNavigationHeader";
import { UserProvider } from "./contexts/UserContext";

// Admin pages
import DoctorManagement from "./pages/admin/DoctorManagement";
import TeamManagement from "./pages/admin/TeamManagement";
import NotificationTemplates from "./pages/admin/NotificationTemplates";
import CaseConfig from "./pages/admin/CaseConfig";
import SLARules from "./pages/admin/SLARules";
import SystemSettings from "./pages/admin/SystemSettings";
import RolePermissionManager from "./pages/admin/RolePermissionManager";

import CreateTask from "./pages/task/CreateTask";
import EditTask from "./pages/task/EditTask";
import ViewTask from "./pages/task/ViewTask";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
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
              <Route path="/tasks/create" element={
                <AppLayout>
                  <CreateTask />
                </AppLayout>
              } />
              <Route path="/tasks/:id" element={
                <AppLayout>
                  <ViewTask />
                </AppLayout>
              } />
              <Route path="/tasks/:id/edit" element={
                <AppLayout>
                  <EditTask />
                </AppLayout>
              } />
              <Route path="/messages" element={
                <AppLayout>
                  <Messages />
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
                  <DoctorManagement />
                </AppLayout>
              } />
              <Route path="/admin/teams" element={
                <AppLayout>
                  <TeamManagement />
                </AppLayout>
              } />
              <Route path="/admin/notifications" element={
                <AppLayout>
                  <NotificationTemplates />
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
                  <CaseConfig />
                </AppLayout>
              } />
              <Route path="/admin/sla-rules" element={
                <AppLayout>
                  <SLARules />
                </AppLayout>
              } />
              <Route path="/admin/settings" element={
                <AppLayout>
                  <SystemSettings />
                </AppLayout>
              } />
              <Route path="/admin/role-permissions" element={
                <AppLayout>
                  <RolePermissionManager />
                </AppLayout>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

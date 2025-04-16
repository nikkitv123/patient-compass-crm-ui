
import { ThemeProvider } from "next-themes";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

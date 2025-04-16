
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Activity,
  BarChart3,
  Calendar,
  ClipboardList,
  Home,
  LogOut,
  Search,
  Settings,
  UserCircle,
  Users,
  // Admin icons
  UserCog,
  Shield,
  Bell,
  FileText,
  Megaphone,
  List,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLogoutConfirmation } from "@/hooks/useLogoutConfirmation";

type NavItem = {
  title: string;
  icon: React.ElementType;
  url: string;
};

const primaryNavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Patients",
    icon: Users,
    url: "/patients",
  },
  {
    title: "Cases",
    icon: ClipboardList,
    url: "/cases",
  },
  {
    title: "Tasks",
    icon: Calendar,
    url: "/tasks",
  },
  {
    title: "Reporting",
    icon: BarChart3,
    url: "/reporting",
  },
];

// Administration items for admin users only
const adminNavItems: NavItem[] = [
  {
    title: "Doctor Management",
    icon: UserCog,
    url: "/admin/doctors",
  },
  {
    title: "Team Management",
    icon: Shield,
    url: "/admin/teams",
  },
  {
    title: "Notifications",
    icon: Bell,
    url: "/admin/notifications",
  },
  {
    title: "Templates",
    icon: FileText,
    url: "/admin/templates",
  },
  {
    title: "Case Config",
    icon: List,
    url: "/admin/case-config",
  },
  {
    title: "SLA Rules",
    icon: Clock,
    url: "/admin/sla-rules",
  },
  {
    title: "System Settings",
    icon: Settings,
    url: "/admin/settings",
  },
];

export function SidebarNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { showLogoutConfirmation } = useLogoutConfirmation();
  
  // Set initial active item based on current location
  const [activeItem, setActiveItem] = useState<string>(location.pathname);
  
  // Mock user type - in a real app, this would come from authentication
  const isAdmin = false; // Toggle this to true to see admin view

  const handleLogout = () => {
    showLogoutConfirmation();
  };

  const handleNavigation = (url: string) => {
    setActiveItem(url);
    navigate(url);
  };

  const isActive = (url: string) => activeItem === url;

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-6">
        <div className="flex items-center">
          <Activity className="h-6 w-6 text-white" />
          <span className="ml-2 text-xl font-bold text-white">
            PatientCompass
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={cn(
                      isActive(item.url) && "bg-sidebar-accent text-white"
                    )}
                    onClick={() => handleNavigation(item.url)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={cn(
                        isActive(item.url) && "bg-sidebar-accent text-white"
                      )}
                      onClick={() => handleNavigation(item.url)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UserCircle className="h-8 w-8 text-white" />
            <div className="ml-2">
              <div className="text-sm font-semibold text-white">Dr. Jane Smith</div>
              <div className="text-xs text-sidebar-foreground/80">Cardiologist</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground/80 hover:text-white hover:bg-sidebar-accent"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

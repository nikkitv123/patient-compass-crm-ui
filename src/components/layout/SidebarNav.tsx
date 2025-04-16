
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

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

const secondaryNavItems: NavItem[] = [
  {
    title: "Administration",
    icon: Settings,
    url: "/admin",
  },
];

export function SidebarNav() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeItem, setActiveItem] = useState<string>("/");

  const handleLogout = () => {
    toast({
      title: "Logging out...",
      description: "You have been logged out successfully.",
    });
    // In a real application, this would call an API to logout
    // navigate('/login');
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

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
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

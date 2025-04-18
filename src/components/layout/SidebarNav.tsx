
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
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLogoutConfirmation } from "@/hooks/useLogoutConfirmation";
import { useUser } from "@/contexts/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = {
  title: string;
  icon: React.ElementType;
  url: string;
  roles?: Array<"admin" | "crm_user" | "doctor" | "marketing">;
};

const primaryNavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
    roles: ["admin", "crm_user", "doctor", "marketing"],
  },
  {
    title: "Patients",
    icon: Users,
    url: "/patients",
    roles: ["admin", "crm_user", "doctor"],
  },
  {
    title: "Cases",
    icon: ClipboardList,
    url: "/cases",
    roles: ["admin", "crm_user"],
  },
  {
    title: "Tasks",
    icon: Calendar,
    url: "/tasks",
    roles: ["admin", "crm_user"],
  },
  {
    title: "Reporting",
    icon: BarChart3,
    url: "/reporting",
    roles: ["admin", "marketing"],
  },
];

// Administration items for admin users only
const adminNavItems: NavItem[] = [
  {
    title: "Doctor Management",
    icon: UserCog,
    url: "/admin/doctors",
    roles: ["admin"],
  },
  {
    title: "Team Management",
    icon: Shield,
    url: "/admin/teams",
    roles: ["admin"],
  },
  {
    title: "Notifications",
    icon: Bell,
    url: "/admin/notifications",
    roles: ["admin"],
  },
  {
    title: "Templates",
    icon: FileText,
    url: "/admin/templates",
    roles: ["admin"],
  },
  {
    title: "Case Config",
    icon: List,
    url: "/admin/case-config",
    roles: ["admin"],
  },
  {
    title: "SLA Rules",
    icon: Clock,
    url: "/admin/sla-rules",
    roles: ["admin"],
  },
  {
    title: "Role Permissions",
    icon: UserPlus,
    url: "/admin/role-permissions",
    roles: ["admin"],
  },
  {
    title: "System Settings",
    icon: Settings,
    url: "/admin/settings",
    roles: ["admin"],
  },
];

export function SidebarNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { showLogoutConfirmation } = useLogoutConfirmation();
  const { currentUser, switchUser, hasPermission } = useUser();
  
  // Set initial active item based on current location
  const [activeItem, setActiveItem] = useState<string>(location.pathname);

  const handleLogout = () => {
    showLogoutConfirmation();
  };

  const handleNavigation = (url: string) => {
    setActiveItem(url);
    navigate(url);
  };

  const isActive = (url: string) => activeItem === url;

  // Filter navigation items based on user role
  const filteredPrimaryNavItems = primaryNavItems.filter(
    (item) => !item.roles || hasPermission(item.roles)
  );

  const filteredAdminNavItems = adminNavItems.filter(
    (item) => !item.roles || hasPermission(item.roles)
  );

  // Only show admin section if user has access to at least one admin item
  const showAdminSection = filteredAdminNavItems.length > 0;

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
              {filteredPrimaryNavItems.map((item) => (
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

        {showAdminSection && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredAdminNavItems.map((item) => (
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
              <div className="text-sm font-semibold text-white">{currentUser.name}</div>
              <div className="text-xs text-sidebar-foreground/80">{currentUser.position}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-sidebar-foreground/80 hover:text-white hover:bg-sidebar-accent"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchUser("crm")}>
                  Switch to CRM User
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchUser("doctor")}>
                  Switch to Doctor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchUser("marketing")}>
                  Switch to Marketing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchUser("admin")}>
                  Switch to Admin
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground/80 hover:text-white hover:bg-sidebar-accent"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

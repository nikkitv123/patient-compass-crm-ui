import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Activity, BarChart3, Calendar, ChevronLeft, ChevronRight, ClipboardList, Home, LogOut, MessageCircle, Search, Settings, UserCircle, Users,
// Admin icons
UserCog, Shield, Bell, FileText, Megaphone, List, Clock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLogoutConfirmation } from "@/hooks/useLogoutConfirmation";
import { useUser } from "@/contexts/UserContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
type NavItem = {
  title: string;
  icon: React.ElementType;
  url: string;
  roles?: Array<"admin" | "crm_user" | "doctor" | "marketing">;
};
const primaryNavItems: NavItem[] = [{
  title: "Dashboard",
  icon: Home,
  url: "/",
  roles: ["admin", "crm_user", "doctor", "marketing"]
}, {
  title: "Patients",
  icon: Users,
  url: "/patients",
  roles: ["admin", "crm_user", "doctor"]
}, {
  title: "Cases",
  icon: ClipboardList,
  url: "/cases",
  roles: ["admin", "crm_user"]
}, {
  title: "Tasks",
  icon: Calendar,
  url: "/tasks",
  roles: ["admin", "crm_user"]
}, {
  title: "Messages",
  icon: MessageCircle,
  url: "/messages",
  roles: ["admin", "crm_user", "doctor", "marketing"]
}, {
  title: "Reporting",
  icon: BarChart3,
  url: "/reporting",
  roles: ["admin", "marketing"]
}];

// Administration items for admin users only
const adminNavItems: NavItem[] = [{
  title: "User Management",
  icon: Users,
  url: "/admin/users",
  roles: ["admin"]
}, {
  title: "Doctor Management",
  icon: UserCog,
  url: "/admin/doctors",
  roles: ["admin"]
}, {
  title: "Team Management",
  icon: Shield,
  url: "/admin/teams",
  roles: ["admin"]
}, {
  title: "Notifications",
  icon: Bell,
  url: "/admin/notifications",
  roles: ["admin"]
}, {
  title: "Templates",
  icon: FileText,
  url: "/admin/templates",
  roles: ["admin"]
}, {
  title: "Case Config",
  icon: List,
  url: "/admin/case-config",
  roles: ["admin"]
}, {
  title: "SLA Rules",
  icon: Clock,
  url: "/admin/sla-rules",
  roles: ["admin"]
}, {
  title: "Role Permissions",
  icon: UserPlus,
  url: "/admin/role-permissions",
  roles: ["admin"]
}, {
  title: "System Settings",
  icon: Settings,
  url: "/admin/settings",
  roles: ["admin"]
}];
export function SidebarNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast
  } = useToast();
  const {
    showLogoutConfirmation
  } = useLogoutConfirmation();
  const {
    currentUser,
    switchUser,
    hasPermission
  } = useUser();
  const {
    state: sidebarState,
    toggleSidebar
  } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";

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
  const filteredPrimaryNavItems = primaryNavItems.filter(item => !item.roles || hasPermission(item.roles));
  const filteredAdminNavItems = adminNavItems.filter(item => !item.roles || hasPermission(item.roles));

  // Only show admin section if user has access to at least one admin item
  const showAdminSection = filteredAdminNavItems.length > 0;
  return <Sidebar collapsible={isCollapsed ? "icon" : "none"} className="transition-all duration-300 ease-in-out">
      <SidebarHeader className="flex items-center justify-between py-6 px-3">
        <div className="flex items-center">
          <Activity className="h-6 w-6 text-white transition-transform duration-300 hover:scale-110" />
          {!isCollapsed && <span className="ml-2 text-xl font-bold text-white transition-opacity duration-300 ease-in-out">
              PatientCompass
            </span>}
        </div>
        <Button variant="ghost" size="icon" className="text-sidebar-foreground/80 hover:text-white hover:bg-sidebar-accent transition-colors duration-200" onClick={toggleSidebar} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {isCollapsed ? <ChevronRight className="h-5 w-5 transition-transform duration-200 hover:scale-110" /> : <ChevronLeft className="h-5 w-5 transition-transform duration-200 hover:scale-110" />}
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-[8px]">
        <SidebarGroup className="px-0 mx-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredPrimaryNavItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={cn("transition-all duration-200 ease-in-out hover:translate-x-1", isActive(item.url) && "bg-sidebar-accent text-white", isCollapsed && "justify-center")} onClick={() => handleNavigation(item.url)} tooltip={isCollapsed ? item.title : undefined}>
                    <item.icon className={cn("h-5 w-5 transition-transform duration-200", isActive(item.url) && "scale-110")} />
                    {!isCollapsed && <span className="transition-opacity duration-300">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {showAdminSection && <SidebarGroup>
            <SidebarGroupLabel className={cn("transition-opacity duration-300", isCollapsed && "opacity-0 h-0 overflow-hidden")}>
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredAdminNavItems.map(item => <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className={cn("transition-all duration-200 ease-in-out hover:translate-x-1", isActive(item.url) && "bg-sidebar-accent text-white", isCollapsed && "justify-center")} onClick={() => handleNavigation(item.url)} tooltip={isCollapsed ? item.title : undefined}>
                      <item.icon className={cn("h-5 w-5 transition-transform duration-200", isActive(item.url) && "scale-110")} />
                      {!isCollapsed && <span className="transition-opacity duration-300">{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 px-[6px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UserCircle className="h-8 w-8 text-white transition-transform duration-200 hover:scale-110 mx-0" />
            {!isCollapsed && <div className="ml-2 transition-opacity duration-300">
                <div className="text-sm font-semibold text-white">{currentUser.name}</div>
                <div className="text-xs text-sidebar-foreground/80">{currentUser.position}</div>
              </div>}
          </div>
          <div className={cn("flex items-center gap-2 transition-all duration-300", isCollapsed && "ml-auto flex-col")}>
            {!isCollapsed ? <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-sidebar-foreground/80 hover:text-white hover:bg-sidebar-accent transition-all duration-200 hover:scale-105">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="animate-scale-in">
                    <DropdownMenuItem onClick={() => switchUser("crm")} className="cursor-pointer transition-colors hover:translate-x-1 duration-200">
                      Switch to CRM User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => switchUser("doctor")} className="cursor-pointer transition-colors hover:translate-x-1 duration-200">
                      Switch to Doctor
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => switchUser("marketing")} className="cursor-pointer transition-colors hover:translate-x-1 duration-200">
                      Switch to Marketing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => switchUser("admin")} className="cursor-pointer transition-colors hover:translate-x-1 duration-200">
                      Switch to Admin
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" className="text-sidebar-foreground/80 hover:text-white hover:bg-sidebar-accent transition-all duration-200 hover:scale-105" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </> : <div className="flex flex-col gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-sidebar-foreground/80 hover:text-white hover:bg-sidebar-accent transition-all duration-200 hover:scale-105">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="animate-scale-in">
                    <DropdownMenuItem onClick={() => switchUser("crm")} className="cursor-pointer transition-colors hover:translate-x-1 duration-200">
                      Switch to CRM User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => switchUser("doctor")} className="cursor-pointer transition-colors hover:translate-x-1 duration-200">
                      Switch to Doctor
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => switchUser("marketing")} className="cursor-pointer transition-colors hover:translate-x-1 duration-200">
                      Switch to Marketing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => switchUser("admin")} className="cursor-pointer transition-colors hover:translate-x-1 duration-200">
                      Switch to Admin
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" className="text-sidebar-foreground/80 hover:text-white hover:bg-sidebar-accent transition-all duration-200 hover:scale-105" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>;
}
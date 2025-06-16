import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  DollarSign,
  UserCheck,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  CreditCard,
  UserCog,
  Pill
} from "lucide-react";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Cases",
    href: "/cases",
    icon: Briefcase,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Reporting",
    href: "/reporting",
    icon: BarChart3,
  },
];

const ehrNavItems = [
  {
    title: "EHR Dashboard",
    href: "/ehr",
    icon: Stethoscope,
  },
  {
    title: "Appointments",
    href: "/ehr/appointments",
    icon: Calendar,
  },
  {
    title: "Lab Results",
    href: "/ehr/lab-results",
    icon: FileText,
  },
  {
    title: "Pharmacy",
    href: "/ehr/pharmacy",
    icon: UserCheck,
  },
];

const billingNavItems = [
  {
    title: "Billing Dashboard",
    href: "/billing",
    icon: DollarSign,
  },
  {
    title: "Invoices",
    href: "/billing/invoices",
    icon: FileText,
  },
  {
    title: "Payments",
    href: "/billing/payments",
    icon: CreditCard,
  },
  {
    title: "Insurance Claims",
    href: "/billing/claims",
    icon: Briefcase,
  },
];

const hrmNavItems = [
  {
    title: "HR Dashboard",
    href: "/hrm",
    icon: UserCog,
  },
  {
    title: "Employees",
    href: "/hrm/employees",
    icon: Users,
  },
  {
    title: "Attendance",
    href: "/hrm/attendance",
    icon: Calendar,
  },
  {
    title: "Payroll",
    href: "/hrm/payroll",
    icon: DollarSign,
  },
];

const adminNavItems = [
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Doctor Management",
    href: "/admin/doctors",
    icon: UserCheck,
  },
  {
    title: "Team Management",
    href: "/admin/teams",
    icon: Users,
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function SidebarNav() {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    ehr: false,
    billing: false,
    hrm: false,
    admin: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* EHR Section */}
        <SidebarGroup>
          <Collapsible open={expandedSections.ehr} onOpenChange={() => toggleSection('ehr')}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md px-2 py-1 flex items-center justify-between">
                Electronic Health Records
                {expandedSections.ehr ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenuSub>
                  {ehrNavItems.map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                      <SidebarMenuSubButton asChild isActive={isActive(item.href)}>
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Billing Section */}
        <SidebarGroup>
          <Collapsible open={expandedSections.billing} onOpenChange={() => toggleSection('billing')}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md px-2 py-1 flex items-center justify-between">
                Billing & Finance
                {expandedSections.billing ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenuSub>
                  {billingNavItems.map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                      <SidebarMenuSubButton asChild isActive={isActive(item.href)}>
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        {/* HRM Section */}
        <SidebarGroup>
          <Collapsible open={expandedSections.hrm} onOpenChange={() => toggleSection('hrm')}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md px-2 py-1 flex items-center justify-between">
                Human Resources
                {expandedSections.hrm ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenuSub>
                  {hrmNavItems.map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                      <SidebarMenuSubButton asChild isActive={isActive(item.href)}>
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Admin Section */}
        <SidebarGroup>
          <Collapsible open={expandedSections.admin} onOpenChange={() => toggleSection('admin')}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md px-2 py-1 flex items-center justify-between">
                Administration
                {expandedSections.admin ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenuSub>
                  {adminNavItems.map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                      <SidebarMenuSubButton asChild isActive={isActive(item.href)}>
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

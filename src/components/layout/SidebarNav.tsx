import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useUser } from "@/contexts/UserContext";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckSquare,
  Calendar,
  MessageSquare,
  Mail,
  Activity,
  DollarSign,
  UserCheck,
  Pill,
  BarChart3,
  PieChart,
  Settings,
  Shield,
  UserCog,
  Building,
  Stethoscope,
  ClipboardList,
  Gavel,
  Bell,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const SidebarNav = () => {
  const { user } = useUser();
  const location = useLocation();
  
  const isAdmin = user?.role === "admin";
  
  const navigationItems = [
    {
      title: "Core Modules",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Patients", href: "/patients", icon: Users },
        { name: "Cases", href: "/cases", icon: FileText },
        { name: "Tasks", href: "/tasks", icon: CheckSquare },
        { name: "Schedule", href: "/schedule", icon: Calendar },
        { name: "Messages", href: "/messages", icon: MessageSquare },
        { name: "Email", href: "/email", icon: Mail },
      ],
    },
    {
      title: "EHR & Clinical",
      items: [
        { name: "EHR Dashboard", href: "/ehr", icon: Activity },
        { name: "Pharmacy", href: "/pharmacy", icon: Pill },
      ],
    },
    {
      title: "Business Operations",
      items: [
        { name: "Billing", href: "/billing", icon: DollarSign },
        { name: "HRM", href: "/hrm", icon: UserCheck },
      ],
    },
    {
      title: "Analytics & Reporting",
      items: [
        { name: "Reporting", href: "/reporting", icon: BarChart3 },
        { name: "Power BI", href: "/powerbi", icon: PieChart },
      ],
    },
  ] as NavSection[];

  const adminNavigationItems = [
    {
      title: "Admin Tools",
      items: [
        { name: "User Management", href: "/admin/users", icon: UserCog },
        { name: "Team Management", href: "/admin/teams", icon: Building },
        { name: "Doctor Management", href: "/admin/doctors", icon: Stethoscope },
        { name: "Role Permissions", href: "/admin/permissions", icon: Shield },
      ],
    },
    {
      title: "Configuration",
      items: [
        { name: "Case Config", href: "/admin/case-config", icon: ClipboardList },
        { name: "SLA Rules", href: "/admin/sla-rules", icon: Gavel },
        { name: "Notifications", href: "/admin/notifications", icon: Bell },
        { name: "System Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ] as NavSection[];

  return (
    <div className="flex flex-col space-y-6 w-full">
      {navigationItems.map((section, index) => (
        <div key={index} className="space-y-1">
          <h4 className="text-sm font-semibold text-gray-500">{section.title}</h4>
          <div className="space-y-1">
            {section.items.map((item, itemIndex) => (
              <NavLink
                key={itemIndex}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  )
                }
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      {isAdmin && (
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
            <span>Admin Panel</span>
            <ChevronDown className="h-4 w-4 shrink-0 ml-1" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pl-4">
            {adminNavigationItems.map((section, index) => (
              <div key={index} className="space-y-1">
                <h4 className="text-sm font-semibold text-gray-500">{section.title}</h4>
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <NavLink
                      key={itemIndex}
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900",
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                        )
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

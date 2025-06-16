
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  UserCog
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

  const NavLink = ({ item, isSubItem = false }: { item: any; isSubItem?: boolean }) => (
    <Link to={item.href}>
      <Button
        variant={location.pathname === item.href ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-2",
          isSubItem && "ml-4 w-[calc(100%-1rem)]",
          location.pathname === item.href && "bg-healthcare-primary/10 text-healthcare-primary"
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.title}
      </Button>
    </Link>
  );

  return (
    <ScrollArea className="h-full py-6 pl-6 pr-2">
      <div className="space-y-4">
        {/* Main Navigation */}
        <div>
          <h2 className="mb-2 px-2 text-lg font-semibold text-healthcare-dark">
            Main
          </h2>
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>
        </div>

        <Separator />

        {/* EHR Section */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between mb-2"
            onClick={() => toggleSection('ehr')}
          >
            <span className="font-semibold text-healthcare-dark">Electronic Health Records</span>
            {expandedSections.ehr ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          {expandedSections.ehr && (
            <div className="space-y-1">
              {ehrNavItems.map((item) => (
                <NavLink key={item.href} item={item} isSubItem />
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Billing Section */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between mb-2"
            onClick={() => toggleSection('billing')}
          >
            <span className="font-semibold text-healthcare-dark">Billing & Finance</span>
            {expandedSections.billing ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          {expandedSections.billing && (
            <div className="space-y-1">
              {billingNavItems.map((item) => (
                <NavLink key={item.href} item={item} isSubItem />
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* HRM Section */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between mb-2"
            onClick={() => toggleSection('hrm')}
          >
            <span className="font-semibold text-healthcare-dark">Human Resources</span>
            {expandedSections.hrm ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          {expandedSections.hrm && (
            <div className="space-y-1">
              {hrmNavItems.map((item) => (
                <NavLink key={item.href} item={item} isSubItem />
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Admin Section */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between mb-2"
            onClick={() => toggleSection('admin')}
          >
            <span className="font-semibold text-healthcare-dark">Administration</span>
            {expandedSections.admin ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          {expandedSections.admin && (
            <div className="space-y-1">
              {adminNavItems.map((item) => (
                <NavLink key={item.href} item={item} isSubItem />
              ))}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

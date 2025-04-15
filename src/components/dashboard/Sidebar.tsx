
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  User, Users, Briefcase, CalendarDays, CheckSquare, 
  BarChart, Settings, LayoutDashboard, LogOut, 
  FileText, DollarSign, MessageSquare, TicketCheck,
  Menu, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/clients", icon: Users, label: "Clients" },
  { path: "/leads", icon: User, label: "Leads" },
  { path: "/projects", icon: Briefcase, label: "Projects" },
  { path: "/tasks", icon: CheckSquare, label: "Tasks" },
  { path: "/calendar", icon: CalendarDays, label: "Calendar" },
  { path: "/documents", icon: FileText, label: "Documents" },
  { path: "/finance", icon: DollarSign, label: "Finance" },
  { path: "/analytics", icon: BarChart, label: "Analytics" },
  { path: "/messages", icon: MessageSquare, label: "Messages" },
  { path: "/tickets", icon: TicketCheck, label: "Support" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full bg-sidebar z-30 border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-semibold text-white">NexusCRM</h1>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} className="text-sidebar-foreground">
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex flex-col px-2 py-4 flex-1 overflow-y-auto">
        <TooltipProvider delayDuration={0}>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        collapsed ? "justify-center" : "justify-start"
                      )
                    }
                  >
                    <item.icon size={20} />
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </NavLink>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </div>

      <div className="p-3 border-t border-sidebar-border">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
              </div>
            </div>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-sidebar-foreground">
                  <LogOut size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side={collapsed ? "right" : "top"}>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

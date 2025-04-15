
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
        <div className={cn("flex flex-col flex-1 transition-all duration-300", 
          collapsed ? "ml-16" : "ml-64")}>
          <Header />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

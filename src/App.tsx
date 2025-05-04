
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Clients from "./pages/clients/Clients";
import Tasks from "./pages/tasks/Tasks";
import Calendar from "./pages/calendar/Calendar";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="nexuscrm-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Dashboard Routes */}
            <Route path="/" element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/projects" element={<Dashboard />} />
              <Route path="/leads" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/documents" element={<Dashboard />} />
              <Route path="/finance" element={<Dashboard />} />
              <Route path="/analytics" element={<Dashboard />} />
              <Route path="/messages" element={<Dashboard />} />
              <Route path="/tickets" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

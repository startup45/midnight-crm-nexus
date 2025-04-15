
import React from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BarChart2,
  DollarSign,
  LucideIcon,
  Users,
  Calendar,
  ListChecks,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import RecentActivityList from "@/components/dashboard/RecentActivityList";
import TasksOverview from "@/components/dashboard/TasksOverview";

const salesData = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 3200 },
  { name: "Apr", total: 2800 },
  { name: "May", total: 3600 },
  { name: "Jun", total: 4200 },
  { name: "Jul", total: 3800 },
  { name: "Aug", total: 4100 },
  { name: "Sep", total: 4600 },
  { name: "Oct", total: 5100 },
  { name: "Nov", total: 4800 },
  { name: "Dec", total: 5300 },
];

const clientData = [
  { name: "Jan", new: 5, active: 20 },
  { name: "Feb", new: 8, active: 25 },
  { name: "Mar", new: 12, active: 35 },
  { name: "Apr", new: 7, active: 40 },
  { name: "May", new: 10, active: 45 },
  { name: "Jun", new: 15, active: 55 },
];

const leadStatusData = [
  { name: "New", value: 30 },
  { name: "Contact Made", value: 25 },
  { name: "Demo Scheduled", value: 20 },
  { name: "Proposal Sent", value: 15 },
  { name: "Negotiation", value: 10 },
];

const COLORS = ["#8b5cf6", "#4f46e5", "#3b82f6", "#0ea5e9", "#06b6d4"];

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  iconColor: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  iconColor,
}: StatCardProps) => {
  return (
    <Card className="hover-scale">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon
          className={cn("h-4 w-4", iconColor)}
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <div
          className={cn(
            "flex items-center text-xs",
            trend === "up"
              ? "text-green-500"
              : trend === "down"
              ? "text-red-500"
              : "text-yellow-500"
          )}
        >
          {trend === "up" ? (
            <ArrowUpIcon className="mr-1 h-3 w-3" />
          ) : trend === "down" ? (
            <ArrowDownIcon className="mr-1 h-3 w-3" />
          ) : (
            <ArrowRightIcon className="mr-1 h-3 w-3" />
          )}
          <span>{trendValue} from last month</span>
        </div>
      </CardFooter>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="day" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          description="Total revenue across all clients"
          icon={DollarSign}
          trend="up"
          trendValue="20.1%"
          iconColor="text-primary"
        />
        <StatCard
          title="Active Clients"
          value="24"
          description="Clients with active projects"
          icon={Users}
          trend="up"
          trendValue="10.5%"
          iconColor="text-primary"
        />
        <StatCard
          title="Open Tasks"
          value="36"
          description="Tasks awaiting completion"
          icon={ListChecks}
          trend="down"
          trendValue="8.2%"
          iconColor="text-primary"
        />
        <StatCard
          title="Upcoming Meetings"
          value="12"
          description="Scheduled for next 7 days"
          icon={Calendar}
          trend="neutral"
          trendValue="0%"
          iconColor="text-primary"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hover-scale">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue across all clients and projects
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis
                  stroke="#888"
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", borderColor: "#333" }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 hover-scale">
          <CardHeader>
            <CardTitle>Lead Status</CardTitle>
            <CardDescription>
              Distribution of leads by current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Pie
                    data={leadStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {leadStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#222", borderColor: "#333" }}
                    formatter={(value) => [value, "Leads"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3 hover-scale">
          <CardHeader>
            <CardTitle>Client Growth</CardTitle>
            <CardDescription>
              New and active clients over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", borderColor: "#333" }}
                />
                <Bar dataKey="new" name="New Clients" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="active" name="Active Clients" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-4 hover-scale">
          <Tabs defaultValue="activity">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Overview</CardTitle>
                <TabsList>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="activity" className="m-0">
                <RecentActivityList />
              </TabsContent>
              <TabsContent value="tasks" className="m-0">
                <TasksOverview />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Track the progress of active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Website Redesign", progress: 75, client: "Acme Corp" },
                { name: "Mobile App Development", progress: 45, client: "TechStart Inc" },
                { name: "Marketing Campaign", progress: 90, client: "Global Partners" },
                { name: "ERP Implementation", progress: 30, client: "IndustryCo" },
              ].map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-medium">{project.name}</div>
                      <div className="text-xs text-muted-foreground">{project.client}</div>
                    </div>
                    <div className="text-sm">{project.progress}%</div>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Activity className="mr-2 h-4 w-4" />
              View All Projects
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

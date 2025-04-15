
import React, { useState } from "react";
import {
  Check,
  Clock,
  Plus,
  Search,
  SlidersHorizontal,
  CheckSquare,
  CalendarDays,
  ChevronDown,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskCalendar from "@/components/tasks/TaskCalendar";
import { format } from "date-fns";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "completed" | "canceled";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  project?: {
    id: string;
    name: string;
  };
  tags?: string[];
  comments?: number;
  attachments?: number;
  createdAt: string;
  completedAt?: string;
};

const statusOptions = [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Canceled", value: "canceled" },
];

const priorityOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [priorityFilters, setPriorityFilters] = useState<string[]>([]);
  const [view, setView] = useState<"list" | "board" | "calendar">("list");

  // Dummy tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Create wireframes for dashboard",
      description: "Design wireframes for the new admin dashboard layout",
      status: "completed",
      priority: "high",
      dueDate: "2023-06-20",
      assignee: {
        id: "u1",
        name: "Alex Kim",
      },
      project: {
        id: "p1",
        name: "Website Redesign",
      },
      tags: ["design", "ui"],
      comments: 5,
      attachments: 2,
      createdAt: "2023-06-15",
      completedAt: "2023-06-18",
    },
    {
      id: "2",
      title: "Implement authentication API",
      description: "Build REST API endpoints for user authentication",
      status: "in_progress",
      priority: "high",
      dueDate: "2023-06-25",
      assignee: {
        id: "u2",
        name: "Sarah Johnson",
      },
      project: {
        id: "p2",
        name: "Mobile App",
      },
      tags: ["backend", "api"],
      comments: 3,
      attachments: 1,
      createdAt: "2023-06-17",
    },
    {
      id: "3",
      title: "Write documentation for API endpoints",
      description: "Create comprehensive documentation for all API endpoints",
      status: "todo",
      priority: "medium",
      dueDate: "2023-06-30",
      assignee: {
        id: "u3",
        name: "Michael Chen",
      },
      project: {
        id: "p2",
        name: "Mobile App",
      },
      tags: ["docs", "api"],
      comments: 1,
      attachments: 0,
      createdAt: "2023-06-18",
    },
    {
      id: "4",
      title: "Fix responsive layout issues",
      description: "Address responsive layout issues on mobile devices",
      status: "todo",
      priority: "medium",
      dueDate: "2023-06-23",
      assignee: {
        id: "u1",
        name: "Alex Kim",
      },
      project: {
        id: "p1",
        name: "Website Redesign",
      },
      tags: ["bug", "frontend"],
      comments: 2,
      attachments: 1,
      createdAt: "2023-06-19",
    },
    {
      id: "5",
      title: "Create marketing assets for launch",
      description: "Design and prepare marketing materials for product launch",
      status: "in_progress",
      priority: "high",
      dueDate: "2023-06-28",
      assignee: {
        id: "u4",
        name: "Jessica Williams",
      },
      project: {
        id: "p3",
        name: "Product Launch",
      },
      tags: ["marketing", "design"],
      comments: 7,
      attachments: 4,
      createdAt: "2023-06-16",
    },
    {
      id: "6",
      title: "Customer feedback analysis",
      description: "Analyze customer feedback and identify key improvement areas",
      status: "todo",
      priority: "low",
      dueDate: "2023-07-05",
      assignee: {
        id: "u5",
        name: "David Lee",
      },
      project: {
        id: "p3",
        name: "Product Launch",
      },
      tags: ["research", "analysis"],
      comments: 2,
      attachments: 1,
      createdAt: "2023-06-19",
    },
    {
      id: "7",
      title: "Update privacy policy",
      description: "Review and update privacy policy for compliance",
      status: "canceled",
      priority: "medium",
      dueDate: "2023-06-22",
      assignee: {
        id: "u3",
        name: "Michael Chen",
      },
      project: {
        id: "p1",
        name: "Website Redesign",
      },
      tags: ["legal", "content"],
      comments: 4,
      attachments: 2,
      createdAt: "2023-06-14",
    },
  ]);

  // Filter tasks based on search query and selected filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilters.length === 0 || statusFilters.includes(task.status);

    const matchesPriority =
      priorityFilters.length === 0 || priorityFilters.includes(task.priority);

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const completeTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "completed",
              completedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const cancelTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "canceled",
            }
          : task
      )
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const priorityIcon = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <CheckSquare className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const statusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "todo":
        return <CheckSquare className="h-4 w-4 text-yellow-500" />;
      case "canceled":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const statsData = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "completed").length,
    inProgress: tasks.filter((task) => task.status === "in_progress").length,
    todo: tasks.filter((task) => task.status === "todo").length,
    canceled: tasks.filter((task) => task.status === "canceled").length,
  };

  const completionRate =
    statsData.total > 0
      ? Math.round((statsData.completed / statsData.total) * 100)
      : 0;

  const today = new Date();
  const overdueCount = tasks.filter(
    (task) =>
      task.status !== "completed" && task.status !== "canceled" && new Date(task.dueDate) < today
  ).length;

  const upcomingDeadlines = tasks
    .filter(
      (task) =>
        task.status !== "completed" &&
        task.status !== "canceled" &&
        new Date(task.dueDate) >= today &&
        new Date(task.dueDate) <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Manage and track your tasks and projects
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Task Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.total}</div>
            <p className="text-xs text-muted-foreground">Total Tasks</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completion Rate</span>
                <span className="font-medium">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="flex items-center gap-1 text-sm">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Completed: {statsData.completed}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">In Progress: {statsData.inProgress}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="text-muted-foreground">To Do: {statsData.todo}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-muted-foreground">Canceled: {statsData.canceled}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{overdueCount}</div>
            <p className="text-xs text-muted-foreground">Tasks past due date</p>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {priorityIcon(task.priority)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    {task.assignee && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback className="text-xs">
                          {getInitials(task.assignee.name)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between md:w-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter By Status</DropdownMenuLabel>
              {statusOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={statusFilters.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilters([...statusFilters, option.value]);
                    } else {
                      setStatusFilters(
                        statusFilters.filter((value) => value !== option.value)
                      );
                    }
                  }}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter By Priority</DropdownMenuLabel>
              {priorityOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={priorityFilters.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPriorityFilters([...priorityFilters, option.value]);
                    } else {
                      setPriorityFilters(
                        priorityFilters.filter((value) => value !== option.value)
                      );
                    }
                  }}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Tabs
          defaultValue="list"
          value={view}
          onValueChange={(value) => setView(value as "list" | "board" | "calendar")}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="board">Board View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </div>
          </div>

          <Card>
            <TabsContent value="list" className="m-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 w-[50px]"></th>
                      <th className="text-left p-3">Task</th>
                      <th className="text-left p-3">Priority</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Due Date</th>
                      <th className="text-left p-3">Assignee</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredTasks.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-muted-foreground">
                          No tasks found
                        </td>
                      </tr>
                    ) : (
                      filteredTasks.map((task) => (
                        <tr
                          key={task.id}
                          className={cn(
                            "hover:bg-accent/50",
                            task.status === "completed" && "opacity-60"
                          )}
                        >
                          <td className="p-3">
                            <Checkbox
                              checked={task.status === "completed"}
                              onCheckedChange={() => {
                                if (task.status !== "completed") {
                                  completeTask(task.id);
                                }
                              }}
                              disabled={task.status === "canceled"}
                            />
                          </td>
                          <td className="p-3">
                            <div className="font-medium">
                              {task.title}
                            </div>
                            {task.description && (
                              <div className="text-sm text-muted-foreground line-clamp-1">
                                {task.description}
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            <Badge
                              variant="outline"
                              className={cn(
                                "font-medium",
                                task.priority === "high"
                                  ? "border-red-500 text-red-500"
                                  : task.priority === "medium"
                                  ? "border-yellow-500 text-yellow-500"
                                  : "border-green-500 text-green-500"
                              )}
                            >
                              <span className="flex items-center">
                                {priorityIcon(task.priority)}
                                <span className="ml-1 capitalize">{task.priority}</span>
                              </span>
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge
                              variant="outline"
                              className={cn(
                                "font-medium",
                                task.status === "completed"
                                  ? "border-green-500 text-green-500"
                                  : task.status === "in_progress"
                                  ? "border-blue-500 text-blue-500"
                                  : task.status === "todo"
                                  ? "border-yellow-500 text-yellow-500"
                                  : "border-red-500 text-red-500"
                              )}
                            >
                              <span className="flex items-center">
                                {statusIcon(task.status)}
                                <span className="ml-1 capitalize">
                                  {task.status === "in_progress"
                                    ? "In Progress"
                                    : task.status.charAt(0).toUpperCase() +
                                      task.status.slice(1)}
                                </span>
                              </span>
                            </Badge>
                          </td>
                          <td className="p-3">
                            <span
                              className={cn(
                                "text-sm",
                                new Date(task.dueDate) < today &&
                                  task.status !== "completed" &&
                                  task.status !== "canceled"
                                  ? "text-red-500 font-medium"
                                  : ""
                              )}
                            >
                              {format(new Date(task.dueDate), "MMM d, yyyy")}
                            </span>
                          </td>
                          <td className="p-3">
                            {task.assignee && (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                  <AvatarImage src={task.assignee.avatar} />
                                  <AvatarFallback>
                                    {getInitials(task.assignee.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{task.assignee.name}</span>
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {task.status !== "completed" && task.status !== "canceled" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => completeTask(task.id)}
                                  className="h-8 w-8"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              {task.status !== "canceled" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => cancelTask(task.id)}
                                  className="h-8 w-8 text-destructive"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="board" className="m-0">
              <TaskBoard tasks={filteredTasks} onComplete={completeTask} onCancel={cancelTask} />
            </TabsContent>
            <TabsContent value="calendar" className="m-0">
              <TaskCalendar tasks={filteredTasks} />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default Tasks;

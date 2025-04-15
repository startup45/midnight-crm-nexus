
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const tasks = [
  {
    id: 1,
    title: "Finish client proposal for TechCorp",
    status: "completed",
    dueDate: "Jun 15, 2023",
    priority: "high",
    assignee: "Alex Kim",
  },
  {
    id: 2,
    title: "Review website design mockups",
    status: "in_progress",
    dueDate: "Jun 18, 2023",
    priority: "medium",
    assignee: "Sarah Johnson",
  },
  {
    id: 3,
    title: "Schedule meeting with new client",
    status: "pending",
    dueDate: "Jun 20, 2023",
    priority: "medium",
    assignee: "David Lee",
  },
  {
    id: 4,
    title: "Update project timeline document",
    status: "overdue",
    dueDate: "Jun 10, 2023",
    priority: "high",
    assignee: "Michael Chen",
  },
  {
    id: 5,
    title: "Prepare monthly marketing report",
    status: "pending",
    dueDate: "Jun 25, 2023",
    priority: "low",
    assignee: "Jessica Williams",
  },
];

const TasksOverview = () => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            "flex items-start space-x-3 rounded-md border p-3 transition-all hover:bg-accent/40",
            task.status === "completed" && "opacity-70"
          )}
        >
          <div className="mt-0.5">
            {task.status === "completed" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : task.status === "in_progress" ? (
              <Clock className="h-5 w-5 text-blue-500" />
            ) : task.status === "overdue" ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p
                className={cn(
                  "text-sm font-medium",
                  task.status === "completed" && "line-through"
                )}
              >
                {task.title}
              </p>
              <Badge
                variant={
                  task.priority === "high"
                    ? "destructive"
                    : task.priority === "medium"
                    ? "default"
                    : "secondary"
                }
                className="text-[10px]"
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground flex justify-between">
              <span>Assigned to {task.assignee}</span>
              <span
                className={cn(
                  task.status === "overdue" && "text-red-500 font-medium"
                )}
              >
                {task.status === "overdue" ? "Overdue: " : "Due: "}
                {task.dueDate}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksOverview;

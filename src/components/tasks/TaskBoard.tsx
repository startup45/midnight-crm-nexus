
import React from "react";
import { Task } from "@/pages/tasks/Tasks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskBoardProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onCancel: (taskId: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onComplete, onCancel }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in_progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
    { id: "canceled", title: "Canceled" },
  ];

  return (
    <div className="flex gap-4 p-4 overflow-x-auto min-h-[500px]">
      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.id);
        const today = new Date();

        return (
          <div key={column.id} className="flex-shrink-0 w-72">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-medium">{column.title}</h3>
              <Badge variant="outline">{columnTasks.length}</Badge>
            </div>

            <div className="space-y-3">
              {columnTasks.length === 0 ? (
                <div className="bg-accent/50 rounded-md p-4 text-center text-sm text-muted-foreground">
                  No tasks
                </div>
              ) : (
                columnTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={cn("p-3 shadow-sm hover:shadow-md transition-shadow")}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium line-clamp-2">{task.title}</h4>
                        {task.priority && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "ml-2 flex-shrink-0",
                              task.priority === "high"
                                ? "border-red-500 text-red-500"
                                : task.priority === "medium"
                                ? "border-yellow-500 text-yellow-500"
                                : "border-green-500 text-green-500"
                            )}
                          >
                            {task.priority}
                          </Badge>
                        )}
                      </div>

                      {task.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      {task.project && (
                        <Badge variant="secondary" className="font-normal">
                          {task.project.name}
                        </Badge>
                      )}

                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span
                            className={cn(
                              new Date(task.dueDate) < today &&
                                task.status !== "completed" &&
                                task.status !== "canceled"
                                ? "text-red-500 font-medium"
                                : ""
                            )}
                          >
                            {format(new Date(task.dueDate), "MMM d")}
                          </span>
                        </div>

                        {task.comments !== undefined && task.comments > 0 && (
                          <div className="flex items-center">
                            <MessageSquare className="h-3.5 w-3.5 mr-1" />
                            <span>{task.comments}</span>
                          </div>
                        )}

                        {task.attachments !== undefined && task.attachments > 0 && (
                          <div className="flex items-center">
                            <Paperclip className="h-3.5 w-3.5 mr-1" />
                            <span>{task.attachments}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        {task.assignee ? (
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback className="text-xs">
                                {getInitials(task.assignee.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs ml-2">{task.assignee.name}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Unassigned</span>
                        )}

                        <div className="flex gap-1">
                          {column.id !== "completed" && column.id !== "canceled" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => onComplete(task.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-500"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </Button>
                          )}
                          {column.id !== "canceled" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => onCancel(task.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-red-500"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskBoard;

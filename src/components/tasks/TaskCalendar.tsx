
import React, { useState } from "react";
import { Task } from "@/pages/tasks/Tasks";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskCalendarProps {
  tasks: Task[];
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getDayTasks = (day: Date) => {
    return tasks.filter((task) => isSameDay(new Date(task.dueDate), day));
  };

  const selectedDayTasks = date ? getDayTasks(date) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 p-4">
      <div className="lg:col-span-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full p-4 bg-secondary/20 rounded-md"
          components={{
            DayContent: (props) => {
              const dayTasks = getDayTasks(props.date);
              const hasTasksToday = dayTasks.length > 0;

              return (
                <div className="relative w-full h-full">
                  <div
                    className={cn(
                      "flex items-center justify-center h-9 w-9 rounded-full",
                      hasTasksToday && "font-bold"
                    )}
                  >
                    {props.date.getDate()}
                  </div>
                  {hasTasksToday && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                      {dayTasks.length > 2 ? (
                        <Badge
                          variant="outline"
                          className="h-1.5 rounded-full border-0 bg-primary px-1 py-0"
                        >
                          {" "}
                        </Badge>
                      ) : (
                        dayTasks.slice(0, 2).map((task, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className={cn(
                              "h-1.5 rounded-full border-0 px-1 py-0",
                              task.priority === "high"
                                ? "bg-red-500"
                                : task.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            )}
                          >
                            {" "}
                          </Badge>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            },
          }}
        />
      </div>
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="font-medium text-lg">
                {date ? format(date, "MMMM d, yyyy") : "Select a date"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedDayTasks.length} tasks due
              </p>
            </div>

            <div className="space-y-3 overflow-auto max-h-[400px]">
              {selectedDayTasks.length === 0 ? (
                <div className="text-center text-muted-foreground py-4">
                  No tasks due on this day
                </div>
              ) : (
                selectedDayTasks.map((task) => (
                  <Card key={task.id} className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{task.title}</h4>
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
                      </div>

                      {task.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                      )}

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
                        <span className="capitalize">
                          {task.status === "in_progress"
                            ? "In Progress"
                            : task.status.charAt(0).toUpperCase() +
                              task.status.slice(1)}
                        </span>
                      </Badge>

                      {task.assignee && (
                        <div className="flex items-center pt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {getInitials(task.assignee.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs ml-2">{task.assignee.name}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskCalendar;

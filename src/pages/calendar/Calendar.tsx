
import { Card } from "@/components/ui/card";
import { CalendarRange, Plus } from "lucide-react";
import TaskCalendar from "@/components/tasks/TaskCalendar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/pages/tasks/Tasks";
import { format } from "date-fns";

const Calendar = () => {
  // Mock data for calendar events - in a real app, this would come from your backend
  const mockEvents: Task[] = [
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly sync with development team",
      dueDate: new Date().toISOString(), // Convert Date to string format
      priority: "high" as "high", // Type assertion to match Task type
      status: "todo" as "todo", // Type assertion to match Task type
      assignee: {
        id: "user1", // Add required id property
        name: "John Doe",
        avatar: "/placeholder.svg"
      },
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Client Call",
      description: "Project review with client",
      dueDate: new Date(Date.now() + 86400000).toISOString(), // Convert Date to string format
      priority: "medium" as "medium", // Type assertion to match Task type
      status: "in_progress" as "in_progress", // Type assertion to match Task type
      assignee: {
        id: "user2", // Add required id property
        name: "Jane Smith",
        avatar: "/placeholder.svg"
      },
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CalendarRange className="h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
      
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="md:col-span-5">
          <Card className="p-4">
            <TaskCalendar tasks={mockEvents} />
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <Card key={event.id} className="p-3">
                  <div className="space-y-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(event.dueDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;


import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileText, MessageSquare, UserPlus, CircleCheck, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "client_added",
    user: "Sarah Johnson",
    userInitials: "SJ",
    target: "Acme Corporation",
    time: "2 hours ago",
    icon: UserPlus,
  },
  {
    id: 2,
    type: "task_completed",
    user: "Michael Chen",
    userInitials: "MC",
    target: "Website Mockup Review",
    time: "3 hours ago",
    icon: CircleCheck,
  },
  {
    id: 3,
    type: "message",
    user: "Jessica Williams",
    userInitials: "JW",
    target: "Project Timeline Discussion",
    time: "5 hours ago",
    icon: MessageSquare,
  },
  {
    id: 4,
    type: "proposal",
    user: "David Lee",
    userInitials: "DL",
    target: "Q3 Marketing Campaign",
    time: "Yesterday",
    icon: FileText,
  },
  {
    id: 5,
    type: "meeting",
    user: "Amanda Roberts",
    userInitials: "AR",
    target: "Client Onboarding Call",
    time: "Yesterday",
    icon: Clock,
  },
];

const RecentActivityList = () => {
  return (
    <div className="space-y-8">
      {activities.map((activity) => {
        const Icon = activity.icon;
        
        return (
          <div key={activity.id} className="flex">
            <div className="relative mr-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{activity.userInitials}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-background p-0.5">
                <div className="rounded-full bg-primary p-1">
                  <Icon className="h-3 w-3 text-primary-foreground" />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center text-sm">
                <span className="font-medium">{activity.user}</span>
                <span className="ml-1 text-muted-foreground">
                  {activity.type === "client_added" && "added a new client:"}
                  {activity.type === "task_completed" && "completed a task:"}
                  {activity.type === "message" && "commented on:"}
                  {activity.type === "proposal" && "created a proposal for:"}
                  {activity.type === "meeting" && "scheduled a meeting:"}
                </span>
                <span className="ml-1 font-medium">{activity.target}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-normal">
                  {activity.time}
                </Badge>
                {activity.type === "proposal" && (
                  <Badge variant="secondary" className="text-xs">
                    Proposal
                  </Badge>
                )}
                {activity.type === "meeting" && (
                  <Badge variant="secondary" className="text-xs">
                    Meeting
                  </Badge>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivityList;

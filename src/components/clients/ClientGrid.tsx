
import React from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@/pages/clients/Clients";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Briefcase, Building, DollarSign, Mail, MoreHorizontal, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ClientGridProps {
  clients: Client[];
}

const ClientGrid: React.FC<ClientGridProps> = ({ clients }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: Client["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 hover:text-green-600">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Inactive
          </Badge>
        );
      case "new":
        return (
          <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 hover:text-blue-600">
            New
          </Badge>
        );
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleCardClick = (id: string) => {
    navigate(`/clients/${id}`);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.length === 0 ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No clients found
        </div>
      ) : (
        clients.map((client) => (
          <Card
            key={client.id}
            className="hover:shadow-md transition-shadow cursor-pointer hover-scale"
            onClick={() => handleCardClick(client.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={client.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Building className="h-3.5 w-3.5 mr-1" />
                      {client.company}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 items-center">
                  {getStatusBadge(client.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pb-2">
              <div className="flex flex-col space-y-2 mt-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col">
                  <div className="text-muted-foreground text-xs">Projects</div>
                  <div className="flex items-center mt-1">
                    <Briefcase className="h-4 w-4 mr-1 text-primary" />
                    <span className="font-medium">
                      {client.projects}{" "}
                      {client.projects === 1 ? "project" : "projects"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-muted-foreground text-xs">Revenue</div>
                  <div className="flex items-center mt-1">
                    <DollarSign className="h-4 w-4 mr-1 text-primary" />
                    <span className="font-medium">${client.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground border-t pt-3">
              Last contact: {formatDistanceToNow(new Date(client.lastContact), { addSuffix: true })}
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default ClientGrid;

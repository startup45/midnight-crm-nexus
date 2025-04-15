
import React from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@/pages/clients/Clients";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { 
  MoreHorizontal, 
  ExternalLink, 
  FileEdit, 
  Trash2, 
  Mail, 
  Phone 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ClientListProps {
  clients: Client[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => {
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

  const handleRowClick = (id: string) => {
    navigate(`/clients/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">Projects</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Last Contact</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                No clients found
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow
                key={client.id}
                className="cursor-pointer hover:bg-accent/50"
                onClick={() => handleRowClick(client.id)}
              >
                <TableCell className="flex items-center gap-3 py-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={client.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {client.company}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(client.status)}</TableCell>
                <TableCell>
                  <div className="capitalize">
                    {client.industry}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span className="truncate max-w-[120px]">{client.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>{client.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {client.projects === 0 ? (
                    <Badge variant="outline" className="font-normal">
                      No projects
                    </Badge>
                  ) : (
                    <Badge
                      className={cn(
                        "font-normal",
                        client.projects > 1
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-secondary/50 text-secondary-foreground"
                      )}
                    >
                      {client.projects} {client.projects === 1 ? "project" : "projects"}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${client.revenue.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">
                  {formatDistanceToNow(new Date(client.lastContact), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="text-right p-0 pr-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/clients/${client.id}`);
                      }}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => e.stopPropagation()}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientList;

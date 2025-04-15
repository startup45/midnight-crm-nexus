
import React, { useState } from "react";
import {
  Building,
  ChevronDown,
  Plus,
  Search,
  SlidersHorizontal,
  UserPlus,
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
import ClientList from "@/components/clients/ClientList";
import ClientGrid from "@/components/clients/ClientGrid";
import AddClientDialog from "@/components/clients/AddClientDialog";

export type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "new";
  industry: string;
  lastContact: string;
  projects: number;
  revenue: number;
  avatar?: string;
};

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "New", value: "new" },
];

const industryOptions = [
  { label: "Technology", value: "technology" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "Retail", value: "retail" },
  { label: "Manufacturing", value: "manufacturing" },
];

const Clients = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [industryFilters, setIndustryFilters] = useState<string[]>([]);

  // Dummy clients data
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "John Smith",
      company: "Acme Corporation",
      email: "john.smith@acme.com",
      phone: "(555) 123-4567",
      status: "active",
      industry: "technology",
      lastContact: "2023-06-10",
      projects: 3,
      revenue: 45000,
    },
    {
      id: "2",
      name: "Emily Johnson",
      company: "GlobalHealth Inc.",
      email: "emily.j@globalhealth.org",
      phone: "(555) 987-6543",
      status: "active",
      industry: "healthcare",
      lastContact: "2023-06-05",
      projects: 2,
      revenue: 75000,
    },
    {
      id: "3",
      name: "Michael Davis",
      company: "FinTech Solutions",
      email: "mdavis@fintech.com",
      phone: "(555) 555-5555",
      status: "inactive",
      industry: "finance",
      lastContact: "2023-05-20",
      projects: 0,
      revenue: 125000,
    },
    {
      id: "4",
      name: "Sarah Miller",
      company: "EduLearn Academy",
      email: "sarah@edulearn.edu",
      phone: "(555) 222-3333",
      status: "new",
      industry: "education",
      lastContact: "2023-06-12",
      projects: 1,
      revenue: 15000,
    },
    {
      id: "5",
      name: "Robert Wilson",
      company: "Retail Giants Ltd.",
      email: "robert@retailgiants.com",
      phone: "(555) 111-9999",
      status: "active",
      industry: "retail",
      lastContact: "2023-06-08",
      projects: 4,
      revenue: 95000,
    },
    {
      id: "6",
      name: "Lisa Brown",
      company: "Manufacturing Pro",
      email: "lbrown@manufacturingpro.com",
      phone: "(555) 444-8888",
      status: "inactive",
      industry: "manufacturing",
      lastContact: "2023-04-30",
      projects: 0,
      revenue: 55000,
    },
  ]);

  const handleAddClient = (newClient: Omit<Client, "id" | "projects" | "revenue">) => {
    const client: Client = {
      ...newClient,
      id: Date.now().toString(),
      projects: 0,
      revenue: 0,
    };
    setClients([client, ...clients]);
    setIsDialogOpen(false);
  };

  // Filter clients based on search query and selected filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      searchQuery === "" ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilters.length === 0 || statusFilters.includes(client.status);

    const matchesIndustry =
      industryFilters.length === 0 || industryFilters.includes(client.industry);

    return matchesSearch && matchesStatus && matchesIndustry;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          <p className="text-muted-foreground">
            Manage your client relationships and projects
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={() => setIsDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
          <Button variant="outline">
            <Building className="mr-2 h-4 w-4" />
            Import Clients
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search clients..."
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
              <DropdownMenuLabel>Filter By Industry</DropdownMenuLabel>
              {industryOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={industryFilters.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setIndustryFilters([...industryFilters, option.value]);
                    } else {
                      setIndustryFilters(
                        industryFilters.filter((value) => value !== option.value)
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

      <Tabs defaultValue="list" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Showing {filteredClients.length} of {clients.length} clients
          </div>
        </div>

        <Card>
          <TabsContent value="list" className="m-0">
            <ClientList clients={filteredClients} />
          </TabsContent>
          <TabsContent value="grid" className="m-0">
            <ClientGrid clients={filteredClients} />
          </TabsContent>
        </Card>
      </Tabs>

      <AddClientDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddClient={handleAddClient}
        industryOptions={industryOptions}
      />
    </div>
  );
};

export default Clients;

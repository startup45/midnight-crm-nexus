
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-3xl px-4 py-8 space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          NexusCRM
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The complete customer relationship management solution with role-based access control
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            className="w-full sm:w-auto text-lg px-8 py-6" 
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto text-lg px-8 py-6"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {[
            {
              title: "Client Management",
              description: "Manage clients, track communications, and store documents"
            },
            {
              title: "Task Tracking",
              description: "Create, assign, and track tasks with priorities and deadlines"
            },
            {
              title: "Project Management",
              description: "Organize projects, track progress, and manage resources"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-secondary/40 backdrop-blur-sm border border-secondary/30 p-6 rounded-lg hover-scale">
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="pt-8 text-sm text-muted-foreground">
          <p>For demo purposes, you can access the dashboard directly or use any email/password on the login page.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { formatDistanceToNow } from "date-fns";
import { DollarSign, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApplicationWithOpportunity {
  id: string;
  status: string;
  notes?: string;
  appliedAt?: string;
  completionPercentage?: number;
  opportunity: {
    id: string;
    title: string;
    company: string;
    type: string;
    deadline?: string;
    amount?: string;
    salary?: string;
  };
}

const statusConfig = {
  saved: {
    title: "Saved",
    color: "bg-gray-50",
    badgeColor: "bg-gray-200 text-gray-700",
    count: 0,
  },
  applying: {
    title: "Applying",
    color: "bg-yellow-50",
    badgeColor: "bg-yellow-200 text-yellow-700",
    count: 0,
  },
  applied: {
    title: "Applied",
    color: "bg-blue-50",
    badgeColor: "bg-blue-200 text-blue-700",
    count: 0,
  },
  interview: {
    title: "Interview",
    color: "bg-purple-50",
    badgeColor: "bg-purple-200 text-purple-700",
    count: 0,
  },
  accepted: {
    title: "Accepted",
    color: "bg-green-50",
    badgeColor: "bg-green-200 text-green-700",
    count: 0,
  },
  rejected: {
    title: "Rejected",
    color: "bg-red-50",
    badgeColor: "bg-red-200 text-red-700",
    count: 0,
  },
};

function ApplicationCard({ application }: { application: ApplicationWithOpportunity }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteApplicationMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/applications/${application.id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Application removed successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to remove application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "job":
        return "bg-blue-100 text-blue-800";
      case "scholarship":
        return "bg-green-100 text-green-800";
      case "internship":
        return "bg-purple-100 text-purple-800";
      case "grant":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-sm" data-testid={`application-title-${application.id}`}>
          {application.opportunity.title}
        </h4>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
          onClick={() => deleteApplicationMutation.mutate()}
          disabled={deleteApplicationMutation.isPending}
          data-testid={`button-delete-${application.id}`}
        >
          <Trash2 className="h-3 w-3 text-red-500" />
        </Button>
      </div>
      <p className="text-xs text-gray-600 mb-2">{application.opportunity.company}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          {application.opportunity.deadline && (
            <span className="text-xs text-gray-500 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Due: {new Date(application.opportunity.deadline).toLocaleDateString()}
            </span>
          )}
          {(application.opportunity.salary || application.opportunity.amount) && (
            <span className="text-xs text-gray-500 flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              {application.opportunity.salary || `$${application.opportunity.amount}`}
            </span>
          )}
          {application.appliedAt && (
            <span className="text-xs text-gray-500">
              Applied {formatDistanceToNow(new Date(application.appliedAt))} ago
            </span>
          )}
          {application.completionPercentage && application.status === 'applying' && (
            <span className="text-xs text-gray-500">
              {application.completionPercentage}% Complete
            </span>
          )}
        </div>
        <Badge className={getTypeColor(application.opportunity.type)}>
          {application.opportunity.type}
        </Badge>
      </div>
    </div>
  );
}

export default function ApplicationBoard() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["/api/applications"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Application Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {Object.keys(statusConfig).map((status) => (
              <div key={status} className="flex-shrink-0 w-80">
                <Skeleton className="h-64" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group applications by status
  const applicationsByStatus = (applications as any)?.reduce((acc: any, app: ApplicationWithOpportunity) => {
    if (!acc[app.status]) {
      acc[app.status] = [];
    }
    acc[app.status].push(app);
    return acc;
  }, {}) || {};

  // Update counts
  Object.keys(statusConfig).forEach((status) => {
    statusConfig[status as keyof typeof statusConfig].count = applicationsByStatus[status]?.length || 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle data-testid="text-application-board-title">Application Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {Object.entries(statusConfig).map(([status, config]) => (
            <div key={status} className="flex-shrink-0 w-80">
              <div className={`${config.color} rounded-lg p-4`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">{config.title}</h3>
                  <span className={`${config.badgeColor} text-xs px-2 py-1 rounded-full`}>
                    {config.count}
                  </span>
                </div>
                <div className="space-y-3" data-testid={`column-${status}`}>
                  {applicationsByStatus[status]?.map((application: ApplicationWithOpportunity) => (
                    <ApplicationCard key={application.id} application={application} />
                  ))}
                  {config.count === 0 && (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No applications in this stage
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

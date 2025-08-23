import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import {
  MapPin,
  Briefcase,
  DollarSign,
  GraduationCap,
  Calendar,
  ExternalLink,
  Plus,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface OpportunityCardProps {
  opportunity: {
    id: string;
    title: string;
    company: string;
    location?: string;
    type: string;
    salary?: string;
    amount?: string;
    deadline?: string;
    skills?: string[];
    imageUrl?: string;
    externalUrl?: string;
    createdAt: string;
  };
  showActions?: boolean;
}

export default function OpportunityCard({ opportunity, showActions = false }: OpportunityCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isApplying, setIsApplying] = useState(false);

  const createApplicationMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/applications", {
        opportunityId: opportunity.id,
        status: "saved",
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Opportunity saved to your applications!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      setIsApplying(false);
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
        description: "Failed to save opportunity. Please try again.",
        variant: "destructive",
      });
      setIsApplying(false);
    },
  });

  const handleApply = () => {
    setIsApplying(true);
    createApplicationMutation.mutate();
  };

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "job":
        return <Briefcase className="h-4 w-4" />;
      case "scholarship":
        return <GraduationCap className="h-4 w-4" />;
      case "internship":
        return <Briefcase className="h-4 w-4" />;
      case "grant":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 hover:border-primary-300 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Company/Institution Image */}
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              {opportunity.imageUrl ? (
                <img
                  src={opportunity.imageUrl}
                  alt={`${opportunity.company} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-xl font-bold">
                  {opportunity.company.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1" data-testid={`opportunity-title-${opportunity.id}`}>
                {opportunity.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{opportunity.company}</p>

              <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 mb-3">
                {opportunity.location && (
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {opportunity.location}
                  </span>
                )}
                <span className="flex items-center">
                  {getTypeIcon(opportunity.type)}
                  <span className="ml-1 capitalize">{opportunity.type}</span>
                </span>
                {(opportunity.salary || opportunity.amount) && (
                  <span className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {opportunity.salary || `$${opportunity.amount}`}
                  </span>
                )}
                {opportunity.deadline && (
                  <span className="flex items-center text-red-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    Due in {formatDistanceToNow(new Date(opportunity.deadline))}
                  </span>
                )}
              </div>

              {opportunity.skills && opportunity.skills.length > 0 && (
                <div className="flex items-center space-x-2 mb-3">
                  {opportunity.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {opportunity.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{opportunity.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <span className="text-xs text-gray-500">
              Posted {formatDistanceToNow(new Date(opportunity.createdAt))} ago
            </span>
            <Badge className={getTypeColor(opportunity.type)}>
              {opportunity.type}
            </Badge>
            
            {showActions && (
              <div className="flex space-x-2 mt-2">
                <Button
                  size="sm"
                  onClick={handleApply}
                  disabled={isApplying || createApplicationMutation.isPending}
                  data-testid={`button-save-${opportunity.id}`}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {isApplying ? "Saving..." : "Save"}
                </Button>
                {opportunity.externalUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(opportunity.externalUrl, "_blank")}
                    data-testid={`button-external-${opportunity.id}`}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

export default function ProfileCompletion() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["/api/profile"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-4 w-3/4" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate completion percentage
  const completionItems = [
    {
      label: "Basic Information",
      completed: !!(user?.firstName && user?.email),
      icon: <CheckCircle className="text-green-500 text-xs" />,
    },
    {
      label: "Education History",
      completed: !!(profile?.university && profile?.major),
      icon: profile?.university && profile?.major 
        ? <CheckCircle className="text-green-500 text-xs" />
        : <XCircle className="text-red-500 text-xs" />,
    },
    {
      label: "Work Experience",
      completed: !!profile?.experience,
      icon: profile?.experience 
        ? <CheckCircle className="text-green-500 text-xs" />
        : <AlertCircle className="text-yellow-500 text-xs" />,
    },
    {
      label: "Skills & Bio",
      completed: !!(profile?.skills?.length > 0 && profile?.bio),
      icon: (profile?.skills?.length > 0 && profile?.bio)
        ? <CheckCircle className="text-green-500 text-xs" />
        : <XCircle className="text-red-500 text-xs" />,
    },
  ];

  const completedCount = completionItems.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedCount / completionItems.length) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Profile Completion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500" data-testid="completion-percentage">
              {completionPercentage}%
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        <div className="space-y-2 text-sm">
          {completionItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2" data-testid={`completion-item-${index}`}>
              {item.icon}
              <span className="text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

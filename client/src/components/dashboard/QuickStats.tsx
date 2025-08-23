import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Send, Calendar, Clock } from "lucide-react";

export default function QuickStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  const statItems = [
    {
      title: "Applications",
      value: (stats as any)?.totalApplications || 0,
      icon: <Send className="text-primary" />,
      bgColor: "bg-primary-50",
    },
    {
      title: "Interviews",
      value: (stats as any)?.interviews || 0,
      icon: <Calendar className="text-green-600" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Deadlines",
      value: (stats as any)?.upcomingDeadlines || 0,
      icon: <Clock className="text-amber-600" />,
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statItems.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900" data-testid={`stat-${stat.title.toLowerCase()}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function UpcomingDeadlines() {
  const { data: deadlines, isLoading } = useQuery({
    queryKey: ["/api/dashboard/deadlines"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getUrgencyColor = (deadline: string) => {
    const daysUntil = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntil <= 3) return "bg-red-500";
    if (daysUntil <= 7) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines?.length > 0 ? (
            deadlines.map((item: any) => (
              <div key={item.id} className="flex items-center space-x-3" data-testid={`deadline-${item.id}`}>
                <div className={`w-2 h-2 ${getUrgencyColor(item.opportunity.deadline)} rounded-full`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.opportunity.title} - {item.opportunity.company}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Due in {formatDistanceToNow(new Date(item.opportunity.deadline))}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No upcoming deadlines</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

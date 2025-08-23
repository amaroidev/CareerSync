import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/shared/Header";
import UniversalSearch from "@/components/dashboard/UniversalSearch";
import QuickStats from "@/components/dashboard/QuickStats";
import OpportunityCard from "@/components/dashboard/OpportunityCard";
import ApplicationBoard from "@/components/dashboard/ApplicationBoard";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";
import QuickActions from "@/components/dashboard/QuickActions";
import ProfileCompletion from "@/components/dashboard/ProfileCompletion";
import MobileNavigation from "@/components/shared/MobileNavigation";
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
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
  }, [isAuthenticated, isLoading, toast]);

  const { data: recommendedOpportunities, isLoading: opportunitiesLoading } = useQuery({
    queryKey: ["/api/dashboard/recommended"],
    enabled: isAuthenticated,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-16 bg-white border-b"></div>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-96 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-welcome">
            Welcome back, {user?.firstName || 'there'}!
          </h1>
          <p className="text-gray-600">Track your applications and discover new opportunities</p>
        </div>

        {/* Universal Search */}
        <UniversalSearch />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <QuickStats />

            {/* Recommended Opportunities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
                  <button 
                    className="text-primary hover:text-primary-700 text-sm font-medium"
                    onClick={() => window.location.href = '/opportunities'}
                    data-testid="button-view-all-opportunities"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                {opportunitiesLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-32" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommendedOpportunities?.length > 0 ? (
                      recommendedOpportunities.map((opportunity: any) => (
                        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No recommended opportunities available yet.</p>
                        <p className="text-sm text-gray-400 mt-2">
                          Complete your profile to get personalized recommendations.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Application Board */}
            <ApplicationBoard />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <UpcomingDeadlines />
            <QuickActions />
            <ProfileCompletion />
          </div>
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
}

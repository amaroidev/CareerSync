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
import { PageTransition, StaggeredContainer, StaggeredItem } from "@/components/shared/PageTransition";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

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
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-16 bg-card border-b border-border"></div>
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
    <PageTransition>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-3xl font-bold text-foreground mb-2" 
              data-testid="text-welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome back, {(user as any)?.firstName || 'there'}! 👋
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Track your applications and discover new opportunities
            </motion.p>
          </motion.div>

          {/* Universal Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <UniversalSearch />
          </motion.div>

          {/* Main Grid */}
          <StaggeredContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8" delay={0.1}>
            {/* Main Content */}
            <StaggeredItem className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <QuickStats />

              {/* Recommended Opportunities */}
              <motion.div 
                className="bg-card/80 backdrop-blur-sm rounded-xl shadow-sm border border-border transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Recommended for You</h2>
                    <motion.button 
                      className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
                      onClick={() => window.location.href = '/opportunities'}
                      data-testid="button-view-all-opportunities"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View All
                    </motion.button>
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
                      {(recommendedOpportunities as any)?.length > 0 ? (
                        (recommendedOpportunities as any).map((opportunity: any, index: number) => (
                          <motion.div
                            key={opportunity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                          >
                            <OpportunityCard opportunity={opportunity} />
                          </motion.div>
                        ))
                      ) : (
                        <motion.div 
                          className="text-center py-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <p className="text-muted-foreground">No recommended opportunities available yet.</p>
                          <p className="text-sm text-muted-foreground/70 mt-2">
                            Complete your profile to get personalized recommendations.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Application Board */}
              <ApplicationBoard />
            </StaggeredItem>

            {/* Sidebar */}
            <StaggeredItem className="space-y-6">
              <UpcomingDeadlines />
              <QuickActions />
              <ProfileCompletion />
            </StaggeredItem>
          </StaggeredContainer>
        </div>

        <MobileNavigation />
      </div>
    </PageTransition>
  );
}

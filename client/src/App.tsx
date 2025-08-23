import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/landing";
import About from "@/pages/about";
import Careers from "@/pages/careers";
import Blog from "@/pages/blog";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import Contact from "@/pages/contact";
import Dashboard from "@/pages/dashboard";
import Opportunities from "@/pages/opportunities";
import Applications from "@/pages/applications";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";
import SignIn from "@/pages/auth/signin";
import SignUp from "@/pages/auth/signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Protected route component
function ProtectedRoute({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!isAuthenticated) {
    return <Redirect to="/signin" />;
  }

  return <>{children}</>;
}

// Public route component
function PublicRoute({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Switch>
        {/* Public routes */}
        <Route path="/" component={Landing} />
        
        <Route path="/signin">
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        </Route>

        <Route path="/signup">
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        </Route>
        
  <Route path="/about" component={About} />
  <Route path="/careers" component={Careers} />
  <Route path="/blog" component={Blog} />
  <Route path="/privacy" component={Privacy} />
  <Route path="/terms" component={Terms} />
  <Route path="/cookies" component={Cookies} />
  <Route path="/contact" component={Contact} />
        
        <Route path="/ForgetPassword">
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        </Route>
        
        {/* Protected routes */}
        <Route path="/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Route>
        
        <Route path="/opportunities">
          <ProtectedRoute>
            <Opportunities />
          </ProtectedRoute>
        </Route>
        
        <Route path="/applications">
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        </Route>
        
        <Route path="/profile">
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        </Route>
        
        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

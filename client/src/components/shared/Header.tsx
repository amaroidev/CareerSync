import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Compass, Bell, User, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function Header() {
  const [location] = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/", current: location === "/" },
    { name: "Opportunities", href: "/opportunities", current: location === "/opportunities" },
    { name: "Applications", href: "/applications", current: location === "/applications" },
    { name: "Profile", href: "/profile", current: location === "/profile" },
  ];

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group" data-testid="link-logo">
            <div className="flex-shrink-0 flex items-center">
              <Compass className="text-primary text-2xl mr-2 transition-transform duration-200 group-hover:rotate-12" />
              <span className="text-xl font-bold text-foreground transition-colors duration-200">CareerSync</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-1 pb-4 text-sm font-medium border-b-2 transition-all duration-200 hover:scale-105 ${
                  item.current
                    ? "text-primary border-primary"
                    : "text-muted-foreground hover:text-foreground border-transparent hover:border-border"
                }`}
                data-testid={`link-nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative transition-all duration-200 hover:scale-110 hover:bg-primary/10 dark:hover:bg-primary/20" 
              data-testid="button-notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-3 transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20" data-testid="button-user-menu">
                  <Avatar className="h-8 w-8 transition-transform duration-200 hover:scale-110">
                    <AvatarImage src={(user as any)?.profileImageUrl} alt="User avatar" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {(user as any)?.firstName?.[0]}{(user as any)?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium text-muted-foreground dark:text-foreground transition-colors duration-200">
                    {(user as any)?.firstName} {(user as any)?.lastName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-2 duration-200">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full flex items-center transition-colors duration-200" data-testid="link-profile-menu">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => window.location.href = '/api/logout'}
                  className="text-destructive focus:text-destructive transition-colors duration-200"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

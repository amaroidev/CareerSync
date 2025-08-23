import { Link, useLocation } from "wouter";
import { Home, Search, List, User } from "lucide-react";

export default function MobileNavigation() {
  const [location] = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
      current: location === "/",
    },
    {
      name: "Search",
      href: "/opportunities",
      icon: Search,
      current: location === "/opportunities",
    },
    {
      name: "Applications",
      href: "/applications",
      icon: List,
      current: location === "/applications",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      current: location === "/profile",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href}>
              <button
                className={`flex flex-col items-center p-2 transition-colors ${
                  item.current ? "text-primary" : "text-gray-400"
                }`}
                data-testid={`mobile-nav-${item.name.toLowerCase()}`}
              >
                <Icon className="text-lg" />
                <span className="text-xs mt-1">{item.name}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

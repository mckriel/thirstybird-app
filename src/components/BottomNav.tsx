import { Home, ShoppingCart, Clock, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const tabs = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ShoppingCart, label: "Cart", path: "/cart" },
    { icon: Clock, label: "Orders", path: "/orders" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="container">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 btn-press",
                  "transition-colors duration-200",
                  isActive ? "text-primary" : "text-inactive-foreground"
                )}
              >
                <Icon 
                  size={20} 
                  className={cn(
                    "mb-1 transition-all duration-200",
                    isActive && "scale-110"
                  )} 
                />
                <span className="text-xs font-medium truncate">
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
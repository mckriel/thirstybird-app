import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useVenueAuth } from "@/hooks/useVenueAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  ShoppingCart,
  MenuIcon,
  BarChart3,
  Settings,
  LogOut,
  User,
  ScanLine,
} from "lucide-react";

const sidebarItems = [
  { title: "Orders", url: "/venue-dashboard/orders", icon: ShoppingCart, permission: "orders" },
  { title: "Menu", url: "/venue-dashboard/menu", icon: MenuIcon, permission: "menu" },
  { title: "Analytics", url: "/venue-dashboard/analytics", icon: BarChart3, permission: "analytics" },
  { title: "Redemption", url: "/venue-dashboard/redemption", icon: ScanLine, permission: "redemption" },
  { title: "Settings", url: "/venue-dashboard/settings", icon: Settings, permission: "settings" },
];

function VenueSidebar() {
  const { state } = useSidebar();
  const { hasPermission } = useVenueAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  const filteredSidebarItems = sidebarItems.filter(item => 
    hasPermission(item.permission as keyof ReturnType<typeof useVenueAuth>['venueProfile']['permissions'])
  );

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon" side="left">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            {!collapsed && <span>Venue Dashboard</span>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredSidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => navigate(item.url)}
                      className={getNavCls({ isActive: isActive(item.url) })}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const VenueLayout = () => {
  const { venueProfile, signOut } = useVenueAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <VenueSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-20 flex items-center justify-between border-b px-4 md:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="min-h-[44px] min-w-[44px]" />
              <h1 className="text-lg md:text-xl text-heading">Venue Dashboard</h1>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full min-h-[44px] min-w-[44px]">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={venueProfile?.avatar_url || ""} alt={venueProfile?.display_name || ""} />
                    <AvatarFallback>
                      {venueProfile?.display_name?.charAt(0) || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-[100] bg-card border modal-elevation" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm text-label leading-none">
                      {venueProfile?.display_name || "Venue Staff"}
                    </p>
                    <p className="text-xs text-body leading-none text-inactive-foreground">
                      {venueProfile?.position || "Staff Member"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="min-h-[44px]">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default VenueLayout;
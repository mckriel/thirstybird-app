import { useEffect, useState } from "react";
import { User, Heart, Settings, Gift, CreditCard, BarChart3, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/thirstybird-logo.png";

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser, signOut } = useAuth();
  const [profile, setProfile] = useState({
    display_name: "",
    email: "",
    total_saved: 0,
    most_visited_venue: "",
    favorite_drink: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      // TODO: Replace with proper API call to fetch user profile
      if (authUser) {
        // Placeholder profile data - replace with actual API call
        setProfile({
          display_name: "John Doe", // Replace with actual data from API
          email: authUser.email || "user@example.com",
          total_saved: 250, // Replace with actual data from API
          most_visited_venue: "The Local Brewery", // Replace with actual data from API
          favorite_drink: "Craft IPA" // Replace with actual data from API
        });
      }
    };

    fetchProfile();
  }, [authUser]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      icon: BarChart3,
      label: "My Stats",
      description: "View your savings and activity",
      onClick: () => navigate("/stats")
    },
    {
      icon: Heart,
      label: "Favorites",
      description: "Your favorite venues and drinks",
      onClick: () => navigate("/favorites")
    },
    {
      icon: Gift,
      label: "Referrals",
      description: "Invite friends and earn rewards",
      onClick: () => navigate("/referrals")
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      description: "Manage your cards and payments",
      onClick: () => navigate("/payments")
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Account, notifications, and privacy",
      onClick: () => navigate("/settings")
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container pt-12 pb-8">
          <div className="flex items-center space-x-4 mb-6">
            <img src={logo} alt="ThirstyBird" className="w-12 h-12" />
            <div>
              <h1 className="text-xl font-semibold">{profile.display_name || "Welcome"}</h1>
              <p className="text-primary-foreground/80 text-sm">{profile.email}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-primary-foreground/10 rounded-lg p-4">
            <h2 className="font-semibold mb-3">Your ThirstyBird Journey</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">R{profile.total_saved}</div>
                <div className="text-sm opacity-80">Total Saved</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{profile.most_visited_venue || "Start exploring!"}</div>
                <div className="text-sm opacity-80">Most Visited</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container pt-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full bg-card rounded-lg shadow-card p-4 flex items-center space-x-4 btn-press"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground">{item.label}</h3>
                  <p className="text-sm text-foreground/60">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sign Out */}
        <div className="mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            className="w-full text-destructive hover:bg-destructive/10 btn-press"
            onClick={handleSignOut}
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
// src/pages/Index.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import WelcomeCarousel from "@/components/WelcomeCarousel";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user) {
        const hasCompletedOnboarding = localStorage.getItem(
          "thirstybird-onboarding-complete"
        );
        if (hasCompletedOnboarding) {
          navigate("/home");
        } else {
          setShowOnboarding(true);
        }
      }
    }
  }, [user, loading, navigate]);

  const handleOnboardingComplete = () => {
    localStorage.setItem("thirstybird-onboarding-complete", "true");
    navigate("/home");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">ThirstyBird</h1>
            <p className="text-muted-foreground">
              Discover amazing drinks and deals at your favorite venues
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate("/auth")}
              className="w-full"
              size="lg"
            >
              Get Started
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/venue-auth")}
              className="w-full"
              size="lg"
            >
              Venue Login
            </Button>

            <p className="text-sm text-muted-foreground">
              Sign up or sign in to continue
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <WelcomeCarousel onComplete={handleOnboardingComplete} />;
  }

  return null;
};

export default Index;


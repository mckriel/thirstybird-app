import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVenueAuth } from "@/hooks/useVenueAuth";
import { Loader2 } from "lucide-react";

interface VenueProtectedRouteProps {
  children: React.ReactNode;
}

const VenueProtectedRoute = ({ children }: VenueProtectedRouteProps) => {
  const { user, loading, venueProfile } = useVenueAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !venueProfile)) {
      navigate("/venue-auth");
    }
  }, [user, loading, venueProfile, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || !venueProfile) {
    return null;
  }

  return <>{children}</>;
};

export default VenueProtectedRoute;
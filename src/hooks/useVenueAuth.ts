import { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  email: string;
}

interface Session {
  user: User;
  access_token: string;
}

interface VenueProfile {
  id: string;
  venue_id: string;
  display_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  position: string | null;
  role?: string;
  permissions: {
    orders: boolean;
    menu: boolean;
    analytics: boolean;
    settings: boolean;
    redemption: boolean;
  };
}

export const useVenueAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [venueProfile, setVenueProfile] = useState<VenueProfile | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  const fetchVenueProfile = useCallback(async (userId: string) => {
    // TODO: Replace with API call to fetch venue profile
    console.log("Fetching venue profile for user:", userId);
    setProfileError(null);
    setVenueProfile(null);
  }, []);

  useEffect(() => {
    // TODO: Replace with API-based authentication
    setLoading(false);
  }, [fetchVenueProfile]);

  const signOut = async () => {
    setUser(null);
    setSession(null);
    setVenueProfile(null);
  };

  const isAdmin = venueProfile?.role === 'admin';
  
  const hasPermission = useCallback((permission: keyof VenueProfile['permissions']) => {
    if (isAdmin) return true; // Admins have access to everything
    return venueProfile?.permissions?.[permission] || false;
  }, [isAdmin, venueProfile?.permissions]);

  return {
    user,
    session,
    loading,
    venueProfile,
    profileError,
    signOut,
    isAuthenticated: !!user,
    isAdmin,
    hasPermission,
  };
};
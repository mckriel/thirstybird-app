import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  role?: string;
}

interface Session {
  user: User;
  access_token: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with API-based authentication
    setLoading(false);
  }, []);

  const signOut = async () => {
    setUser(null);
    setSession(null);
  };

  return {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!user,
  };
};
"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  setUser: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:3001/me", { 
        credentials: "include" // Sends the cookie automatically
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed", error);
      setUser(null);
    } finally {
      // THIS STOPS THE "Checking session" LOOP
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    setUser(null);
    // You should also call backend /logout here
    window.location.href = "/sign-in"; // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
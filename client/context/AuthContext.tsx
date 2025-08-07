import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for saved user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("dripzoid_user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        localStorage.removeItem("dripzoid_user");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("dripzoid_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("dripzoid_user");
    // Redirect to home page after logout
    window.location.href = "/";
  };

  const requireAuth = () => {
    if (!isLoggedIn) {
      // Redirect to login page
      window.location.href = "/login";
      return false;
    }
    return true;
  };

  const value: AuthContextType = {
    user,
    isLoggedIn,
    login,
    logout,
    requireAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

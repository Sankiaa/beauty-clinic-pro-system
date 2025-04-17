
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  username: string;
  role: "admin" | "user";
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string) => {
    // Hardcoded users as specified in requirements
    if (username === "admin" && password === "admin") {
      const adminUser = { username: "admin", role: "admin" as const };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return true;
    } else if (username === "user1" && password === "user1") {
      const regularUser = { username: "user1", role: "user" as const };
      setUser(regularUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(regularUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

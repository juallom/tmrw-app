import React, { useState, useCallback } from "react";
import {User} from "./types";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: VoidFunction;
};

const STORAGE_AUTHENTICATED_KEY = "STORAGE_AUTHENTICATED_KEY";
const STORAGE_AUTHENTICATED_USER = "STORAGE_AUTHENTICATED_USER";

export const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    sessionStorage.getItem(STORAGE_AUTHENTICATED_KEY) === "true"
  );
  const [user, setUser] = useState<User | null>(
    JSON.parse(sessionStorage.getItem(STORAGE_AUTHENTICATED_USER) + "")
  );

  const login = useCallback(
    (user: User) => {
      setIsAuthenticated(true);
      setUser(user);
      sessionStorage.setItem(STORAGE_AUTHENTICATED_KEY, "true");
      sessionStorage.setItem(STORAGE_AUTHENTICATED_USER, JSON.stringify(user));
    },
    [setIsAuthenticated, setUser]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.setItem(STORAGE_AUTHENTICATED_KEY, "false");
    sessionStorage.setItem(STORAGE_AUTHENTICATED_USER, "null");
  }, [setIsAuthenticated, setUser]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

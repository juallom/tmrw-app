import React, { useCallback } from "react";
import axios from "axios";

const STORAGE_JWT_KEY = 'STORAGE_JWT_KEY';

type AuthContextType = {
  jwtToken: string | null;
  signin: (token: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [jwtToken, setJwtToken] = React.useState<string | null>(localStorage.getItem(STORAGE_JWT_KEY));
  const [interceptorId, setInterceptorId] = React.useState<number | null>(null);

  const signin = useCallback((token: string) => {
    setJwtToken(token);
    localStorage.setItem(STORAGE_JWT_KEY, token);
    const interceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    setInterceptorId(interceptor);
  }, [setJwtToken, setInterceptorId]);

  const logout = useCallback(() => {
    setJwtToken(null);
    localStorage.removeItem(STORAGE_JWT_KEY);
    if (interceptorId !== null) {
      axios.interceptors.request.eject(interceptorId);
    }
    setInterceptorId(null);
  }, [setJwtToken, interceptorId, setInterceptorId]);

  return (
    <AuthContext.Provider value={{ jwtToken, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

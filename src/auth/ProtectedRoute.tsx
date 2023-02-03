import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.jwtToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

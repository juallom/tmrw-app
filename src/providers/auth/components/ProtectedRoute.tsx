import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  let { isAuthenticated } = useAuth();
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

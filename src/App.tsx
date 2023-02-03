import React from "react";
import { Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signup/SignUp";
import { Dashboard } from "./pages/dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

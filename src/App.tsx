import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./providers/auth/components/ProtectedRoute";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signup/SignUp";
import { Tasks } from "./pages/tasks/Tasks";
import { AppRoute } from "./enums/AppRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path={AppRoute.SIGNUP} element={<SignUp />} />
        <Route
          path={AppRoute.DASHBOARD}
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

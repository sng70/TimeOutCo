import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LogIn from "../../pages/login";

interface UserRoutesProps {
  path: string;
  component: React.ComponentType<any>;
  children?: React.ReactNode;
}

function UserRoutes({ path, component: Component, children }: UserRoutesProps) {
  // Sprawdź stan uwierzytelnienia z localStorage
  let isAuthenticated;
  if (localStorage.getItem("role")?.length === 64) {
    isAuthenticated = true;
  }

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LogIn />} />

      {/* Redirect to /public if the user is not authenticated */}
      {!isAuthenticated ? <Navigate to="/" /> : null}

      {/* Private route */}
      {isAuthenticated ? (
        <Route path={path} element={<Component />}>
          {children}
        </Route>
      ) : null}
    </Routes>
  );
}

export default UserRoutes;

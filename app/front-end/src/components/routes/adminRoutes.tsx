import React, { ReactNode } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LogIn from "../../pages/login";

interface AdminRoutesProps {
  path: string;
  component: React.ComponentType<any>;
  children?: ReactNode;
}

function AdminRoutes({
  path,
  component: Component,
  children,
}: AdminRoutesProps) {
  // Sprawdź stan uwierzytelnienia z localStorage
  const isAuthenticated = localStorage.getItem("role");
  let isAdmin;
  if (
    isAuthenticated ===
    "5ba48771c61dfb0c8e6c7df6db9e7d097b93b1940ab5aeeb4d8d5a630e2557f9"
  ) {
    isAdmin = true;
  }

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LogIn />} />

      {/* Redirect to /public if the user is not authenticated */}
      {!isAdmin ? <Navigate to="/" /> : null}

      {/* Private route */}
      {isAdmin ? (
        <Route path={path} element={<Component />}>
          {children}
        </Route>
      ) : null}
    </Routes>
  );
}

export default AdminRoutes;

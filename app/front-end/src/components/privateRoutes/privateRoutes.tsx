// routes/PrivateRoutes.tsx
import React, { useEffect } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes: React.FC<{
  path: string;
  element: React.ReactNode;
  allowedRoles: string[];
}> = ({ path, element, allowedRoles }) => {
  const location = useLocation();
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!name || !role || !allowedRoles.includes(role)) {
      // Jeśli nie jest zalogowany lub nie ma odpowiednich uprawnień, przekieruj na stronę logowania
      <Navigate to="/" />;
    }
  }, [name, role, location, allowedRoles]);

  if (!name || !role || !allowedRoles.includes(role)) {
    // Jeśli nie jest zalogowany lub nie ma odpowiednich uprawnień, zwróć pustą stronę
    return null;
  }

  return <Route path={path} element={element} />;
};

export default PrivateRoutes;

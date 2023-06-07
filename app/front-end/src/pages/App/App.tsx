import React from "react";
import "../login/index.css";
import ReactRoutes from "../routes/routes";
import { AuthProvider } from "react-auth-kit";

function App() {
  return (
    <>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "http:"}
      >
        <ReactRoutes />
      </AuthProvider>
    </>
  );
}

export default App;

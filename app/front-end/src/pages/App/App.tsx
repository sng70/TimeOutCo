import React from "react";
import "../login/index.css";
import ReactRoutes from "../routes/routes";
import { AuthProvider } from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
      >
        <ReactRoutes />
      </AuthProvider>
    </>
  );
}

export default App;

import React from "react";
import "../login/index.css";
import ReactRoutes from "../routes/routes";
import { AuthProvider } from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <ReactRoutes />
    </>
  );
}

export default App;

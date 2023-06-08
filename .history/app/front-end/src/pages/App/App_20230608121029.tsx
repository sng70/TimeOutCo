import React from "react";
import "../login/index.css";
import ReactRoutes from "../routes/routes";
import { AuthProvider } from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/wrongPassword" element={<WrongPassword />} />

        <Route path="" element={<NavLayout />}>
          <Route path="/home" element={<Home name="!" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/" element={<AdminSite />} />
          <Route
            path="/admin/newBrand"
            element={<AdminAddingNewBrandPanel />}
          />
          <Route path="/admin/newEmployee" element={<AddNewEmployee />} />
          <Route path="/app-history" element={<ApplicationHistory />} />
          <Route path="/application" element={<NewApplication />} />{" "}
        </Route>
      </Routes>{" "}
    </>
  );
}

export default App;

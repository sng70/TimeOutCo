import React from "react";
import "../login/index.css";
import ReactRoutes from "../routes/routes";
import { AuthProvider } from "react-auth-kit";
import ApplicationHistory from "../app-history";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard";
import Contact from "../contact";
import LogIn from "../login";
import NotFound from "../not-found";
import NewApplication from "../new-app";
import AdminAddingNewBrandPanel from "../admin-adding-new-brand-panel";
import NavLayout from "../layout/navBar";
import AdminSite from "../admin-site";
import Home from "../home/home";
import AddNewEmployee from "../add-new-employees";
import WrongPassword from "../wrongPass/index";
import Application from "../applications/[id]";
import BrandAdmin from "../brand-admin";
import BrandApplications from "../brand-admin/brandApplications";
import BrandEmployees from "../brand-admin/brandEmployees";
import BrandInfo from "../brand-admin/brandInfo";

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

      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/wrongPassword" element={<WrongPassword />} />
        <Route path="" element={<NavLayout />}>
          <Route path="/home" element={<Home name="sda" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/" element={<AdminSite />} />
          <Route
            path="/admin/newBrand"
            element={<AdminAddingNewBrandPanel />}
          />
          <Route path="/admin/newEmployee" element={<AddNewEmployee />} />

          <Route path="/app-history" element={<ApplicationHistory />}>
            <Route path="/app-history/applications">
              <Route
                path="/app-history/applications/:id"
                element={<Application />}
              />
            </Route>
          </Route>
          <Route path="/application" element={<NewApplication />} />
          <Route path="/brand-admin" element={<BrandAdmin />}>
            <Route path="/brandEmployees" element={<BrandEmployees />} />
            <Route path="/brandApplications" element={<BrandApplications />} />
            <Route path="/brandInfo" element={<BrandInfo />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

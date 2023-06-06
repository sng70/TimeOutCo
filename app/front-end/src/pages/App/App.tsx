import React from "react";
import "../login/index.css";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/wrongPassword" element={<WrongPassword />} />
        <Route path="" element={<NavLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/" element={<AdminSite />} />
          <Route
            path="/admin/newBrand"
            element={<AdminAddingNewBrandPanel />}
          />
          <Route path="/admin/newEmployee" element={<AddNewEmployee />} />

          <Route path="/app-history" element={<ApplicationHistory />} />
          <Route path="/application" element={<NewApplication />} />
          <Route path="/applications">
            <Route path=":id" element={<Application />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

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
import { RequireAuth } from "react-auth-kit";

function ReactRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/wrongPassword" element={<WrongPassword />} />

        <Route path="" element={<NavLayout />}>
          <Route
            path="/home"
            element={
              <RequireAuth loginPath={"/"}>
                <Home name="!" />
              </RequireAuth>
            }
          />
          <Route
            path="/contact"
            element={
              <RequireAuth loginPath={"/"}>
                <Contact />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth loginPath={"/"}>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/"
            element={
              <RequireAuth loginPath={"/"}>
                <AdminSite />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/newBrand"
            element={
              <RequireAuth loginPath={"/"}>
                <AdminAddingNewBrandPanel />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/newEmployee"
            element={
              <RequireAuth loginPath={"/"}>
                <AddNewEmployee />
              </RequireAuth>
            }
          />
          <Route
            path="/app-history"
            element={
              <RequireAuth loginPath={"/"}>
                <ApplicationHistory />
              </RequireAuth>
            }
          />
          <Route
            path="/application"
            element={
              <RequireAuth loginPath={"/"}>
                <NewApplication />
              </RequireAuth>
            }
          />{" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default ReactRoutes;

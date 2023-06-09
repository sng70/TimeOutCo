import ApplicationHistory from "../app-history";
import { Routes, Route } from "react-router-dom";
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
import SuccessfullyAdded from "../successfullyAdded";
import Application from "../applications/[id]";
import BrandAdmin from "../brand-admin";
import BrandApplications from "../brand-admin/brandApplications";
import BrandEmployees from "../brand-admin/brandEmployees";
import BrandInfo from "../brand-admin/brandInfo";
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
          <Route path="/added" element={<SuccessfullyAdded />} />
          <Route path="/admin/" element={<AdminSite />} />
          <Route
            path="/admin/newBrand"
            element={<AdminAddingNewBrandPanel />}
          />
          <Route path="/admin/newEmployee" element={<AddNewEmployee />} />
          <Route path="/app-history" element={<ApplicationHistory />} />
          <Route
            path="/app-history/applications/:id"
            element={<Application />}
          />
          <Route path="/application" element={<NewApplication />} />{" "}
          <Route path="/brandAdmin" element={<BrandAdmin />} />
          <Route
            path="/brandAdmin/brandApplications"
            element={<BrandApplications />}
          />
          <Route
            path="/brandAdmin/brandEmployees"
            element={<BrandEmployees />}
          />
          <Route path="/brandAdmin/brandInfo" element={<BrandInfo />} />
        </Route>
      </Routes>{" "}
    </>
  );
}

export default App;

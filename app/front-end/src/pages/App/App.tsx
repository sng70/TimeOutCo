import { Route, Routes, Navigate } from "react-router-dom";
import ApplicationHistory from "../app-history";
import Contact from "../contact";
import LogIn from "../login";
import NotFound from "../not-found";
import NewApplication from "../new-app";
import SaAddingNewBrandPanel from "../sa-adding-new-brand-panel";
import NavLayout from "../layout/navBar";
import Home from "../home/home";
import AddNewEmployee from "../brand-admin/add-new-employees";
import WrongPassword from "../wrongPass/index";
import SuccessfullyAdded from "../successfullyAdded";
import Application from "../applications/[id]";
import BrandAdmin from "../brand-admin";
import BrandApplications from "../brand-admin/brandApplications";
import BrandEmployees from "../brand-admin/brandEmployees";
import BrandInfo from "../brand-admin/brandInfo";
import SaSite from "../sa";
import BrandHolidays from "../brand-admin/addBrandHolidays";
import EditBrands from "../saEditBrand";
import EditUsers from "../saEditUsers";

// Funkcja pomocnicza do pobierania roli z Local Storage
const getRoleFromLocalStorage = (): string | null => {
  return localStorage.getItem("role");
};

interface SaRouteProps {
  children: JSX.Element;
}

const SaRoute: React.FC<SaRouteProps> = ({ children }) => {
  const isAuthenticatedSa =
    getRoleFromLocalStorage() ===
    "e086da84c7904d285d65c6479a94274e5e0f6e6e4f8a6a2c05b234736d57a419";

  return isAuthenticatedSa ? children : <Navigate to="/" />;
};

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const isAuthenticatedAdmin =
    getRoleFromLocalStorage() ===
    "5ba48771c61dfb0c8e6c7df6db9e7d097b93b1940ab5aeeb4d8d5a630e2557f9";

  return isAuthenticatedAdmin ? children : <Navigate to="/" />;
};

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = !!getRoleFromLocalStorage();

  return isAuthenticated ? children : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <>
      <Routes>
        {/**Sciezki dla wszystkich osob */}
        <Route path="/" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/wrongPassword" element={<WrongPassword />} />

        {/*Sciezki dla osob z 54a9e03ff9a76476905f45e37e10a4064641f2e073748e4f462c4e6f9ea8fcf0 lub 5ba48771c61dfb0c8e6c7df6db9e7d097b93b1940ab5aeeb4d8d5a630e2557f9 lub tym e086da84c7904d285d65c6479a94274e5e0f6e6e4f8a6a2c05b234736d57a419 w localstorage'u   */}
        <Route element={<NavLayout />}>
          <Route path="/home" element={<Home />} />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/added"
            element={
              <PrivateRoute>
                <SuccessfullyAdded />
              </PrivateRoute>
            }
          />
          <Route
            path="/app-history"
            element={
              <PrivateRoute>
                <ApplicationHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/applications/:id"
            element={
              <PrivateRoute>
                <Application />
              </PrivateRoute>
            }
          />
          <Route
            path="/application"
            element={
              <PrivateRoute>
                <NewApplication />
              </PrivateRoute>
            }
          />
          {/* To maja byc sciezki dla osob z 5ba48771c61dfb0c8e6c7df6db9e7d097b93b1940ab5aeeb4d8d5a630e2557f9 w localstorage'u */}
          <Route
            path="/brandAdmin"
            element={
              <AdminRoute>
                <BrandAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/brandAdmin/brandApplications"
            element={
              <AdminRoute>
                <BrandApplications />
              </AdminRoute>
            }
          />
          <Route
            path="/brandAdmin/brandEmployees"
            element={
              <AdminRoute>
                <BrandEmployees />
              </AdminRoute>
            }
          />
          <Route
            path="/brandAdmin/brandInfo"
            element={
              <PrivateRoute>
                <BrandInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="/brandAdmin/newEmployee"
            element={
              <AdminRoute>
                <AddNewEmployee />
              </AdminRoute>
            }
          />
          <Route
            path="/brandAdmin/brandHolidays"
            element={
              <AdminRoute>
                <BrandHolidays />
              </AdminRoute>
            }
          />
          {/**Sciezki dla osob z  e086da84c7904d285d65c6479a94274e5e0f6e6e4f8a6a2c05b234736d57a41 w localstorage'u*/}
          <Route
            path="/sa"
            element={
              <SaRoute>
                <SaSite />
              </SaRoute>
            }
          />
          <Route
            path="/sa/newBrand"
            element={
              <SaRoute>
                <SaAddingNewBrandPanel />
              </SaRoute>
            }
          />
          <Route
            path="/sa/editUsers"
            element={
              <SaRoute>
                <EditUsers />
              </SaRoute>
            }
          />
          <Route
            path="/sa/editBrands"
            element={
              <SaRoute>
                <EditBrands />
              </SaRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;

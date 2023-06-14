import React from "react";
import { Outlet, NavLink, Navigate } from "react-router-dom";
import "./NavLayout.css";

const handleLogout = () => {
  localStorage.removeItem("name");
  localStorage.removeItem("role");
  localStorage.removeItem("remember");
  localStorage.removeItem("brandId");
  localStorage.removeItem("id");

  <Navigate to="/" />;
};

function NavLayout() {
  const role = localStorage.getItem("role");
  return (
    <>
      <nav className={`navbar`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/application" className="nav-link">
              Application
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/app-history" className="nav-link">
              Application History
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/Contact" className="nav-link">
              Contact
            </NavLink>
          </li>
          {role ===
            "5ba48771c61dfb0c8e6c7df6db9e7d097b93b1940ab5aeeb4d8d5a630e2557f9" && (
            <li className="nav-item">
              <NavLink to="/brandAdmin" className="nav-link">
                Admin Site
              </NavLink>
            </li>
          )}
          {role ===
            "e086da84c7904d285d65c6479a94274e5e0f6e6e4f8a6a2c05b234736d57a419" && (
            <li className="nav-item">
              <NavLink to="/sa" className="nav-link">
                SA Site
              </NavLink>
            </li>
          )}
          <li className="nav-log-out">
            <NavLink to="/" className="nav-link" onClick={handleLogout}>
              Log Out
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
      {/* TODO SPYTAJ MICHALA, CZEMU DOPIERO LADUJA SIE TE SITE ADMINY I ADMINE SITE, PO ODSWIEZENIU STRONY */}
    </>
  );
}

export default NavLayout;

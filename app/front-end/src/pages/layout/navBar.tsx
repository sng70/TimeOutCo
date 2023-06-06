import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./NavLayout.css";
import { TOKEN_KEY } from "../login";
function NavLayout() {
  function handleLogOut() {
    localStorage.removeItem(TOKEN_KEY);
  }
  return (
    <>
      <nav className={`navbar`}>
        <ul className="navbar-nav">
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
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">
              Account Settings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link" onClick={handleLogOut}>
              Log Out
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              Admin Site
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default NavLayout;

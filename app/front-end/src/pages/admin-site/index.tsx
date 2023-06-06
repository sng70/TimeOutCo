import React from "react";
import { Link } from "react-router-dom";
function AdminSite() {
  return (
    <>
      <h1>Admin Site</h1>
      <h4>
        If you want to add new brand to our database go there{" "}
        <Link to="newBrand">...</Link>
      </h4>
    </>
  );
}

export default AdminSite;

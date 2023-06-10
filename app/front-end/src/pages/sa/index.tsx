import React from "react";
import { Link } from "react-router-dom";
function SaSite() {
  return (
    <>
      <h1>Admin Site</h1>
      <h4>
        <Link to="newBrand">If you want to add new brand to our database</Link>
      </h4>
    </>
  );
}

export default SaSite;

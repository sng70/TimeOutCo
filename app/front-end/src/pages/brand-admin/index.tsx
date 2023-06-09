import { FC } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const BrandAdmin: FC = () => {
  return (
    <>
      <h1>Brand admin</h1>
      <Link to="brandEmployees">See all employees</Link>
      <Link to="brandApplications">See holidays applications</Link>
      <Link to="brandInfo">See brand info</Link>
    </>
  );
};

export default BrandAdmin;

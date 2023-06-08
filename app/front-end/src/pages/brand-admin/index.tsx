import { FC } from "react";
import { Link } from "react-router-dom";

const BrandAdmin: FC = () => {
  return (
    <>
      <Link to="brandEmployees">See all employees</Link>
      <Link to="brandApplications">See holidays applications</Link>
      <Link to="brandInfo">See brand info</Link>
    </>
  );
};

export default BrandAdmin;

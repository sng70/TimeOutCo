import { FC, useState, useEffect } from "react";
import EmployeesList from "../../../components/brandEmployees/EmployeesList";
import axios from "axios";

const BrandEmployees: FC = () => {
  const brandId = 1;
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/employees/brandId/${brandId}`)
      .then((res) => {
        setEmployees(res.data);
      });
  }, []);

  return (
    <>
      <h1>Brand employees:</h1>
      <EmployeesList employees={employees} />
    </>
  );
};

export default BrandEmployees;

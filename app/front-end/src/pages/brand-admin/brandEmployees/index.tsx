import { FC, useState, useEffect } from "react";
import EmployeesList from "../../../components/brandEmployees/EmployeesList";
import axios from "axios";

const BrandEmployees: FC = () => {
  const employeeId = localStorage.getItem("id");
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/employeeId/${employeeId}/information`)
      .then((res) => {
        axios
          .get(`http://localhost:3001/employees/brand/${res.data[0].brand_id}`)
          .then((res) => {
            setEmployees(res.data);
          });
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

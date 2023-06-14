import { FC, useState, useEffect } from "react";
import EmployeesList from "../../../components/brandEmployees/EmployeesList";
import axios from "axios";

interface Application {
  employee_id: number;
  begin_date: string;
  end_date: string;
}
interface Response {
  data: Application[];
}

const BrandEmployees: FC = () => {
  const brandId = localStorage.getItem("brandId");
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeesOnVacation, setEmployeesOnVacation] = useState([0]);
  const [loadedEmployees, setLoadedEmployees] = useState(false);
  const [loadedEmployeesOnVacation, setLoadedEmployeesOnVacation] =
    useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/employees/brand/${brandId}`)
      .then((res) => {
        setEmployees(res.data);
        setLoadedEmployees(true);
      });
  }, []);

  useEffect(() => {
    axios
      .get<any[]>(`http://localhost:3001/applications/brand/${brandId}`)
      .then((res) => {
        let currentDate = new Date();
        const currentApplications = [];
        for (const application of res.data) {
          const beginDate = new Date(application.begin_date);
          const endDate = new Date(application.end_date);
          beginDate.setHours(beginDate.getHours() - 2);
          endDate.setHours(endDate.getHours() + 22);
          if (
            beginDate <= currentDate &&
            endDate >= currentDate &&
            application.application_state === "accepted"
          ) {
            currentApplications.push(application);
          }
        }
        let employeesOnVacation: number[] = [];
        for (const application of currentApplications) {
          employeesOnVacation.push(application.employee_id);
        }
        setEmployeesOnVacation(employeesOnVacation);
        setLoadedEmployeesOnVacation(true);
      });
  }, []);

  if (!loadedEmployees || !loadedEmployeesOnVacation) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <h1>Brand employees:</h1>
        <EmployeesList
          workingEmployees={employees.filter((employee) =>
            employeesOnVacation.includes(employee.id)
          )}
          notWorkingEmployees={employees.filter(
            (employee) => !employeesOnVacation.includes(employee.id)
          )}
        />
      </>
    );
  }
};

export default BrandEmployees;

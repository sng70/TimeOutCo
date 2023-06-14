import { FC } from "react";
import Employee from "./Employee";

interface employee {
  id: number;
  name: string;
  surname: string;
  mail: string;
  phone_number: string;
  position: string;
  role: string;
  holidays_days_ammount: number;
}

interface Props {
  workingEmployees: Array<employee>;
  notWorkingEmployees: Array<employee>;
}

const EmployeesList: FC<Props> = ({
  workingEmployees,
  notWorkingEmployees,
}) => {
  return (
    <ul>
      <h2>Employees on vacation:</h2>
      <ul>
        {workingEmployees.map((employee) => {
          return (
            <Employee
              id={employee.id}
              name={employee.name}
              surname={employee.surname}
              mail={employee.mail}
              phone_number={employee.phone_number}
              position={employee.position}
              role={employee.role}
              holidays_days_ammount={employee.holidays_days_ammount}
            />
          );
        })}
      </ul>

      <h2>Employees working:</h2>
      <ul>
        {notWorkingEmployees.map((employee) => {
          return (
            <Employee
              id={employee.id}
              name={employee.name}
              surname={employee.surname}
              mail={employee.mail}
              phone_number={employee.phone_number}
              position={employee.position}
              role={employee.role}
              holidays_days_ammount={employee.holidays_days_ammount}
            />
          );
        })}
      </ul>
    </ul>
  );
};

export default EmployeesList;

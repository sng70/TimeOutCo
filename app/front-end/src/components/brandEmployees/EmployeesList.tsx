import { FC } from "react";
import Employee from "./Employee";

interface employee {
  id: number;
  name: string;
  surname: string;
  mail: string;
  phone_number: string;
  position: string;
  is_admin: boolean;
  holidays_days_ammount: number;
}

interface employees {
  employees: Array<employee>;
}

const EmployeesList: FC<employees> = ({ employees }) => {
  return (
    <ul>
      {employees.map((employee) => {
        return (
          <Employee
            id={employee.id}
            name={employee.name}
            surname={employee.surname}
            mail={employee.mail}
            phone_number={employee.phone_number}
            position={employee.position}
            is_admin={employee.is_admin}
            holidays_days_ammount={employee.holidays_days_ammount}
          />
        );
      })}
    </ul>
  );
};

export default EmployeesList;

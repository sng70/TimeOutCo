import axios from "axios";
import { FC } from "react";

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

const Employee: FC<employee> = ({
  id,
  name,
  surname,
  mail,
  phone_number,
  position,
  is_admin,
  holidays_days_ammount,
}) => {
  return (
    <li>
      <span>
        {name} {surname} {mail} {phone_number} {position}{" "}
        {is_admin == true ? "admin" : "not admin"} {holidays_days_ammount}
      </span>
      {/* <button
        onClick={axios.post(`http://localhost:3001/deleteEmployee/${id}`)}
      >
        delete employee
      </button> */}
    </li>
  );
};

export default Employee;

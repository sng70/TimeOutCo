import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";

const AddNewEmployee = () => {
  const handleAddUp = () => {
    axios.post("http://localhost:3001/addEmployee", {
      name: name,
      brandId: brandId,
      surname: surname,
      admin: admin,
      mail: mail,
      phoneNumber: phoneNumber,
      position: position,
      password: password,
      holidaysAmmount: holidaysAmmount,
    });
    window.location.reload();
  };

  const employeeId = localStorage.getItem("id");
  const [brandId, setBrandId] = useState("-1");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("");
  const [holidaysAmmount, setHollidaysAmmount] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/employeeId/${employeeId}/information`)
      .then((res) => {
        setBrandId(String(res.data[0].brand_id));
      });
  }, []);

  if (brandId === "-1") {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <form>
          <h1>Add new Employee</h1>
          <label htmlFor="name">Employee Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="surname">Employee Surname:</label>
          <input
            type="text"
            name="surname"
            id="surname"
            required
            onChange={(e) => setSurname(e.target.value)}
          />
          <br />
          <label htmlFor="mail">Employee Mail:</label>
          <input
            type="mail"
            name="mail"
            id="mail"
            required
            onChange={(e) => setMail(e.target.value)}
          />
          <br />
          <label htmlFor="phoneNumber">Employee Phone Number:</label>
          <input
            type="tel"
            pattern="[0-9]{9}"
            name="phoneNumber"
            id="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />
          <label htmlFor="position">Employee Position:</label>
          <input
            type="text"
            name="position"
            id="position"
            required
            onChange={(e) => setPosition(e.target.value)}
          />
          <br />
          <label htmlFor="password">Employee Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label htmlFor="admin">Admin:</label>
          <input
            type="checkbox"
            name="admin"
            id="admin"
            onChange={() => setAdmin(admin === "admin" ? "" : "admin")}
          />
          <br />
          <label htmlFor="holidaysAmmount">Ammount of Holidays:</label>
          <input
            type="number"
            name="holidaysAmmount"
            id="holidaysAmmount"
            required
            onChange={(e) => setHollidaysAmmount(e.target.value)}
          />
          <br />
          <br />
          <button type="button" id="submitButton" onClick={handleAddUp}>
            Add
          </button>
        </form>
      </>
    );
  }
};

export default AddNewEmployee;

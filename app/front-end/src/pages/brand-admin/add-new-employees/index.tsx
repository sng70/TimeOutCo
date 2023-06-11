import { useState } from "react";

const AddNewEmployee = () => {
  const brandId = 1;
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [holidaysAmmount, setHollidaysAmmount] = useState("");

  return (
    <>
      <form method="POST" action="http://localhost:3001/addNewEmployee">
        <h1>Add new Employee</h1>
        <label htmlFor="name">Employee Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="surname">Employee Surname:</label>
        <input
          type="text"
          name="surname"
          id="surname"
          required
          onChange={(e) => setSurname(e.target.value)}
        />
        <label htmlFor="mail">Employee Mail:</label>
        <input
          type="mail"
          name="mail"
          id="mail"
          required
          onChange={(e) => setMail(e.target.value)}
        />
        <label htmlFor="phoneNumber">Employee Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor="position">Employee Position:</label>
        <input
          type="text"
          name="position"
          id="position"
          required
          onChange={(e) => setPosition(e.target.value)}
        />
        <label htmlFor="password">Employee Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
    </>
  );
};

export default AddNewEmployee;

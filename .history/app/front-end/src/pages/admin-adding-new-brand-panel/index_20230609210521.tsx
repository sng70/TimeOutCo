import { useState } from "react";
import "./index.css";
import Axios from "axios";

function AdminAddingNewBrandPanel() {
  const [brand, setBrand] = useState("");
  const [brandMail, setBrandMail] = useState("");
  const [brandPassword, setBrandPassword] = useState("");
  const [typeOfSub, setTypeOfSub] = useState("");
  const [hqAddress, setHqAddress] = useState("");

  const handleAddUp = () => {
    Axios.post("http://localhost:3001/register-brand", {
      brand: brand,
      brandMail: brandMail,
      brandPassword: brandPassword,
      typeOfSub: typeOfSub,
      hqAddress: hqAddress,
    }).then((response) => {
      console.log(response);
    });
  };
  return (
    <>
      <form
        className="new-brand-form"
        method="POST"
        action="http://localhost:3001/register-brand"
      >
        <h1>Add New Brand</h1>
        <label htmlFor="name">Brand Name:</label>
        <input
          type="text"
          name="brandName"
          id="brandName"
          required
          onChange={(e) => setBrand(e.target.value)}
        />
        <label htmlFor="email">Brand Mail:</label>
        <input
          type="mail"
          id="mail"
          name="mail"
          required
          onChange={(e) => setBrandMail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => {
            setBrandPassword(e.target.value);
          }}
        />
        <br />
        <label htmlFor="subscription">Type of Subscription:</label>
        <select name="subscription" id=""></select>
        {/* <input
          type="text"
          name="subscription"
          id="subscription"
          required
          onChange={(e) => {
            setTypeOfSub(e.target.value);
          }}
        /> */}
        <br />
        <label htmlFor="hqAddress">Head Quarter Address:</label>
        <input
          type="text"
          name="hqAddress"
          id="hqAddress"
          required
          onChange={(e) => {
            setHqAddress(e.target.value);
          }}
        />
        <br />
        <br />
        <button type="submit" id="submitButton" onSubmit={handleAddUp}>
          Sign Up
        </button>
      </form>
    </>
  );
}

export default AdminAddingNewBrandPanel;

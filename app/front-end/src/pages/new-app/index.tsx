import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./index.css";

function NewApplication() {
  return (
    <>
      <form className="new-brand-form">
        <h1>Applicate for holidays</h1>
        <label htmlFor="name">Reasoning:</label>
        <input type="text" name="name" id="name" required />
        <label htmlFor="beginDate">Begin Date</label>
        <input
          type="Date"
          id="beginDate"
          name="applicationbeginDate"
          required
        />
        <br />
        <label htmlFor="endDate">End Date</label>
        <input type="Date" id="applicationEndDate" name="endDate" required />
        <br />
        <br />
        <button type="submit">Applicate</button>
      </form>
    </>
  );
}

export default NewApplication;

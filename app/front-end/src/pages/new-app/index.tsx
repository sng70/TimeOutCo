import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./index.css";
import axios from "axios";

function NewApplication() {
  const handleAddUp = () => {
    axios.post("http://localhost:3001/addApplication", {
      employeeId: employeeId,
      cause: cause,
      beginDate: beginDate,
      endDate: endDate,
    });
  };

  const employeeId = localStorage.getItem("id");
  const [cause, setCause] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <form
        className="new-brand-form"
        method="POST"
        action="http://localhost:3001/addApplication"
      >
        <h1>Applicate for holidays</h1>
        <label htmlFor="name">Reasoning:</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          onChange={(e) => {
            setCause(e.target.value);
          }}
        />
        <label htmlFor="beginDate">Begin Date</label>
        <input
          type="Date"
          id="beginDate"
          name="applicationbeginDate"
          required
          onChange={(e) => {
            setBeginDate(e.target.value);
          }}
        />
        <br />
        <label htmlFor="endDate">End Date</label>
        <input
          type="Date"
          id="applicationEndDate"
          name="endDate"
          required
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
        <br />
        <br />
        <button type="submit" onSubmit={handleAddUp}>
          Applicate
        </button>
      </form>
    </>
  );
}

export default NewApplication;

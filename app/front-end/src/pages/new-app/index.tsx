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
    window.location.reload();
  };

  const employeeId = localStorage.getItem("id");
  const [cause, setCause] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <form className="new-brand-form">
        <h1>Applicate for holidays</h1>
        <label htmlFor="cause">Reasoning:</label>
        <input
          type="text"
          name="cause"
          id="cause"
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
        <button type="button" onClick={handleAddUp}>
          Applicate
        </button>
      </form>
    </>
  );
}

export default NewApplication;

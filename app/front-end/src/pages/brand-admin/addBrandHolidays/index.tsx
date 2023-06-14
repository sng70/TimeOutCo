import React, { useState, useEffect, FC } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./index.css";
import axios from "axios";

const BrandHolidays: FC = () => {
  const handleAddUp = () => {
    axios.post("http://localhost:3001/brand/:brandId/addBrandHolidays", {
      employees: employees,
      cause: cause,
      beginDate: beginDate,
      endDate: endDate,
    });
    window.location.reload();
  };

  const brandId = localStorage.getItem("brandId");
  const [cause, setCause] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employees, setEmployees] = useState<number[]>([]);
  const [loadedEmployees, setLoadedEmployees] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/employees/brand/${brandId}`)
      .then((res) => {
        let employees: number[] = [];
        for (const employee of res.data) {
          employees.push(employee.id);
        }
        setEmployees(employees);
        setLoadedEmployees(true);
      });
  }, []);

  if (!loadedEmployees) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <form className="new-brand-form">
          <h1>Set holidays for whole brand</h1>
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
            Set
          </button>
        </form>
      </>
    );
  }
};

export default BrandHolidays;

import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ApplicationHistoryHeader from "../../components/app-history/header";
import ApplicationList, {
  applicationListProps,
} from "../../components/app-history/applicationList";
import "./index.css";
import axios from "axios";

function ApplicationHistory() {
  const employeeId = localStorage.getItem("id");
  const [applications, setApplications] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/${employeeId}/applications.json`)
      .then((res) => {
        setApplications(res.data);
        setLoaded(true);
      });
  }, []);
  if (!loaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <ApplicationHistoryHeader />
        <ApplicationList applications={applications} />
      </>
    );
  }
}

export default ApplicationHistory;

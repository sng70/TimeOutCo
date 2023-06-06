import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import ApplicationHistoryHeader from "../../components/app-history/header";
import ApplicationList, {
  applicationListProps,
} from "../../components/app-history/applicationList";
import "./index.css";

function ApplicationHistory() {
  return (
    <>
      <ApplicationHistoryHeader />
      <ApplicationList applications={[]} />
    </>
  );
}

export default ApplicationHistory;

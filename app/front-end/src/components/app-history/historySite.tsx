import React from "react";
import { useParams } from "react-router-dom";

const ApplicationBoxSite = () => {
  let { id } = useParams();
  return (
    <div>
      <h2>Application History for ID: {id}</h2>
    </div>
  );
};

export default ApplicationBoxSite;

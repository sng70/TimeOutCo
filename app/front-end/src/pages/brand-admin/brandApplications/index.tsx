import { FC, useState, useEffect } from "react";
import axios from "axios";
import ApplicationList from "../../../components/brandApplications/applicationList";

const BrandApplications: FC = () => {
  const employeeId = localStorage.getItem("id");
  const [applications, setApplications] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/employeeId/${employeeId}/information`)
      .then((res) => {
        axios
          .get(
            `http://localhost:3001/applications/brand/${res.data[0].brand_id}`
          )
          .then((res) => {
            setApplications(res.data);
            setLoaded(true);
          });
      });
  }, []);
  if (!loaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <h1>Brand applications:</h1>
        <ApplicationList applications={applications} />
      </>
    );
  }
};

export default BrandApplications;

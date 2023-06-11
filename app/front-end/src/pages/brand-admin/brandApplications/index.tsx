import { FC, useState, useEffect } from "react";
import axios from "axios";
import ApplicationList from "../../../components/app-history/applicationList";

const BrandApplications: FC = () => {
  const employeeId = localStorage.getItem("id");
  const [brandId, setBrandId] = useState(-1);
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    axios
      .post
      (`http://localhost:3001/employeeId/${employeeId}/information`)
      .then((res) => {
        setBrandId(res.data[0].brand_id);
        axios
          .post(`http://localhost:3001/applications/brand/${brandId}`)
          .then((res) => {
            setApplications(res.data);
          });
      });
  }, []);

  return (
    <>
      <h1>Brand applications:</h1>
      <ApplicationList applications={applications} />
    </>
  );
};

export default BrandApplications;

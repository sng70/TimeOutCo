import { FC, useState, useEffect } from "react";
import axios from "axios";
import ApplicationList from "../../../components/app-history/applicationList";

const BrandApplications: FC = () => {
  const brandId = 1;
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/applications/brandId/${brandId}`)
      .then((res) => {
        setApplications(res.data);
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

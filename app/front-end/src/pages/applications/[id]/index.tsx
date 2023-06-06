import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/applications/header";
import ApplicationBox from "../../../components/applications/applicationBox";

const Application: FC = () => {
  const { id } = useParams();
  const [application, setApplication] = useState({
    id: 0,
    cause: "",
    application_state: "",
    begin_date: "",
    end_date: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:3001/applications/${id}/application.json`)
      .then((res) => setApplication(res.data[0]));
  }, []);
  const { cause, application_state, begin_date, end_date } = application;
  return (
    <>
      <Header id={Number(id)} />
      <ApplicationBox
        cause={cause}
        application_state={application_state}
        begin_date={begin_date}
        end_date={end_date}
      />
    </>
  );
};

export default Application;

import { FC } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/application/header";
import ApplicationBox from "../../../components/application/application";

const Application: FC = () => {
  const { id } = useParams();
  const [application, setApplication] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/applications/${id}`).then((res) => {
      setApplication(res.data);
    });
  }, []);
  return (
    <>
      <Header id={Number(id)} />
      <ApplicationBox application={application} />
    </>
  );
};

export default Application;

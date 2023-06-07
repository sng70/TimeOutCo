import { FC } from "react";
import { useParams } from "react-router-dom";

const Application: FC = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Application: {id}</h1>
    </>
  );
};

export default Application;

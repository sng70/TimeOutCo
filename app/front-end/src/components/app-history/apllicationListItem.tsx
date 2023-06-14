import axios from "axios";
import { FC } from "react";
import { Link } from "react-router-dom";

interface applicationProps {
  id: number;
  cause: string;
  application_state: string;
  begin_date: string;
  end_date: string;
}

const ApplicationListItem: FC<applicationProps> = ({
  id,
  cause,
  application_state,
  begin_date,
  end_date,
}) => {
  const handleAcceptButtonClick = () => {
    axios.post(`http://localhost:3001/application/accept`, { id: id });
    window.location.reload();
  };

  const handleDenyButtonClick = () => {
    axios.post(`http://localhost:3001/application/deny`, { id: id });
    window.location.reload();
  };

  const role = localStorage.getItem("role");

  if (
    role ===
      "5ba48771c61dfb0c8e6c7df6db9e7d097b93b1940ab5aeeb4d8d5a630e2557f9" &&
    application_state === "pending"
  ) {
    return (
      <li key={id} className="applicationListItem">
        <Link to={`http://localhost:3000/applications/${id}`}>
          <div className="applicationWrapper">
            <span>
              {cause} {application_state} {begin_date.slice(0, 10)}{" "}
              {end_date.slice(0, 10)}
            </span>
          </div>
        </Link>
        <button onClick={handleAcceptButtonClick}>accept</button>
        <button onClick={handleDenyButtonClick}>deny</button>
      </li>
    );
  } else {
    return (
      <li key={id} className="applicationListItem">
        <Link to={`http://localhost:3000/applications/${id}`}>
          <div className="applicationWrapper">
            <span>
              {cause} {application_state} {begin_date.slice(0, 10)}{" "}
              {end_date.slice(0, 10)}
            </span>
          </div>
        </Link>
      </li>
    );
  }
};

export default ApplicationListItem;
export type { applicationProps };

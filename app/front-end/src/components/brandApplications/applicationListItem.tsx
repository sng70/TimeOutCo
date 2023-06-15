import axios from "axios";
import { FC } from "react";
import { Link } from "react-router-dom";

interface applicationProps {
  id: number;
  cause: string;
  application_state: string;
  begin_date: string;
  end_date: string;
  name: string;
  surname: string;
}

const ApplicationListItem: FC<applicationProps> = ({
  id,
  cause,
  application_state,
  begin_date,
  end_date,
  name,
  surname,
}) => {
  const handleAcceptButtonClick = () => {
    axios.post(`http://localhost:3001/application/accept`, { id: id });
    window.location.reload();
  };

  const handleDenyButtonClick = () => {
    axios.post(`http://localhost:3001/application/deny`, { id: id });
    window.location.reload();
  };

  if (application_state === "pending") {
    return (
      <li key={id} className="applicationListItem">
        <Link to={`http://localhost:3000/applications/${id}`}>
          <div className="applicationWrapper">
            <span>
              {name} {surname}
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
              {name} {surname} {cause} {application_state}{" "}
              {begin_date.slice(0, 10)} {end_date.slice(0, 10)}
            </span>
          </div>
        </Link>
      </li>
    );
  }
};
export default ApplicationListItem;
export type { applicationProps };

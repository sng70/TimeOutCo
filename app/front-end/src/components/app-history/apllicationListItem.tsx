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
};

export default ApplicationListItem;
export type { applicationProps };

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
  id = 1;
  return (
    <li key={id} className="applicationListItem">
      <Link to={`http://localhost:3000/applications/${id}`}>
        <div className="applicationWrapper">
          <span>
            {cause} {application_state} {begin_date} {end_date}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default ApplicationListItem;
export type { applicationProps };

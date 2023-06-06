import { FC } from "react";

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
      <a href={`/applications/${id}`}>
        <div className="applicationWrapper">
          <span>
            {cause} {application_state} {begin_date} {end_date}
          </span>
        </div>
      </a>
    </li>
  );
};

export default ApplicationListItem;
export type { applicationProps };

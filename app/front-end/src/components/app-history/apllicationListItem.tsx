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
  id = 1;
  return (
    <li key={id} className="applicationListItem">
      <div className="applicationWrapper">
        <span>
          {cause} {application_state} {begin_date} {end_date}
        </span>
      </div>
    </li>
  );
};

export default ApplicationListItem;
export type { applicationProps };

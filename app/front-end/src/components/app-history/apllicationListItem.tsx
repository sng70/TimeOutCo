import { FC } from "react";

interface applicationProps {
  id: number;
  cause: string;
  applicationState: string;
  beginDate: string;
  endDate: string;
}

const ApplicationListItem: FC<applicationProps> = ({
  id,
  cause,
  applicationState,
  beginDate,
  endDate,
}) => {
  return (
    <li key={id} className="applicationListItem">
      <div className="applicationWrapper"></div>
    </li>
  );
};

export default ApplicationListItem;
export type { applicationProps };

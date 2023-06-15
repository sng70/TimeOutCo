import { FC } from "react";
import ApplicationListItem, { applicationProps } from "./applicationListItem";

interface applicationListProps {
  applications: applicationProps[];
}

const ApplicationList: FC<applicationListProps> = ({ applications }) => {
  return (
    <ul className="applicationList">
      {applications.map((application) => {
        return (
          <ApplicationListItem
            id={application.id}
            cause={application.cause}
            application_state={application.application_state}
            begin_date={application.begin_date}
            end_date={application.end_date}
            name={application.name}
            surname={application.surname}
          />
        );
      })}
    </ul>
  );
};

export default ApplicationList;
export type { applicationListProps };

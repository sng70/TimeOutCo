import { FC } from "react";
import ApplicationListItem, { applicationProps } from "./apllicationListItem";

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
          />
        );
      })}
    </ul>
  );
};

export default ApplicationList;
export type { applicationListProps };

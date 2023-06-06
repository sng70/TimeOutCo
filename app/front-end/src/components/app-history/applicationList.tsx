import { FC } from "react";
import ApplicationListItem, { applicationProps } from "./apllicationListItem";

interface applicationListProps {
  applications: Array<applicationProps>;
}

const ApplicationList: FC<applicationListProps> = ({ applications }) => {
  return (
    <ul className="applicationList">
      {applications.map((application) => {
        return (
          <ApplicationListItem
            id={application.id}
            cause={application.cause}
            applicationState={application.applicationState}
            beginDate={application.beginDate}
            endDate={application.endDate}
          />
        );
      })}
    </ul>
  );
};

export default ApplicationList;
export type { applicationListProps };

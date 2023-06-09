import { FC } from "react";

interface applicationType {
  cause: string;
  application_state: string;
  begin_date: string;
  end_date: string;
}

interface Props {
  application: Array<applicationType>;
}

const ApplicationBox: FC<Props> = ({ application }) => {
  if (application.length === 0) {
    return <span></span>;
  } else {
    return (
      <span>
        {application[0].cause} {application[0].application_state}{" "}
        {application[0].begin_date} {application[0].end_date}
      </span>
    );
  }
};

export default ApplicationBox;
export type { applicationType };

import { FC } from "react";

interface Props {
  cause: string;
  application_state: string;
  begin_date: string;
  end_date: string;
}

const ApplicationBox: FC<Props> = ({
  cause,
  application_state,
  begin_date,
  end_date,
}) => {
  return (
    <div>
      <span>
        {cause} {application_state} {begin_date} {end_date}
      </span>
    </div>
  );
};

export default ApplicationBox;

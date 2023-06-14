import { FC } from "react";

interface applicationType {
  employee_id: number;
  cause: string;
  application_state: string;
  begin_date: string;
  end_date: string;
  brand_id: number;
}

interface Props {
  application: Array<applicationType>;
}

const ApplicationBox: FC<Props> = ({ application }) => {
  const brandId = Number(localStorage.getItem("brandId"));
  const role = localStorage.getItem("role");
  const employeeId = localStorage.getItem("id");
  if (application.length === 0) {
    return <></>;
  } else if (
    application[0].employee_id === Number(employeeId) ||
    (role ===
      "5ba48771c61dfb0c8e6c7df6db9e7d097b93b1940ab5aeeb4d8d5a630e2557f9" &&
      application[0].brand_id === brandId) ||
    role === "e086da84c7904d285d65c6479a94274e5e0f6e6e4f8a6a2c05b234736d57a419"
  ) {
    return (
      <span>
        {application[0].cause} {application[0].application_state}{" "}
        {application[0].begin_date.slice(0, 10)}{" "}
        {application[0].end_date.slice(0, 10)}
      </span>
    );
  } else {
    return <span>Nice try, but it's not your application.</span>;
  }
};

export default ApplicationBox;
export type { applicationType };

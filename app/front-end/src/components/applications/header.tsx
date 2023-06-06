import { FC } from "react";

interface Props {
  id: number;
}

const Header: FC<Props> = ({ id }) => {
  return <h1>Application: {id}</h1>;
};

export default Header;

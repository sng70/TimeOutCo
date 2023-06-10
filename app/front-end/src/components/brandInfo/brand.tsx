import { FC } from "react";

interface brandType {
  name: string;
  subscription_type: string;
  hq_address: string;
  brand_mail: string;
}

interface Props {
  brand: Array<brandType>;
}

const Brand: FC<Props> = ({ brand }) => {
  if (brand.length === 0) {
    return <></>;
  } else {
    return (
      <span>
        {brand[0].name} {brand[0].subscription_type} {brand[0].hq_address}{" "}
        {brand[0].brand_mail}
      </span>
    );
  }
};

export default Brand;

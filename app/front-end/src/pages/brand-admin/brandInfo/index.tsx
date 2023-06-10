import { FC, useState, useEffect } from "react";
import axios from "axios";
import Brand from "../../../components/brandInfo/brand";

const BrandInfo: FC = () => {
  const brandId = 1;
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/employees/brandId/${brandId}`)
      .then((res) => {
        setBrand(res.data);
      });
  }, []);
  return (
    <>
      <h1>Brand information:</h1>
      <Brand brand={brand} />
    </>
  );
};

export default BrandInfo;

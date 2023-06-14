import { FC, useState, useEffect } from "react";
import axios from "axios";
import Brand from "../../../components/brandInfo/brand";

const BrandInfo: FC = () => {
  const employeeId = localStorage.getItem("id");
  const [brand, setBrand] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/employeeId/${employeeId}/information`)
      .then((res) => {
        axios
          .get(
            `http://localhost:3001/brand/${res.data[0].brand_id}/information`
          )
          .then((res) => {
            setBrand(res.data);
            setLoaded(true);
          });
      });
  }, []);
  if (!loaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <h1>Brand information:</h1>
        <Brand brand={brand} />
      </>
    );
  }
};

export default BrandInfo;

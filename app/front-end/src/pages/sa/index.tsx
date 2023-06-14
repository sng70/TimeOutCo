import { Link } from "react-router-dom";
function SaSite() {
  return (
    <>
      <h1>Admin Site</h1>
      <h4>
        <Link to="newBrand">If you want to add new brand to our database</Link>
        <br />
        <Link to="editUsers">If you want to edit users in our database</Link>
        <br />
        <Link to="editBrands">If you want to edit Brands in our database</Link>
      </h4>
    </>
  );
}

export default SaSite;

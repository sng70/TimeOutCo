import axios from "axios";
import { useEffect, useState, useRef, ChangeEvent } from "react";

interface Brand {
  id: number;
  name: string;
  subscription_type: string;
  hq_address: string;
  brands_password: string;
  brand_mail: string;
}

function EditBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  useEffect(() => {
    axios
      .get<Brand[]>("http://localhost:3001/Brands")
      .then((response) => {
        const data = response.data;
        setBrands(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych z backendu:", error);
      });
  }, []);

  const handleBrandChange = (brand: Brand) => {
    setSelectedBrand(brand);
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleCloseModal = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.close();
    }
    setSelectedBrand(null);
  };

  const handleSaveChanges = () => {
    axios
      .post(
        `http://localhost:3001/editBrands/${selectedBrand?.id}`,
        selectedBrand
      )
      .then(() => {
        
        console.log("Zaktualizowane dane zostały zapisane na serwerze");
        const updatedBrands = brands.map((brand) => {
          if (brand.id === selectedBrand?.id) {
            return selectedBrand;
          }
          return brand;
        });
        setBrands(updatedBrands);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Błąd podczas zapisywania zmienionych danych:", error);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedBrand((prevBrand) => ({
      ...prevBrand!,
      [name]: value,
    }));
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <h1>Edit Brands</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subscription Type</th>
            <th>HQ Address</th>
            <th>Password</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>{brand.subscription_type}</td>
              <td>{brand.hq_address}</td>
              <td>{brand.brands_password}</td>
              <td>{brand.brand_mail}</td>
              <td>
                <button onClick={() => handleBrandChange(brand)}>Change</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBrand && (
        <dialog ref={dialogRef}>
          <h2>Edit Brand</h2>
          <form>
            <div>
              <label>ID:</label>
              <input type="text" value={selectedBrand.id.toString()} disabled />
            </div>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={selectedBrand.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Subscription Type:</label>
              <input
                type="text"
                name="subscription_type"
                value={selectedBrand.subscription_type}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>HQ Address:</label>
              <input
                type="text"
                name="hq_address"
                value={selectedBrand.hq_address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="brands_password"
                value={selectedBrand.brands_password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="brand_mail"
                value={selectedBrand.brand_mail}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <div>
            <button onClick={handleCloseModal}>Cancel</button>
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default EditBrands;

import axios from "axios";
import { useEffect, useState, useRef } from "react";

function EditUsers() {
  const [userData, setUserData] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  type User = {
    id: number;
    brand_id: number;
    name: string;
    surname: string;
    mail: string;
    phone_number: string;
    position: string;
    employees_password: string;
    role: string;
    holidays_days_ammount: number;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/Users")
      .then((response) => {
        const data = response.data;
        setUserData(data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych z backendu:", error);
      });
  }, []);

  const handleUserChange = (user: any) => {
    setSelectedUser(user);
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
    setSelectedUser(null);
  };

  const handleSaveChanges = () => {
    axios
      .post(`http://localhost:3001/editUsers/${selectedUser.id}`, selectedUser)
      .then(() => {
        console.log("Zaktualizowane dane zostały zapisane na serwerze");
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Błąd podczas zapisywania zmienionych danych:", error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser: User) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <h1>Edit users permissions</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Password</th>
            <th>Role</th>
            <th>Holidays Days</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.brand_id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.mail}</td>
              <td>{user.phone_number}</td>
              <td>{user.position}</td>
              <td>{user.employees_password}</td>
              <td>{user.role}</td>
              <td>{user.holidays_days_ammount}</td>
              <td>
                <button onClick={() => handleUserChange(user)}>Change</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <dialog ref={dialogRef}>
          <h2>Edit User</h2>
          <form>
            <div>
              <label>ID:</label>
              <input type="text" value={selectedUser.id} disabled />
            </div>
            <div>
              <label>Brand ID:</label>
              <input
                type="text"
                name="brand_id"
                value={selectedUser.brand_id}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={selectedUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Surname:</label>
              <input
                type="text"
                name="surname"
                value={selectedUser.surname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="mail"
                value={selectedUser.mail}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="text"
                name="phone_number"
                value={selectedUser.phone_number}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={selectedUser.position}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="employees_password"
                value={selectedUser.employees_password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Role:</label>
              <input
                type="text"
                name="role"
                value={selectedUser.role}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Holidays Days:</label>
              <input
                type="text"
                name="holidays_days_ammount"
                value={selectedUser.holidays_days_ammount}
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

export default EditUsers;

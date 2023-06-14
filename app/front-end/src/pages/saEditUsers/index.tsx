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

  const handleDeleteUser = (userId: number) => {
    axios
      .delete(`http://localhost:3001/deleteUser/${userId}`)
      .then(() => {
        console.log("Użytkownik został usunięty");
        setUserData((prevData) =>
          prevData.filter((user) => user.id !== userId)
        );
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania użytkownika:", error);
      });
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
          {userData.map((user: User) => (
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
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={dialogRef}>
        {selectedUser && (
          <div>
            <h2>Edit User</h2>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={selectedUser.name}
              onChange={handleInputChange}
            />
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={selectedUser.surname}
              onChange={handleInputChange}
            />
            <label htmlFor="mail">Email:</label>
            <input
              type="email"
              id="mail"
              name="mail"
              value={selectedUser.mail}
              onChange={handleInputChange}
            />
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={selectedUser.phone_number}
              onChange={handleInputChange}
            />
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={selectedUser.position}
              onChange={handleInputChange}
            />
            <label htmlFor="employees_password">Password:</label>
            <input
              type="password"
              id="employees_password"
              name="employees_password"
              value={selectedUser.employees_password}
              onChange={handleInputChange}
            />
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={selectedUser.role}
              onChange={handleInputChange}
            />
            <label htmlFor="holidays_days_ammount">Holidays Days:</label>
            <input
              type="number"
              id="holidays_days_ammount"
              name="holidays_days_ammount"
              value={selectedUser.holidays_days_ammount}
              onChange={handleInputChange}
            />
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        )}
      </dialog>
    </div>
  );
}

export default EditUsers;

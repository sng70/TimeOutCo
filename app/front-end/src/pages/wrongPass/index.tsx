import { NavLink } from "react-router-dom";

function WrongPassword() {
  return (
    <>
      <h1
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        Wrong username/password combination{" "}
      </h1>
      <button
        style={{
          justifyItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <NavLink to="/">Go back to login page and log in!</NavLink>
      </button>
    </>
  );
}

export default WrongPassword;

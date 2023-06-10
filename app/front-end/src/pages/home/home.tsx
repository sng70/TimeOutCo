import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nameFromParams = params.get("name");
  const roleFromParams = params.get("role");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (nameFromParams) {
      setName(nameFromParams);
    }

    if (roleFromParams) {
      setRole(roleFromParams);
    }
  }, [nameFromParams, roleFromParams]);

  return (
    <div>
      <h1 style={{ justifyContent: "center", display: "flex" }}>
        Hello {name}
      </h1>
      <p>Your role: {role}</p>
    </div>
  );
}

export default Home;

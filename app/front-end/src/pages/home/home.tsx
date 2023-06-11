import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nameFromParams = params.get("name");
  const roleFromParams = params.get("role");
  const idFromParams = params.get("id");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (nameFromParams) {
      localStorage.setItem("name", nameFromParams);
      setName(nameFromParams);
    } else {
      const nameFromStorage = localStorage.getItem("name");
      if (nameFromStorage) {
        setName(nameFromStorage);
      }
    }

    if (roleFromParams) {
      localStorage.setItem("role", roleFromParams);
      setRole(roleFromParams);
    } else {
      const roleFromStorage = localStorage.getItem("role");
      if (roleFromStorage) {
        setRole(roleFromStorage);
      }
    }

    if (idFromParams) {
      localStorage.setItem("id", idFromParams);
    }
  }, [nameFromParams, roleFromParams]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      const roleFromStorage = localStorage.getItem("role");
      const nameFromStorage = localStorage.getItem("name");

      if (
        (event.key === "role" && event.newValue !== roleFromStorage) ||
        (event.key === "name" && event.newValue !== nameFromStorage)
      ) {
        localStorage.setItem("role", roleFromStorage || "");
        localStorage.setItem("name", nameFromStorage || "");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <h1 style={{ justifyContent: "center", display: "flex" }}>
        Hello {name}
      </h1>
    </div>
  );
}

export default Home;

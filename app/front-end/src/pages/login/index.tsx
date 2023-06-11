import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";

import "./index.css";

function LogIn() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleLogin = () => {
    Axios.post("http://localhost:3001/login", {
      mail: mail,
      password: password,
      remember: localStorage.getItem("remember") || "false",
    }).then((response) => {
      setShouldRedirect(true);
    });
  };

  useEffect(() => {
    const remember = localStorage.getItem("remember") === "true";
    if (remember) {
      const name = localStorage.getItem("name") || "";
      const role = localStorage.getItem("role") || "";
      if (name && role && role.length === 64) {
        setShouldRedirect(true);
      }
    }
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="App">
      <img
        src="./Logo.png"
        alt="Milwaukee Bucks"
        style={{
          width: 150,
          display: "flex",
          height: 180,
          position: "absolute",
          top: 0,
          marginTop: 20,
        }}
      />
      <form action="http://localhost:3001/login" method="POST">
        <div>
          <label htmlFor="mail" className="loginText">
            Mail
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password" className="passwordText">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="remember" className="rememberText">
            Remember Me
          </label>
          <input
            id="remember"
            name="remember"
            type="checkbox"
            onChange={(e) => {
              localStorage.setItem("remember", e.target.checked.toString());
            }}
          />
        </div>
        <button className="sendButton" type="submit" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default LogIn;

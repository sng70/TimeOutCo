import React, { useState } from "react";
import Axios from "axios";
import { useSignIn } from "react-auth-kit";
import "./index.css";

function LogIn() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();

  const handleLogin = () => {
    Axios.post("http://localhost:3001/login", {
      mail: mail,
      password: password,
    }).then((response) => {
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { mail: mail },
      });
    });
  };

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
        <button className="sendButton" type="submit" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default LogIn;

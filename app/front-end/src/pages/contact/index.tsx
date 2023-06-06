import React from "react";
import { Link } from "react-router-dom";
function Contact() {
  return (
    <>
      <h1>Our Contacts:</h1>
      <ul>
        <li>support@TimeOutCo.com</li>
        <li>+48 609 110 321</li>
        <li>
          <Link to="https://t.me/ahaouem">Owner, Aleksander Haouem</Link>
        </li>
        <li>
          <Link to="https://t.me/tomaszAgent">Owner, Tomasz Zając</Link>
        </li>
      </ul>
    </>
  );
}

export default Contact;

import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

function NavComponent() {
  return (
    <ul className="NavBar">
      <li>
        <Link to="/dashboard">Home</Link>
      </li>
      <li>
        <Link to="/dashboard/cart">Cart</Link>
      </li>
      <li>
        <Link to="/dashboard/profile">Profile</Link>
      </li>
    </ul>
  );
}

export default NavComponent;

import React from "react";
import { Link } from "react-router-dom";
function NavComponent() {
  return (
    <ul>
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

import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
function NavComponent() {
  let match = useRouteMatch();
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

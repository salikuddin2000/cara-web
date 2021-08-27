import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
function NavComponent() {
  let match = useRouteMatch();
  return (
    <ul>
      <li>
        <Link to={`${match.url}`}>Home</Link>
      </li>
      <li>
        <Link to={`${match.url}/cart`}>Cart</Link>
      </li>
      <li>
        <Link to={`${match.url}/profile`}>Profile</Link>
      </li>
    </ul>
  );
}

export default NavComponent;

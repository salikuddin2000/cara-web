import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
import home from "../../../assets/home.png";
import cart from "../../../assets/cart.png";
import profile from "../../../assets/profile.png";


function NavComponent() {
  return (
    <ul className="NavBar">
      <div>
      <li>
        <Link to="/dashboard"><img alt="home" src={home} /></Link>
      </li>
      <li>
        <Link to="/dashboard/cart"><img className="cart" alt="Appointment History" src={cart} /></Link>
      </li>
      <li>
        <Link to="/dashboard/profile"><img alt="profile" src={profile} /></Link>
      </li>
      </div>
    </ul>
  );
}

export default NavComponent;

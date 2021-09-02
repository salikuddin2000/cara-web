import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Salon() {
  const location = useLocation();
  if (location && location.state) {
    const { id } = location.state;
    return (
      <div>
        <h1>This is salon page</h1>
        <h2>{id}</h2>
      </div>
    );
  } else {
    return (
      <>
        <h1>Please Choose Salon From home Page</h1>
        <Link to="/dashboard"> Home Page</Link>
      </>
    );
  }
}

export default Salon;

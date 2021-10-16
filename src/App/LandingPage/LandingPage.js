import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useCaraUser } from "../Providers/caraUserProvider.js";

function LandingPage() {
  const { caraUser } = useCaraUser();
  const [validity, setValidity] = useState();
  var d1 = new Date("2021-11-24"); //yyyy-mm-dd
  var today = new Date();
  function assignValidity() {
    if (today < d1) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  }

  useEffect(() => {
    assignValidity();
    // eslint-disable-next-line
  }, []);

  if (caraUser === undefined || caraUser === null) {
    return (
      <div>
        {validity === undefined || validity === true ? (
          <h1>Our App will be launched soon</h1>
        ) : (
          <Link to="/login">Get Started</Link>
        )}
      </div>
    );
  } else {
    return (
      <>
        {console.log(caraUser)}
        <Redirect to="/login" />
      </>
    );
  }
}

export default LandingPage;

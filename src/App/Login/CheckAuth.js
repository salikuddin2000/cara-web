import React from "react";
import { Redirect } from "react-router-dom";
import { useGoogleUser, useCaraUser, useUserPostReq } from "../Providers/caraUserProvider";
import WelcomeScreen from "./Components/WelcomeScreen";
import GetPhoneNumber from "./Components/GetPhoneNumber.js";
import {BeatLoader} from 'react-spinners';

function CheckAuth() {
  const { caraUser } = useCaraUser();
  const { googleUser, setGoogleUser, showPhoneScreen, showDashboardScreen } = useGoogleUser();
  const { postGoogleUser } = useUserPostReq();

  if (caraUser === null && googleUser === undefined) {
    console.log("in if", caraUser);
    return <WelcomeScreen signIn={(googleUser) => setGoogleUser(googleUser)} />;
  } 
  else if ( caraUser === null && googleUser !== undefined && googleUser.phone_number === null && showPhoneScreen===true)
  {
    console.log("inside null phone number", googleUser);
    return (
      <GetPhoneNumber
        setPhoneNumber={(googleUser) => {
          setGoogleUser(googleUser);
          postGoogleUser(googleUser);
        }}
      />
    );
  }
  else if (caraUser !== undefined && showDashboardScreen===true ) {
    console.log("in else ", caraUser);
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: { caraUser: caraUser },
        }}
      />
    );
  }
  else {
    return <BeatLoader loading color='#796AC8' />;
  }
}

export default CheckAuth;

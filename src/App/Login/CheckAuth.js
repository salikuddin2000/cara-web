import React from 'react';
import {Redirect} from 'react-router-dom';
// import {useUser} from "../userContext";
import { useGoogleUser, useCaraUser } from './caraUserProvider';
import WelcomeScreen from './Components/WelcomeScreen';

function CheckAuth() {
  const {caraUser} = useCaraUser();
  const {setGoogleUser} = useGoogleUser();

  if(caraUser === null  ){
    console.log("in if",caraUser);
    return(
      <WelcomeScreen signIn={(googleUser) => setGoogleUser(googleUser)} />
    )
  }
  else if(caraUser !== undefined){
    console.log("in else ",caraUser);
    return(
    <Redirect
      to={{
        pathname: "/dashboard",
        state: {caraUser : caraUser}
      }}/>
    )
    }
    else{
      return(
        <h1>Loading</h1>
      )
    }
}

export default CheckAuth;

import React from 'react';
import {Redirect} from 'react-router-dom';
// import {useUser} from "../userContext";
import { useGoogleUser, useCaraUser , useUserPostReq} from './caraUserProvider';
import WelcomeScreen from './Components/WelcomeScreen';
import GetPhoneNumber from './Components/GetPhoneNumber.js';


function CheckAuth() {
  const {caraUser} = useCaraUser();
  const {googleUser , setGoogleUser} = useGoogleUser();
  const {postGoogleUser} = useUserPostReq();

  if(caraUser === null && googleUser === undefined){
    console.log("in if",caraUser);
    return(
      <WelcomeScreen signIn={(googleUser) => setGoogleUser(googleUser)} />
    )
  }
  else if(caraUser===null && googleUser!==undefined &&  googleUser.phone_number === null){
    console.log("inside null phone number", googleUser)
    return (<GetPhoneNumber setPhoneNumber={(googleUser) => {setGoogleUser(googleUser); postGoogleUser(googleUser);}} />)
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

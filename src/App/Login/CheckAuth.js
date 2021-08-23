import React from 'react';
import {Redirect} from 'react-router-dom';

function CheckAuth(props) {

  if(props.user ==null && props.flag === true){
    console.log("in if",props.user,props.flag);
    return(
      <Redirect to="/welcomeScreen" />
    )
  }
  else{
    console.log("in else ",props.user,props.flag);
    return(
    <Redirect
      to={{
        pathname: "/dashboard",
        state: {user : props.user}
      }}/>
    )
    }

}

export default CheckAuth;

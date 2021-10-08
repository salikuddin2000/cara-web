import React from 'react';
import { Link } from 'react-router-dom';
import {useUserUpdate} from  "../../Providers/caraUserProvider"
import AppBar from "../AppBarComponents/AppBar.js";
import MadeWithLove from '../MadeWithLove';
import {useCaraUser} from "../../Providers/caraUserProvider.js";
import "./Profile.css";

function Profile() {
    const signOut = useUserUpdate();
    const {caraUser} = useCaraUser();

    if (caraUser === null) {
        return (<div className="nullUserProfile"><h5>sign in to view your profile</h5><br />
              <Link
            to="/"
          ><div>Sign In</div></Link>
        </div>);
      }
    else{
    return (
      (caraUser&&caraUser.email_address)?
        <div className="loggedInProfile">
            <AppBar />
            <img alt="user" src={caraUser.photo_url} />
            <h2>{caraUser.first_name} {caraUser.last_name}</h2>
            <h5>{caraUser.email_address}</h5>
            <button onClick={()=>signOut()}>Sign Out</button>
            <div>
            <MadeWithLove />
            </div>
        </div>
        :""
    )}
}

export default Profile;

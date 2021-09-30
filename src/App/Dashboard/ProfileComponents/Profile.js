import React from 'react';
import { Link } from 'react-router-dom';
import {useUserUpdate} from  "../../Providers/caraUserProvider"
import AppBar from "../AppBarComponents/AppBar.js";
import MadeWithLove from '../MadeWithLove';
import {useCaraUser} from "../../Providers/caraUserProvider.js"

function Profile() {
    const signOut = useUserUpdate();
    const {caraUser} = useCaraUser();

    if (caraUser === null) {
        return (<div>sign in to view your profile<br />
              <Link
            to="/"
          >sign in</Link>
        </div>);
      }
    else{
    return (
        <div>
            <AppBar />
            This is User Profile
            <button onClick={()=>signOut()}>Sign Out</button>
            <MadeWithLove />
        </div>
    )}
}

export default Profile;

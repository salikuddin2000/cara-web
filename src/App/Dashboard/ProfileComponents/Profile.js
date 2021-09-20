import React from 'react';
import {useUserUpdate} from  "../../Providers/caraUserProvider"
import AppBar from "../AppBarComponents/AppBar.js";
import MadeWithLove from '../MadeWithLove';

function Profile() {
    const signOut = useUserUpdate();

    return (
        <div>
            <AppBar />
            This is User Profile
            <button onClick={()=>signOut()}>Sign Out</button>
            <MadeWithLove />
        </div>
    )
}

export default Profile;

import React from 'react';
import {useUserUpdate} from  "../../Providers/caraUserProvider"

function Profile() {
    const signOut = useUserUpdate();

    return (
        <div>
            This is User Profile
            <button onClick={()=>signOut()}>Sign Out</button>
        </div>
    )
}

export default Profile;

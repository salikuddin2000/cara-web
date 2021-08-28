import React from 'react';
import {useCaraUser} from "../../Login/caraUserProvider";

function Home() {
    const { caraUser } = useCaraUser();
    if(caraUser===undefined){
        return(
            <h1>Loading</h1>
        )
    }
    else{
        return (       
            (caraUser === null)
            ?<h1>Welcome User</h1>
            :<h1>Welcome {caraUser.first_name}</h1>        
        )
    }
}

export default Home;

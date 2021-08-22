import React from 'react';
import {Link} from 'react-router-dom';

function WelcomeScreen() {
    // useEffect(() => {
    //     const flag = false;
    //     localStorage.setItem('flag',JSON.stringify(flag));
    // }, [])

    return (
        
            <Link to={{
                pathname : "/dashboard",
                state : { firstName : "User"}
            }}>Skip for Now</Link>
        
    )
}

export default WelcomeScreen

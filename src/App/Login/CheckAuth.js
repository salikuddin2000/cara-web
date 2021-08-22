import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
//import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function CheckAuth() {
    const [user, setUser] = useState(null);
    // const [firstTimeFlag, setFirstTimeFlag] = useState();
    const userState = () => {
      // const flag = localStorage.getItem("flag")
      const userdata = localStorage.getItem("user");
      const userObject = userdata !== null ? JSON.parse(userdata) : null;
      // setFirstTimeFlag(flag);
      setUser(userObject); 
    };
    useEffect(() => {
        userState();
      }, [])
    console.log(user);
    // console.log(firstTimeFlag)

    return (
        <div>
            {(user == null /*&& firstTimeFlag === true*/) 
                ?<Redirect to="/welcomeScreen" />
                :<Redirect
                    to={{
                      pathname: "/dashboard",
                      state: {user}
                    }}/>
            }
        </div>
    )
}

export default CheckAuth;

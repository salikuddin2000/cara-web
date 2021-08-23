import React,{useEffect,useState} from 'react'
import CheckAuth from './Login/CheckAuth';

function LoadFromLocalStorage() {
    const [user, setUser] = useState();
    const [firstTimeFlag, setFirstTimeFlag] = useState();
    const userState = () => {
      const flag = localStorage.getItem("flag")
      const userdata = localStorage.getItem("user");
      const flagParsed = flag !== null ? JSON.parse(flag) : true;
      const userObject = userdata !== null ? JSON.parse(userdata) : null;
      console.log(flag)
      console.log(flagParsed)
      setFirstTimeFlag(flagParsed);
      setUser(userObject); 
    };
    useEffect(() => {
        userState();
      }, [])

    console.log(user);
    console.log(firstTimeFlag);
    if(user !== undefined)
    return (
            <CheckAuth flag={firstTimeFlag} user={user} />
    )
    else{
      return(<h1>loading</h1>)
    }
}

export default LoadFromLocalStorage

import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './Dashboard/Home/Home';

function WelcomeScreen() {
    const [user, setUser] = useState(null);
  
    const userState = () => {
      const userdata = localStorage.getItem("user");
      const userObject = userdata !== null ? JSON.parse(userdata) : null;
      setUser(userObject); 
    };
    useEffect(() => {
        userState();
      }, [])
    console.log(user);

    //   let skipButton = (           
    //     <Router>
    //         <Link path="/home">Skip Login</Link>
    //     </Router>)
    return (
        <div>
            <h1>This is cara-web</h1>
            {(user == null) ?<Redirect
                path='/home'
                render={(props) => (
                    <Home {...props} isAuthed={"true"} />
  )}
/>: (<Home />)}
            <a href="/home">skip Login</a>
        </div>
    )
}

export default WelcomeScreen;

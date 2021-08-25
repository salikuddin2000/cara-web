import React from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import fire from "../firebase_config.js";

function WelcomeScreen(props) {

    const SignIn =() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        fire.auth().signInWithPopup(provider).then((result) => {
            const token = result.credential.accessToken;
            const user = result.user;
            console.log("in function sign in")

            const data ={
                storetoken: token,
                first_name: user.displayName.split(" ")[0],
                last_name: user.displayName.split(" ")[1],
                email:user.email,
                image: user.photoURL,
                uuid:user.uid,
                phone_number: null,
            }
            // localStorage.setItem('google_user',JSON.stringify(data));
            props.signIn(data);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(errorMessage);
            console.log(email)
            console.log(credential)
            console.log(errorCode)
        });
    }


    return (
        <>
        <button onClick={()=>(SignIn())}><div><span>Sign In with Google</span></div></button>
            <Link to={{
                pathname : "/dashboard",
                state : { firstName : "User"}
            }}>Skip for Now</Link>
        </>
        
    )
}

export default WelcomeScreen

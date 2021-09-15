import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import fire from "../firebase_config.js";
import upper_leaf from "../../../assets/upper_leaf.png";
import lower_leaf from "../../../assets/lower_leaf.png";
import hair_girl from "../../../assets/hair_girl.png";
import pole_man from "../../../assets/pole_man.png";
import google_logo from "../../../assets/google_logo.png";
import "./WelcomeScreen.css";

function WelcomeScreen(props) {
  const SignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    fire
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        console.log("in function sign in");

        const data = {
          storetoken: token,
          first_name: user.displayName.split(" ")[0],
          last_name: user.displayName.split(" ")[1],
          email: user.email,
          image: user.photoURL,
          uuid: user.uid,
          phone_number: null,
        };
        props.signIn(data);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
        console.log(errorCode);
      });
  };

  return (
    <div className="welcomeScreen">
      <img alt="backgroundImage" className="upperleaf" src={upper_leaf} />
      <img alt="backgroundImage" className="lowerleaf" src={lower_leaf} />
      <img alt="backgroundImage" className="hairgirl" src={hair_girl} />
      <img alt="backgroundImage" className="poleman" src={pole_man} />
      <h1>Cara</h1>
      <div className="loginAssets">
        <button onClick={() => SignIn()}>
          <div>
            <img alt="googleLogo" className="googleLogo" src={google_logo} />
            <span>Profile Sign In/Sign Up with Google</span>
          </div>
        </button>
        <span>or</span>
        <Link className="skipLink" to="/dashboard">
          Skip for now
        </Link>
      </div>
    </div>
  );
}

export default WelcomeScreen;

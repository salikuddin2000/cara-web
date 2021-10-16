import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const CaraUserContext = React.createContext();
const GoogleUserContext = React.createContext();
const UserUpdateContext = React.createContext();
const UserPostReqContext = React.createContext();

export function useCaraUser() {
  return useContext(CaraUserContext);
}
export function useGoogleUser() {
  return useContext(GoogleUserContext);
}
export function useUserPostReq() {
  return useContext(UserPostReqContext);
}
export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

export function CaraUserProvider({ children }) {
  const [caraUser, setCaraUser] = useState();
  const [googleUser, setGoogleUser] = useState();
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const [showPhoneScreen, setShowPhoneScreen] = useState(false);
  const [showDashboardScreen, setShowDashboardScreen] = useState(false);

  const userState = () => {
    const userdata = localStorage.getItem("cara_user");
    const userObject = userdata !== null ? JSON.parse(userdata) : null;
    // console.log(userObject);
    userdata !== null? setShowDashboardScreen(true):setShowDashboardScreen(false)
    setCaraUser(userObject);
  };

  useEffect(() => {
    userState();
  }, []);

  async function checkUserFromAPI(googleUser) {
    // console.log(googleUser);
    if (googleUser === undefined || googleUser === null) {
      // let nothing=0;
      // console.log("google user is: ", googleUser);
    } else {
      // let nothing=0;
      // console.log("google user is: ", googleUser);
      // console.log("google user phone number  is: ", googleUser.phone_number);
      await axios
        .get(
          `https://cara-api-01.herokuapp.com/api/v1/users/${googleUser.email}`
        )
        .then(async (response) => {
          // console.log(response.status);
          if (response.status === 200) {
            // console.log("Cara user found:");
            // console.log(response);
            setCaraUser(response.data);
            localStorage.setItem("cara_user", JSON.stringify(response.data));
            setShowDashboardScreen(true);
          }
        })
        .catch(async (err) => {
          setShowPhoneScreen(true);
          console.log("caught error : ", err);
          // console.log("No user found in database with these credentials...");
          // console.log("Creating new user...");
        });
    }
  }

  useEffect(() => {
    checkUserFromAPI(googleUser);
  }, [googleUser]);

  async function postGoogleUser(postUser) {
    await axios
      .post("https://cara-api-01.herokuapp.com/api/v1/users", {
        email_address: postUser.email,
        first_name: postUser.first_name,
        last_name: postUser.last_name,
        photo_url: postUser.image,
        phone_number: postUser.phone_number,
        zipcode: "462000",
      })
      .then((res) => {
        // console.log("Google User posted to db");
        // console.log(res);
        setCaraUser(res.data);
        localStorage.setItem("cara_user", JSON.stringify(res.data));
        setShowDashboardScreen(true);
      })
      .catch((e) => console.log("User not created with excepion" + e))
      // .then((res) => {
      //   console.log(res);
      // });
  }

  function signOut() {
    setGoogleUser(null);
    setCaraUser(null);
    localStorage.removeItem("cara_user");
    window.location = "/login";
  }

  return (
    <CaraUserContext.Provider value={{ caraUser, setCaraUser }}>
      <GoogleUserContext.Provider value={{ googleUser, setGoogleUser, showPhoneScreen, showDashboardScreen, setIsLoadingSignIn,isLoadingSignIn }}>
        <UserUpdateContext.Provider value={signOut}>
          <UserPostReqContext.Provider value={{ postGoogleUser }}>
            {children}
          </UserPostReqContext.Provider>
        </UserUpdateContext.Provider>
      </GoogleUserContext.Provider>
    </CaraUserContext.Provider>
  );
}

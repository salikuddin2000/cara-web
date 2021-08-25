import React,{useContext,useEffect,useState} from 'react';
import axios from 'axios';

const CaraUserContext =React.createContext()
const GoogleUserContext = React.createContext()
const UserUpdateContext= React.createContext()
const UserPostReqContext= React.createContext()

export function useCaraUser(){
    return useContext(CaraUserContext)
}
export function useGoogleUser(){
    return useContext(GoogleUserContext)
}
export function useUserPostReq(){
  return useContext(UserPostReqContext)
}
export function useUserUpdate(){
    return useContext(UserUpdateContext)
}


export function CaraUserProvider({children}) {

    const [caraUser,setCaraUser] = useState();
    const [googleUser,setGoogleUser] = useState();

    const userState = () => {
        //   const flag = localStorage.getItem("flag")
          const userdata = localStorage.getItem("cara_user");
        //   const flagParsed = flag !== null ? JSON.parse(flag) : true;
          const userObject = userdata !== null ? JSON.parse(userdata) : null;
        //   console.log(flag)
        //   console.log(flagParsed)
        //   setFirstTimeFlag(flagParsed);
        console.log(userObject)
          setCaraUser(userObject); 
        };

        useEffect(() => {
            userState();
          }, [])


    async function checkUserFromAPI  (googleUser){
        console.log(googleUser);
        if(googleUser ===undefined || googleUser ===null /* || googleUser.phone_number === null */){
            console.log("google user is: ", googleUser);
        }
        else{
            console.log("google user is: ", googleUser)
            console.log("google user phone number  is: ", googleUser.phone_number)
            await axios
            .get(`https://cara-api-01.herokuapp.com/api/v1/users/${googleUser.email}`)
            .then( async(response) => {              
              console.log(response.status);
              if(response.status === 200){
                  console.log("Cara user found:");
                  console.log(response);
                  setCaraUser(response.data);
                  localStorage.setItem('cara_user',JSON.stringify(response.data));
                }
              }              
            )
            .catch(async(err) => {
                console.log("caught error : ", err)
                // if(err === 404) {
                  // console.log("response msg is:", response.statusText)
                  console.log("No user found in database with these credentials...");
                  console.log("Creating new user...");  
                  
                  
                  //creating new user
                  // if(googleUser.phone_number !== null){
                  //   await axios
                  //     .post("https://cara-api-01.herokuapp.com/api/v1/users", {
                  //       email_address: googleUser.email,
                  //       first_name: googleUser.first_name,
                  //       last_name: googleUser.last_name,
                  //       photo_url: googleUser.image,
                  //       phone_number: googleUser.phone_number,
                  //       zipcode: "462000"
                  //     })      
                  //     .then((res) => {
                  //       console.log("Google User posted to db");
                  //       console.log(res);
                  //       localStorage.setItem('cara_user',JSON.stringify(res));
                  //       // window.location = "/"
                  //     }
                  //     )
                  //     .catch((e) => console.log("User not created with excepion"+e))
                  //     .then((res) => {
                  //       console.log(res);
                    
                  //     });    
                  //   }
                  //   else {
                  //     console.log("enter phone number")
                  //   }              
                // }
            }
            )
        }     
        // if(googleUser !==undefined && googleUser !==null && googleUser.phone_number !== null ){
        //   console.log("google user is: ", googleUser);
        //             await axios
        //               .post("https://cara-api-01.herokuapp.com/api/v1/users", {
        //                 email_address: googleUser.email,
        //                 first_name: googleUser.first_name,
        //                 last_name: googleUser.last_name,
        //                 photo_url: googleUser.image,
        //                 phone_number: googleUser.phone_number,
        //                 zipcode: "462000"
        //               })      
        //               .then((res) => {
        //                 console.log("Google User posted to db");
        //                 console.log(res);
        //                 localStorage.setItem('cara_user',JSON.stringify(res.data));
        //                 // window.location = "/"
        //               }
        //               )
        //               .catch((e) => console.log("User not created with excepion"+e))
        //               .then((res) => {
        //                 console.log(res);
                    
        //               });    
        //             }
      }  
      

      useEffect(() => {
        checkUserFromAPI(googleUser)
      }, [googleUser])

    //   if(googleUser !== undefined || googleUser.phone_number !== undefined || googleUser.phone_number !== null){
    //   useEffect(() => {
    //     checkUserFromAPI(googleUser)
    //   }, [googleUser])
    // }
      async function postGoogleUser(postUser){
        await axios
            .post("https://cara-api-01.herokuapp.com/api/v1/users", {
              email_address: postUser.email,
              first_name: postUser.first_name,
              last_name: postUser.last_name,
              photo_url: postUser.image,
              phone_number: postUser.phone_number,
              zipcode: "462000"
            })      
            .then((res) => {
              console.log("Google User posted to db");
              console.log(res);
              setCaraUser(res.data)
              localStorage.setItem('cara_user',JSON.stringify(res.data));
              // window.location = "/"
            }
            )
            .catch((e) => console.log("User not created with excepion"+e))
            .then((res) => {
              console.log(res);          
            });    
          }
      

      function signOut(){
        setGoogleUser(null);
        // setFirstTimeFlag(true)
        localStorage.removeItem("cara_user");
        window.location = "/"
    }


      return(
          <CaraUserContext.Provider value = {{caraUser,setCaraUser}}>
              <GoogleUserContext.Provider value = {{googleUser,setGoogleUser}}>
                  <UserUpdateContext.Provider value ={signOut}>
                    <UserPostReqContext.Provider value = {{postGoogleUser}}>
                      {children}
                    </UserPostReqContext.Provider>
                  </UserUpdateContext.Provider>
              </GoogleUserContext.Provider>
          </CaraUserContext.Provider>
      )
}
import React,{useContext,useEffect,useState} from 'react';
import axios from 'axios';

const CaraUserContext =React.createContext()
const GoogleUserContext = React.createContext()
const UserUpdateContext= React.createContext()

export function useCaraUser(){
    return useContext(CaraUserContext)
}
export function useGoogleUser(){
    return useContext(GoogleUserContext)
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
        if(googleUser ===undefined || googleUser ===null){
            console.log("google user is: ", googleUser);
        }
        else{
            console.log("google user is: ", googleUser.email)
            await axios
            .get(`https://cara-api-01.herokuapp.com/api/v1/users/${googleUser.email}`)
            .then( async(response) => {
              
                console.log("Cara user found:");
                console.log(response);
                setCaraUser(response);
                localStorage.setItem('cara_user',JSON.stringify(response.data));
            }
            )
            .catch(async () => {
              console.log("No user found in database with these credentials...");
              console.log("Creating new user...");
              
              //creating new user
                    await axios
                      .post("https://cara-api-01.herokuapp.com/api/v1/users", {
                        email_address: googleUser.email,
                        first_name: googleUser.first_name,
                        last_name: googleUser.last_name,
                        // uuid: googleUser.uuid,
                        photo_url: googleUser.image,
                        phone_number: "",
                        gender: "",
                        zipcode: ""
                    })
      
                      .then((res) => {
                        console.log("Google User posted to db", res);
                        // localStorage.setItem('created_user',JSON.stringify(data));
                        // window.location = "/"
                      }
                      )

                      .catch((e) => console.log("User not created with excepion"+e))
                      .then((res) => {
                        console.log(res);
                    
                      });
              }
              )
        }       
      }

      useEffect(() => {
        checkUserFromAPI(googleUser)
      }, [googleUser])

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
                      {children}
                  </UserUpdateContext.Provider>
              </GoogleUserContext.Provider>
          </CaraUserContext.Provider>
      )
}
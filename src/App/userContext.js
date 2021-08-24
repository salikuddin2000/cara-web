// import React,{useContext,useState,useEffect} from 'react'

// const UserContext = React.createContext()
// const UserUpdateContext= React.createContext()

// export function useUserUpdate(){
//     return useContext(UserUpdateContext)
// }
// export function useUser(){
//     return useContext(UserContext)
// }

// export function UserProvider({children}) {

//   const [googleUser, setGoogleUser] = useState();
//     // const [firstTimeFlag, setFirstTimeFlag] = useState();
//     const userState = () => {
//     //   const flag = localStorage.getItem("flag")
//       const userdata = localStorage.getItem("google_user");
//     //   const flagParsed = flag !== null ? JSON.parse(flag) : true;
//       const userObject = userdata !== null ? JSON.parse(userdata) : null;
//     //   console.log(flag)
//     //   console.log(flagParsed)
//     //   setFirstTimeFlag(flagParsed);
//     console.log(userObject)
//       setGoogleUser(userObject); 
//     };
//     useEffect(() => {
//         userState();
//       }, [])

//     function signOut(){
//         setGoogleUser(null);
//         // setFirstTimeFlag(true)
//         localStorage.removeItem("google_user");
//         window.location = "/"
//     }

//     return (
//         <UserContext.Provider value={{googleUser,setGoogleUser}}>
//             <UserUpdateContext.Provider value={signOut}>
//                 {children}
//             </UserUpdateContext.Provider>
//         </UserContext.Provider>
//     )
// }



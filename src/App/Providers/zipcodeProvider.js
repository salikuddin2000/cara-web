import React,{useState,useEffect,useContext} from "react";
// import axios from "axios";
import {useCaraUser} from "./caraUserProvider";

const ZipcodeContext = React.createContext();

export function useZipcode() {
    return useContext(ZipcodeContext);
  }

export function ZipcodeProvider ({children}){
    // const [ zipcodeVar,setZipcodeVar]=useState()
    const { caraUser,setCaraUser } = useCaraUser();
    const [zipcode,setZipcode]= useState("462000");
    
    
    function settingZipcode(caraUser){
        if(caraUser !== undefined && caraUser!==null){
            setZipcode(caraUser.zipcode)
            console.log("zipcode is setted : ", caraUser.zipcode)
        }
        else{
            console.log("zipcode is not setted yet")
        }
    }
    useEffect(() => {
        settingZipcode(caraUser)
    }, [caraUser])
    async function updateZipcode (newZipcode){
        if (caraUser===null){
            setZipcode(newZipcode)
        }
        else{
            //axios.patch
            caraUser.zipcode =newZipcode;
            setCaraUser(caraUser);
            localStorage.setItem("cara_user", JSON.stringify(caraUser));
            setZipcode(newZipcode)
        }

    }
    return(
        <ZipcodeContext.Provider value = {{zipcode,  setZipcode, updateZipcode}}>
            {children}
        </ZipcodeContext.Provider>
    )
}
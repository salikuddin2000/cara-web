import React,{useState,useEffect,useContext} from "react";
import axios from "axios";
import {useCaraUser} from "./caraUserProvider";

const ZipcodeContext = React.createContext();

export function useZipcode() {
    return useContext(ZipcodeContext);
  }

export function ZipcodeProvider ({children}){
    // const [ zipcodeVar,setZipcodeVar]=useState()
    const { caraUser,setCaraUser } = useCaraUser();
    const [zipcode,setZipcode]= useState();
    
    
    function settingZipcode(caraUser){
        if(caraUser !== undefined && caraUser!==null){
            // console.log(caraUser)
            setZipcode(caraUser.zipcode)
            // console.log("zipcode is setted : ", caraUser.zipcode)
        }
        else if(caraUser===null){
            setZipcode("462000")
        }
        else{
            // let nothing=0;
            // setZipcode("462000")
            // console.log("zipcode is not setted yet")
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
            axios.patch(`https://cara-api-01.herokuapp.com/api/v1/users/${caraUser.email_address}`, {
                zipcode: newZipcode,
              }
            )
            .then((res)=>{
                ""
                // console.log(res);
            })
            .catch(error => console.log(error))
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
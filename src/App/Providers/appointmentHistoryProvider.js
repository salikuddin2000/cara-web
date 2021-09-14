import axios from "axios";
import React,{useState,useEffect,useContext} from "react";
import { useCaraUser } from "./caraUserProvider";

const AppointmentHistoryContext = React.createContext();

export function useAppointmentHistoryList() {
    return useContext(AppointmentHistoryContext);
}

export function AppointmentHistoryProvider({children}){
    const {caraUser} = useCaraUser();
    const [appointmentList,setAppointmentList] = useState([]);

    async function setAppointmentHistory(user){
        if(user && user.email_address){
            await axios
                .get(`https://cara-api-01.herokuapp.com/api/v1/appointments/users/${user.email_address}`)
                .then((response) => {
                    // console.log(response.data);
                    setAppointmentList(Array.from(response.data))
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
    }
    useEffect(() =>{
        setAppointmentHistory(caraUser)
    },[caraUser])
    useEffect(() =>{
        console.log("history is ");

        console.log(appointmentList)
    },[appointmentList])


    return(
        <AppointmentHistoryContext.Provider value={{appointmentList}}>
            {children}
        </AppointmentHistoryContext.Provider>
    )
}
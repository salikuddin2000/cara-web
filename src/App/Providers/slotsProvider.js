import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { useCart } from './servicesCategoryProvider';

const SlotsContext=React.createContext();

export function useSlots(){
    return useContext(SlotsContext)
}

export function SlotsProvider({children}){
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate()
    const {cartSalonId}=useCart();
    const [selectedDate,setSelectedDate]=useState();
    const [selectedChair,setSelectedChair]=useState(null);
    const [slots,setSlots]=useState();
    async function getSlots(id,date,selectedChair){
        let url
        if(selectedChair===null){
            url=`https://cara-api-01.herokuapp.com/api/v1/appointments/slots/${id}/${date}`;
        }
        else{
            url=`https://cara-api-01.herokuapp.com/api/v1/appointments/slots/${id}/${date}/${selectedChair}`
        }
        if(cartSalonId && date){
        await axios
        .get(url)
        .then((response) => {
            console.log("slots found");
            console.log(response.data);
            setSlots(Array.from(response.data))
        })
        .catch((err)=>{
            console.log("no Slots Found with exception :");
            console.log(err)
        })
        }
    }
    useEffect(() => {
        getSlots(cartSalonId,selectedDate,selectedChair)
    }, [cartSalonId,selectedDate,selectedChair])
    useEffect(() => {
       setSelectedDate(datetime)
    }, [])
    useEffect(() => {
        console.log("datetime is :");
        console.log(selectedDate);
    }, [selectedDate])
    useEffect(() => {
        console.log("selected chair : ",selectedChair)
    }, [selectedChair])
    return(
        <SlotsContext.Provider value={{slots,setSelectedChair,selectedChair,setSelectedDate}}>
            {children}
        </SlotsContext.Provider>
    )
}
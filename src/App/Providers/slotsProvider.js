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
                + ((currentdate.getMonth()+1)<10 ? ("0"+(currentdate.getMonth()+1)):(currentdate.getMonth()+1))  + "-" 
                + (currentdate.getDate()<10 ? ("0"+currentdate.getDate()):(currentdate.getDate()))
    const {cartSalonId,serviceCart}=useCart();
    const [selectedDate,setSelectedDate]=useState();
    const [selectedChair,setSelectedChair]=useState(null);
    const [slots,setSlots]=useState();
    const [onLoading,setOnLoading]=useState(false);
    async function getSlots(id,date,selectedChair){
        let url
        if(selectedChair===null){
            url=`https://cara-api-01.herokuapp.com/api/v1/appointments/slots/${id}/${date}`;
        }
        else{
            url=`https://cara-api-01.herokuapp.com/api/v1/appointments/slots/${id}/${date}/${selectedChair}`
        }
        if(cartSalonId && date && serviceCart.length!==0){
            setOnLoading(true)
        await axios
        .get(url)
        .then((response) => {
            console.log("slots found");
            console.log(response.data);
            setSlots(Array.from(response.data))
            setOnLoading(false)
        })
        .catch((err)=>{
            console.log("no Slots Found with exception :");
            console.log(err)
            setOnLoading(false)
        })
        }
        else{
            setSlots([]);
        }
    }
    useEffect(() => {
        getSlots(cartSalonId,selectedDate,selectedChair)
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartSalonId,selectedDate,selectedChair])
    useEffect(() => {
       setSelectedDate(datetime)
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        console.log(selectedDate)
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate])
   
//    function setSlotsEmpty(serviceCart){
//        if(serviceCart.length===0){
//            setSlots([]);
//        }
//    }   
//     useEffect(()=>{
//         setSlotsEmpty(serviceCart)
//     },[serviceCart])

    useEffect(() => {
        console.log("datetime is :");
        console.log(selectedDate);
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate])
    useEffect(() => {
        console.log("selected chair : ",selectedChair)
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChair])
    return(
        <SlotsContext.Provider value={{slots,setSelectedChair,selectedChair,setSelectedDate,onLoading,selectedDate}}>
            {children}
        </SlotsContext.Provider>
    )
}
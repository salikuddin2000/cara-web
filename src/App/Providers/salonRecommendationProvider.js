import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import { useZipcode } from "./zipcodeProvider.js";

const SalonRecommendationContext = React.createContext();
export function useRecommendedSalonList(){
    return useContext(SalonRecommendationContext);
}

export function SalonRecommendationProvider({children}){
    const { zipcode } = useZipcode();
    const [ salonList, setSalonList ] =useState([])
    async function getSalons(pin){
        await axios
        .get(`https://cara-api-01.herokuapp.com/api/v1/recommendations/salons/${pin}`)
        .then((response) => {
            console.log("salons found");
            console.log(response.data);
            (response.data).map((salon) =>
                setSalonList([
                    ...salonList,
                    salonList[salonList.length] =
                    {
                        salon_id : salon.salon_id,
                        salon_logo : salon.logo,
                        salon_name: salon.salon_name,
                    }
                ])
            )

        })
        .catch(()=>{
            console.log("no Salons Found");
            setSalonList([{}]);
            console.log(salonList)
        })
    }
    useEffect(() => {
        getSalons(zipcode)
        console.log("salon list is");
        console.log(salonList);
    }, [zipcode])

    return(
        <SalonRecommendationContext.Provider value ={{salonList}}>
            {children}
        </SalonRecommendationContext.Provider>
    )

    
}

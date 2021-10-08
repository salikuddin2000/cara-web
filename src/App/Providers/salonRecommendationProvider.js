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
    const [ isLoading, setIsLoading ] =useState(true)

    async function getSalons(pin){
        setIsLoading(true)
        let url=""
        if(pin==="462000"){
            url="https://cara-api-01.herokuapp.com/api/v1/recommendations/salons"
        }
        else{
            url=`https://cara-api-01.herokuapp.com/api/v1/recommendations/salons/${pin}`
        }
        await axios
        .get(`${url}`)
        .then((response) => {
            salonList.splice(0, salonList.length);
            // console.log("");
            // console.log(response.data);
            (response.data).map((salon) =>
            setSalonList([
                ...salonList,
                salonList[salonList.length] =
                {
                    salon_id : salon.salon_id,
                    salon_logo : salon.logo,
                    salon_name: salon.salon_name,
                    star_rating: salon.average,
                }
            ])
            )
            setIsLoading(false)
        })
        .catch(()=>{
            // console.log("no Salons Found");
            salonList.splice(0, salonList.length)
            // console.log(salonList)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        getSalons(zipcode)
        // console.log("salon list is");
        // console.log(salonList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zipcode])

    return(
        <SalonRecommendationContext.Provider value ={{salonList,isLoading}}>
            {children}
        </SalonRecommendationContext.Provider>
    )

    
}

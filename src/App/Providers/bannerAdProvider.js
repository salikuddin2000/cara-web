import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import { useZipcode } from "./zipcodeProvider.js";

const BannerAdContext = React.createContext();

export function useSalonAdList(){
    return useContext(BannerAdContext);
}

export function BannerAdProvider({children}){
    const { zipcode } = useZipcode();
    const [ salonAdList, setSalonAdList ] =useState([])
    const [ isLoading, setIsLoading ] =useState(true)
    async function getSalonAds(pin){
        setIsLoading(true)
        await axios
        .get(`https://cara-api-01.herokuapp.com/api/v1/advertisments/upperbanner/${pin}`)
        .then((response) => {
            setSalonAdList(salonAdList.splice(0, salonAdList.length)) ;
            console.log("Ads found");
            console.log(response.data);
            (response.data).map((salonAd) =>
            setSalonAdList([
                ...salonAdList,
                salonAdList[salonAdList.length] =
                {
                    salon_id : salonAd.salon_id,
                    banner_position_number : salonAd.banner_position_number,
                    banner_url: salonAd.banner_url,
                }
            ])
            )
            setIsLoading(false)

        })
        .catch(()=>{
            console.log("no Ads Found");
            setSalonAdList(salonAdList.splice(0, salonAdList.length)) ;
            console.log(salonAdList)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        getSalonAds(zipcode)
        console.log("salon list is");
        console.log(salonAdList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zipcode])

    return(
        <BannerAdContext.Provider value ={{salonAdList,isLoading}}>
            {children}
        </BannerAdContext.Provider>
    )

    
}

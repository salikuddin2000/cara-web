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
    async function getSalonAds(pin){
        await axios
        .get(`https://cara-api-01.herokuapp.com/api/v1/advertisments/upperbanner/${pin}`)
        .then((response) => {
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

        })
        .catch(()=>{
            console.log("no Ads Found");
            setSalonAdList([{}]);
            console.log(salonAdList)
        })
    }
    useEffect(() => {
        getSalonAds(zipcode)
        console.log("salon list is");
        console.log(salonAdList);

    }, [zipcode])

    return(
        <BannerAdContext.Provider value ={{salonAdList}}>
            {children}
        </BannerAdContext.Provider>
    )

    
}

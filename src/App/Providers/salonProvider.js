import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';

const SalonContext = React.createContext()

export function useSalonInfo(){
    return useContext(SalonContext);
}

export function SalonProvider({children}){
    const [salonId,setSalonId] = useState();
    const [salonInfo,setSalonInfo]= useState({});
    const [isLoading, setIsLoading]=useState(true)

    async function setSalon(id){
        setIsLoading(true);
        if(salonId){
        await axios
        .get(`https://cara-api-01.herokuapp.com/api/v1/salons/${id}`)
            .then((response) => {
                console.log("salon found");
                console.log(response.data);
                
                setSalonInfo(
                    {
                        salon_id: response.data.salon_id,
                        salon_name: response.data.salon_name,
                        salon_address: response.data.address_line_one,
                        salon_categories: Array.from(response.data.categories)
                    }
                )
                setIsLoading(false)
            })
            .catch(()=>{
                console.log("no Salon info Found");
                console.log(salonInfo)
                setIsLoading(false)
            })
        }
        }
        useEffect(() => {
            setSalon(salonId)
            console.log("salon info is :");
            console.log(salonInfo);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [salonId])

    return(
        <SalonContext.Provider value={{salonId,setSalonId,salonInfo,isLoading}}>
            {children}
        </SalonContext.Provider>
    )
}
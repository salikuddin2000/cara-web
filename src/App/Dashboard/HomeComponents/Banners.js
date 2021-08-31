import React,{useState,useEffect} from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import { useSalonAdList } from '../../Providers/bannerAdProvider';

function Banners() {
    let match = useRouteMatch();
    const {salonAdList} = useSalonAdList();
    const [bannerList, setBannerList] = useState([])
    // if(salonAdList !==undefined){
    // let List= salonAdList.map((ad,index) =>
    //     <div>
    //         <img src={ad.banner_url} />
    //     </div>
    // )
    // setBannerList(List);
    // }
    function setList(salonAdList){
        if(salonAdList!==undefined){
            setBannerList(salonAdList.map((ad,index) =>
            <div>
                {ad===null ?"": <Link to={`${match.url}/salon`} ><img src={ad.banner_url} height="50" width="100" /></Link>}
            </div>
        ))
        }
    }
    useEffect(() => {
        setList(salonAdList)
    }, [salonAdList])

    return (
        <div>
            { bannerList }
        </div>
    )
}

export default Banners;

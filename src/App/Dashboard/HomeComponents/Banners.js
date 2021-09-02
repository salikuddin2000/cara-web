import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSalonAdList } from "../../Providers/bannerAdProvider";

function Banners() {
  let match = useRouteMatch();
  const { salonAdList,isLoading } = useSalonAdList();
  const [bannerList, setBannerList] = useState([]);

  function setList(salonAdList) {
    if (salonAdList !== undefined) {
      setBannerList(
        salonAdList.map((ad) => (          
            ad === undefined ||
            ad === null ||
            ad.length===0 ? (
              setBannerList(bannerList.splice(0, bannerList.length))
            ) : (<div key={ad.salon_id}>
              <Link
                to={{
                  pathname: `${match.url}/salon`,
                  state: {
                    id: ad.salon_id,
                  },
                }}
              >
                <img
                  src={ad.banner_url}
                  alt={`${ad.banner_position_number}`}
                  height="50"
                  width="100"
                />
              </Link>
                </div>
            )          
        ))
      );
    }
  }
  useEffect(() => {
    setList(salonAdList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salonAdList]);

  if(salonAdList === undefined || salonAdList=== null || salonAdList.length===0){
    if(isLoading===true) {return(<h3>Loading...</h3>)}
    else{return(<h3>No ads Found</h3> )}
  }
  else return <div>{bannerList}</div>;
}

export default Banners;

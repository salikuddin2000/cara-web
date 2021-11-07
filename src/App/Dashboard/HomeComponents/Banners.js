import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSalonAdList } from "../../Providers/bannerAdProvider";
import { BeatLoader } from "react-spinners";
import Slider from "infinite-react-carousel";

function Banners() {
  let match = useRouteMatch();
  const { salonAdList, isLoading } = useSalonAdList();
  const [bannerList, setBannerList] = useState([]);

  function setList(salonAdList) {
    if(salonAdList&&salonAdList===[]){
      setBannerList([])
    }
    // console.log(salonAdList)
    // console.log(bannerList)
    if (salonAdList !== undefined&&salonAdList!==[]) {
      setBannerList(
        salonAdList.map((ad,index) =>
          ad === undefined || ad === null || ad.length === 0 ? (
            setBannerList(bannerList.splice(0, bannerList.length))
          ) : (
            <div key={index}>
              {ad.salon_id !== undefined?
              <Link
              to={{
                pathname: `${match.url}/salon`,
                state: {
                  id: ad.salon_id,
                },
              }}
              >
                <img className="carouselImage"
                  src={ad.banner_url}
                  alt={`${ad.banner_position_number}`}
                  height="50"
                  width="100"
                />
              </Link>
              :
              <img className="carouselImage"
                src={ad.banner_url}
                alt={`${ad.banner_position_number}`}
                height="50"
                width="100"
              />
              }
            </div>
          )
        )
      );
    }
  }
  useEffect(() => {
    setList(salonAdList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salonAdList]);

  if (
    salonAdList === undefined ||
    salonAdList === null ||
    salonAdList.length === 0||salonAdList===[]
  ) {
    if (isLoading === true) {
      return (
        <>
          <br />
          <div className="beatLoader">
          <BeatLoader loading color="#796AC8" size={14}/>
          </div>
        </>
      );
    } else {
      return <h4>No ads Found</h4>;
    }
  } else return bannerList && bannerList.length !== 0 && bannerList[salonAdList.length-1] ?<>{/* {console.log(bannerList)} */}{/* {console.log(salonAdList)} */}<Slider arrows={false} autoplay autoplaySpeed={5000} duration={250} className="banners">{bannerList}</Slider></>:"";
}

export default Banners;

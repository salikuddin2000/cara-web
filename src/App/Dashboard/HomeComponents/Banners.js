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
    if (salonAdList !== undefined) {
      setBannerList(
        salonAdList.map((ad) =>
          ad === undefined || ad === null || ad.length === 0 ? (
            setBannerList(bannerList.splice(0, bannerList.length))
          ) : (
            <div key={ad.salon_id}>
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
    salonAdList.length === 0
  ) {
    if (isLoading === true) {
      return (
        <>
          <br />
          <BeatLoader loading color="#796AC8" />
        </>
      );
    } else {
      return <h4>No ads Found</h4>;
    }
  } else return bannerList && bannerList.length !== 0 && bannerList[5] ?<>{console.log(bannerList)}<Slider arrows={false} autoplay autoplaySpeed={5000} duration={350} className="banners">{bannerList}</Slider></>:"";
}

export default Banners;

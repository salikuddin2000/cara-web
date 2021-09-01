import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSalonAdList } from "../../Providers/bannerAdProvider";

function Banners() {
  let match = useRouteMatch();
  const { salonAdList } = useSalonAdList();
  const [bannerList, setBannerList] = useState([]);

  function setList(salonAdList) {
    if (salonAdList !== undefined) {
      setBannerList(
        salonAdList.map((ad) => (
          <div key={ad.salon_id}>
            {ad === undefined ||
            ad === null ||
            ad.banner_position_number === undefined ? (
              ""
            ) : (
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
            )}
          </div>
        ))
      );
    }
  }
  useEffect(() => {
    setList(salonAdList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salonAdList]);

  return <div>{bannerList}</div>;
}

export default Banners;

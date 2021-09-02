import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useRecommendedSalonList } from "../../Providers/salonRecommendationProvider";

function RecommendationsSection() {
  let match = useRouteMatch();
  const { salonList,isLoading } = useRecommendedSalonList();
  const [recommendationList, setRecommendationList] = useState([]);

  function setList(salonList) {
    if (salonList !== undefined) {
      setRecommendationList(
        salonList.map((salon) => (
          <div key={`${salon.salon_id}`}>
            {salon === undefined ||
            salon === null ||
            salon.salon_logo === undefined ? (
              setRecommendationList(recommendationList.splice(0, recommendationList.length))
            ) : (
              <Link
                to={{
                  pathname: `${match.url}/salon`,
                  state: {
                    id: salon.salon_id,
                  },
                }}
              >
                <img
                  src={salon.salon_logo}
                  alt={`${salon.salon_name}`}
                  height="50"
                  width="100"
                />
                <h5>{salon.salon_name}</h5>
                <h6>{salon.star_rating}</h6>{" "}
              </Link>
            )}
          </div>
        ))
      );
    }
  }
  useEffect(() => {
    setList(salonList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salonList]);

  if(salonList === undefined || salonList=== null || salonList.length===0){
    if(isLoading===true) {return(<h3>Loading...</h3>)}
    else{return(<h3>No recommendations Found</h3> )}
  }
  else {return (
    <div>
        {recommendationList}
    </div>
  );
  }
}

export default RecommendationsSection;

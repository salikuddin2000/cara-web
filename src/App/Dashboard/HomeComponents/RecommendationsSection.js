import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useRecommendedSalonList } from "../../Providers/salonRecommendationProvider";
import { BeatLoader } from "react-spinners";
import arrow from "../../../assets/arrow.svg";
import "./home.css";

function RecommendationsSection() {
  let match = useRouteMatch();
  const { salonList, isLoading } = useRecommendedSalonList();
  const [recommendationList, setRecommendationList] = useState([]);

  function setList(salonList) {
    if (salonList !== undefined) {
      setRecommendationList(
        salonList.map((salon) => (
          <div className="recommendationsCard" key={`${salon.salon_id}`}>
            {salon === undefined ||
            salon === null ||
            salon.salon_logo === undefined ? (
              setRecommendationList(
                recommendationList.splice(0, recommendationList.length)
              )
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
                <div>Open <img src={arrow}/></div>
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

  if (salonList === undefined || salonList === null || salonList.length === 0) {
    if (isLoading === true) {
      return (
        <>
          <br />
          <BeatLoader loading color="#796AC8" />
        </>
      );
    } else {
      return <h4>No recommendations Found</h4>;
    }
  } else {
    return <div className="recommendations">{recommendationList}</div>;
  }
}

export default RecommendationsSection;

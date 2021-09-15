import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSalonSearch } from "../../Providers/salonSearchProvider.js";
import {BeatLoader} from 'react-spinners';

function SearchBar() {
  const { searchWord, setSearchWord, salons, loadingSearch } = useSalonSearch();
  const [searchList, setSearchList] = useState();
  let match = useRouteMatch();
  function handle(e) {
    const newinfo = { ...searchWord };
    newinfo[e.target.id] = e.target.value;
    setSearchWord(newinfo);
    console.log(newinfo);
  }

  function setList(salons) {
    if (salons !== undefined) {
      setSearchList(
        salons.map((salon) => (
          <div key={`${salon.salon_id}`}>
            {salon === undefined ||
            salon === null ||
            salon.salon_id === undefined ? (
              ""
            ) : (
              <Link
                to={{
                  pathname: `${match.url}/salon`,
                  state: {
                    id: salon.salon_id,
                  },
                }}
              >
                {/* <img
                  src={salon.salon_logo}
                  alt={`${salon.salon_name}`}
                  height="50"
                  width="100"
                /> */}
                <h5>{salon.salon_name}</h5>
                <h6>{salon.address_line_one}</h6>
                <h6>{salon.salon_type}</h6>
              </Link>
            )}
          </div>
        ))
      );
    }
  }
  useEffect(() => {
    setList(salons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salons]);
  return (
    <>
      <input
        type="text"
        placeholder="       Search here"
        id="word"
        onChange={(e) => handle(e)}
        value={searchWord.word}
      />
      {console.log("searchword is", searchWord.word)}
      {searchWord.word.length !== 0 && searchWord !== "" ? (
        loadingSearch === true ? (
          <><br /><BeatLoader loading color='#796AC8' /></>
        ) : salons.length !== 0 ? (
          <div>{searchList}</div>
        ) : (
          <h5>No Salons Found with this name</h5>
        )
      ) : (
        ""
      )}
    </>
  );
}

export default SearchBar;

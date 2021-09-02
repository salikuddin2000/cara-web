import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

///api/v1/search/salons/:keyword

const SalonSearchContext = React.createContext();

export function useSalonSearch() {
  return useContext(SalonSearchContext);
}

export function SalonSearchProvider({ children }) {
  const [searchWord, setSearchWord] = useState({
    word: "",
  });
  const [salons, setSalons] = useState([{}]);
  const [loadingSearch,setLoadingSearch] = useState(true);

  async function getSalons(word) {
    if (searchWord.word.length !== 0) {
      setLoadingSearch(true);
      await axios
        .get(`https://cara-api-01.herokuapp.com/api/v1/search/salons/${word}`)
        .then((response) => {
          salons.splice(0, salons.length);
          console.log("salon found in search");
          console.log(response.data);
          response.data.map((salon) =>
            setSalons([
              ...salons,
              (salons[salons.length] = {
                salon_id: salon.salon_id,
                salon_name: salon.salon_name,
                salon_type: salon.salon_type,
                address_line_one: salon.address_line_one,
              }),
            ])
            );
            setLoadingSearch(false);
        })
        .catch(() => {
          console.log("no salons list Found");
          salons.splice(0, salons.length);
          setLoadingSearch(false);
          console.log(salons);
        });
    }
  }
  useEffect(() => {
    getSalons(searchWord.word);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord]);

  return (
    <SalonSearchContext.Provider value={{ searchWord, setSearchWord, salons, loadingSearch }}>
      {children}
    </SalonSearchContext.Provider>
  );
}

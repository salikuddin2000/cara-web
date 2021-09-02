import React from "react";
import { useCaraUser } from "../../Providers/caraUserProvider.js";
import { useSalonSearch } from "../../Providers/salonSearchProvider.js";
import AppBarTwo from "../AppBarComponents/AppBarTwo.js";
import Banners from "./Banners.js";
import RecommendationsSection from "./RecommendationsSection.js";
import SearchBar from "./SearchBar.js";

function Home() {
  const { caraUser } = useCaraUser();
  const { searchWord } = useSalonSearch();

  if (caraUser === undefined) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    return (
      <>
        {caraUser === null ? (
          <>
            <AppBarTwo /> <h1>Welcome User</h1>
            <SearchBar />
            {searchWord.word.length === 0 ? (
              <>
                <Banners />
                <RecommendationsSection />
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <AppBarTwo />
            <SearchBar />
            <h1>Welcome {caraUser.first_name}</h1>
            {searchWord.word.length === 0 ? (
              <>
                <Banners />
                <RecommendationsSection />
              </>
            ) : (
              ""
            )}
          </>
        )}
      </>
    );
  }
}

export default Home;

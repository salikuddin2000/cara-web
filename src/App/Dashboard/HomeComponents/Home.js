import React from "react";
import { useCaraUser } from "../../Providers/caraUserProvider.js";
import { useSalonSearch } from "../../Providers/salonSearchProvider.js";
import AppBarTwo from "../AppBarComponents/AppBarTwo.js";
import Banners from "./Banners.js";
import RecommendationsSection from "./RecommendationsSection.js";
import SearchBar from "./SearchBar.js";
import {BeatLoader} from 'react-spinners';

function Home() {
  const { caraUser } = useCaraUser();
  const { searchWord } = useSalonSearch();

  if (caraUser === undefined) {
    return (
      <>
        <BeatLoader loading color="#796AC8" />{" "}
      </>
    );
  } else {
    return (
      <>
        {caraUser === null ? (
          <>
            <AppBarTwo /> <h2>Hello User,<br />Welcome Back</h2>
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
            <h2>Hello {caraUser.first_name},<br />Welcome Back</h2>
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

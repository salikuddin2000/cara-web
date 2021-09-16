import React from "react";
import { useCaraUser } from "../../Providers/caraUserProvider.js";
import { useSalonSearch } from "../../Providers/salonSearchProvider.js";
import AppBarTwo from "../AppBarComponents/AppBarTwo.js";
import Banners from "./Banners.js";
import RecommendationsSection from "./RecommendationsSection.js";
import SearchBar from "./SearchBar.js";
import {BeatLoader} from 'react-spinners';
import "./home.css";

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
      <div className="home">
        {caraUser === null ? (
          <>
            <AppBarTwo /> <h3>Hello User,</h3><h2><br />Welcome Back</h2>
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
            <h3>Hello {caraUser.first_name},</h3><h2><br />Welcome Back</h2>
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
        )}
      </div>
    );
  }
}

export default Home;

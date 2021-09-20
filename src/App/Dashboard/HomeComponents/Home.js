import React from "react";
import { useCaraUser } from "../../Providers/caraUserProvider.js";
import { useSalonSearch } from "../../Providers/salonSearchProvider.js";
import AppBarTwo from "../AppBarComponents/AppBarTwo.js";
import Banners from "./Banners.js";
import RecommendationsSection from "./RecommendationsSection.js";
import SearchBar from "./SearchBar.js";
import { BeatLoader } from "react-spinners";
import heart from "../../../assets/heart.svg";
import "./home.css";
import MadeWithLove from "../MadeWithLove.js";

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
            <AppBarTwo /> <h3>Hello User,</h3>
            <h2>
              <br />
              Welcome Back!
            </h2>
            <SearchBar />
            {searchWord.word.length === 0 ? (
              <>
                <h4>Sponsored</h4>
                <Banners />
                <h4>Recommended Salons</h4>
                <RecommendationsSection />
                <MadeWithLove />
                {/* <h6 className="madeWithLove">Made with <img alt="heart" src={heart} /><br />For all fashionable folks.</h6>                        */}
                {/* <h6>Made with love</h6> */}
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <AppBarTwo />
            <h3>Hello {caraUser.first_name},</h3>
            <h2>
              <br />
              Welcome Back!
            </h2>
            <SearchBar />
            {searchWord.word.length === 0 ? (
              <>
                <h4>Sponsored</h4>
                <Banners />
                <h4>Recommended Salons</h4>
                <RecommendationsSection />
                <MadeWithLove />
                {/* <h6 className="madeWithLove">Made with <img alt="heart" src={heart} /><br />For all fashionable folks.</h6> */}
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

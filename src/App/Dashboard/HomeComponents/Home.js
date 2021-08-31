import React from "react";
import { useCaraUser } from "../../Providers/caraUserProvider.js";
import AppBarTwo from "../AppBarComponents/AppBarTwo.js";
import Banners from "./Banners.js";

function Home() {
  const { caraUser } = useCaraUser();

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
            <Banners />
          </>
        ) : (
          <>
            <AppBarTwo />
            <h1>Welcome {caraUser.first_name}</h1>
            <Banners />
          </>
        )}
      </>
    );
  }
}

export default Home;

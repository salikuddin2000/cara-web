import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom";
import Home from "./HomeComponents/Home.js";
import Cart from "./CartComponents/Cart.js";
import Profile from "./ProfileComponents/Profile.js";
import NavComponent from "./NavComponent.js";

function DashboarRoutes() {
  let match = useRouteMatch();
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path={`${match.path}`} component={Home} />
          <Route exact={true} path={`${match.path}cart`} component={Cart} />
          <Route
            exact={true}
            path={`${match.path}profile`}
            component={Profile}
          />
        </Switch>
        <Route  path={match.path}>
          <NavComponent />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default DashboarRoutes;

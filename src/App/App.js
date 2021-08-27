import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "./Dashboard/DashboardRoutes.js";
import CheckAuth from "./Login/CheckAuth";
import { CaraUserProvider } from "./Login/caraUserProvider";

function App() {
  return (
    <div className="App">
      <Switch>
        <CaraUserProvider>
          <Route exact={true} path="/" component={CheckAuth} />
          <Route path="/dashboard/" component={Dashboard} />
        </CaraUserProvider>
      </Switch>
    </div>
  );
}

export default withRouter(App);

import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "./Dashboard/DashboardRoutes.js";
import CheckAuth from "./Login/CheckAuth";
import { CaraUserProvider } from "./Providers/caraUserProvider";
import { ZipcodeProvider } from "./Providers/zipcodeProvider";
import Modal from "react-modal";


Modal.setAppElement('#root')
function App() {
  return (
    <div className="App">
      <Switch>
        <CaraUserProvider>
          <ZipcodeProvider>
            <Route exact={true} path="/" component={CheckAuth} />
          <Route path="/dashboard/" component={Dashboard} />
          </ZipcodeProvider>
        </CaraUserProvider>
      </Switch>
    </div>
  );
}

export default withRouter(App);

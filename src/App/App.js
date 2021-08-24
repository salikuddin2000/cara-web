import './App.css';
import {Route,Switch,withRouter} from 'react-router-dom';
import Dashboard from "./Dashboard/DashboardRoutes.js";
// import LoadFromLocalStorage from './LoadFromLocalStorage';
import WelcomeScreen from './Login/Components/WelcomeScreen';
import CheckAuth from './Login/CheckAuth';
// import { UserProvider } from "./userContext";
import {CaraUserProvider} from "./Login/caraUserProvider"

function App() {
  return (
    <div className="App">
        <Switch>
          <CaraUserProvider>
          {/* <UserProvider> */}
          <Route exact={true} path="/" component ={CheckAuth} />
          {/* <Route exact={true} path="/welcomescreen" component ={WelcomeScreen} /> */}
          {/* <Route exact={true} path="/checkAuth" component ={CheckAuth} /> */}
          <Route path="/dashboard/" component = {Dashboard} />
          {/* </UserProvider> */}
          </CaraUserProvider>
        </Switch> 
    </div>
  );
}

export default withRouter(App);

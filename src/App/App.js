import './App.css';
import {Route,Switch,withRouter} from 'react-router-dom';
import Dashboard from "./Dashboard/DashboardRoutes.js";
import CheckAuth from "./Login/CheckAuth.js";
import WelcomeScreen from './Login/Components/WelcomeScreen';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact={true} path="/" component ={CheckAuth} />
          <Route exact={true} path="/welcomescreen" component ={WelcomeScreen} />
          <Route path="/dashboard/" component = {Dashboard} />
        </Switch> 
    </div>
  );
}

export default withRouter(App);

import './App.css';
import {Route,Switch,withRouter} from 'react-router-dom';
import Dashboard from "./Dashboard/DashboardRoutes.js";
import LoadFromLocalStorage from './LoadFromLocalStorage';
import WelcomeScreen from './Login/Components/WelcomeScreen';
import CheckAuth from './Login/CheckAuth';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact={true} path="/" component ={LoadFromLocalStorage} />
          <Route exact={true} path="/welcomescreen" component ={WelcomeScreen} />
          <Route exact={true} path="/checkAuth" component ={CheckAuth} />
          <Route path="/dashboard/" component = {Dashboard} />
        </Switch> 
    </div>
  );
}

export default withRouter(App);

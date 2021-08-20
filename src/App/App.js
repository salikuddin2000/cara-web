import './App.css';
import WelcomeScreen from './Welcome_screen/WelcomeScreen';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Welcome_screen/Dashboard/Home/Home';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component ={WelcomeScreen} />
          <Route path="/home" exact component ={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

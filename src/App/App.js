import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "./Dashboard/DashboardRoutes.js";
import CheckAuth from "./Login/CheckAuth";
import { CaraUserProvider } from "./Providers/caraUserProvider";
import { ZipcodeProvider } from "./Providers/zipcodeProvider";
import { BannerAdProvider } from "./Providers/bannerAdProvider";
import { SalonRecommendationProvider } from "./Providers/salonRecommendationProvider";
import { SalonSearchProvider } from "./Providers/salonSearchProvider";
import { SalonProvider } from "./Providers/salonProvider";
import { ServicesCategoryProvider } from "./Providers/servicesCategoryProvider";
import Modal from "react-modal";

Modal.setAppElement("#root");
function App() {
  return (
    <div className="App">
      <Switch>
        <CaraUserProvider>
          <ZipcodeProvider>
            <BannerAdProvider>
              <SalonRecommendationProvider>
                <SalonSearchProvider>
                  <SalonProvider>
                    <ServicesCategoryProvider>
                      <Route exact={true} path="/" component={CheckAuth} />
                      <Route path="/dashboard/" component={Dashboard} />
                    </ServicesCategoryProvider>
                  </SalonProvider>
                </SalonSearchProvider>
              </SalonRecommendationProvider>
            </BannerAdProvider>
          </ZipcodeProvider>
        </CaraUserProvider>
      </Switch>
    </div>
  );
}

export default withRouter(App);

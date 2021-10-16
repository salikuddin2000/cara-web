import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import Dashboard from "./Dashboard/DashboardRoutes.js";
import CheckAuth from "./Login/CheckAuth";
import { CaraUserProvider } from "./Providers/caraUserProvider";
import { ZipcodeProvider } from "./Providers/zipcodeProvider";
import { BannerAdProvider } from "./Providers/bannerAdProvider";
import { SalonRecommendationProvider } from "./Providers/salonRecommendationProvider";
import { SalonSearchProvider } from "./Providers/salonSearchProvider";
import { SalonProvider } from "./Providers/salonProvider";
import { ServicesCategoryProvider } from "./Providers/servicesCategoryProvider";
import { SlotsProvider } from "./Providers/slotsProvider";
import { BookingDetailsProvider } from "./Providers/bookingDetails";
import { AppointmentHistoryProvider } from "./Providers/appointmentHistoryProvider";
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
                      <SlotsProvider>
                        <BookingDetailsProvider>
                          <AppointmentHistoryProvider>
                            <Route exact={true} path="/" component={LandingPage} />
                            <Route
                              exact={true}
                              path="/login"
                              component={CheckAuth}
                            />
                            <Route path="/dashboard/" component={Dashboard} />
                          </AppointmentHistoryProvider>
                        </BookingDetailsProvider>
                      </SlotsProvider>
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

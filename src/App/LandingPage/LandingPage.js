import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Modal from "react-modal";
import Slider from "react-slick";
import { useCaraUser } from "../Providers/caraUserProvider.js";
import coming_soon from "../../assets/coming_soon.svg";
import salonView from "../../assets/salon_view.svg";
import salonGirl from "../../assets/salon_girl.svg";
import salonInterior from "../../assets/salon_interior.svg";
// import android from "../../assets/android.svg";
// import apple from "../../assets/apple.svg";
import search_salons from "../../assets/search_salons.png";
import services from "../../assets/services.svg";
import book_appointment from "../../assets/book_appointment.svg";
import schedule_appointments from "../../assets/schedule_appointments.svg";
import no_wait from "../../assets/no_wait.svg";
import search_compare from "../../assets/search_compare.svg";
import know_salons from "../../assets/know_salons.svg";
import heart from "../../assets/heart.svg"; 
import instagram from "../../assets/instagram.svg"; 
import facebook from "../../assets/facebook.svg"; 
import linkedin from "../../assets/linkedin.svg"; 
// import upperLeaf from "../../assets/upper_leaf.svg"
import $ from "jquery";
import "./LandingPage.css";

function LandingPage() {
  const { caraUser } = useCaraUser();
  const [validity, setValidity] = useState();
  const [modalIsOpen, setModalIsOpen] = useState();
  var d1 = new Date("2021-11-24"); //yyyy-mm-dd
  var today = new Date();
  function assignValidity() {
    if (today < d1) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  }

  useEffect(() => {
    assignValidity();
    // eslint-disable-next-line
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    arrows: false,
    className: "verticalSlickDiv",
    useCSS: true,
    zIndex: -1000,
    // centerMode:true,
  };

  if (caraUser === undefined || caraUser === null) {
    $(document).on("scroll", function () {
      if ($(document).scrollTop() > 1) {
        $("h1").addClass("shrunk");

        $("header").addClass("headerShadow");
      } else {
        $("h1").removeClass("shrunk");
        $("header").removeClass("headerShadow");
      }
    });
    return (
      <div className="landingPage">
        <div className="header" id="header">
          <header className="headerBorder">
            <a href="#header">
              <h1 className="nonShrunk">Cara</h1>
            </a>
            {validity === undefined || validity === true ? (
              <>
                <Link
                  className="getStarted"
                  onClick={() => {
                    setModalIsOpen(true);
                  }}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link to="/login" className="getStarted">
                Get Started
              </Link>
            )}
            <Modal
              isOpen={modalIsOpen}
              className="startModal"
              overlayClassName="startModalOverlay"
              onRequestClose={() => {
                setModalIsOpen(false);
              }}
            >
              <div className="startModalDiv">
                <img src={coming_soon} alt="coming_soon" />
                <h5>Coming soon</h5>
                <br />
              </div>
            </Modal>
          </header>
        </div>
        {/* <img className="upperLeaf" src={upperLeaf} alt="upper leaf" /> */}
        <section className="contentWrapper">
          <div id="sliderWrapper">
            <Slider {...settings}>
              <div>
                <h3>Date night?</h3>
              </div>
              <div>
                <h3>Interview Tomorrow?</h3>
              </div>
              <div>
                <h3>Worried about ambiance?</h3>
              </div>
              <div>
                <h3>Want to impress someone?</h3>
              </div>
              <div>
                <h3>Fashion emergency?</h3>
              </div>
            </Slider>
          </div>
          <h2 className="answerHeading">Discover the best salons in</h2>
          <h1 className="cityState">Bhopal, MP</h1>
          {/* <br /> */}
          <img className="salonView" src={salonView} alt="waiting line" />
          {/* <h5 className="waitText">Wait No More!</h5> */}
          <p>
            <b className="caraInPara">Cara</b> is an online appointment booking
            app for salons & spas.
          </p>
          <div className="ellipse">
            <h5 className="nowText">BENEFITS</h5>
            <div className="card">
              <img src={schedule_appointments} alt="benefits" /><br />
              <span>Schedule Appointments</span>
            </div>
            <div className="card">
              <img src={no_wait} alt="benefits" /><br />
              <span>No more wait for haircuts</span>
            </div>
            <div className="card">
              <img src={search_compare} alt="benefits" /><br />
              <span>Search and compare salons</span>
            </div>
            <div className="card">
              <img src={know_salons} alt="benefits" /><br />
              <span>Know all about salons</span>
            </div>
          </div>
          <img className="salonGirl" src={salonGirl} alt="girl" />
          <h5>3 Easy Steps</h5>
          <ol>
            <li>1) Choose your Salon</li>
            <section>
              {/* <div className="android">
                Android <img src={android} alt="android" />
              </div>
              <div className="apple">
                IOS <img src={apple} alt="android" />
              </div> */}
              <img
                className="search_salons"
                src={search_salons}
                alt="salon list"
              />
            </section>
            <li className="secondStep">2) Select Services</li>
            <img className="services" src={services} alt="select services" />
            <li>
              3) Select artist & time and
              <br />
              Click on Book Appointment
            </li>
            <img
              className="book_appointment"
              src={book_appointment}
              alt="book appointment"
            />
          </ol>
          <p>
            <b>That's it..</b>
          </p>
          <img className="salonInterior" src={salonInterior} alt="salon" />
          <br />
          {validity === undefined || validity === true ? (
            <>
              <Link
                className="bottomGetStarted"
                onClick={() => {
                  setModalIsOpen(true);
                }}
              >
                Get Started
              </Link>
            </>
          ) : (
            <Link to="/login" className="bottomGetStarted">
              Get Started
            </Link>
          )}
          <br />
          <br />
          <br />
          {/* <div className="temp"></div> */}
          <div className="footer">
          <h6 className="landingPageMadeWithLove">Made with <img className="heartStyle" alt="heart" src={heart} /><br />For all fashionable folks.</h6>
          <span><a href = "mailto:support@carasalons.in">support@carasalons.in</a> | <a href="tel:+919589198950">+91 95891 98950</a></span>
          <br />
          <a href="https://www.instagram.com/carasalons"><img className="imgLink" src={instagram} alt="instagram link"/></a>
          <a href="https://www.facebook.com/carasalons"><img className="imgLink" src={facebook} alt="facebook link"/></a>
          <a href="https://www.linkedin.com/company/carasalons"><img className="imgLink" src={linkedin} alt="linkedin link"/></a>
          <br />
          <span className="copyright">© 2021 <b>Cara</b>. All rights reserved.</span>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <>
        {console.log(caraUser)}
        <Redirect to="/login" />
      </>
    );
  }
}

export default LandingPage;

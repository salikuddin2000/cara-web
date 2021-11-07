import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Modal from "react-modal";
import Slider from "react-slick";
import { useCaraUser } from "../Providers/caraUserProvider.js";
import salonView from "../../assets/salon_view.svg";
import salonGirl from "../../assets/salon_girl.svg";
import salonInterior from "../../assets/salon_interior.svg";
// import android from "../../assets/android.svg";
// import apple from "../../assets/apple.svg";
import search_salons from "../../assets/search_salons.svg";
import services from "../../assets/services.svg";
import book_appointment from "../../assets/book_appointment.svg";
// import upperLeaf from "../../assets/upper_leaf.svg"
import $ from "jquery";
import "./LandingPage.css";

function LandingPage() {
  const { caraUser } = useCaraUser();
  const [validity, setValidity] = useState();
  const [modalIsOpen, setModalIsOpen] = useState();
  var d1 = new Date("2021-09-24"); //yyyy-mm-dd
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
            <a href="#header"><h1 className="nonShrunk">Cara</h1></a>
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
            <div className="modalDiv">
              <h5>Our App will release soon</h5>
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
          <h5 className="waitText">Wait No More!</h5>
          <div className="ellipse"></div>
          <p>
            <b>Cara</b> is an appointment booking App for Salons & Spas. Explore and
            choose the best service & time for you.
          </p>
          <h5 className="nowText">Now with Cara</h5>
          <ul>
            <li>- Save time scheduling appointments. </li>
            <li>- Select time as per your convenience.</li>
            <li>- No more waiting in Salons for Haircuts.</li>
            <li>- Search and compare salons & spas for you.</li>
            <li>- Know all information for your service.</li>
          </ul>
          <img className="salonGirl" src={salonGirl} alt="girl" />
          <h5>3 steps for you</h5>
          <ol>
            <li>1) Install cara app and choose your salon</li>
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
            <li className="secondStep">
              2) Select Services
            </li>
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

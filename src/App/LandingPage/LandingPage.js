import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Modal from "react-modal";
import Slider from "react-slick";
import { useCaraUser } from "../Providers/caraUserProvider.js";
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
    return (
      <div>
        <section className="header" id="header">
          <h1 className="caraHeading" id="caraHeading">Cara</h1>
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
        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => {
            setModalIsOpen(false);
          }}
        >
          <div className="confirmModalDiv">
            <h5>Our App will release soon</h5>
            <br />
          </div>
        </Modal>
        <div id="sliderWrapper">
        <Slider {...settings}>
          <div>
            <h3>Date night?</h3>
          </div>
          <div>
            <h3>Interview Tomorrow?</h3>
          </div>
          <div>
            <h3>worried about ambiance?</h3>
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
        <div className="temp"></div>
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

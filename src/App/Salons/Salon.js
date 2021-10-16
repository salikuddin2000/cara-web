import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import Modal from "react-modal";
import Slider from "infinite-react-carousel";
import { useSalonInfo } from "../Providers/salonProvider";
import { useCart } from "../Providers/servicesCategoryProvider";
import { useCaraUser } from "../Providers/caraUserProvider";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import back_arrow from "../../assets/back_arrow.svg";

function Salon() {
  const location = useLocation();
  const { setSalonId, salonInfo, isLoading } = useSalonInfo();
  const {
    serviceCart,
    setServiceCart,
    setCartSalonId,
    totalPrice,
    setTotalPrice,
  } = useCart();
  const { caraUser } = useCaraUser();
  const [idLocation, setIdLocation] = useState();
  const [categoryList, setCategoryList] = useState();
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [salonPhotos, setSalonPhotos] = useState([]);

  let history = useHistory();

  function setPhotos(salonInfo) {
    if (salonInfo && salonInfo.photos) {
      setSalonPhotos([
        <img
          alt="1"
          src="https://media.istockphoto.com/photos/woman-with-protective-mask-receiving-treatment-in-hair-salon-picture-id1264558427"
        />,
        <img
          alt="2"
          src="https://media.istockphoto.com/photos/barber-shop-picture-id1288801785?s=612x612"
        />,
        <img
          alt="3"
          src="https://media.istockphoto.com/photos/retro-styled-beauty-salon-picture-id1325440885"
        />,
        <img
          alt="4"
          src="https://media.istockphoto.com/photos/hair-stylist-in-brazil-picture-id1321545990"
        />,
      ]);
    }
  }
  useEffect(() => {
    setPhotos(salonInfo);
  }, [salonInfo]);

  function containsObject(id, list) {
    let i;

    for (i = 0; i < list.length; i++) {
      if (list[i].service && list[i].service.service_id === id) {
        return true;
      }
    }

    return false;
  }
  function removeObject(id, list) {
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i].service && list[i].service.service_id === id) {
        list.splice(i, 1);
      }
    }
    setServiceCart(list);
    setCategories(salonInfo, list);
  }

  function setVars() {
    if (location && location.state) {
      const { id } = location.state;
      setIdLocation(id);
      setSalonId(id);
    }
  }
  useEffect(() => {
    setVars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setCategories(salonInfo, serviceCart) {
    if (salonInfo && salonInfo.salon_categories) {
      setCategoryList(
        salonInfo.salon_categories.map((category) => (
          <div className="servicesWrapper" key={category.category_id}>
            <h3>{category.category_name}</h3>
            {category.services.map((service, index) => (
              <div className="serviceBlock" key={service.service_id}>
                <p>
                  {service.service_name}
                  <br />
                  <span>₹{service.service_price}</span>
                </p>
                {containsObject(service.service_id, serviceCart) ? (
                  <button
                    className="removeButton"
                    onClick={() => {
                      removeObject(service.service_id, serviceCart);
                      setTotalPrice(
                        totalPrice - parseInt(service.service_price)
                      );
                    }}
                  >
                    -
                  </button>
                ) : (
                  <>
                    {caraUser !== null ? (
                      <button
                        onClick={() => {
                          setServiceCart([
                            ...serviceCart,
                            (serviceCart[serviceCart.length] = { service }),
                          ]);
                          setTotalPrice(
                            totalPrice + parseInt(service.service_price)
                          );
                        }}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setModalisOpen(true);
                        }}
                      >
                        +
                      </button>
                    )}
                  </>
                )}
                {/* <hr /> */}
              </div>
            ))}
          </div>
        ))
      );
      if (serviceCart.length !== 0) {
        setCartSalonId(salonInfo.salon_id);
      } else setCartSalonId(null);
    }
  }
  useEffect(() => {
    setCategories(salonInfo, serviceCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salonInfo, serviceCart.length]);
  // useEffect(() => {
  //   console.log("new cart is: ");
  //   console.log(serviceCart);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [serviceCart.length]);

  // console.log(salonInfo.open_time)
  // let data= new Date(salonInfo.open_time)
  // let date = data.toLocaleTimeString()
  // console.log(date)

  return idLocation ? (
    <div className="salonDiv">
      {/* <h2>{idLocation}</h2> */}
      {/* <h1>This is salon page</h1> */}
      <div onClick={history.goBack}>
        <img alt="back arrow" className="backArrow" src={back_arrow} />
      </div>
      {!isLoading ? (
        salonInfo && salonInfo.salon_id ? (
          <>
            <Helmet>
              <title>Cara | {salonInfo.salon_name}</title>
            </Helmet>
            <h1>{salonInfo.salon_name}</h1>
            {salonPhotos ? (
              <Slider
                arrows={false}
                autoplay
                autoplaySpeed={5000}
                duration={250} /* className="banners" */
              >
                {salonPhotos}
              </Slider>
            ) : (
              ""
            )}
            <p className="salonType">{salonInfo.salon_type}</p>
            <p className="salonType">OPEN</p>
            <br />
            <br />
            {/* <p>{salonInfo.open_time}</p>
            <p>{salonInfo.close_time}</p> */}
            <div className="categoriesWrapper">{categoryList}</div>

            <Modal
              isOpen={modalIsOpen}
              className="redirectModal"
              overlayClassName="redirectModalOverlay"
            >
              {/* {console.log("inside modAL",modalIsOpen)} */}
              <div className="redirectModalDiv">
                <h5>Sign In to book appointments</h5>
                <br />

                <Link
                  to="/login"
                  // onClick={() => {
                  //   setServiceCart([]);
                  //   setIsBooked(false);
                  // }}
                >
                  <div>Sign In</div>
                </Link>
              </div>
            </Modal>
            {serviceCart.length !== 0 ? (
              <div className="cart">
                <Link to="/dashboard/salon/slots">Cart</Link>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <h2>Salon not available</h2>
        )
      ) : (
        <div className="beatLoader">
          <BeatLoader loading color="#796AC8" size={14} />
        </div>
      )}
    </div>
  ) : (
    <>
      <h1>Please Choose Salon From home Page</h1>
      <Link to="/dashboard"> Home Page</Link>
    </>
  );
}

export default Salon;

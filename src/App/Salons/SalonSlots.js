import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
// import { useCaraUser } from "../Providers/caraUserProvider.js";
import { useCart } from "../Providers/servicesCategoryProvider.js";
import { useSlots } from "../Providers/slotsProvider.js";
import { useBookingDetails } from "../Providers/bookingDetails.js";
import { usePostAppointmentfunc } from "../Providers/bookingDetails.js";
import { useSalonInfo } from "../Providers/salonProvider";
import DatePicker from "react-horizontal-datepicker";
import { BeatLoader } from "react-spinners";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import back_arrow from "../../assets/back_arrow.svg";
import trash_can from "../../assets/trash_can.svg";
import chair from "../../assets/chair.svg";
import selected_chair from "../../assets/selected_chair.svg";
import tick from "../../assets/tick.png";
import "./Salon.css";

function SalonSlots() {
  const {
    slots,
    setSelectedChair,
    selectedChair,
    setSelectedDate,
    selectedDate,
    onLoading,
  } = useSlots();
  // const { caraUser } = useCaraUser();
  const {
    serviceCart,
    setServiceCart,
    totalPrice,
    setTotalPrice,
    // cartSalonId,
  } = useCart();
  const { bookObject, setBookObject, loading, isBooked, setIsBooked } =
    useBookingDetails();
  const postAppointment = usePostAppointmentfunc();
  const { salonInfo } = useSalonInfo();
  const [list, setList] = useState();
  const [slotsList, setSlotsList] = useState();
  const [chairList, setChairList] = useState([]);
  // const [modalIsOpen,setModalisOpen] = useState(false)

  let history = useHistory();

  function removeObject(id, list) {
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i].service && list[i].service.service_id === id) {
        list.splice(i, 1);
      }
    }
    setServiceCart(list);
    setCart(list);
  }

  function listChairs() {
    let chairs = [];
    for (let i = 0; i < salonInfo.number_of_chairs; i++) {
      chairs[i] = (
        <div className="chair" key={i} onClick={() => setSelectedChair(i + 1)}>
          {selectedChair === i + 1 ? (
            <>
              <img alt="chair" src={selected_chair} />
              <br /> {i + 1}
            </>
          ) : (
            <>
              <img alt="chair" src={chair} />
              <br /> {i + 1}
            </>
          )}
        </div>
      );
      // setChairList([
      //   ...chairList,
      //   (chairList[i - 1] = (
      //     <div className="chair" key={i - 1} onClick={() => setSelectedChair(i)}>
      //       {selectedChair===i?"selected" :<><img alt="chair" src={chair} /><br /> {i}</>}
      //     </div>
      //   )),
      // ]);
    }
    setChairList(chairs);
  }
  useEffect(() => {
    listChairs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChair]);
  // useEffect(() => {
  //   console.log("totalPrice:", totalPrice);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [totalPrice]);
  function setCart(serviceCart) {
    if (serviceCart && serviceCart.length !== 0 && serviceCart[0]) {
      setList(
        serviceCart.map((service) => (
          <div className="cartServices" key={service.service.service_id}>
            <h5>
              {service.service.service_name}
              <br />
              <span>₹{service.service.service_price}</span>
            </h5>{" "}
            {serviceCart.length !== 0 ? (
              <div
                className="trashIconDiv"
                onClick={() => {
                  removeObject(service.service.service_id, serviceCart);
                  setTotalPrice(
                    totalPrice - parseInt(service.service.service_price)
                  );
                }}
              >
                <img alt="trash" src={trash_can} />
              </div>
            ) : (
              ""
            )}
          </div>
        ))
      );
    } else {
      setList(<h1>your cart is empty</h1>);
    }
  }
  useEffect(() => {
    setCart(serviceCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceCart, totalPrice]);

  function listSlots(slots) {
    if (slots && slots.length !== 0) {
      setSlotsList(
        slots.map((slot) =>
          bookObject && bookObject.slot_id === slot.slot_id ? (
            <div className="slot" key={slot.slot_id}>
              {selectedChair && selectedChair !== null ? (
                <div
                  className="selectedTimeSlot"
                  onClick={() =>
                    setBookObject({
                      slot_id: slot.slot_id,
                      chair_number: slot.chair_number,
                      // appointment_details: bookObject.appointment_details,
                    })
                  }
                >
                  {slot.start_time}
                </div>
              ) : (
                <div
                  className="selectedSlotWithChairNumber"
                  onClick={() =>
                    setBookObject({
                      slot_id: slot.slot_id,
                      chair_number: slot.chair_number,
                      // appointment_details: bookObject.appointment_details,
                    })
                  }
                >
                  {slot.start_time + "  chair : " + slot.chair_number}
                </div>
              )}
            </div>
          ) : (
            <div className="slot" key={slot.slot_id}>
              {selectedChair && selectedChair !== null ? (
                <div
                  className="timeSlot"
                  onClick={() =>
                    setBookObject({
                      slot_id: slot.slot_id,
                      chair_number: slot.chair_number,
                      // appointment_details: bookObject.appointment_details,
                    })
                  }
                >
                  {slot.start_time}
                </div>
              ) : (
                <div
                  className="slotWithChairNumber"
                  onClick={() =>
                    setBookObject({
                      slot_id: slot.slot_id,
                      chair_number: slot.chair_number,
                      // appointment_details: bookObject.appointment_details,
                    })
                  }
                >
                  {slot.start_time + "  chair : " + slot.chair_number}
                </div>
              )}
            </div>
          )
        )
      );
    }
  }
  useEffect(() => {
    listSlots(slots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots, bookObject]);

  const selectedDay = (val) => {
    let date = val.getDate() < 10 ? "0" + val.getDate() : val.getDate();
    let month =
      val.getMonth() + 1 < 10 ? "0" + (val.getMonth() + 1) : val.getMonth() + 1;
    let year = val.getFullYear();
    // console.log(year + "-" + month + "-" + date);
    // console.log("date is :"+val)
    setSelectedDate(year + "-" + month + "-" + date);
  };
  // useEffect(() => {
  //   setBookObject({
  //     appointment_details: serviceCart.map(service => ({service_id : service.service.service_id}) )})
  // }, [serviceCart]);

  return (
    <div className="salonSlotsDiv">
      <Helmet>
        <title>Cara | Book Appointment</title>
      </Helmet>
      <div onClick={history.goBack}>
        <img alt="back arrow" className="backArrow" src={back_arrow} />
      </div>
      <h2>Cart</h2>
      <br />
      <div className="serviceCartWrapper">{serviceCart ? list : ""}</div>
      {serviceCart && serviceCart.length !== 0 ? (
        <div>{chairList ? chairList : ""}</div>
      ) : (
        ""
      )}
      {/* {serviceCart && serviceCart.length !== 0 ? (
        <button
          className="seeAllSlotsButton"
          onClick={() => setSelectedChair(null)}
        >
          See All Slots
        </button>
      ) : (
        ""
      )} */}
      {serviceCart && serviceCart.length !== 0 ? (
        <div className="datePicker">
          <DatePicker
            getSelectedDay={selectedDay}
            endDate={31}
            selectDate={new Date(selectedDate)}
            labelFormat={"MMMM"}
            color={"#796AC8"}
          />
        </div>
      ) : (
        ""
      )}
      {serviceCart && serviceCart.length !== 0 ? (
        <div className="slotsWrapper">
          {slots ? (
            onLoading ? (
              <div className="loader">
                <BeatLoader loading color="#796AC8" size={14} />
              </div>
            ) : (
              slotsList
            )
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {serviceCart.length !== 0 &&
      selectedDate &&
      bookObject !== null &&
      bookObject.slot_id ? (
        loading ? (
          <>
            <br />
            <div className="beatLoader">
              <BeatLoader loading color="#796AC8" size={14} />
            </div>
          </>
        ) : (
          <div className="totalAndBookWrapper">
            <div className="totalPriceWithBookButton">
              {totalPrice ? <h5>Total : ₹{totalPrice}</h5> : ""}
            </div>
            <div
              className="bookAppointmentButton"
              onClick={() => postAppointment()}
            >
              <h5>Book Appointment</h5>
            </div>
          </div>
        )
      ) : (
        <div className="totalPrice">
          {totalPrice ? <h5>Total : ₹{totalPrice}</h5> : ""}
        </div>
      )}
      {isBooked === true ? (
        <Modal
          isOpen={true}
          className="bookedModal"
          overlayClassName="bookedModalOverlay"
        >
          <div className="bookedModalDiv">
            <img alt="success" src={tick} />
            <h5>
              Appointment
              <br />
              Booked
            </h5>
            <br />

            <Link
              to="/dashboard"
              onClick={() => {
                setServiceCart([]);
                setIsBooked(false);
              }}
            >
              <div>Go to Home Page</div>
            </Link>
          </div>
        </Modal>
      ) : (
        ""
      )}
      {/* {(isBooked===true)?<h1>Appointment Booked</h1>:"<h5>Appointment not Booked</h5>"} */}
    </div>
  );
}

export default SalonSlots;

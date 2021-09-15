import React, { useState, useEffect } from "react";
// import { useCaraUser } from "../Providers/caraUserProvider.js";
import { useCart } from "../Providers/servicesCategoryProvider.js";
import { useSlots } from "../Providers/slotsProvider.js";
import { useBookingDetails } from "../Providers/bookingDetails.js";
import { usePostAppointmentfunc } from "../Providers/bookingDetails.js";
import DatePicker from "react-horizontal-datepicker";

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
  const { bookObject, setBookObject, loading, isBooked } = useBookingDetails();
  const postAppointment = usePostAppointmentfunc();
  const [list, setList] = useState();
  const [slotsList, setSlotsList] = useState();
  const [chairList, setChairList] = useState([]);

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
    for (let i = 1; i < 4; i++) {
      setChairList([
        ...chairList,
        (chairList[i - 1] = (
          <button key={i - 1} onClick={() => setSelectedChair(i)}>
            chair {i}
          </button>
        )),
      ]);
    }
  }
  useEffect(() => {
    listChairs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log("totalPrice:", totalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPrice]);
  function setCart(serviceCart) {
    if (serviceCart && serviceCart.length !== 0 && serviceCart[0]) {
      setList(
        serviceCart.map((service) => (
          <div key={service.service.service_id}>
            <h5>
              {service.service.service_name}
              {"        price :      "}
              {service.service.service_price}
            </h5>{" "}
            {serviceCart.length !== 0 ? (
              <button
                onClick={() => {
                  removeObject(service.service.service_id, serviceCart);
                  setTotalPrice(
                    totalPrice - parseInt(service.service.service_price)
                  );
                }}
              >
                remove
              </button>
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
        slots.map((slot) => (
          <div key={slot.slot_id}>
            {selectedChair && selectedChair !== null ? (
              <button
                onClick={() =>
                  setBookObject({
                    slot_id: slot.slot_id,
                    chair_number: slot.chair_number,
                    appointment_details: bookObject.appointment_details,
                  })
                }
              >
                {slot.start_time + "slot id : " + slot.slot_id}
              </button>
            ) : (
              <button
                onClick={() =>
                  setBookObject({
                    slot_id: slot.slot_id,
                    chair_number: slot.chair_number,
                    appointment_details: bookObject.appointment_details,
                  })
                }
              >
                {slot.start_time +
                  "  chair number : " +
                  slot.chair_number +
                  "slot id : " +
                  slot.slot_id}
              </button>
            )}
          </div>
        ))
      );
    }
  }
  useEffect(() => {
    listSlots(slots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  const selectedDay = (val) => {
    let date = val.getDate() < 10 ? "0" + val.getDate() : val.getDate();
    let month =
      val.getMonth() + 1 < 10 ? "0" + (val.getMonth() + 1) : val.getMonth() + 1;
    let year = val.getFullYear();
    console.log(year + "-" + month + "-" + date);
    // console.log("date is :"+val)
    setSelectedDate(year + "-" + month + "-" + date);
  };
  // useEffect(() => {
  //   setBookObject({
  //     appointment_details: serviceCart.map(service => ({service_id : service.service.service_id}) )})
  // }, [serviceCart]);

  return (
    <>
      <div>{serviceCart ? list : ""}</div>
      <div>{totalPrice ? <h5>{totalPrice}</h5> : ""}</div>
      <div>{chairList ? chairList : ""}</div>
      <button onClick={() => setSelectedChair(null)}>See All Slots</button>
      <DatePicker
        getSelectedDay={selectedDay}
        endDate={31}
        selectDate={new Date(selectedDate)}
        labelFormat={"MMMM"}
        color={"#639FA5"}
      />
      <div>{slots ? onLoading ? <h4>Loading Slots</h4> : slotsList : ""}</div>
      {serviceCart.length !== 0 &&
      selectedDate &&
      bookObject !== null &&
      bookObject.slot_id ? (
        loading ? (
          <h5>Loading..</h5>
        ) : (
          <button onClick={() => postAppointment()}>Book Appointment</button>
        )
      ) : (
        ""
      )}
      {isBooked === true ? <h1>Appointment Booked</h1> : ""}
      {/* {(isBooked===true)?<h1>Appointment Booked</h1>:"<h5>Appointment not Booked</h5>"} */}
    </>
  );
}

export default SalonSlots;

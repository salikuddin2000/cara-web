import React, { useState, useEffect } from "react";
import { useCart } from "../Providers/servicesCategoryProvider.js";
import { useSlots } from "../Providers/slotsProvider.js";
import DatePicker from "react-horizontal-datepicker";

function SalonSlots() {
  const { slots, setSelectedChair, selectedChair, setSelectedDate } =
    useSlots();
  const { serviceCart, setServiceCart } = useCart();
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
  }, []);

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
                onClick={() =>
                  removeObject(service.service.service_id, serviceCart)
                }
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
  }, [serviceCart]);

  function listSlots(slots) {
    if (slots && slots.length !== 0) {
      setSlotsList(
        slots.map((slot) => (
          <div key={slot.slot_id}>
            {selectedChair && selectedChair !== null ? (
              <h6>{slot.start_time}</h6>
            ) : (
              <h6>
                {slot.start_time + "  chair number : " + slot.chair_number}
              </h6>
            )}
          </div>
        ))
      );
    }
  }
  useEffect(() => {
    listSlots(slots);
  }, [slots]);

  const selectedDay = (val) => {
    let date = val.getDate(); /* <10 ? ("0"+val.getDate()):(val.getDate()) */
    let month =
      val.getMonth(); /* <10 ? ("0"+val.getMonth()):(val.getMonth()) */
    let year = val.getFullYear();
    console.log(year + "-" + month + "-" + date);
    // console.log("date is :"+val)
    setSelectedDate(year + "-" + month + "-" + date /* +"T00:00:00.000Z" */);
  };

  return (
    <>
      <div>{serviceCart ? list : ""}</div>
      <div>{chairList ? chairList : ""}</div>
      <button onClick={() => setSelectedChair(null)}>See All Slots</button>
      <DatePicker
        getSelectedDay={selectedDay}
        endDate={31}
        selectDate={new Date("2021-09-04")}
        labelFormat={"MMMM"}
        color={"#639FA5"}
        // eslint-disable-next-line react-hooks/exhaustive-deps
      />
      <div>{slots ? slotsList : ""}</div>
    </>
  );
}

export default SalonSlots;

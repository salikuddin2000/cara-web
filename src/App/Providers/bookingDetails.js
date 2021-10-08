import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useCaraUser } from "./caraUserProvider.js";
import { useCart } from "./servicesCategoryProvider.js";
import { useSlots } from "./slotsProvider.js";

const BookingDetailsContext = React.createContext();
const PostAppointmentContext = React.createContext();

export function useBookingDetails() {
  return useContext(BookingDetailsContext);
}
export function usePostAppointmentfunc() {
  return useContext(PostAppointmentContext);
}

export function BookingDetailsProvider({ children }) {
  const { caraUser } = useCaraUser();
  const { cartSalonId, totalPrice, serviceCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isBooked, setIsBooked] = useState();
  const { selectedDate } = useSlots();
  const [bookObject, setBookObject] = useState({
    // user_id: "",
    // salon_id: "",
    chair_number: "",
    // date_of_appointment: "",
    // total_price: "",
    slot_id: "",
    appointment_details: [],
  });
  useEffect(() => {
    setIsBooked("")
  }, [])

  // useEffect(() => {
  //   console.log("bookObject is: ");
  //   console.log(bookObject);
  // }, [bookObject]);
  //add Loading functionality, confirmation Modal and Redirect to appointment History
  async function postAppointment() {
    if (
      bookObject.slot_id &&
      bookObject.chair_number &&
      caraUser !== null &&
      selectedDate &&
      serviceCart.length !== 0
    ) {
      setLoading(true);
      await axios
        .post("https://cara-api-01.herokuapp.com/api/v1/appointments", {
          user_id: caraUser.email_address,
          salon_id: cartSalonId,
          chair_number: bookObject.chair_number,
          date_of_appointment: selectedDate + "T00:00:00.000Z",
          total_price: totalPrice,
          slot_id: bookObject.slot_id,
          appointment_details: serviceCart.map((service) => ({
            service_id: service.service.service_id,
          })),
        })
        .then((res) => {
          // console.log("Appontment Booked ");
          // console.log(res);
          setLoading(false);
          setBookObject(null)
          setIsBooked(true);
        })
        .catch((e) => {
          console.log("Appointment NOT Booked" + e);
          setLoading(false);
          setIsBooked(false);
        })
        // .then((res) => {
        //   console.log(res);
        // });
    } else {
      setLoading(false);
    }
  }
  return (
    <BookingDetailsContext.Provider value={{ bookObject, setBookObject,loading,isBooked,setIsBooked }}>
      <PostAppointmentContext.Provider value={postAppointment}>
        {children}
      </PostAppointmentContext.Provider>
    </BookingDetailsContext.Provider>
  );
}

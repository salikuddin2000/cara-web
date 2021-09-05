import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { caraUser } from "./caraUserProvider.js";
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

export function BookingDetailsProvider({children}) {
  const [bookObject, setBookObject] = useState({
    user_id: "",
    salon_id: "",
    chair_number: "",
    date_of_appointment: "",
    total_price: "",
    slot_id: "",
    appointment_details: [],
  });
  useEffect(() => {
      console.log("bookObject is: ")
    console.log(bookObject)
  }, [bookObject])

  async function postAppointment(bookObject) {
    if (bookObject) {
      await axios.post(
        "`https://cara-api-01.herokuapp.com/api/v1/appointments",
        {
          user_id: "",
          salond_id: "",
          chair_number: "",
          date_of_appointment: "",
          total_price: "",
          slot_id: "",
          appointment_details: [],
        }
          .then((res) => {
            console.log("Appontment Booked ");
            console.log(res);
          })
          .catch((e) => console.log("Appointment NOT Booked" + e))
          .then((res) => {
            console.log(res);
          })
      );
    }
  }
  return(
      <BookingDetailsContext.Provider value={{bookObject,setBookObject}}>
          <PostAppointmentContext.Provider value={postAppointment}>
              {children}
          </PostAppointmentContext.Provider>
      </BookingDetailsContext.Provider>
  )
}

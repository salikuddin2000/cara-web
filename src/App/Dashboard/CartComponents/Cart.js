import React, { useState, useEffect } from "react";
import { useAppointmentHistoryList } from "../../Providers/appointmentHistoryProvider.js";
import AppBar from "../AppBarComponents/AppBar.js";

function Cart() {
  const { appointmentList } = useAppointmentHistoryList();
  const [list, setList] = useState();
  useEffect(() => {
    setList(
      appointmentList.map((appointment) => (
        <h5 key={appointment.appointment_id}>
          {appointment.date_of_appointment.split("T")[0]}
        </h5>
      ))
    );
    console.log(appointmentList);
  }, [appointmentList]);
  //   useEffect(() => {
  //     console.log(list)
  //   }, [list])
  return (
    <div>
      <AppBar />
      {list}
    </div>
  );
}

export default Cart;

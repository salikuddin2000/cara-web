import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppointmentHistoryList } from "../../Providers/appointmentHistoryProvider.js";
import AppBar from "../AppBarComponents/AppBar.js";
import MadeWithLove from "../MadeWithLove.js";
import Modal from "react-modal";
import { useCaraUser } from "../../Providers/caraUserProvider.js";
import "../AppBarComponents/AppBar.css";

function Cart() {
  const { caraUser } = useCaraUser();
  const { appointmentList, cancelAppointment } = useAppointmentHistoryList();
  const [list, setList] = useState();
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [cancelId, setCancelId] = useState("");

  useEffect(() => {
    setList(
      appointmentList.map((appointment) => (
        <div key={appointment.appointment_id}>
          <h1>{appointment.salon.salon_name}</h1>
          <h5>
            date: {appointment.date_of_appointment.split("T")[0]}
            <br />
            time: {appointment.slots.start_time}
          </h5>
          <h6>{appointment.appointment_status}</h6>
          {appointment.appointment_status==="BOOKED"?
          <button
            onClick={() => {
              setModalisOpen(true);
              setCancelId(appointment.appointment_id);
            }}
          >
            Cancel Appointment
          </button>
          :""          
        }
        </div>
      ))
    );
    console.log(appointmentList);
  }, [appointmentList]);

  useEffect(() => {
    console.log(modalIsOpen);
  }, [modalIsOpen]);

  if (caraUser === null) {
    return (<div>sign in to book appointments <br />
          <Link
        to="/"
      >sign in</Link>
    </div>);
  } else {
    return (
      <div>
        <AppBar />
        {list}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => {
            setModalisOpen(false);
          }}
          className="zipcodeModal"
          overlayClassName="zipcodeModalOverlay"
        >
          <span>Are you sure you want to cancel</span>
          <br />
          <button
            onClick={() => {
              console.log("confirm cancel button clicked");
              console.log(cancelId);
              cancelAppointment(cancelId);
              setModalisOpen(false);
            }}
          >
            confirm
          </button>
        </Modal>
        <MadeWithLove />
      </div>
    );
  }
}

export default Cart;

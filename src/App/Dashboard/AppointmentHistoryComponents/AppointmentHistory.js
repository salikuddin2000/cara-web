import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppointmentHistoryList } from "../../Providers/appointmentHistoryProvider.js";
import AppBar from "../AppBarComponents/AppBar.js";
import MadeWithLove from "../MadeWithLove.js";
import Modal from "react-modal";
import { useCaraUser } from "../../Providers/caraUserProvider.js";
import { Helmet } from "react-helmet";
import time from "../../../assets/time.svg";
import date from "../../../assets/date.svg";
import "../AppBarComponents/AppBar.css";
import "./AppointmentHistory.css";

function AppointmentHistory() {
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
            <img alt="date" src={date} /> :{" "}
            {appointment.date_of_appointment.split("T")[0]}
            <br />
            <img alt="time" src={time} /> : {appointment.slots.start_time}
          </h5>
          {appointment.appointment_status === "BOOKED" ? (
            <button
              className="cancelButton"
              onClick={() => {
                setModalisOpen(true);
                setCancelId(appointment.appointment_id);
              }}
            >
              Cancel Appointment
            </button>
          ) : (
            <h6>
              {appointment.appointment_status.replace(/_/g, " ").toLowerCase()}
            </h6>
          )}
        </div>
      ))
    );
    // console.log(appointmentList);
  }, [appointmentList]);

  // useEffect(() => {
  //   console.log(modalIsOpen);
  // }, [modalIsOpen]);

  if (caraUser === null) {
    return (
      <div className="nullUserAppointmentHistory">
        <Helmet>
          <title>Cara | Appointment History</title>
        </Helmet>
        <h5>Sign in to book appointments</h5> <br />
        <Link to="/login">
          <div>Sign In</div>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Helmet>
          <title>Cara | Appointment History</title>
        </Helmet>
        <AppBar />
        <div className="appointmentHistoryWrapper">{list}</div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => {
            setModalisOpen(false);
          }}
          className="confirmModal"
          overlayClassName="confirmModalOverlay"
        >
          <div className="confirmModalDiv">
            <h5>
              Are you sure
              <br /> you want to cancel ?
            </h5>
            <br />
            <button
              onClick={() => {
                // console.log("confirm cancel button clicked");
                // console.log(cancelId);
                cancelAppointment(cancelId);
                setModalisOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>
        <MadeWithLove />
      </div>
    );
  }
}

export default AppointmentHistory;

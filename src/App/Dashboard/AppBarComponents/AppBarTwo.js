import React, { useState } from "react";
import { useZipcode } from "../../Providers/zipcodeProvider.js";
import Modal from "react-modal";
import "./AppBar.css";


function AppBarTwo() {
  const { zipcode,  updateZipcode } = useZipcode();
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [info, setInfo] = useState({
    pincode: "",
  });

  function handle(e) {
    const newinfo = { ...info };
    newinfo[e.target.id] = e.target.value;
    setInfo(newinfo);
    console.log(newinfo);
  }
  var submit = async (e) => {
    e.preventDefault();
    updateZipcode(info.pincode);
    setModalisOpen(false);
  };

  return (
    <div className="AppBar">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalisOpen(false)}
        // className="modalStyling"
        // overlayClassName="modalOverlayStyling"
      >
        <h2>{zipcode}</h2><br />
        <label>Zipcode </label>
        <input
          onChange={(e) => handle(e)}
          id="pincode"
          value={info.pincode}
          placeholder="enter pincode"
          type="number"
          maxLength="6"
        ></input>
        <button className="zipcode"
          onClick={(e) => {
            submit(e);
          }}
        >
          Change Zipcode
        </button>
        <button onClick={() => setModalisOpen(false)}>Close</button>
      </Modal>
      <button onClick={() => setModalisOpen(true)}>Zipcode</button>
      <h1>Cara</h1>
      <button className="coins">Coins</button>
    </div>
  );
}

export default AppBarTwo;

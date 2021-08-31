import React, { useState } from "react";
import { useZipcode } from "../../Providers/zipcodeProvider.js";
import Modal from "react-modal";

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
    <div>
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
        <button
          onClick={(e) => {
            submit(e);
          }}
        >
          Change Zipcode
        </button>
        <button onClick={() => setModalisOpen(false)}>Close</button>
      </Modal>
      <button onClick={() => setModalisOpen(true)}>Zipcode</button>
      <header>Cara</header>
      <button>Coins</button>
    </div>
  );
}

export default AppBarTwo;

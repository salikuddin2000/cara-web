import React, { useState } from "react";
import { useZipcode } from "../../Providers/zipcodeProvider.js";
import Modal from "react-modal";
import location from "../../../assets/location.svg";
import wallet from "../../../assets/wallet.svg";
// import location from "../../../assets/location.svg"
import "./AppBar.css";

function AppBarTwo() {
  const { zipcode, updateZipcode } = useZipcode();
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
  function validateForm(e) {
    var errors = false;
    console.log("e : ",e);
    if(info.pincode.length !== 6) {
      errors=true;
      return(alert("Zipcode must be of 6 characters"))
    }else{
      errors=false;
    }
    if(errors==false){
     submit(e);
    }
  }
  return (
    
    <div className="AppBar">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {setModalisOpen(false);setInfo({})}}
        className="zipcodeModal"
        overlayClassName="zipcodeModalOverlay"
        // className="modalStyling"
        // overlayClassName="modalOverlayStyling"
      >
        <div className="modalDiv">
          <img /* className="modalImg" */ alt="location image" src={location} />
          {/* <h2>{zipcode}</h2> */}
          <br />{" "}
          <input
            onChange={(e) => handle(e)}
            id="pincode"
            value={info.pincode}
            placeholder={zipcode}
            type="tel"
            maxLength="6"
          ></input>
          <br />
          <button
            onClick={(e) => {
              validateForm(e);
            }}
          >
            Save
          </button>
          {/* <script>
function validateForm() {
  var errors = false;
  if(document.getElementById("mobile").val().length() != 10) {
    errors=true;
    alert("number must be 10 characters");
  }else{
    errors=false;
  }
  if(errors==false){
    document.getElementById("form").submit();
  }
}
</script>

<form method="post" id="form" onsubmit="return validateForm()">
  <input type="text" id="mobile" placeholder="Mobile Number" style="width: 263px;" maxlength="10" minlength="10">
  <input type="submit">
</form> */}
          {/* <button onClick={() => setModalisOpen(false)}>Close</button> */}
        </div>
      </Modal>
      <button className="zipcode" onClick={() => setModalisOpen(true)}>
        <img alt="location" src={location} />
      </button>
      <h1>Cara</h1>
      <button className="coins">
        <img alt="wallet" src={wallet} />
      </button>
    </div>
  );
}

export default AppBarTwo;

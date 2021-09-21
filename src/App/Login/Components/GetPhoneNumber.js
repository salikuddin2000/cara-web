import React,{useState} from "react";
import { useGoogleUser } from "../../Providers/caraUserProvider";
import "./GetPhoneNumber.css";

function GetPhoneNumber(props) {
  const { googleUser } = useGoogleUser();
  const [info, setInfo] = useState({
    phone_number: "",
})
  function handle(e) {
    const newinfo = {...info}
    newinfo[e.target.id]= e.target.value
    setInfo(newinfo)
    console.log(newinfo)
}
  var submit = async (e) => {
    e.preventDefault();
    googleUser.phone_number = info.phone_number;
    console.log(googleUser);
    props.setPhoneNumber(googleUser);
  };
  function validateForm(e) {
    var errors = false;
    console.log("e : ",e);
    if(info.phone_number.length !== 10) {
      errors=true;
      return(alert("number must be of 10 characters"))
    }else{
      errors=false;
    }
    if(errors===false){
     submit(e);
    }
  }
  return (
    <div className="phoneScreen">
      {console.log("inside get Phone number")}
      <div>
        <span>+91</span>
      </div>
      <input
              onChange={(e) => handle(e)}
              id="phone_number"
              value={info.phone_number}
              placeholder="Enter Phone Number"
              type="tel"
              maxLength="10"
              pattern="[0-9]{5}-[0-9]{5}"
              />
      <button onClick={(e) => validateForm(e)}>Confirm</button>
    </div>
  );
}

export default GetPhoneNumber;

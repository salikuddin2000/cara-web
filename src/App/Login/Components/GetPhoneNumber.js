import React,{useState} from "react";
import { useGoogleUser } from "../../Providers/caraUserProvider";

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
  return (
    <div>
      {console.log("inside get Phone number")}
      <input
              onChange={(e) => handle(e)}
              id="phone_number"
              value={info.phone_number}
              placeholder="Phone Number"
              type="number"
              maxLength="10"
              minLength="10"
            ></input>
      <button onClick={(e) => submit(e)}>Phone Number</button>
    </div>
  );
}

export default GetPhoneNumber;

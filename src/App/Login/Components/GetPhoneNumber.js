import React from 'react'
import { useGoogleUser} from '../caraUserProvider';

function GetPhoneNumber(props) {
    const { googleUser} = useGoogleUser()
    const addPhoneNumber=()=>{
        googleUser.phone_number = "9876543210"
        console.log(googleUser)
        // const newGoogleUser = googleUser;
        // console.log("newGoogleUser is :");
        // console.log(newGoogleUser);
        props.setPhoneNumber(googleUser);
    }
    return (
        <div>
            {console.log("inside get Phone number")}
            <button onClick={()=>addPhoneNumber()}>Phone Number</button>
        </div>
    )
}

export default GetPhoneNumber

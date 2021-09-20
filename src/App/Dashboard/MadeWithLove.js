import React from 'react'
import "./HomeComponents/home.css";
import heart from "../../assets/heart.svg"; 

function MadeWithLove() {
    return (
        <h6 className="madeWithLove">Made with <img alt="heart" src={heart} /><br />For all fashionable folks.</h6>
    )
}

export default MadeWithLove

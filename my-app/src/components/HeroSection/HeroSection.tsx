import React from "react";
import "./HeroSection.css";
import Arrow from "../../assets/imgs/Union.svg";
import Car from "../../assets/imgs/imagecar.svg";

function HeroSection(){
    return (
        <section className="hero">
            <h1>Your awesome traffic permit consultant.</h1>
            <a className="start-btn" href="#">GET STARTED <img
                src={Arrow} alt="arrow"/></a>
            <div className="car-div">
                <img className="car" src={Car} alt="car"/>
            </div>
        </section>
    );
}

export default HeroSection;
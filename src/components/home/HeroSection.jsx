import React from "react";
import "./HeroSection.css";
import Arrow from "./assets/Union.svg";
import Car from "./assets/imagecar.svg";
import Tile from './Tile';
import { Link } from "react-router-dom";
import France from "./assets/Flag_of_France.svg.png";
import Germany from "./assets/Flag_of_Germany.svg.png";
import Belgium from "./assets/Flag_of_Belgium.svg.png";

function HeroSection() {
    return (
        <section className="hero">
            <div className="container">
                <div className="tiles">
                    <Tile
                        imgSrc={France}
                        title="France"
                        description="Permit to deliver things in France"
                    />
                    <Tile
                        imgSrc={Germany}
                        title="Germany"
                        description="Permit to deliver things in germany"
                    />
                    <Tile
                        imgSrc={Belgium}
                        title="Belgium"
                        description="Permit to deliver things in Belgium"
                    />
                </div>
                <h1>Your awesome traffic permit consultant.</h1>
                <hr/>
                <h1>Order a traffic permit to deliver good in Europe</h1>

                <Link to="/catalog" className="start-btn">
                    GET STARTED <img src={Arrow} alt="arrow"/>
                </Link>
            </div>
        </section>
    );
}

export default HeroSection;
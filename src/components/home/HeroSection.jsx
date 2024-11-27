import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import Arrow from "./assets/Union.svg";
import Tile from './Tile';
import { Link } from "react-router-dom";
import France from "./assets/Flag_of_France.svg.png";
import Germany from "./assets/Flag_of_Germany.svg.png";
import Belgium from "./assets/Flag_of_Belgium.svg.png";
import TransportationService from "../../services/TransportationService";
import Loader from "../Loader/Loader";

function HeroSection() {
    const [transportation, setTransportation] = useState([]);
    const [count, setCount] = useState(1);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchTransportation().then();
        setLoading(false);
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchTransportation().then();
        setLoading(false);
    }, [count]);

    const fetchTransportation = async () => {
        const response = await TransportationService.getTransportations({page_amount: count , item_on_page:3});
        setTransportation([...transportation, ...response.data]);
        const result = await TransportationService.getTransportations({page_amount: count + 1 , item_on_page:3});
        setVisible(!!result.data.length);
    }

    const handleShowMore = () => {
        setCount(count + 1);
    }

    return (
        <section className="hero">
            <div className="container">
                {loading && <Loader />}
                <div className="tiles">
                    {!loading && transportation.map(item => (
                        <Tile
                            key={item.id}
                            title={item.location}
                            description={item.description}
                            imgSrc={"https://i.pinimg.com/originals/4f/7f/0b/4f7f0b4c095626ebcdad7f98d5beb10d.jpg"}
                        />
                    ))}
                    {!loading && visible && <button onClick={handleShowMore}>Show More</button>}
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
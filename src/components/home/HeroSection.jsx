import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import Arrow from "./assets/Union.svg";
import Tile from './Tile';
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getTransportations} from "../../store/TransportationSlice";

function HeroSection() {
    const dispatch = useDispatch();
    const [hasMoreData, setHasMoreData] = useState(true);


    const [transportation, setTransportation] = useState([]);
    const [count, setCount] = useState(1);


    const fetchTransportations = async () => {
        const resultAction = await dispatch(getTransportations({ item_on_page: 3, page_amount: count }));
        if (getTransportations.fulfilled.match(resultAction)) {
            const newTransportations = resultAction.payload.data;
            if (newTransportations) {
                setTransportation((prevData) => {
                    const uniqueTransportations = newTransportations.filter(newTransportation =>
                        !prevData.some(existingTransportations => existingTransportations.id === newTransportation.id)
                    );
                    return [...prevData, ...uniqueTransportations];
                });
                if (newTransportations.length < 3) {
                    setHasMoreData(false);
                }
            }
        }
    };

    useEffect(() => {
        fetchTransportations();
    }, [dispatch, count]);



    const handleShowMore = () => {
        setCount(count + 1);
    }

    return (
        <section className="hero">
            <div className="container">
                {transportation.length === 0 && <Loader />}
                <div className="tiles">
                    {transportation.map(item => (
                        <Tile
                            key={item.id}
                            title={item.location}
                            description={item.description}
                            imgSrc={"https://i.pinimg.com/originals/4f/7f/0b/4f7f0b4c095626ebcdad7f98d5beb10d.jpg"}
                        />
                    ))}
                    {hasMoreData && <button onClick={handleShowMore}>Show More</button>}
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
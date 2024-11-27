import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './ItemPage.css';
import TransportationService from "../../services/TransportationService";

const ItemPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [permit, setPermit] = useState();

    useEffect(() => {
        const fetchPermit = async () => {
            try {
                const response = await TransportationService.getByIdTransportation(id);
                setPermit(response.data);
            } catch (error) {
                console.error("Error fetching permit:", error);
            }
        };

        fetchPermit();
    }, [id]);

    if (!permit) {
        return <div>Loading...</div>;
    }

    return (
      <>
        <Header />
        <div className="item-page-container">
          <div className="item-details">
            <h1 className="item-title">{permit.location}</h1>
            <img src={"https://i.pinimg.com/originals/4f/7f/0b/4f7f0b4c095626ebcdad7f98d5beb10d.jpg"} alt={permit.location} className="item-img" />
            <div className="item-info">
              <p className="item-description">{permit.description}</p>
              <p className="item-age">Duration: {permit.duration} years</p>
              <p className="item-price">Price: ${permit.price}</p>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
            <button className="cart-button">Add to cart</button>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default ItemPage;
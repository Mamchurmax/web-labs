import React, { useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './ItemPage.css';
import TransportationService from "../../services/TransportationService";
import CartService from "../../services/CartServices";

const ItemPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [permit, setPermit] = useState();
    const [quantity, setQuantity] = useState(1);
    const [option, setOption] = useState("");

    const handleAddToCart = async () => {
        try{
            if (permit){
                if (!quantity) {
                    alert("Please enter a quantity");
                    return;
                } else if (quantity < 1) {
                    alert("Quantity must be greater than 0");
                    return;
                } else if (!option) {
                    alert("Please select an option");
                    return;
                }
                await CartService.addToCart({amount: quantity, type: option, transportationId: permit.id});
                alert("Added to cart");

            }
        } catch (e) {
            console.error("Error adding to cart:", e);
        }
    }

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
            <input
                type="number"
                className="item-quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <select
                className="item-option"
                value={option}
                onChange={(e) => setOption(e.target.value)}
            >
                <option value="" disabled>Select an option</option>
                <option value="By car">By car</option>
                <option value="By train">By train</option>
                <option value="By plane">By plane</option>
            </select>
            <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
            <button className="cart-button" onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default ItemPage;
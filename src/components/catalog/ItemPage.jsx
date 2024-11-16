import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PermitContext } from './PermitContext';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { permitsData: permitsData } = useContext(PermitContext);

  if (!permitsData || permitsData.length === 0) {
    return <p>Loading...</p>;
  }

  const permit = permitsData.find((permit) => permit.id === parseInt(id));

  if (!permit) {
    return <p>Permit not found</p>;
  }

  return (
    <>
      <Header />
      <div className="item-page-container">
        <div className="item-details">
          <h1 className="item-title">{permit.name}</h1>
          <img src={permit.img} alt={permit.name} className="item-img" />
          <div className="item-info">
            <p className="item-description">{permit.description}</p>
            <p className="item-age">Duration: {permit.duration} years</p>
            <p className="item-price">Price: ${permit.price}</p>
          </div>
          <button className="back-button" onClick={() => navigate(-1)}>Return to Catalog</button>
          <button className="cart-button">Add to cart</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemPage;
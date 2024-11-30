import React, {useContext, useState} from 'react';
import './PermitCard.css';
import {Link} from 'react-router-dom';
import EditPermitForm from './EditPermitForm';

const PermitCard = ({ permit }) => {

  return (
    <div className="product-card">
        <>
          <img src={"https://i.pinimg.com/originals/4f/7f/0b/4f7f0b4c095626ebcdad7f98d5beb10d.jpg"} alt={permit.location} className="product-img" />
          <div className="product-info">
            <h1>{permit.location}</h1>
            <p>{permit.description}</p>
            <p>Duration: {permit.duration} years</p>
            <p>Price: {permit.price}$</p>
          </div>
          <div className="product-buttons">
            <Link to={`/item/${permit.id}`} className="primary-button view-more">View More</Link>
          </div>
        </>
      {/*)}*/}
    </div>
  );
};

export default PermitCard;

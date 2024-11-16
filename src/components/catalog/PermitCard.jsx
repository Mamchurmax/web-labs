import React, { useState, useContext } from 'react';
import './PermitCard.css';
import { Link } from 'react-router-dom';
import EditPermitForm from './EditPermitForm';
import { PermitContext } from './PermitContext';

const PermitCard = ({ permit }) => {
  const { permitsData: permitsData, setPermitsData: setPermitsData } = useContext(PermitContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedPermit) => {
    if (Array.isArray(permitsData)) {
      const updatedPermits = permitsData.map((p) => (p.id === updatedPermit.id ? updatedPermit : p));
      setPermitsData(updatedPermits);
      setIsEditing(false);
    } else {
      console.error('permitsData is not an array or is undefined');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleRemove = () => {
    const updatedPermits = permitsData.filter((p) => p.id !== permit.id);
    setPermitsData(updatedPermits);
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <EditPermitForm permit={permit} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <img src={permit.img} alt={permit.location} className="product-img" />
          <div className="product-info">
            <h1>{permit.location}</h1>
            <p>{permit.description}</p>
            <p>Duration: {permit.duration} years</p>
            <p>Price: {permit.price}$</p>
          </div>
          <div className="product-buttons">
            <button className="primar-button edit" onClick={handleEdit}>Edit</button>
            <button className="primar-button remove" onClick={handleRemove}>Remove</button>
   
            <Link to={`/item/${permit.id}`} className="primary-button view-more">View More</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default PermitCard;

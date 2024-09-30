import React from 'react';
import './lista.css';
import editIcon from '../../assets/edit-icon.png'; 
import defaultImage from '../../assets/hotel-icon.png'; 

const Card = ({ item, image = defaultImage }) => {
  return (
    <div className="card">
      <img src={image} alt={`Item ${item.number}`} className="card-image" />
      <div className="card-info">
        <h4 className="card-number">{item.number}</h4>
        <span className={`card-status ${item.status.toLowerCase()}`}>
          {item.status}
        </span>
      </div>
      <div className="card-actions">
        <div className="card-price">${item.price}</div>
        <img src={editIcon} alt="Edit" className="edit-icon" />
      </div>
    </div>
  );
};

export default Card;

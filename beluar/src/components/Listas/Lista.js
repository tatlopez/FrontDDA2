import React from 'react';
import './lista.css';
import editIcon from '../../assets/edit-icon.svg'; 
import defaultImage from '../../assets/default-hotel.jpg'; 

const Card = ({ item, image = defaultImage }) => {
  return (
    <div className="card">
      <div className='card-left'>
        <img src={image} alt={`Item ${item.number}`} className="card-image" />
        <div className="card-info">
          <p className="card-number">#{item.number}</p>
          <span className={`card-status ${item.status.toLowerCase()}`}>
            {item.status}
          </span>
        </div>
      </div>
      <div className="card-actions">
        <p className="card-price">${item.price}</p>
        <img src={editIcon} alt="Edit" className="edit-icon" />
      </div>
    </div>
  );
};

export default Card;

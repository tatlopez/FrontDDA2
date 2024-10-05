import React from 'react';
import './lista.css';
import editIcon from '../../assets/edit-icon.svg'; 
import defaultImage from '../../assets/default-hotel.jpg'; 

const Card = ({ item, image = defaultImage, type }) => {
  return (
    <div className="card">
      <div className='card-left'>
        <img src={image} alt={`Item ${type === 'habitacion' ? item.number : item.name}`} className="card-image" />
        <div className="card-info">
          {type === 'habitacion' ? (
            <p className="card-number">#{item.number}</p>
          ) : (
            <p className="card-number">{item.name}</p>
          )}
          {type === 'habitacion' ? (
            <span className={`card-status ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          ) : (
            <div>
              <span className="card-duration-label">Disponibilidad/duración:</span>
              <span className="card-duration">
                {item.duration}
              </span>
            </div>
          )}
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

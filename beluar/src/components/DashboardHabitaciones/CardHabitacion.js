import React from 'react';
import './cardHabitacion.css';
import editIcon from '../../assets/edit-icon.png'; 
import hotelImage from '../../assets/hotel-icon.png'; 

const CardHabitacion = ({ room }) => {
  return (
    <div className="room-card">
      <img src={hotelImage} alt={`Room ${room.number}`} className="room-image" />
      <div className="room-info">
        <h4 className="room-number">{room.number}</h4>
        <span className={`room-status ${room.status.toLowerCase()}`}>
          {room.status}
        </span>
      </div>
      <div className="room-actions">
        <div className="room-price">${room.price}</div>
        <img src={editIcon} alt="Edit" className="edit-icon" />
      </div>
    </div>
  );
};

export default CardHabitacion;

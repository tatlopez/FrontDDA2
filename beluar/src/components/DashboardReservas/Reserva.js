import React from 'react';
import './reserva.css'; 

const Reserva = ({ item }) => {
  return (
    <div className="reserva-card">
      <div className="reserva-left">
        <div className="reserva-date">
          <p className="reserva-day">{item.date.split(' ')[0]}</p>
          <p className="reserva-month">{item.date.split(' ')[1]}</p>
        </div>
        <div className="reserva-info">
          <p className="reserva-name">{item.name}</p>
          <p className="reserva-room">Habitación: <span className="reserva-room-number">{item.room}</span></p>
        </div>
      </div>
      <div className="reserva-right">
        <p className="reserva-price">USD ${item.price}</p>
      </div>
    </div>
  );
};

export default Reserva;

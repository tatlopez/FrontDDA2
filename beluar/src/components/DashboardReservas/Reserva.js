import React from 'react';
import './reserva.css';

const Reserva = ({ item, onClick }) => {

  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];


  return (
    <div className="reserva-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="reserva-left">
        <div className="reserva-date">
          <p className="reserva-day">{item.start_date.split('-')[2]}</p>
          <p className="reserva-month">{monthNames[item.end_date.split('-')[1]-1]}</p>
        </div>
        <div className="reserva-info">
          <p className="reserva-name">{item.client_info.surname + ', ' + item.client_info.name}</p>
          <p className="reserva-room">Habitación: <span className="reserva-room-number">{item.room}</span></p>
        </div>
      </div>
      <div className="reserva-right">
        <p className="reserva-price">USD ${item.total_price}</p>
      </div>
    </div>
  );
};

export default Reserva;

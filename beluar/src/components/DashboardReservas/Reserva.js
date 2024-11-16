import React from 'react';
import './reserva.css';

const Reserva = ({ item, onClick ,isSelected }) => {

  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  
  const reservationStateMapping = {
    'pending': 'Pendiente',
    'confirmed': 'Confirmada',
    'cancelled': 'Cancelada'
  }

  return (
    <div className={`reserva-card ${isSelected ? 'selected' : ''}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="reserva-left">
        <div className="reserva-date">
          <p className="reserva-day">{item.start_date.split('-')[2]}</p>
          <p className="reserva-month">{monthNames[item.end_date.split('-')[1]-1]}</p>
        </div>
        <div className='reserva-text'>
          <p className="reserva-name">{item.client_info.surname + ', ' + item.client_info.name}</p>
          <div className='reserva-info'>
            <p className="reserva-room">Habitación: <span className="reserva-room-number">{'#'+item.room_info.floor + item.room_info.name}</span></p>
            <p className='reserva-state'>
              <span className={`reserva-status ${item.status}`}>
                  {reservationStateMapping[item.status] || item.status}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="reserva-right">
        <p className="reserva-price">${item.total_price}</p>
      </div>
    </div>
  );
};

export default Reserva;

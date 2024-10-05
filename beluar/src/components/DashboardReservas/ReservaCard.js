import React from 'react';
import './reserva.css';

const ReservaCard = ({ item }) => {
  return (
    <div className="reserva-detail">
      <h3 className="reserva-number">Reserva #{item.number}</h3>
      <div className="reserva-fields">

        <div className="reserva-field">
          <label>Apellido y nombre</label>
          <input type="text" value={item.name} className="reserva-input" readOnly />
        </div>

        <div className="reserva-field">
          <label>Habitación</label>
          <input type="text" value={item.room} className="reserva-input" readOnly />
        </div>

        <div className="reserva-field">
          <label>Check-in</label>
          <input type="text" value={item.checkIn} className="reserva-input" readOnly />
        </div>

        <div className="reserva-field">
          <label>Check-out</label>
          <input type="text" value={item.checkOut} className="reserva-input" readOnly />
        </div>

        {/* Agregar la validación para services */}
        {item.services && item.services.length > 0 && (
          <div className="reserva-field">
            <label>Servicios contratados</label>
            <ul className="reserva-services">
              {item.services.map((service, index) => (
                <li key={index}>{service.name} <span className="service-price">USD {service.price}</span></li>
              ))}
            </ul>
          </div>
        )}

        <hr className="divider-line" /> 
        
        <div className="reserva-total">
          <span>Total</span> <span className="reserva-total-price">USD {item.price}</span>
        </div>

        <div className="reserva-remaining">
          <span>Falta abonar</span> <span className="reserva-remaining-price">USD {item.abonar}</span>
        </div>

      </div>
      
      <div className="reserva-buttons">
        <button className="btn-reserva abonar">Abonar total</button>
        <button className="btn-reserva agregar-servicio">Agregar servicio</button>
        <button className="btn-reserva cancelar">Cancelar reserva</button>
      </div>
    </div>
  );
};

export default ReservaCard;

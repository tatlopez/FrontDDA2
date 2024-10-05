import React from 'react';

const ReservaCard = ({ item }) => {
  return (
    <div className="item-detail">
      <h3 className="item-number">Reserva # {item.number}</h3>
      <div className='fields'>

        <div className="editable-fields">
            <label>Nombre:</label>
            <span className="editable-input">{item.name}</span>
        </div>
        
        <div className="editable-fields">
            <label>Habitación:</label>
            <span className="editable-input">{item.room}</span>
        </div>

        <div className="editable-fields">
            <label>Check-in:</label>
            <span className="editable-input">{item.checkIn}</span>
        </div>

        <div className="editable-fields">
            <label>Check-out:</label>
            <span className="editable-input">{item.checkOut}</span>
        </div>

        {/*<div className="editable-fields">
            <label>Servicios Contratados:</label>
            <span className="editable-input">{item.services.join(', ')}</span>
        </div>*/}

        <div className="editable-fields">
            <label>Total:</label>
            <span className="editable-input">${item.total}</span>
        </div>

        <div className="editable-fields">
            <label>Falta Abonar:</label>
            <span className="editable-input">${item.remainingBalance}</span>
        </div>
    </div>
      <div className="buttons-reserva">
        <button className="status-button">Abonar Total</button>
        <button className="status-button">Agregar Servicio</button>
        <button className="delete-button">Cancelar Reserva</button>
      </div>
    </div>
  );
};

export default ReservaCard;

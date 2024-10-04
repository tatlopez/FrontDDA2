// card para mostrar la info de una habitación, servicio, etc. ES ESTÁTICA.

import React from 'react';
import './card.css'
import defaultImage from '../../assets/default-hotel.jpg'; 

const Modificar = ({ item }) => {
  return (
    <div className="item-detail">
      <p className="item-number">Número: {item.number}</p>
      <img src={defaultImage} alt={`Item ${item.number}`} className="detail-image" />
      <div className='fields'>
        <div className="editable-fields">
          <label>Hotel</label>
          <div value={item.hotel} className="editable-input" />
        </div>
        <div className="editable-fields">
          <label>Piso</label>
          <div value={item.floor} className="editable-input" />
        </div>
        <div className="editable-fields">
          <label>Precio</label>
          <div value={item.price} className="editable-input" />
        </div>
        <div className="editable-fields">
          <label>Estado</label>
          <span className={`item-status ${item.status.toLowerCase()}`}>{item.status}</span>
        </div>
      </div>
      <div className='buttons'>
        <button className="status-button">Cambiar estado</button>
        <button className="delete-button">Eliminar</button>
      </div>
    </div>
  );
};

export default Modificar;

// card para mostrar la info de una habitación, servicio, etc. ES ESTÁTICA.

import React from 'react';
import './card.css';
import defaultImage from '../../assets/default-hotel.jpg';

const Modificar = ({ item, type }) => {
  return (
    <div className="item-detail">
      <p className="item-number">Número: {item.number || item.name}</p>
      <img src={defaultImage} alt={`Item ${item.number || item.name}`} className="detail-image" />
      <div className='fields'>
        <div className="editable-fields">
          <label>Hotel</label>
          <div value={item.hotel} className="editable-input" />
        </div>

        {type === 'habitacion' ? (
          <div className="editable-fields">
            <label>Piso</label>
            <div value={item.floor} className="editable-input" />
          </div>
        ) : (
          <div className="editable-fields">
            <label>Detalles</label>
            <div value={item.details} className="editable-input" />
          </div>
        )}

        <div className="editable-fields">
          <label>Precio</label>
          <div value={item.price} className="editable-input" />
        </div>

        <div className="editable-fields">
          <label>{type === 'habitacion' ? 'Estado' : 'Duración'}</label>
          <span className={type === 'habitacion' ? `item-status ${item.status.toLowerCase()}` : `item-duration`}>
            {type === 'habitacion' ? item.status : item.duration}
          </span>
        </div>


      </div>
      <div className='buttons'>
        <button className="status-button">{type === 'habitacion' ? 'Cambiar estado' : 'Cambiar precio'}</button>
        <button className="delete-button">{type === 'habitacion' ? 'Eliminar habitacion' : 'Eliminar servicio'}</button>
      </div>
    </div>
  );
};

export default Modificar;

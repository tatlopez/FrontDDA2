import React from 'react';
import './card.css';
import defaultImage from '../../assets/default-hotel.jpg';

const InfoCard = ({ item, type }) => {
  return (
    <div className="item-detail">
      <p className="item-number">Número: {item.number || item.name}</p>
      <img src={defaultImage} alt={`Item ${item.number || item.name}`} className="detail-image" />
      <div className='fields'>
        <div className="editable-fields">
          <label>Hotel</label>
          <div className="editable-input">{item.hotel}</div>
        </div>
        {type === 'habitacion' ? (
          <div className="editable-fields">
            <label>Piso</label>
            <div className="editable-input">{item.floor}</div>
          </div>
        ) : (
          <div className="editable-fields">
            <label>Detalles</label>
            <div className="editable-input">{item.details}</div>
          </div>
        )}
        <div className="editable-fields">
          <label>Precio</label>
          <div className="editable-input">{item.price}</div>
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

export default InfoCard;

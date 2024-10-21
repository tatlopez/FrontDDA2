import React from 'react';
import './card.css';
import defaultImage from '../../assets/default-hotel.jpg';
import { API_URL } from '../../config';

const InfoCard = ({ item, type, onEdit, onDelete }) => {

  const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

  const roomStateMapping = {
    'A': 'Disponible',
    'B': 'Reservada',
    'M': 'Mantenimiento'
  };

  if (!item) return null;

  return (
    <div className="item-detail">
      <p className="item-number">Número: {item.number || item.name}</p>
      <img src={

        item.images && item.images.length > 0
          ? item.images[0].image.startsWith('data:image/') // Verificamos si es un formato base64
            ? item.images[0].image // Usamos directamente la cadena base64
            : `${API_URL}${item.images[0].image}` // Usamos la URL normal
          : defaultImage

      } alt={`Item ${item.number || item.name}`} className="detail-image" />
      <div className='fields'>
        <div className="editable-fields">
          <label>Hotel</label>
          <div className="editable-input">{hotel.name}</div>
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
          <span className={type === 'habitacion' ? `item-status ${roomStateMapping[item.state]}` : `item-duration`}>
            {type === 'habitacion' ? roomStateMapping[item.state] || item.state : item.duration}
          </span>
        </div>
      </div>
      <div className='buttons'>
        <button className="status-button" onClick={() => onEdit(item)}>
          {type === 'habitacion' ? 'Cambiar estado' : 'Cambiar precio'}
        </button>
        <button className="delete-button" onClick={onDelete}>
          {type === 'habitacion' ? 'Eliminar habitación' : 'Eliminar servicio'}
        </button>
      </div>
    </div>
  );
};

export default InfoCard;

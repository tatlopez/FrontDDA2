import React from 'react';
import './lista.css';
import editIcon from '../../assets/edit-icon.svg';
import defaultImage from '../../assets/default-hotel.jpg';
import { API_URL } from '../../config';


const Listas = ({ item, type, onEditClick, onRoomClick, image = defaultImage }) => {

  const roomStateMapping = {
    'A': 'Disponible',
    'B': 'Reservada',
    'M': 'Mantenimiento'
  };
  
  return (
    <div className="card" onClick={() => onRoomClick(item)} style={{ cursor: 'pointer' }}>
      <div className="card-left">
      {type === 'habitacion' && (
          <img
            src={
              item.images && item.images.length > 0
                ? item.images[0].image.startsWith('data:image/') // Verificamos si es un formato base64
                  ? item.images[0].image // Usamos directamente la cadena base64
                  : `${API_URL}${item.images[0].image}` // Usamos la URL normal
                : image
            }
            alt={`Item ${type === 'habitacion' ? item.number : item.name}`}
            className="card-image"
          />
        )}
        <div className="card-info">
          {type === 'habitacion' ? (
            <p className="card-number">#{item.floor + item.name}</p>
          ) : (
            <p className="card-number">{item.name}</p>
          )}
          {type === 'habitacion' ? (
            <span className={`card-status ${roomStateMapping[item.state]}`}>
            {roomStateMapping[item.state] || item.state}
          </span>
          ) : (
            <div>
              <span className="card-duration-label">Detalles:</span>
              <span className="card-duration">
                {item.detail}
              </span>
            </div>
          )} 
        </div>
      </div>
      <div className="card-actions">
        <p className="card-price">${item.price}</p>
        <img src={editIcon} alt="Edit" className="edit-icon" onClick={(e) => { e.stopPropagation(); onEditClick(item); }} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default Listas;

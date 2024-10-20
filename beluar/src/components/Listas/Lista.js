import React from 'react';
import './lista.css';
import editIcon from '../../assets/edit-icon.svg';
import defaultImage from '../../assets/default-hotel.jpg';

const Listas = ({ item, type, onEditClick, onRoomClick, image = defaultImage }) => {

  const roomStateMapping = {
    'A': 'Disponible',
    'B': 'Reservada',
    'M': 'Mantenimiento'
  };
  
  return (
    <div className="card" onClick={() => onRoomClick(item)} style={{ cursor: 'pointer' }}>
      <div className="card-left">
        <img src={image} alt={`Item ${type === 'habitacion' ? item.number : item.name}`} className="card-image" />
        <div className="card-info">
          {type === 'habitacion' ? (
            <p className="card-number">#{item.floor + item.name}</p>
          ) : (
            <p className="card-number">{item.name}</p>
          )}
          {type === 'habitacion' ? (
            <span className={`card-status ${item.state.toLowerCase()}`}>
            {roomStateMapping[item.state] || item.state}
          </span>
          ) : (
            <div>
              <span className="card-duration-label">Disponibilidad/duración:</span>
              <span className="card-duration">
                {item.duration}
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

import React from 'react';
import './modificarHabitacion.css'
import hotelImage from '../../assets/hotel-icon.png'; 
;

const ModificarHabitacion = ({ room }) => {
  return (
    <div className="room-detail">
      <h3 className="room-number">Habitación #{room.number}</h3>
      <img src={hotelImage} alt={`Room ${room.number}`} className="detail-image" />
      <div className="editable-fields">
        <label>Hotel:</label>
        <input type="text" value={room.hotel} className="editable-input" />
      </div>
      <div className="editable-fields">
        <label>Piso:</label>
        <input type="text" value={room.floor} className="editable-input" />
      </div>
      <div className="editable-fields">
        <label>Precio:</label>
        <input type="text" value={room.price} className="editable-input" />
      </div>
      <div className="editable-fields">
        <label>Estado:</label>
        <span className={`room-status ${room.status.toLowerCase()}`}>{room.status}</span>      
      </div>
      <button className="status-button">Cambiar estado</button>
      <button className="delete-button">Eliminar habitación</button>
    </div>
  );
};

export default ModificarHabitacion;

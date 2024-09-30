import React from 'react';
import './card.css'
import defaultImage from '../../assets/hotel-icon.png'; 

const Modificar = ({ item }) => {
  return (
    <div className="item-detail">
      <h3 className="item-number">Número: {item.number}</h3>
      <img src={defaultImage} alt={`Item ${item.number}`} className="detail-image" />
      <div className="editable-fields">
        <label>Hotel:</label>
        <input type="text" value={item.hotel} className="editable-input" />
      </div>
      <div className="editable-fields">
        <label>Piso:</label>
        <input type="text" value={item.floor} className="editable-input" />
      </div>
      <div className="editable-fields">
        <label>Precio:</label>
        <input type="text" value={item.price} className="editable-input" />
      </div>
      <div className="editable-fields">
        <label>Estado:</label>
        <span className={`item-status ${item.status.toLowerCase()}`}>{item.status}</span>      
      </div>
      <button className="status-button">Cambiar estado</button>
      <button className="delete-button">Eliminar</button>
    </div>
  );
};

export default Modificar;

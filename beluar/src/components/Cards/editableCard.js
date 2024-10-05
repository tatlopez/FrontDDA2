// card que permite modificar una habitación, servicio, etc

import React from 'react';
import './card.css';
import cargarImagen from '../../assets/cargar-imagen.png';

const Modificar = ({ item, type }) => {
  return (
    <div className="item-detail">
      <img src={cargarImagen} alt={`Item ${item.number || item.name}`} className="detail-image" />
      <div className='fields'>

        <div className="editable-fields">
          <label>Hotel</label>
          <input type="text" value={item.hotel} className="editable-input" />
        </div>

        {type === 'habitacion' && (
          <>
            <div className="editable-fields">
              <label>Piso</label>
              <input type="text" value={item.floor} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Letra</label>
              <input type="text" value={item.letter} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Precio</label>
              <input type="text" value={item.price} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Estado</label>
              <input type="text" value={item.status} className="editable-input" />
            </div>
          </>
        )}

        {type === 'servicio' && (
          <>
            <div className="editable-fields">
              <label>Nombre del servicio</label>
              <input type="text" value={item.serviceName} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Detalles</label>
              <input type="text" value={item.details} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Precio</label>
              <input type="text" value={item.price} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Duración</label>
              <input type="text" value={item.duration} className="editable-input" />
            </div>
          </>
        )}
      </div>

      <div className='buttons'>
        <button className="status-button">
          {type === 'habitacion' ? 'Crear habitación' : 'Crear servicio'}
        </button>
      </div>
    </div>
  );
};

export default Modificar;

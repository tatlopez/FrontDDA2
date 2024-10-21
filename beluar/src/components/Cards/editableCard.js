import React, { useState } from 'react';
import './card.css';
import cargarImagen from '../../assets/cargar-imagen.png';

const EditableCard = ({ item, type, onSave }) => {
  const [floor, setFloor] = useState(item.floor || '');
  const [name, setName] = useState(item.name || '');
  const [price, setPrice] = useState(item.price || '');
  const [state, setState] = useState(item.state || '');

  const [serviceName, setServiceName] = useState(item.serviceName || '');
  const [details, setDetails] = useState(item.details || '');
  const [duration, setDuration] = useState(item.duration || '');

  const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

  const handleSave = () => {
    const updatedItem = { ...item, hotel, floor, name, price, state, serviceName, details, duration };
    onSave(updatedItem);
  };

  return (
    <div className="item-detail">
      <img src={cargarImagen} alt={`Item ${item.number || item.name}`} className="detail-image" />
      <div className='fields'>
        <div className="editable-fields">
          <label>Hotel</label>
          <input type="text" value={hotel.name}  className="editable-input" />
        </div>
        {type === 'habitacion' && (
          <>
            <div className="editable-fields">
              <label>Piso</label>
              <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Letra</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Precio</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Estado</label>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="editable-input" />
            </div>
          </>
        )}
        {type === 'servicio' && (
          <>
            <div className="editable-fields">
              <label>Nombre del servicio</label>
              <input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Detalles</label>
              <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Precio</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Duración</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="editable-input" />
            </div>
          </>
        )}
      </div>
      <div className='buttons'>
        <button className="status-button" onClick={handleSave}>
          {type === 'habitacion' ? 'Guardar cambios' : 'Guardar servicio'}
        </button>
      </div>
    </div>
  );
};

export default EditableCard;

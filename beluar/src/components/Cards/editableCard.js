import React, { useState } from 'react';
import './card.css';
import cargarImagen from '../../assets/cargar-imagen.png';
import { API_URL } from '../../config.js';
import modify_room from '../../services/rooms/modify_room.js';
import modify_service from '../../services/services/modify_service.js';

const EditableCard = ({ item, type, onSave }) => {
  const [floor, setFloor] = useState(item.floor || '');
  const [name, setName] = useState(item.name || '');
  const [price, setPrice] = useState(item.price || '');
  const [state, setState] = useState(item.state || '');
  const [single_beds_amount, setSingleBedsAmount] = useState(item.single_beds_amount || '');
  const [double_beds_amount, setDoubleBedsAmount] = useState(item.double_beds_amount || '');

  const [serviceName, setServiceName] = useState(item.name || '');
  const [detail, setDetail] = useState(item.detail || '');
  const [is_available, setIsAvailable] = useState(item.is_available || 'true');

  const [imagen, setImagen] = useState(
    item.images && item.images.length > 0 ? item.images[0].image : cargarImagen
  );

  const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

  const handleSave = () => {
    if (type === 'habitacion') {
      modify_room(item.id, hotel.id, floor, name, price, state, single_beds_amount, double_beds_amount)
        .then((response) => {
          onSave(response);
        })
        .catch((err) => {
          console.error('Error al modificar habitación:', err);
        });
    } else {
      modify_service(item.id, hotel.id, serviceName, detail, is_available, price)
        .then((response) => {
          onSave(response);
        })
        .catch((err) => {
          console.error('Error al modificar servicio:', err);
        });
    }
  };

  return (
    <div className="item-detail">
      {/* Mostrar el nombre de la habitación o servicio */}
      <p className="item-number">
        {type === 'habitacion' ? `Habitación #${floor + name}` : serviceName}
      </p>

      {type === 'habitacion' && (
        <img src={
          imagen.startsWith('data:') ? imagen : `${API_URL}${imagen}`
        } alt={`Item ${item.number || item.name}`} className="detail-image" />
      )}
      <div className='fields'>
        <div className="editable-fields">
          <label>Hotel</label>
          <input type="text" value={hotel.name} readOnly className="editable-input" />
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
              <label>Cantidad camas simples</label>
              <input type="text" value={single_beds_amount} onChange={(e) => setSingleBedsAmount(e.target.value)} className="editable-input" />
            </div>

            <div className="editable-fields">
              <label>Cantidad camas dobles</label>
              <input type="text" value={double_beds_amount} onChange={(e) => setDoubleBedsAmount(e.target.value)} className="editable-input" />
            </div>

            <div className="editable-fields">
              <label>Precio</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="editable-input" />
            </div>
            <div className="editable-fields">
            <label>Estado</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="editable-select">
              <option value="A">Disponible</option>
              <option value="B">Reservada</option>
              <option value="M">Mantenimiento</option>
            </select>
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
              <input type="text" value={detail} onChange={(e) => setDetail(e.target.value)} className="editable-input" />
            </div>
            <div className="editable-fields">
              <label>Disponibilidad</label>
              <select value={is_available} onChange={(e) => setIsAvailable(e.target.value)} className="editable-select">
                <option value="true">Habilitado</option>
                <option value="false">Deshabilitado</option>
              </select>
            </div>
            <div className="editable-fields">
              <label>Precio</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="editable-input" />
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

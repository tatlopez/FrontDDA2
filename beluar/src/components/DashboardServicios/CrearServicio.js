import React, { useState } from 'react';
import create_service from '../../services/services/create_service';

const AgregarServicioModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [is_available, setIsAvailable] = useState('true');
  const [price, setPrice] = useState('');

  const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

  const handleSave = () => {
    const nuevoServicio = {
      name: name,
      detail: detail,
      is_available: is_available,
      price: price,
    };

    create_service(hotel.id, name, detail, is_available, price)
      .then((response) => {
        onSave(nuevoServicio);
        onClose();
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p className="modal-title">Agregar servicio</p>
        <div className="modal-content">
          <div className='modal-fields'>
            <div className='fields-row'>
              <div className="modal-field">
                <label>Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Detalles</label>
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>
            </div>
            <div className='fields-row'>
              <div className="modal-field">
                <label>Disponibilidad</label>
                <div className='select-wrapper'>
                  <select value={is_available} onChange={(e) => setIsAvailable(e.target.value)} className="editable-select">
                    <option value="true">Habilitado</option>
                    <option value="false">Deshabilitado</option>
                  </select>
                </div>
              </div>
              <div className="modal-field">
                <label>Precio</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-buttons">
          <button className="btn-confirm" onClick={handleSave}>Agregar servicio</button>
          <button className="btn-confirm" onClick={onClose}>Volver atrás</button>
        </div>
      </div>
    </div>
  );
};

export default AgregarServicioModal;

import React, { useState } from 'react';
import './dashboardHabitaciones.css';
import hotelIcon from '../../assets/default-hotel.jpg';
import create_room from '../../services/rooms/create_room.js';


const AgregarHabitacionModal = ({ onClose, onSave }) => {
  const [floor, setFloor] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('A');
  const [price, setPrice] = useState('');
  const [imagen, setImagen] = useState(hotelIcon);
  const [file, setFile] = useState(null);

  const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

  const handleSave = () => {

    create_room(hotel.id, floor, name, price, state)
    
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagen(reader.result);
      reader.readAsDataURL(file); 
      setFile(file);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-modal" onClick={onClose}>X</button>
        <h2 className="modal-title">Agregar Habitación</h2>
        <div className="modal-content">
            <div className="modal-image-section">
                <label className="image-label">Imagen</label>
                <img src={imagen} alt="Hotel" className="hotel-image-preview" />
                <label htmlFor="imagen-input" className="btn-change-image">Cambiar imagen</label>
                <input 
                    type="file"
                    id="imagen-input"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </div>
          <div className="modal-field">
            <label>Piso</label>
            <input
              type="text"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Letra</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Estado</label>
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="A">Disponible</option>
              <option value="B">Ocupada</option>
              <option value="M">Mantenimiento</option>
            </select>
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
        <div className="modal-buttons">
          <button className="btn-confirm" onClick={handleSave}>Agregar Habitación</button>
        </div>
      </div>
    </div>
  );
};

export default AgregarHabitacionModal;

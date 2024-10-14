import React, { useState } from 'react';
import './dashboardHabitaciones.css';
import hotelIcon from '../../assets/default-hotel.jpg';


const AgregarHabitacionModal = ({ onClose, onSave }) => {
  const [number, setNumber] = useState('');
  const [piso, setPiso] = useState('');
  const [letra, setLetra] = useState('');
  const [status, setStatus] = useState('Disponible');
  const [price, setPrice] = useState('');
  const [imagen, setImagen] = useState(hotelIcon);
  const [file, setFile] = useState(null);

  const handleSave = () => {
    const nuevaHabitacion = {
      number,
      piso,
      letra,
      status,
      price: parseFloat(price),
      imagen,  
      type: 'habitacion'
    };
    onSave(nuevaHabitacion);
    onClose();
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
              value={piso}
              onChange={(e) => setPiso(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Letra</label>
            <input
              type="text"
              value={letra}
              onChange={(e) => setLetra(e.target.value)}
            />
          </div>
          {/*<div className="modal-field">
            <label>Estado</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Disponible">Disponible</option>
              <option value="Ocupada">Ocupada</option>
              <option value="Limpieza">Limpieza</option>
            </select>
          </div>*/}
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

import React, { useState } from 'react';
import defaultServiceIcon from  '../../assets/default-hotel.jpg';

const AgregarServicioModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [imagen, setImagen] = useState(defaultServiceIcon);
  const [file, setFile] = useState(null);

  const handleSave = () => {
    const nuevoServicio = {
      name,
      duration,
      price: parseFloat(price),
      imagen,
      type: 'servicio'
    };
    onSave(nuevoServicio);
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
        <h2 className="modal-title">Agregar Servicio</h2>
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
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Duración</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
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
          <button className="btn-confirm" onClick={handleSave}>Agregar Servicio</button>
        </div>
      </div>
    </div>
  );
};

export default AgregarServicioModal;

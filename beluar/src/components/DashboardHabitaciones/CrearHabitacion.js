import React, { useState, useRef } from 'react';
import './dashboardHabitaciones.css';
import hotelIcon from '../../assets/default-hotel.jpg';
import create_room from '../../services/rooms/create_room.js';
import attach_image_room from '../../services/rooms/attach_image_room.js';
import uploadPhoto from '../../assets/cargar-imagen.svg';

const AgregarHabitacionModal = ({ onClose, onSave }) => {
  const [floor, setFloor] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('A');
  const [price, setPrice] = useState('');
  const [imagen, setImagen] = useState('');
  const [file, setFile] = useState(null);
  const [single_beds_amount, setSingleBedsAmount] = useState('');
  const [double_beds_amount, setDoubleBedsAmount] = useState('');

  const inputRef = useRef(null);

  const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

  const handleSave = () => {
    const room = {
      hotel: hotel.id,
      floor: floor,
      name: name,
      state: state,
      price: price,
    };
  
    create_room(hotel.id, floor, name, price, state, single_beds_amount, double_beds_amount)
      .then((response) => {
        const id = response.id;
        room.id = id; 
        if (file) {
          const formData = new FormData();
          formData.append('image', file);
          attach_image_room(id, formData)
            .then(() => {
              room.images = [{ image: imagen }];
              onSave(room); 
              onClose(); 
            })
            .catch((error) => {
              console.error("Error uploading image:", error);
            });
        } else {
          onSave(room); 
          onClose(); 
        }
      })
      .catch((error) => {
        console.error('Error creating room:', error);
      });

      window.location.reload();
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file); // Guarda el archivo para el manejo posterior (como subirlo al backend)
      setImagen(URL.createObjectURL(file));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p className="modal-title">Agregar habitación</p>
        <div className="modal-content">
          <div className="modal-image-section" onClick={handleImageClick}>
            <label>Imagen</label>
            {imagen ? (
              <img src={imagen} alt="Imagen de la habitación" className="uploaded-image" />
            ) : (
              <img src={uploadPhoto} alt="Cargar imagen" className="upload-icon" />
            )}
            <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleImageChange} />
          </div>
          <div className='modal-fields'>
            <div className='modal-line'>
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
            </div>
            <div className='modal-line'>
              <div className="modal-field">
                <label>Camas individuales</label>
                <input
                  type="text"
                  value={single_beds_amount}
                  onChange={(e) => setSingleBedsAmount(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Camas dobles</label>
                <input
                  type="text"
                  value={double_beds_amount}
                  onChange={(e) => setDoubleBedsAmount(e.target.value)}
                />
              </div>
            </div>
            <div className='modal-line'>
              <div className="modal-field">
                <label>Estado</label>
                <div className='select-wrapper'>
                  <select value={state} onChange={(e) => setState(e.target.value)} className="editable-select">
                    <option value="A">Disponible</option>
                    <option value="B">Ocupada</option>
                    <option value="M">Mantenimiento</option>
                  </select>
                </div>
              </div>
              <div className="modal-field">
                <label>Precio</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder='$...'
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-buttons">
          <button className="btn-confirm" onClick={onClose}>Volver atrás</button>
          <button className="btn-confirm" onClick={handleSave}>Agregar habitación</button>
        </div>
      </div>
    </div>
  );
};

export default AgregarHabitacionModal;

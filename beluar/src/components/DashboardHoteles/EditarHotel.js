import React, { useState } from 'react';
import './hotel.css';
import hotelIcon from '../../assets/default-hotel.jpg';
import cargarImagen from '../../assets/cargar-imagen.png';
import create_hotel from '../../services/hotels/create_hotel.js';
import attach_image from '../../services/hotels/attach_image.js';
import { API_URL } from '../../config.js';

const EditarHotelModal = ({ hotel, onClose, onSave }) => {
    const [nombre, setNombre] = useState(hotel.name || '');
    const [direccion, setDireccion] = useState(hotel.address || '');
    const [ciudad, setCiudad] = useState(hotel.city || '');
    const [telefono, setTelefono] = useState(hotel.phone || '');
    const [email, setEmail] = useState(hotel.email || '');
    const [descripcion, setDescripcion] = useState(hotel.description || '');
    const [estrellas, setEstrellas] = useState(hotel.stars || 0);
    const [latitud, setLatitud] = useState(hotel.latitude || '');
    const [longitud, setLongitud] = useState(hotel.longitude || '');
    const [imagen, setImagen] = useState(
        hotel.images && hotel.images.length > 0 ? hotel.images[0].image : cargarImagen
    );
    const [file, setFile] = useState(null);

    const esNuevoHotel = !hotel.name; 

    const handleSave = () => {
        const updatedHotel = { 
            ...hotel, 
            nombre, 
            direccion, 
            ciudad, 
            telefono, 
            email, 
            descripcion, 
            estrellas, 
            latitud, 
            longitud, 
            imagen 
        };

        if (esNuevoHotel) {

            create_hotel(nombre, direccion, ciudad, telefono, email, descripcion, estrellas, latitud, longitud)
            .then((response) => {
                const id = response.id;

                const formData = new FormData();
                
                formData.append('image', file);
           
                attach_image(id, formData);
            })

        }
    
        onSave(updatedHotel);
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
                <h2 className="modal-title">{esNuevoHotel ? 'Agregar hotel' : 'Editar hotel'}</h2>
                <div className="modal-content">
                    <div className="modal-image-section">
                        <label className="image-label">Imagen</label>
                        <img src={imagen.startsWith('data:') ? imagen : `${API_URL}${imagen}`} alt="Hotel" className="hotel-image-preview" />
                        <label htmlFor="imagen-input" className="btn-change-image">Cambiar imagen</label>
                        <input 
                            type="file"
                            id="imagen-input"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="modal-form-section">
                        <div className="modal-field">
                            <label>Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Dirección</label>
                            <input
                                type="text"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Ciudad</label>
                            <input
                                type="text"
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Teléfono</label>
                            <input
                                type="text"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Descripción</label>
                            <input
                                type="text"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Estrellas</label>
                            <div className="star-rating">
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className={`star ${index < estrellas ? 'filled' : ''}`}
                                        onClick={() => setEstrellas(index + 1)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="modal-field">
                            <label>Latitud</label>
                            <input
                                type="text"
                                value={latitud}
                                onChange={(e) => setLatitud(e.target.value)}
                            />
                        </div>
                        <div className="modal-field">
                            <label>Longitud</label>
                            <input
                                type="text"
                                value={longitud}
                                onChange={(e) => setLongitud(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-buttons">
                <button className="btn-confirm" onClick={handleSave}>
                        {esNuevoHotel ? 'Agregar Hotel' : 'Guardar Cambios'}
                </button>
                </div>
            </div>
        </div>
    );
};

export default EditarHotelModal;

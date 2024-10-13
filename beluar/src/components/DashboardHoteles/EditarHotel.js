import React, { useState } from 'react';
import './hotel.css';
import hotelIcon from '../../assets/default-hotel.jpg';
import create_hotel from '../../services/hotels/create_hotel.js';
import attach_image from '../../services/hotels/attach_image.js';

const EditarHotelModal = ({ hotel, onClose, onSave }) => {
    const [nombre, setNombre] = useState(hotel.nombre || '');
    const [direccion, setDireccion] = useState(hotel.direccion || '');
    const [ciudad, setCiudad] = useState(hotel.ciudad || '');
    const [telefono, setTelefono] = useState(hotel.telefono || '');
    const [email, setEmail] = useState(hotel.email || '');
    const [descripcion, setDescripcion] = useState(hotel.descripcion || '');
    const [estrellas, setEstrellas] = useState(hotel.estrellas || 0);
    const [latitud, setLatitud] = useState(hotel.latitud || '');
    const [longitud, setLongitud] = useState(hotel.longitud || '');
    const [imagen, setImagen] = useState(hotel.imagen || hotelIcon);
    const [file, setFile] = useState(null);

    const esNuevoHotel = !hotel.nombre; 

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
                        <img src={imagen} alt="Hotel" className="hotel-image-preview" />
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

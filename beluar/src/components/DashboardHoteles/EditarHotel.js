import React, { useState, useRef } from 'react';
import './hotel.css';
import uploadPhoto from '../../assets/cargar-imagen.svg';
import create_hotel from '../../services/hotels/create_hotel.js';
import attach_image from '../../services/hotels/attach_image.js';
import modify_hotel from '../../services/hotels/modify_hotel.js';
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
    const [country, setCountry] = useState(hotel.country || '');
    const [imagen, setImagen] = useState(
        hotel.images && hotel.images.length > 0 ? hotel.images[0].image : uploadPhoto
    );
    const [file, setFile] = useState(null);
    const [imageResponse, setImageResponse] = useState(null);

    const esNuevoHotel = !hotel.name;

    const inputRef = useRef(null);

    const handleSave = () => {
        const updatedHotel = { 
            ...hotel, 
            name: nombre, 
            address: direccion, 
            city: ciudad, 
            phone: telefono, 
            email, 
            description: descripcion, 
            stars: estrellas, 
            latitude: latitud, 
            longitude: longitud, 
        };
    
        if (esNuevoHotel) {
            create_hotel(nombre, direccion, ciudad, telefono, email, descripcion, estrellas, latitud, longitud, country)
                .then((response) => {
                    const id = response.id;
                    if (file) {
                        const formData = new FormData();
                        formData.append('image', file);
                        attach_image(id, formData).then(() => {
                            updatedHotel.id = id;
                            updatedHotel.images = [{ image: imagen }]; 
                            onSave(updatedHotel); 
                        });
                    } else {
                        updatedHotel.id = id;
                        onSave(updatedHotel);
                    }
                })
                .catch((err) => {
                    console.error('Error al crear hotel:', err);
                });
    
        } else {
            
            modify_hotel(hotel.id, nombre, direccion, ciudad, telefono, email, descripcion, estrellas, latitud, longitud, country)
                .then(() => {
                    console.log('datos: ', hotel.id, nombre, direccion, ciudad, telefono, email, descripcion, estrellas, latitud, longitud)
                    if (file) {
                        const formData = new FormData();
                        formData.append('image', file);
                        attach_image(updatedHotel.id, formData).then((imageResponse) => {setImageResponse(imageResponse)});
                        updatedHotel.images = [{ image: imageResponse.image }];
                    } else {
                        onSave(updatedHotel); 
                    }
                })
                .catch((err) => {
                    console.error('Error al modificar hotel:', err);
                });
        }

        window.location.reload();
    
        onClose(); // Cerramos el modal
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
                <p className="modal-title">{esNuevoHotel ? 'Agregar hotel' : 'Editar hotel'}</p>
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
                    <div className="modal-fields">
                        <div className='modal-line'>
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
                        </div>
                        <div className='modal-line'>
                            <div className="modal-field">
                                <label>País</label>
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
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
                        </div>
                        <div className='modal-line'>
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
                        </div>
                        <div className='modal-line'>
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
                        </div>
                        <div className='modal-line'>
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
                </div>
                <div className="modal-buttons">
                    <button className="btn-confirm" onClick={handleSave}>{esNuevoHotel ? 'Agregar hotel' : 'Editar hotel'}</button>
                    <button className="btn-confirm" onClick={onClose}>Volver atrás</button>
                </div>
            </div>
        </div>
    );
};

export default EditarHotelModal;

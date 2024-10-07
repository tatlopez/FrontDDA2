import React, { useState } from 'react';
import './dashboardHoteles.css';
import Profile from '../Profile/Profile';
import logo from '../../assets/logo.png';
import hotelIcon from '../../assets/default-hotel.jpg';
import trashIcon from '../../assets/trash-icon.png';
import editIcon from '../../assets/edit-icon.png';
import addIcon from '../../assets/signo-mas.png';
import searchIcon from '../../assets/search-icon-white.svg';
import EditarHotelModal from './EditarHotel';
import cargarImagen from '../../assets/cargar-imagen.png';

const hotelesData = [
    {
        nombre: 'Palacio del Sol',
        direccion: 'Av. Alvear 1661, Recoleta, CABA, Buenos Aires.',
        estrellas: 5
    },
    {
        nombre: 'Estancia La Montaña',
        direccion: 'Ruta Nacional 40, km 65, San Martín de los Andes, Neuquén.',
        estrellas: 4
    },
    {
        nombre: 'Hotel Imperial',
        direccion: 'Av. Maipú 505, Ushuaia, Tierra del Fuego.',
        estrellas: 4
    },
    {
        nombre: 'Resort Las Águilas',
        direccion: 'Av. Bustillo km 25, San Carlos de Bariloche, Río Negro.',
        estrellas: 4
    }
];

function DashboardHoteles() {
    const [hoteles, setHoteles] = useState(hotelesData);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Abrir modal para editar un hotel existente
    const openModal = (hotel) => {
        setSelectedHotel(hotel);
        setShowModal(true);
    };

    // Abrir modal para agregar un hotel nuevo
    const addNewHotel = () => {
        const emptyHotel = {
            nombre: '',
            direccion: '',
            estrellas: 0,
            imagen: cargarImagen
        };
        setSelectedHotel(emptyHotel);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Guardar o actualizar los datos del hotel
    const handleSaveHotel = (updatedHotel) => {
        if (hoteles.some(hotel => hotel.nombre === updatedHotel.nombre)) {
            // Editar hotel existente
            setHoteles(hoteles.map(hotel => hotel.nombre === updatedHotel.nombre ? updatedHotel : hotel));
        } else {
            // Agregar nuevo hotel
            setHoteles([...hoteles, updatedHotel]);
        }
    };

    return (
        <div style={{ backgroundColor: '#FEFBFF' }}>
            <header className="dashboard-headerHotel">
                <img src={logo} alt="logo" className="signin-logo" />
                <div className="header-right">
                    <Profile />
                </div>
            </header>
            <main className="dashboard-container">
                <div className='hoteles-title'>
                    <h1 style={{ textAlign: 'left' }}>Tus hoteles</h1>
                    <div className='hoteles-buttons'>
                        <button className='hoteles-circleButton' onClick={addNewHotel}>
                            <img src={addIcon} alt='Agregar hotel' />
                        </button>
                        <button className='hoteles-circleButton'>
                            <img src={searchIcon} alt='Buscar hotel' />
                        </button>
                    </div>
                </div>
                <div className="hoteles-list">
                    {hoteles.map((hotel, index) => (
                        <div key={index} className="hotel-item">
                            <img src={hotelIcon} alt={hotel.nombre} className="hotel-image" />
                            <div className="hotel-info">
                                <h2>{hotel.nombre}</h2>
                                <p>{hotel.direccion}</p>
                                <div className="hotel-stars">
                                    {'★'.repeat(hotel.estrellas)}
                                    {'☆'.repeat(5 - hotel.estrellas)}
                                </div>
                            </div>
                            <div className="hotel-actions">
                                <button className="edit-btn" onClick={() => openModal(hotel)}>
                                    <img src={editIcon} alt="Edit" className="edit-image" />
                                </button>
                                <button className="delete-btn">
                                    <img src={trashIcon} alt="Delete" className="trash-image" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {showModal && (
                <EditarHotelModal
                    hotel={selectedHotel}
                    onClose={closeModal}
                    onSave={handleSaveHotel}
                />
            )}
        </div>
    );
}

export default DashboardHoteles;

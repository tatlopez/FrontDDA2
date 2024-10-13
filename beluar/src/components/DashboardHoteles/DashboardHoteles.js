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
import ConfirmActionModal from '../PopUp/ConfirmActionModal'; 
import cargarImagen from '../../assets/cargar-imagen.png';
import SearchBar from '../SearchBar/SearchBar';

const hotelesData = [
    { id: 1, nombre: 'Palacio del Sol', direccion: 'Av. Alvear 1661, Recoleta, CABA, Buenos Aires.', estrellas: 5 },
    { id: 2, nombre: 'Estancia La Montaña', direccion: 'Ruta Nacional 40, km 65, San Martín de los Andes, Neuquén.', estrellas: 4 },
    { id: 3, nombre: 'Hotel Imperial', direccion: 'Av. Maipú 505, Ushuaia, Tierra del Fuego.', estrellas: 4 },
    { id: 4, nombre: 'Resort Las Águilas', direccion: 'Av. Bustillo km 25, San Carlos de Bariloche, Río Negro.', estrellas: 4 }
];

function DashboardHoteles() {
    const [hoteles, setHoteles] = useState(hotelesData);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const openModal = (hotel) => {
        setSelectedHotel(hotel);
        setShowModal(true);
    };

    const addNewHotel = () => {
        const emptyHotel = { id: Date.now(), nombre: '', direccion: '', estrellas: 0, imagen: cargarImagen };
        setSelectedHotel(emptyHotel);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openDeleteModal = (hotel) => {
        setSelectedHotel(hotel);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleSaveHotel = (updatedHotel) => {
        
    };

    const handleDeleteHotel = (hotelToDelete) => {
        setHoteles(hoteles.filter(hotel => hotel.id !== hotelToDelete.id));
        closeDeleteModal(); // Aseguramos que el modal se cierre después de eliminar el hotel
    };

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    const filteredHoteles = hoteles.filter(hotel =>
        hotel.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        <button className='hoteles-circleButton' onClick={toggleSearchBar}>
                            <img src={searchIcon} alt='Buscar hotel' />
                        </button>
                    </div>
                </div>
                {showSearchBar && (
                    <SearchBar setSearchTerm={setSearchTerm} style={{ marginBottom: '20px' }} placeholder="Buscar hotel..." />
                )}
                <div className="hoteles-list">
                    {filteredHoteles.map((hotel) => (
                        <div key={hotel.id} className="hotel-item">
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
                                <button className="delete-btn" onClick={() => openDeleteModal(hotel)}>
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
            {showDeleteModal && (
                <ConfirmActionModal
                    actionType="eliminarHotel"
                    onClose={closeDeleteModal}
                    onConfirm={() => handleDeleteHotel(selectedHotel)}
                />
            )}
        </div>
    );
}

export default DashboardHoteles;

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
import { useEffect } from 'react';
import get_hotels from '../../services/hotels/get_hotels';
import { API_URL } from '../../config';

const hotelesData = [
    { id: 1, nombre: 'Palacio del Sol', direccion: 'Av. Alvear 1661, Recoleta, CABA, Buenos Aires.', estrellas: 5 },
    { id: 2, nombre: 'Estancia La Montaña', direccion: 'Ruta Nacional 40, km 65, San Martín de los Andes, Neuquén.', estrellas: 4 },
    { id: 3, nombre: 'Hotel Imperial', direccion: 'Av. Maipú 505, Ushuaia, Tierra del Fuego.', estrellas: 4 },
    { id: 4, nombre: 'Resort Las Águilas', direccion: 'Av. Bustillo km 25, San Carlos de Bariloche, Río Negro.', estrellas: 4 }
];


function DashboardHoteles() {
    const [hoteles, setHoteles] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        get_hotels().then((res) => {
            console.log('Hoteles cargados:', res);
            setHoteles(res);
        })
    }, []);  

    const openModal = (hotel) => {
        setSelectedHotel(hotel);
        setShowModal(true);
    };

    const addNewHotel = () => {
        const emptyHotel = { id: Date.now(), name: '', address: '', stars: 0, phone: '', email: '', description: '', latitude: '', longitude: '',imagen: cargarImagen };
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
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <img src={hotel.images && hotel.images.length > 0 
                                    ? `${API_URL}${hotel.images[0].image}` 
                                    : hotelIcon // Usa la imagen predeterminada si no hay imágenes
                        } 
                alt={hotel.name} 
                className="hotel-image" 
            />
                            <div className="hotel-info">
                                <h2>{hotel.name}</h2>
                                <p>{hotel.address + ', ' + hotel.city}</p>
                                <div className="hotel-stars">
                                    {'★'.repeat(hotel.stars)}
                                    {'☆'.repeat(5 - hotel.stars)}
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

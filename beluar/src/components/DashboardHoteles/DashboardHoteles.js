import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboardHoteles.css';
import Profile from '../Profile/Profile';
import Logo from '../Logo/logo.js';
import hotelIcon from '../../assets/default-hotel.jpg';
import trashIcon from '../../assets/trash-icon.png';
import editIcon from '../../assets/edit-icon.png';
import addIcon from '../../assets/signo-mas.svg';
import cargarImagen from '../../assets/cargar-imagen.png';
import delete_hotel from '../../services/hotels/delete_hotel';
import SearchBar from '../SearchBar/SearchBar';
import get_hotels from '../../services/hotels/get_hotels';
import { API_URL } from '../../config';
import Header from "../Header/Header";
import ResponsiveHeader from "../Header/responsiveHeader.js";
import EditarHotelModal from './EditarHotel';
import ConfirmActionModal from '../PopUp/ConfirmActionModal';

function DashboardHoteles() {
    const [hoteles, setHoteles] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const navigate = useNavigate();

    useEffect(() => {
        get_hotels()
            .then((res) => {
                setHoteles(res || []);
                setLoading(false);
            })
            .catch((err) => {
                setError('Hubo un error al cargar los hoteles. Inténtalo más tarde.');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const openModal = (hotel) => {
        setSelectedHotel(hotel);
        setShowModal(true);
    };

    const addNewHotel = () => {
        const emptyHotel = {
            id: Date.now(),
            name: '',
            address: '',
            stars: 0,
            phone: '',
            email: '',
            description: '',
            latitude: '',
            longitude: '',
            imagen: cargarImagen
        };
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
        if (hoteles.some(h => h.id === updatedHotel.id)) {
            setHoteles(hoteles.map(h => h.id === updatedHotel.id ? updatedHotel : h));
        } else {
            setHoteles([...hoteles, updatedHotel]);
        }
    };

    const handleDeleteHotel = (hotelToDelete) => {
        delete_hotel(hotelToDelete.id)
            .then(() => {
                setHoteles(hoteles.filter(hotel => hotel.id !== hotelToDelete.id));
                closeDeleteModal();
            })
            .catch((err) => {
                setError('Hubo un problema al eliminar el hotel. Inténtalo de nuevo.');
                closeDeleteModal();
            });
    };

    const filteredHoteles = Array.isArray(hoteles) ? hoteles.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const handleHotelClick = (hotel) => {
        localStorage.setItem('selectedHotel', JSON.stringify(hotel));
        navigate('/DashboardInicio');
    };

    return (
        <div style={{ backgroundColor: '#FEFBFF' }} className='dashboard'>
            <Header className="header" />
            <ResponsiveHeader className="header-responsive" />
            <main className="dashboard-container">
                <div className="hoteles-title">
                    <h1 style={{ textAlign: 'left' }}>Tus hoteles</h1>
                    <div className="hoteles-buttons">
                        <button className="hoteles-circleButton" onClick={addNewHotel}>
                            <img src={addIcon} alt="Agregar hotel" />
                        </button>
                        {isDesktop && <SearchBar />} {/* Solo muestra la SearchBar si es escritorio */}
                    </div>
                </div>
                <div className="hoteles-list">
                    {loading ? (
                        <p>Cargando hoteles...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : filteredHoteles.length === 0 ? (
                        <p>No se encontraron hoteles.</p>
                    ) : (
                        filteredHoteles.map((hotel) => (
                            <div key={hotel.id} className="hotel-item">
                                <img
                                    src={
                                        hotel.images && hotel.images.length > 0
                                            ? hotel.images[0].image.startsWith('data:image/')
                                                ? hotel.images[0].image
                                                : `${API_URL}${hotel.images[0].image}`
                                            : hotelIcon
                                    }
                                    alt={hotel.name}
                                    className="hotel-image"
                                    onClick={() => handleHotelClick(hotel)}
                                />
                                <div className="hotel-info" onClick={() => handleHotelClick(hotel)}>
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
                        ))
                    )}
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

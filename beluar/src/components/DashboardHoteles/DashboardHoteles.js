import React from 'react';
import './dashboardHoteles.css';
import SearchBar from '../SearchBar/SearchBar';
import Profile from '../Profile/Profile';
import logo from '../../assets/logo.png'; 
import hotelIcon from '../../assets/hotel-icon.png'; 
import trashIcon from '../../assets/trash-icon.png'; 
import editIcon from '../../assets/edit-icon.png'; 

const hoteles = [
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
    return (
        <div>
            <header className="dashboard-headerHotel">
                <img src={logo} alt="logo" className="signin-logo" /> 
                <div className="header-right">
                    <SearchBar />
                    <Profile />
                </div>
            </header>
            <main className="dashboard-container">
                <h1>Tus hoteles</h1>
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
                                <button className="edit-btn"><img src={editIcon} alt={hotel.nombre} className="edit-image" /></button>
                                <button className="delete-btn"><img src={trashIcon} alt={hotel.nombre} className="trash-image" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default DashboardHoteles;

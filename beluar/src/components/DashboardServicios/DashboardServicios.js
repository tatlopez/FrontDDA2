import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Listas from '../Listas/Lista';
import InfoCard from '../Cards/infoCard';
import Header from '../Header/Header';
import signoMas from '../../assets/signo-mas.png'; 

const roomsData = [
  { name: 'Acceso a salon VIP', duration: '24hs', price: 300, image: 'room1.jpg' },
  { name: 'Clase de tenis privada', duration: '60min', price: 250, image: 'room2.jpg' },
  { name: 'Traslado al aeropuerto', duration: '24hs', price: 250, image: 'room4.jpg' },
  { name: 'Room Service', duration: '24hs', price: 100, image: 'room5.jpg' },
];

function DashboardHabitaciones() {
    const [selectedRoom, setSelectedRoom] = useState(roomsData[0]); 

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container">
                <Header /> 
                <div className="dashboard-body">
                    <div className="rooms-section">
                        <div className="rooms-header">
                            <p>Servicios</p>
                            <div className="search-and-add">
                                <SearchBar />
                                <button className="add-room-button">
                                    <img src={signoMas} alt="Add Icon" />
                                </button>
                            </div>
                        </div>
                        <div className="rooms-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {roomsData.map((room) => (
                                <Listas key={room.number} item={room} type={'servicio'}/>
                            ))}
                        </div>
                    </div>
                    <div className="room-detail-section">
                        <InfoCard item={selectedRoom} type={'servicio'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHabitaciones;

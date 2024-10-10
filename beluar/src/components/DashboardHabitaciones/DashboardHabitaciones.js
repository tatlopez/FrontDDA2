import React, { useState } from 'react';
import './dashboardHabitaciones.css';
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Listas from '../Listas/Lista';
import InfoCard from '../Cards/editableCard';
import Header from '../Header/Header';
import signoMas from '../../assets/signo-mas.png'; 

const roomsData = [
  { number: '3A', status: 'Disponible', price: 300, image: 'room1.jpg' },
  { number: '7B', status: 'Limpieza', price: 250, image: 'room2.jpg' },
  { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg' },
  { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg' },
  { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg' },
  { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg' },
  { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg' },
  { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg' },
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
                            <p>Habitaciones</p>
                            <div className="search-and-add">
                                <SearchBar />
                                <button className="add-room-button">
                                    <img src={signoMas} alt="Add Icon" />
                                </button>
                            </div>
                        </div>
                        <div className="rooms-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {roomsData.map((room) => (
                                <Listas key={room.number} item={room} type={'habitacion'}/>
                            ))}
                        </div>
                    </div>
                    <div className="room-detail-section">
                        <InfoCard item={selectedRoom} type={'habitacion'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHabitaciones;

import React, { useState } from 'react';
import './dashboardHabitaciones.css';
import SearchBar from '../SearchBar/SearchBar';
import Profile from '../Profile/Profile';
import Menu from '../Menu/Menu';
import CardHabitacion from './CardHabitacion';
import ModificarHabitacion from './ModificarHabitacion';
import editIcon from '../../assets/edit-icon.png'; 


const roomsData = [
  { number: '3A', status: 'Disponible', price: 300, image: 'room1.jpg' },
  { number: '7B', status: 'Limpieza', price: 250, image: 'room2.jpg' },
  { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg' },
  { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg' },
];

function DashboardHabitaciones() {
    const [selectedRoom, setSelectedRoom] = useState(roomsData[1]); 

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container">
                <header className="dashboard-header">
                    <div className="hotel-title">
                        <img src={editIcon} alt="Edit Icon" className="edit-icon" />
                        <h1 className="hotel-name">Palacio del Sol</h1>
                    </div>
                    <div className="header-right">
                        <Profile />
                    </div>
                </header>
                <div className="dashboard-body">
                    <div className="rooms-section">
                        <div className="rooms-header">
                        <h2>Habitaciones</h2>
                        <div className="search-and-add">
                            <SearchBar />
                            <button className="add-room-button">
                            <span className="plus-icon">+</span>
                            </button>
                        </div>
                        </div>
                        <div className="rooms-list">
                        {roomsData.map((room) => (
                            <CardHabitacion key={room.number} room={room} />
                        ))}
                        </div>
                    </div>
                    <div className="room-detail-section">
                        <ModificarHabitacion room={selectedRoom} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHabitaciones;

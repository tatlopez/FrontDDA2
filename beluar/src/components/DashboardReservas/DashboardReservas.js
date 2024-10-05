import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import Reserva from './Reserva';
import ReservaCard from './ReservaCard';

const reservaData = [
    { number: '145', date: '15 Sep', name: 'Fernandez, Martin', price: 120, room: '#3B' },
    { number: '467', date: '16 Sep', name: 'Rodriguez, Carla', price: 85, room: '#7J' },
    { number: '689', date: '18 Sep', name: 'Gomez, Luis', price: 65, room: '#5C' },
    { number: '999', date: '20 Sep', name: 'Suares, Natalia', price: 95, room: '#6A' },
  ];

function DashboardReservas() {
    const [selectedReserva, setSelectedReserva] = useState(reservaData[0]); 

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container">
                <Header /> 
                <div className="dashboard-body">
                    <div className="rooms-section">
                        <div className="rooms-header">
                            <p>Reservas</p>
                            <div className="search-bar-and-add">
                                <SearchBar />
                            </div>
                        </div>
                        <div className="rooms-list">
                            {reservaData.map((reserva) => (
                                <Reserva key={reserva.number} item={reserva}/>
                            ))}
                        </div>
                    </div>
                    <div className="room-detail-section">
                        <ReservaCard item={selectedReserva}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardReservas;
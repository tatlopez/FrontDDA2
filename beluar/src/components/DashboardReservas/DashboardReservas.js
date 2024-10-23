import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import Reserva from './Reserva';
import ReservaCard from './ReservaCard';
import get_reservations from '../../services/reservations/get_reservations';

function DashboardReservas() {
    const [reservas, setReservas] = useState([]);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReserva = reservas.filter(reserva =>
        reserva.client_info && reserva.client_info.name && 
        `${reserva.client_info.name} ${reserva.client_info.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleReservaClick = (reserva) => {
        setSelectedReserva(reserva);
    };

    const handleCancelReserva = (reservaToCancel) => {
        setReservas(reservas.filter(reserva => reserva.id !== reservaToCancel.id));
        setSelectedReserva(null); // Clear the selected reservation
    };

    const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

    useEffect(() => {
        get_reservations(hotel.id)
            .then((res) => {
                const loadedReservas = res || [];
                console.log(loadedReservas);
                setReservas(loadedReservas);

                if (loadedReservas.length > 0) {
                    setSelectedReserva(loadedReservas[0]);
                }
            });
    }, []);

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container">
                <Header hotelName={hotel.name}/>
                <div className="dashboard-body">
                    <div className="rooms-section">
                        <div className="rooms-header">
                            <p>Reservas</p>
                            <div className="search-bar-and-add">
                                <SearchBar setSearchTerm={setSearchTerm} placeholder="Buscar reserva..." />
                            </div>
                        </div>
                        <div className="rooms-list" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                            {filteredReserva.map((reserva) => (
                                <Reserva key={reserva.id} item={reserva} onClick={() => handleReservaClick(reserva)} />
                            ))}
                        </div>
                    </div>
                    <div className="room-detail-section">
                        {selectedReserva && (
                            <ReservaCard item={selectedReserva} onCancelReserva={handleCancelReserva} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardReservas;

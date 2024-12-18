import React, { useState, useEffect } from 'react';
import './dashboardReservas.css';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import Reserva from './Reserva';
import ReservaCard from './ReservaCard';
import get_reservations from '../../services/reservations/get_reservations';
import cancel_reservation from '../../services/reservations/cancel_reservation';

function DashboardReservas() {
    const [reservas, setReservas] = useState([]);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredReserva = reservas
        .filter(reserva => 
            reserva.client_info && reserva.client_info.name &&
            `${reserva.client_info.name} ${reserva.client_info.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(reserva => {
            if (filter === 'all') return true;
            else if (filter === 'pending') return reserva.status === 'pending';
            else if (filter === 'confirmed') return reserva.status === 'confirmed';
            else if (filter === 'cancelled') return reserva.status === 'cancelled';
    });


    const handleReservaClick = (reserva) => {
        setSelectedReserva(reserva);
    };

    const handleCancelReserva = (reservaToCancel) => {
        
        setSelectedReserva(reservas[0]); 

        cancel_reservation(reservaToCancel.id)
        .then()
        .catch((err) => {
            console.error('Error al cancelar la reserva:', err);
        });

    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
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
                    <div className="reservas-section">
                        <div className="reservas-header">
                            <p>Reservas</p>
                            <div className="search-bar-and-add">
                                <Filter onFilterChange={handleFilterChange} actionType='reserva'/>
                                <SearchBar setSearchTerm={setSearchTerm} placeholder="Buscar reserva..." />
                            </div>
                        </div>
                        <div className="reservas-list" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                            {filteredReserva.map((reserva) => (
                                <Reserva key={reserva.id} 
                                        item={reserva} 
                                        onClick={() => handleReservaClick(reserva)}
                                        isSelected={selectedReserva && selectedReserva.id === reserva.id} />
                            ))}
                        </div>
                    </div>
                    <div className="reserva-detail-section">
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

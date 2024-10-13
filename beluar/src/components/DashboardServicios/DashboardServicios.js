import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Listas from '../Listas/Lista';
import InfoCard from '../Cards/infoCard';
import EditableCard from '../Cards/editableCard';
import Header from '../Header/Header';
import signoMas from '../../assets/signo-mas.png';

const servicesData = [
    { name: 'Acceso a salon VIP', duration: '24hs', price: 300, image: 'room1.jpg', type: 'servicio' },
    { name: 'Clase de tenis privada', duration: '60min', price: 250, image: 'room2.jpg', type: 'servicio' },
    { name: 'Traslado al aeropuerto', duration: '24hs', price: 250, image: 'room4.jpg', type: 'servicio' },
    { name: 'Room Service', duration: '24hs', price: 100, image: 'room5.jpg', type: 'servicio' },
    { name: 'Room Service', duration: '24hs', price: 100, image: 'room5.jpg', type: 'servicio' },
    { name: 'Room Service', duration: '24hs', price: 100, image: 'room5.jpg', type: 'servicio' },
    { name: 'Room Service', duration: '24hs', price: 100, image: 'room5.jpg', type: 'servicio' },
];

function DashboardServicios() {
    const [services, setServices] = useState(servicesData);
    const [selectedService, setSelectedService] = useState(servicesData[0]);
    const [editingService, setEditingService] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setEditingService(false);
    };

    const handleEditClick = (service) => {
        setSelectedService(service);
        setEditingService(true);
    };

    const handleSave = (updatedService) => {
        const updatedServices = services.map(service =>
            service.name === updatedService.name ? updatedService : service
        );
        setServices(updatedServices);
        setSelectedService(updatedService);
        setEditingService(false);
    };

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
                                <SearchBar setSearchTerm={setSearchTerm} placeholder="Buscar servicio..." />
                                <button className="add-room-button">
                                    <img src={signoMas} alt="Add Icon" />
                                </button>
                            </div>
                        </div>
                        <div className="rooms-list" style={{ maxHeight: '530px', overflowY: 'auto' }}>
                            {filteredServices.map((service) => (
                                <Listas key={service.name} item={service} type={'servicio'} onEditClick={handleEditClick} onRoomClick={handleServiceClick} />
                            ))}
                        </div>
                    </div>
                    <div className="room-detail-section">
                        {editingService ? (
                            <EditableCard item={selectedService} type={selectedService.type} onSave={handleSave} />
                        ) : (
                            <InfoCard item={selectedService} type={selectedService.type} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardServicios;

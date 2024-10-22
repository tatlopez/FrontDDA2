import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Listas from '../Listas/Lista';
import InfoCard from '../Cards/infoCard';
import EditableCard from '../Cards/editableCard';
import ConfirmActionModal from '../PopUp/ConfirmActionModal';
import Header from '../Header/Header';
import AgregarServicioModal from './CrearServicio';
import signoMas from '../../assets/signo-mas.png';
import get_services from '../../services/services/get_services';
import delete_service from '../../services/services/delete_service';

/* const servicesData = [
    { name: 'Acceso a salon VIP', duration: '24hs', price: 300, image: 'room1.jpg', type: 'servicio' },
    { name: 'Clase de tenis privada', duration: '60min', price: 250, image: 'room2.jpg', type: 'servicio' },
    { name: 'Traslado al aeropuerto', duration: '24hs', price: 250, image: 'room4.jpg', type: 'servicio' },
    { name: 'Room Service', duration: '24hs', price: 100, image: 'room5.jpg', type: 'servicio' },
]; */

function DashboardServicios() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [editingService, setEditingService] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showAgregarModal, setShowAgregarModal] = useState(false); // Estado para mostrar el modal de agregar

    const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

    useEffect(() => {
        get_services(hotel.id)
        .then((res) => {
            const loadedServices = res || [];
            setServices(loadedServices);

            if (loadedServices.length > 0) {
                setSelectedService(loadedServices[0]);
            }
        })
    }, []);

    // Filtrar los servicios según el término de búsqueda
    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Seleccionar servicio al hacer clic
    const handleServiceClick = (service) => {
        setSelectedService(service);
        setEditingService(false);
    };

    // Manejar la edición del servicio
    const handleEditClick = (service) => {
        setSelectedService(service);
        setEditingService(true);
    };

    // Mostrar el modal de confirmación de eliminación
    const handleDeleteClick = (service) => {
        setSelectedService(service);
        setShowConfirmModal(true);
    };

    // Guardar los cambios en el servicio editado
    const handleSave = (updatedService) => {
        const updatedServices = services.map(service =>
            service.name === updatedService.name ? updatedService : service
        );
        setServices(updatedServices);
        setSelectedService(updatedService);
        setEditingService(false);
    };

    // Confirmar la eliminación del servicio seleccionado
    const handleConfirmDelete = () => {

        delete_service(selectedService.id)
        .then(() => {
            const updatedServices = services.filter(service => service.name !== selectedService.name);
            setServices(updatedServices);
            setSelectedService(null); // Deseleccionar el servicio después de eliminarlo
            setShowConfirmModal(false);
        })
    };

    // Agregar un nuevo servicio
    const handleAgregarServicio = (nuevoServicio) => {
        setServices([...services, nuevoServicio]);
    };

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container">
                <Header hotelName={hotel.name}/>
                <div className="dashboard-body">
                    <div className="rooms-section">
                        <div className="rooms-header">
                            <p>Servicios</p>
                            <div className="search-and-add">
                                <SearchBar setSearchTerm={setSearchTerm} placeholder="Buscar servicio..." />
                                <button className="add-room-button" onClick={() => setShowAgregarModal(true)}>
                                    <img src={signoMas} alt="Add Icon" />
                                </button>
                            </div>
                        </div>
                        <div className="rooms-list" style={{ maxHeight: '530px', overflowY: 'auto' }}>
                            {filteredServices.map((service) => (
                                <Listas
                                    key={service.name}
                                    item={service}
                                    type={'servicio'}
                                    onEditClick={handleEditClick}
                                    onRoomClick={handleServiceClick}
                                    onDeleteClick={handleDeleteClick}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="room-detail-section">
                        {editingService ? (
                            <EditableCard item={selectedService} type={'servicio'} onSave={handleSave} />
                        ) : (
                            <InfoCard
                                item={selectedService}
                                type={'servicio'}
                                onEdit={handleEditClick}
                                onDelete={() => setShowConfirmModal(true)}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Modal para agregar servicio */}
            {showAgregarModal && (
                <AgregarServicioModal
                    onClose={() => setShowAgregarModal(false)}
                    onSave={handleAgregarServicio}
                />
            )}

            {/* Modal de confirmación de eliminación */}
            {showConfirmModal && (
                <ConfirmActionModal
                    actionType="eliminarServicio"
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
}

export default DashboardServicios;

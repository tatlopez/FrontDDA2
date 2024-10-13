import React, { useState } from 'react';
import './modals.css';
import defaultServiceImage from '../../assets/default-hotel.jpg';

const AgregarServicioModal = ({ servicios, onClose, onConfirm }) => {
    const [selectedServices, setSelectedServices] = useState([]);

    const handleServiceClick = (service) => {
        setSelectedServices((prevSelected) =>
            prevSelected.includes(service)
                ? prevSelected.filter((s) => s !== service)
                : [...prevSelected, service]
        );
    };

    const handleConfirm = () => {
        onConfirm(selectedServices);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-modal" onClick={onClose}>X</button>
                <h2 className="modal-title">Agregar Servicios</h2>
                <div className="modal-content">
                    <div className="services-list">
                        {servicios.map((service, index) => (
                            <div
                                key={index}
                                className={`service-item ${selectedServices.includes(service) ? 'selected' : ''}`}
                                onClick={() => handleServiceClick(service)}
                            >
                                <div className="service-info">
                                    <p className="service-name">{service.name}</p>
                                    <div className="service-details">
                                        <p className="service-price">USD {service.price}</p>
                                        <p className="service-duration">{service.duration}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal-buttons">
                    <button className="btn-confirm" onClick={handleConfirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgregarServicioModal;

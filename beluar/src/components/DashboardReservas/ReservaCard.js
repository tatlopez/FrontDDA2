import React, { useState } from 'react';
import './reserva.css';
import ConfirmActionModal from '../PopUp/ConfirmActionModal';
import AgregarServicioModal from '../PopUp/AgregarServicioModal';

const ReservaCard = ({ item, onCancelReserva }) => {
    const [modalActionType, setModalActionType] = useState(null);
    const [showAgregarServicioModal, setShowAgregarServicioModal] = useState(false);
    const [services, setServices] = useState(item.services || []);

    const handleAbonarClick = () => {
        setModalActionType('abonar');
    };

    const handleCancelarClick = () => {
        setModalActionType('cancelar');
    };

    const handleAgregarServicioClick = () => {
        setShowAgregarServicioModal(true);
    };

    const handleCloseModal = () => {
        setModalActionType(null);
        setShowAgregarServicioModal(false);
    };

    const handleConfirmAction = () => {
        if (modalActionType === 'abonar') {
            console.log('Abonar total confirmado');
        } else if (modalActionType === 'cancelar') {
            onCancelReserva(item);
            console.log('Cancelar reserva confirmado');
        }
        handleCloseModal();
    };

    const handleConfirmAgregarServicio = (selectedServices) => {
        // Actualizar los servicios de la reserva
        setServices((prevServices) => [...prevServices, ...selectedServices]);
        console.log('Servicios agregados:', selectedServices);
        handleCloseModal();
    };

    return (
        <div className="reserva-detail">
            <h3 className="reserva-number">Reserva #{item.id}</h3>
            <div className="reserva-fields">

                <div className="reserva-field">
                    <label>Apellido y nombre</label>
                    <input type="text" value={item.client_info.name + " " +item.client_info.surname} className="reserva-input" readOnly />
                </div>

                <div className="reserva-field">
                    <label>Habitación</label>
                    <input type="text" value={item.room_info.floor + item.room_info.name} className="reserva-input" readOnly />
                </div>

                <div className="reserva-field">
                    <label>Check-in</label>
                    <input type="text" value={item.start_date} className="reserva-input" readOnly />
                </div>

                <div className="reserva-field">
                    <label>Check-out</label>
                    <input type="text" value={item.end_date} className="reserva-input" readOnly />
                </div>

                {item.services.length > 0 && (
                    <div className="reserva-field">
                        <label>Servicios contratados</label>
                        <ul className="reserva-services">
                            {item.services.map((service, index) => (
                                
                                <li key={index}>{service.service.name} <span className="service-price">${service.service.price}</span></li>
                            ))}
                        </ul>
                    </div>
                )}

                <hr className="divider-line" /> 

                <div className="reserva-total">
                    <span>Total</span> <span className="reserva-total-price">${item.total_price}</span>
                </div>

            </div>

            <div className="reserva-buttons">
{/*                 <button className="btn-reserva abonar" onClick={handleAbonarClick}>Abonar total</button>
                <button className="btn-reserva agregar-servicio" onClick={handleAgregarServicioClick}>Agregar servicio</button>  */}
                <button className="btn-reserva cancelar" onClick={handleCancelarClick}>Cancelar reserva</button>
            </div>

            {modalActionType && (
                <ConfirmActionModal
                    actionType={modalActionType}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmAction}
                />
            )}

            {showAgregarServicioModal && (
                <AgregarServicioModal
                    servicios={[
                        { name: 'Desayuno incluido', price: 20, duration: '1 día' },
                        { name: 'Acceso al gimnasio', price: 10, duration: '1 día' },
                        { name: 'Spa', price: 40, duration: '1 hora' },
                        { name: 'Traslado al aeropuerto', price: 50, duration: '1 viaje' }
                    ]}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmAgregarServicio}
                />
            )}
        </div>
    );
};

export default ReservaCard;

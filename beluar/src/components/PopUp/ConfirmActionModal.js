import React from 'react';
import './modals.css';

const ConfirmActionModal = ({ actionType, onClose, onConfirm }) => {
    const getMessage = () => {
        switch (actionType) {
            case 'cancelar':
                return '¿Está seguro de que desea cancelar la reserva?';
            case 'eliminarHotel':
                return '¿Está seguro de que desea eliminar este hotel?';
            case 'eliminarHabitacion':
                return '¿Está seguro de que desea eliminar esta habitación?';
            case 'eliminarServicio':
                return '¿Está seguro de que desea eliminar este servicio?';
            default:
                return '';
        }
    };

    const getTitle = () => {
        switch (actionType) {
            case 'cancelar':
                return 'Cancelar reserva';
            case 'eliminarHotel':
                return 'Eliminar hotel';
            case 'eliminarHabitacion':
                return 'Eliminar habitación';
            case 'eliminarServicio':
                return 'Eliminar servicio';
            default:
                return '';
        }
    };

    const getAction = () => {
        switch (actionType) {
            case 'cancelar':
                return 'reserva'
            case 'eliminarHotel':
                return 'hotel'
            case 'eliminarHabitacion':
                return 'habitación'
            case 'eliminarServicio':
                return 'servicio'
            default:
                return '';
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal-title">{getTitle()}</h2>
                <div className="modal-content">
                    <p>{getMessage()}</p>
                </div>
                <div className="modal-buttons">
                    <button
                        className="confirm-btn"
                        onClick={onConfirm}
                    >
                        Sí, eliminar {getAction()}
                    </button>
                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        No, volver atrás
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmActionModal;

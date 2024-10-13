import React from 'react';
import './modals.css';

const ConfirmActionModal = ({ actionType, onClose, onConfirm }) => {
    const getMessage = () => {
        switch (actionType) {
            case 'abonar':
                return '¿Está seguro de que desea abonar el total de la reserva?';
            case 'cancelar':
                return '¿Está seguro de que desea cancelar la reserva?';
            case 'eliminarHotel':
                return '¿Está seguro de que desea eliminar este hotel?';
            default:
                return '';
        }
    };

    const getTitle = () => {
        switch (actionType) {
            case 'abonar':
                return 'Confirmar Abono';
            case 'cancelar':
                return 'Cancelar Reserva';
            case 'eliminarHotel':
                return 'Eliminar Hotel';
            default:
                return '';
        }
    };

    const getButtonClass = () => {
        switch (actionType) {
            case 'abonar':
                return 'btn-confirm';
            case 'cancelar':
            case 'eliminarHotel':
                return 'btn-confirm cancelar';
            default:
                return 'btn-confirm';
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-modal" onClick={onClose}>X</button>
                <h2 className="modal-title">{getTitle()}</h2>
                <div className="modal-content">
                    <p>{getMessage()}</p>
                </div>
                <div className="modal-buttons">
                    <button
                        className={getButtonClass()}
                        onClick={onConfirm}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmActionModal;

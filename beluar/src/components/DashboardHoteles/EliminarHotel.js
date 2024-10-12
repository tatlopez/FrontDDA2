import React from 'react';
import './hotel.css';

const DeleteHotelModal = ({ hotel, onClose, onDelete }) => {
    const handleDelete = () => {
        onDelete(hotel);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-modal" onClick={onClose}>X</button>
                <h2 className="modal-title">Eliminar Hotel</h2>
                <div className="modal-content">
                    <p>¿Está seguro de que desea eliminar el hotel {hotel.nombre}?</p>
                </div>
                <div className="modal-buttons">
                    <button className="btn-confirm" onClick={handleDelete}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteHotelModal;

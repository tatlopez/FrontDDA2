import React from 'react';
import './Filter.css';

function Filter({ onFilterChange}) {

    const handleChange = (event) => {
        onFilterChange(event.target.value);
    };

/*     const getAll = () => {
        switch (actionType) {
            case 'reserva':
                return 'las reservas';
            case 'habitacion':
                return 'las habitaciones';
            case 'servicio':
                return 'los servicios';
            default:
                return '';
        }
    };

    const getActivas = () => {
        switch (actionType) {
            case 'reserva':
                return 'Reservas confirmadas'
            case 'habitación':
                return 'Habitaciones libres'
            case 'servicio':
                return 'Servicios activos'
            default:
                return '';
        }
    }

    const getCanceladas = () => {
        switch (actionType) {
            case 'reserva':
                return 'Reservas canceladas'
            case 'habitación':
                return 'Habitaciones ocupadas'
            case 'servicio':
                return 'Servicios deshabilitados'
            default:
                return '';
        }
    }

    const getPendientes = () => {
        switch (actionType) {
            case 'reserva':
                return 'Reservas pendientes'
            case 'habitación':
                return 'Habitaciones en mantenimiento'
            default:
                return '';
        }
    } */

    return (
        <select className='filter-container' onChange={handleChange}>
            <option value="all">Todas las resevas</option>
            <option value="active">Confirmadas</option>
            <option value="cancelled">Pendientes</option>
            <option value="cancelled">Canceladas</option>
        </select>
    );
}

export default Filter;
import React from 'react';
import './Filter.css';

function Filter({ onFilterChange, actionType}) {

    const handleChange = (event) => {
        onFilterChange(event.target.value);
    };

    const getActivas = () => {
        switch (actionType) {
            case 'reserva':
                return 'Confirmadas';
            case 'habitacion':
                return 'Libres';
            case 'servicio':
                return 'Activos';
            default:
                return '';
        }
    }

    const getCanceladas = () => {
        switch (actionType) {
            case 'reserva':
                return 'Canceladas';
            case 'habitacion':
                return 'Ocupadas';
            case 'servicio':
                return 'Deshabilitados'
            default:
                return '';
        }
    }

    const getPendientes = () => {
        switch (actionType) {
            case 'reserva':
                return 'Pendientes';
            case 'habitacion':
                return 'En mantenimiento';
            default:
                return '';
        }
    }


    return (
        <select className='filter-container' onChange={handleChange}>
            <option value="all">Todas</option>
            <option value="confirmed">{getActivas()}</option>
            <option value="pending">{getPendientes()}</option>
            <option value="cancelled">{getCanceladas()}</option>
        </select>
    );
}

export default Filter;
import React from 'react';
import './modificarHabitacion.css'
import cargarImagen from '../../assets/cargar-imagen.png'; 
;

const ModificarHabitacion = ({ room }) => {
  return (
    <div className="room-detail">
      <h3 className="room-number">Crear habitacion</h3>
      <img src={cargarImagen} alt={`Upload image`} className="cargar-imagen" />
      <div className="editable-fields">
        <label>Hotel</label>
        <input type="input-text" value={'Ingresa el nombre del hotel...'} className="editable-input" />
      </div>
      <div className="editable-fields">
        <label>Piso</label>
        <input type="input-text" value={'Ingresa el piso en el que se encuentra...'} className="editable-input" />
      </div>
      <div className="editable-fields">
        <label>Letra</label>
        <input type="input-text" value={'Ingresa la letra que la identifica...'} className="editable-input" />
      </div>
      <div className="editable-fields">
        <label>Precio</label>
        <input type="input-text" value={'Ingresa un precio...'} className="editable-input" />
      </div>
      <div className="editable-fields">
        <label>Estado</label>
        <input type="input-text" value={'Selecciona un estado'} className="editable-input" />
      </div>
      <button className="status-button">Crear habitacion</button>
    </div>
  );
};

export default ModificarHabitacion;

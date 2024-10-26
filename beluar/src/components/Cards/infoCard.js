import React from 'react';
import './card.css';
import defaultImage from '../../assets/default-hotel.jpg';
import { API_URL } from '../../config';
import singleBed from '../../assets/single bed icon.svg';
import doubleBed from '../../assets/double bed icon.svg';

const InfoCard = ({ item, type, onEdit, onDelete }) => {

  const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

  if (!item) return null;

  return (
    <div className="item-detail">
      <p className="item-number">{type === 'habitacion' ? `Habitación #${item.floor + item.name}` : item.name}</p>
      <div className='item-info'>
        {type === 'habitacion' && (
          <img src={
            item.images && item.images.length > 0
              ? item.images[0].image.startsWith('data:image/') // Verificamos si es un formato base64
                ? item.images[0].image // Usamos directamente la cadena base64
                : `${API_URL}${item.images[0].image}` // Usamos la URL normal
              : defaultImage
          } alt={`Item ${item.number || item.name}`} className="detail-image" />
        )}
        <div className='fields'>
          <div className="editable-fields">
            <label>Hotel</label>
            <div className="editable-input">{hotel.name}</div>
          </div>
          {type === 'habitacion' ? (
            <>
              <div className="editable-fields">
                <label>Piso</label>
                <div className="editable-input">{item.floor}</div>
              </div>
              <div className="editable-fields">
            <label>Tipo de habitación</label>
            <div className='bed-field'>
            {/* Mostrar camas simples */}
            {item.single_beds_amount > 0 && (
              <div className='bed-container'>
                <img className='icon-beds'
                  src={singleBed}
                  alt='single bed'
                />
                <p>{item.single_beds_amount} {item.single_beds_amount > 1 ? 'Camas simples' : 'Cama simple'}</p>
              </div>
            )}
            {/* Mostrar camas dobles */}
            {item.double_beds_amount > 0 && (
              <div className='bed-container'>
                <img className='icon-beds'
                  src={doubleBed}
                  alt='double bed'
                />
                <p>{item.double_beds_amount} {item.double_beds_amount > 1 ? 'Camas dobles' : 'Cama doble'}</p>
              </div>
            )}
          </div>
          </div>
            </>
          ) : (
            <div className="editable-fields">
              <label>Detalles</label>
              <div className="editable-input">{item.detail}</div>
            </div>
          )}
          <div className="editable-fields">
            <label>Precio</label>
            <div className="editable-input">{'$' + item.price}</div>
          </div>
        </div>
      </div>
      <div className='buttons'>
          <button className="status-button" onClick={() => onEdit(item)}>
            {type === 'habitacion' ? 'Editar habitación' : 'Editar servicio'}
          </button>
          <button className="delete-button" onClick={onDelete}>
            {type === 'habitacion' ? 'Eliminar habitación' : 'Eliminar servicio'}
          </button>
        </div>
    </div>
  );
};

export default InfoCard;

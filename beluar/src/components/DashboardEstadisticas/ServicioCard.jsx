import React from 'react';
import './servicioCard.css';

const ServicioCard = ({ title, serviceName, percentage, imgUrl }) => {
  return (
    <div className="servicio-card">
      <h4 className="servicio-title">{title}</h4>
      <img src={imgUrl} alt={serviceName} className="servicio-img" />
      <div className="servicio-name">{serviceName}</div>
      <div className="servicio-percentage">{percentage}</div>
      <div className="servicio-period">Últimos 7 días</div>
    </div>
  );
};

export default ServicioCard;

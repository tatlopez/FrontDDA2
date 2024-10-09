import React from 'react';
import './miniCard.css';

const MiniCard = ({ title, number, percentage, backgroundColor, titleColor, percentageColor }) => {
  return (
    <div className="mini-card" style={{ backgroundColor }}>
      <h4 className="mini-card-title" style={{ color: titleColor }}>{title}</h4>
      <div className="mini-card-percentage" style={{ color: percentageColor }}>{percentage}</div>
      <div className='mini-card-flex'>
        <div className="mini-card-period">Últimos 7 días</div>
        <div className="mini-card-number">{number}</div>
      </div>
    </div>
  );
};

export default MiniCard;

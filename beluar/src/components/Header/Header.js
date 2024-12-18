import React from 'react';
import './header.css';
import Profile from '../Profile/Profile';
import hotelIcon from '../../assets/single-hotel-icon.svg';


const Header = ({ hotelName }) => {
  return (
    <header className="dashboard-header">
      <div className="hotel-title">
        <img src={hotelIcon} alt="Hotel" className="edit-icon" />
        <h1 className="hotel-name">Hotel {hotelName}</h1>
      </div>
      <div className="header-right">
        <Profile />
      </div>
    </header>
  );
};

export default Header;

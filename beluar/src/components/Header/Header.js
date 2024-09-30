import React from 'react';
import './header.css';
import Profile from '../Profile/Profile';
import editIcon from '../../assets/edit-icon.png';

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="hotel-title">
        <img src={editIcon} alt="Edit Icon" className="edit-icon" />
        <h1 className="hotel-name">Palacio del Sol</h1>
      </div>
      <div className="header-right">
        <Profile />
      </div>
    </header>
  );
};

export default Header;

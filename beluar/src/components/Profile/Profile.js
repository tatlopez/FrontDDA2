import React from 'react';
import './profile.css';
import bell from '../../assets/bell-icon.png';
import arrow from '../../assets/down-arrow.png';

function Profile() {
    return (
        <div className="profile-container">
            <img src={bell} alt="Notificaciones" className="profile-bell" />
            <div className="profile-info">
                <span className="profile-name">Juan Pérez</span>
                <span className="profile-role">Staff</span>
            </div>
            <button className="profile-button"><img src={arrow} alt="Desplegar"/></button>
        </div>
    );
}

export default Profile;

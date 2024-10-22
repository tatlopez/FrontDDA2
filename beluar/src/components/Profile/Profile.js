import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import bell from '../../assets/bell-icon.png';
import arrow from '../../assets/down-arrow.png';

function Profile() {

    const navigate = useNavigate() // Hook para navegación

    const handleLogout = () => {
        
        localStorage.clear();

        navigate('/'); // Redirigir a la página de login
    };

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="profile-container">
            <img src={bell} alt="Notificaciones" className="profile-bell" />
            <div className="profile-info">
                <span className="profile-name">{localStorage.getItem('first_name')}</span>
                <span className="profile-role">Staff</span>
            </div>
            <button className="profile-button" onClick={toggleDropdown}>
                <img src={arrow} alt="Desplegar" />
            </button>
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <div className="profile-option" onClick={handleLogout}>
                        <svg className='option-icon' width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 9H1" stroke="#703FD0" stroke-linejoin="round" strokeWidth={2}/>
                            <path d="M4.5 5.5L1 9L4.5 12.5" stroke="#703FD0" stroke-linejoin="round" strokeWidth={2}/>
                            <path d="M7 14C8.44087 15.8289 10.6549 17 13.1378 17C17.48 17 21 13.4183 21 9C21 4.58172 17.48 1 13.1378 1C10.6549 1 8.44087 2.17107 7 4" stroke="#703FD0" stroke-linejoin="round" strokeWidth={2}/>
                        </svg>
                        <p>Cerrar sesión</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;

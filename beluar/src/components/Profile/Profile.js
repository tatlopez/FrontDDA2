import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import bell from '../../assets/bell-icon.png';
import arrow from '../../assets/down-arrow.png';

function Profile() {

    const navigate = useNavigate() // Hook para navegación

    const handleLogout = () => {
        // Aquí puedes añadir lógica para cerrar sesión, si es necesario
        navigate('/login'); // Redirigir a la página de login
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
                    <div className="profile-option">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 16L4 20L8 19L19.5858 7.41421C20.3668 6.63316 20.3668 5.36683 19.5858 4.58579L19.4142 4.41421C18.6332 3.63316 17.3668 3.63317 16.5858 4.41421L5 16Z" stroke="#703FD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15 6L18 9" stroke="#703FD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13 20H21" stroke="#703FD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p>Editar nombre</p>
                    </div>
                    <div className="profile-option">
                        <svg className='option-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.9999 16.9999C14.9999 17.2651 14.8945 17.5195 14.707 17.707C14.5195 17.8945 14.2651 17.9999 13.9999 17.9999H9.9999C9.73468 17.9999 9.48033 17.8945 9.29279 17.707C9.10526 17.5195 8.9999 17.2651 8.9999 16.9999C8.9999 16.7347 9.10526 16.4803 9.29279 16.2928C9.48033 16.1052 9.73468 15.9999 9.9999 15.9999H13.9999C14.2651 15.9999 14.5195 16.1052 14.707 16.2928C14.8945 16.4803 14.9999 16.7347 14.9999 16.9999ZM14.7069 7.2929C14.5194 7.10543 14.2651 7.00011 13.9999 7.00011C13.7347 7.00011 13.4804 7.10543 13.2929 7.2929L11.9999 8.5859L10.7069 7.2929C10.6147 7.19739 10.5043 7.12121 10.3823 7.0688C10.2603 7.01639 10.1291 6.9888 9.9963 6.98765C9.86352 6.98649 9.73184 7.0118 9.60894 7.06208C9.48605 7.11236 9.3744 7.18661 9.2805 7.2805C9.18661 7.3744 9.11236 7.48605 9.06208 7.60894C9.0118 7.73184 8.98649 7.86352 8.98765 7.9963C8.9888 8.12908 9.01639 8.2603 9.0688 8.3823C9.12121 8.5043 9.19739 8.61465 9.2929 8.7069L10.5859 9.99989L9.2929 11.2929C9.19739 11.3851 9.12121 11.4955 9.0688 11.6175C9.01639 11.7395 8.9888 11.8707 8.98765 12.0035C8.98649 12.1363 9.0118 12.2679 9.06208 12.3908C9.11236 12.5137 9.18661 12.6254 9.2805 12.7193C9.3744 12.8132 9.48605 12.8874 9.60894 12.9377C9.73184 12.988 9.86352 13.0133 9.9963 13.0121C10.1291 13.011 10.2603 12.9834 10.3823 12.931C10.5043 12.8786 10.6147 12.8024 10.7069 12.7069L11.9999 11.4139L13.2929 12.7069C13.4815 12.889 13.7341 12.9898 13.9963 12.9876C14.2585 12.9853 14.5093 12.8801 14.6947 12.6947C14.8801 12.5093 14.9853 12.2585 14.9876 11.9963C14.9899 11.7341 14.8891 11.4815 14.7069 11.2929L13.4139 9.99989L14.7069 8.7069C14.8944 8.51937 14.9997 8.26506 14.9997 7.9999C14.9997 7.73473 14.8944 7.48043 14.7069 7.2929ZM21.9999 15.9999H17.9999C17.7347 15.9999 17.4803 16.1052 17.2928 16.2928C17.1053 16.4803 16.9999 16.7347 16.9999 16.9999C16.9999 17.2651 17.1053 17.5195 17.2928 17.707C17.4803 17.8945 17.7347 17.9999 17.9999 17.9999H21.9999C22.2651 17.9999 22.5195 17.8945 22.707 17.707C22.8945 17.5195 22.9999 17.2651 22.9999 16.9999C22.9999 16.7347 22.8945 16.4803 22.707 16.2928C22.5195 16.1052 22.2651 15.9999 21.9999 15.9999ZM21.4139 9.99989L22.7069 8.7069C22.8024 8.61465 22.8786 8.5043 22.931 8.3823C22.9834 8.2603 23.011 8.12908 23.0121 7.9963C23.0133 7.86352 22.988 7.73184 22.9377 7.60894C22.8874 7.48605 22.8132 7.3744 22.7193 7.2805C22.6254 7.18661 22.5137 7.11236 22.3909 7.06208C22.268 7.0118 22.1363 6.98649 22.0035 6.98765C21.8707 6.9888 21.7395 7.01639 21.6175 7.0688C21.4955 7.12121 21.3851 7.19739 21.2929 7.2929L19.9999 8.5859L18.7069 7.2929C18.6147 7.19739 18.5043 7.12121 18.3823 7.0688C18.2603 7.01639 18.1291 6.9888 17.9963 6.98765C17.8635 6.98649 17.7318 7.0118 17.6089 7.06208C17.486 7.11236 17.3744 7.18661 17.2805 7.2805C17.1866 7.3744 17.1124 7.48605 17.0621 7.60894C17.0118 7.73184 16.9865 7.86352 16.9876 7.9963C16.9888 8.12908 17.0164 8.2603 17.0688 8.3823C17.1212 8.5043 17.1974 8.61465 17.2929 8.7069L18.5859 9.99989L17.2929 11.2929C17.1974 11.3851 17.1212 11.4955 17.0688 11.6175C17.0164 11.7395 16.9888 11.8707 16.9876 12.0035C16.9865 12.1363 17.0118 12.2679 17.0621 12.3908C17.1124 12.5137 17.1866 12.6254 17.2805 12.7193C17.3744 12.8132 17.486 12.8874 17.6089 12.9377C17.7318 12.988 17.8635 13.0133 17.9963 13.0121C18.1291 13.011 18.2603 12.9834 18.3823 12.931C18.5043 12.8786 18.6147 12.8024 18.7069 12.7069L19.9999 11.4139L21.2929 12.7069C21.4815 12.889 21.7341 12.9898 21.9963 12.9876C22.2585 12.9853 22.5093 12.8801 22.6947 12.6947C22.8801 12.5093 22.9853 12.2585 22.9876 11.9963C22.9899 11.7341 22.8891 11.4815 22.7069 11.2929L21.4139 9.99989ZM5.9999 15.9999H1.9999C1.73468 15.9999 1.48033 16.1052 1.29279 16.2928C1.10525 16.4803 0.999898 16.7347 0.999898 16.9999C0.999898 17.2651 1.10525 17.5195 1.29279 17.707C1.48033 17.8945 1.73468 17.9999 1.9999 17.9999H5.9999C6.26511 17.9999 6.51947 17.8945 6.707 17.707C6.89454 17.5195 6.9999 17.2651 6.9999 16.9999C6.9999 16.7347 6.89454 16.4803 6.707 16.2928C6.51947 16.1052 6.26511 15.9999 5.9999 15.9999ZM6.7069 7.2929C6.51937 7.10543 6.26506 7.00011 5.9999 7.00011C5.73473 7.00011 5.48043 7.10543 5.2929 7.2929L3.9999 8.5859L2.7069 7.2929C2.61465 7.19739 2.50431 7.12121 2.3823 7.0688C2.2603 7.01639 2.12908 6.9888 1.9963 6.98765C1.86352 6.98649 1.73184 7.0118 1.60894 7.06208C1.48605 7.11236 1.3744 7.18661 1.2805 7.2805C1.18661 7.3744 1.11236 7.48605 1.06208 7.60894C1.0118 7.73184 0.986494 7.86352 0.987648 7.9963C0.988801 8.12908 1.01639 8.2603 1.0688 8.3823C1.12121 8.5043 1.19739 8.61465 1.2929 8.7069L2.5859 9.99989L1.2929 11.2929C1.19739 11.3851 1.12121 11.4955 1.0688 11.6175C1.01639 11.7395 0.988801 11.8707 0.987648 12.0035C0.986494 12.1363 1.0118 12.2679 1.06208 12.3908C1.11236 12.5137 1.18661 12.6254 1.2805 12.7193C1.3744 12.8132 1.48605 12.8874 1.60894 12.9377C1.73184 12.988 1.86352 13.0133 1.9963 13.0121C2.12908 13.011 2.2603 12.9834 2.3823 12.931C2.50431 12.8786 2.61465 12.8024 2.7069 12.7069L3.9999 11.4139L5.2929 12.7069C5.38515 12.8024 5.49549 12.8786 5.61749 12.931C5.7395 12.9834 5.87072 13.011 6.0035 13.0121C6.13628 13.0133 6.26796 12.988 6.39085 12.9377C6.51375 12.8874 6.6254 12.8132 6.71929 12.7193C6.81319 12.6254 6.88744 12.5137 6.93772 12.3908C6.988 12.2679 7.0133 12.1363 7.01215 12.0035C7.01099 11.8707 6.98341 11.7395 6.931 11.6175C6.87859 11.4955 6.80241 11.3851 6.7069 11.2929L5.4139 9.99989L6.7069 8.7069C6.89437 8.51937 6.99968 8.26506 6.99968 7.9999C6.99968 7.73473 6.89437 7.48043 6.7069 7.2929Z" fill="#374957"/>
                        </svg>
                        <p>Cambiar contraseña</p>
                    </div>
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

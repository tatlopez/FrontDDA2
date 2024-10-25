import React from "react";
import { Link } from "react-router-dom";
import "./hamburgerMenu.css";
import logo from '../../assets/logo-no-background.png';
import estadisticasIcon from '../../assets/estadisticas-icon.svg';
import habitacionesIcon from '../../assets/habitaciones-icon.svg';
import reservasIcon from '../../assets/reservas-icon.svg';
import serviciosIcon from '../../assets/servicios-icon.svg';
import homeIcon from '../../assets/home-icon.svg';
import hotelesIcon from '../../assets/hoteles-icon.svg';
import closeIcon from '../../assets/Close.svg';


function HamburgerMenu({ isOpen, onClose }) {
    
    return (
        <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
            <div className="hamburger-menu-container">
                <img src={logo} alt="Logo" className="logo" />
                <div className="hamburger-stackButtons">
                    <Link to="/DashboardInicio" className="hamburger-item">
                        <img src={homeIcon} alt="Home Icon" className="icon" />
                        <span>Home</span>
                    </Link>
                    <Link to="/DashboardReservas" className="hamburger-item">
                        <img src={reservasIcon} alt="Reservas Icon" className="icon" />
                        <span>Reservas</span>
                    </Link>
                    <Link to="/DashboardHabitaciones" className="hamburger-item">
                        <img src={habitacionesIcon} alt="Habitaciones Icon" className="icon" />
                        <span>Habitaciones</span>
                    </Link>
                    <Link to="/DashboardServicios" className="hamburger-item">
                        <img src={serviciosIcon} alt="Servicios Icon" className="icon" />
                        <span>Servicios</span>
                    </Link>
                    <Link to="/DashboardEstadisticas" className="hamburger-item">
                        <img src={estadisticasIcon} alt="Estadísticas Icon" className="icon" />
                        <span>Estadísticas</span>
                    </Link>
                    <Link to="/DashboardHoteles" className="hamburger-item">
                        <img src={hotelesIcon} alt="Hoteles Icon" className="icon" />
                        <span>Hoteles</span>
                    </Link>
                </div>
                <img className="hamburger-closeBtn" src={closeIcon} alt="Close sidebar" onClick={onClose}/>
            </div>
        </div>
    );
}

export default HamburgerMenu;
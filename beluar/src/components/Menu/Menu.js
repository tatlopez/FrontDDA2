import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import './menu.css';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu-icon.png';
import estadisticasIcon from '../../assets/estadisticas-icon.svg';
import habitacionesIcon from '../../assets/habitaciones-icon.svg';
import reservasIcon from '../../assets/reservas-icon.svg';
import serviciosIcon from '../../assets/servicios-icon.svg';
import homeIcon from '../../assets/home-icon.svg';
import hotelesIcon from '../../assets/hoteles-icon.svg';


const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      
      if (!isMobileView) {
        setIsOpen(true);  
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <div>
      {isMobile && (
        <div className="menu-toggle" onClick={toggleMenu}>
          <img src={menuIcon} alt="Menu Icon" className="menu-icon" />
        </div>
      )}
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <img src={logo} alt="Logo" className="logo" />
        <div className="menu-stackItems">
          <Link to="/DashboardInicio" className="menu-item">
            <img src={homeIcon} alt="Home Icon" className="icon" />
            <span>Home</span>
          </Link>
          <Link to="/DashboardReservas" className="menu-item">
            <img src={reservasIcon} alt="Reservas Icon" className="icon" />
            <span>Reservas</span>
          </Link>
          <Link to="/DashboardHabitaciones" className="menu-item">
            <img src={habitacionesIcon} alt="Habitaciones Icon" className="icon" />
            <span>Habitaciones</span>
          </Link>
          <Link to="/DashboardServicios" className="menu-item">
            <img src={serviciosIcon} alt="Servicios Icon" className="icon" />
            <span>Servicios</span>
          </Link>
          <Link to="/DashboardEstadisticas" className="menu-item">
            <img src={estadisticasIcon} alt="Estadísticas Icon" className="icon" />
            <span>Estadísticas</span>
          </Link>
        <div className='menu-hotels'>
          <Link to="/DashboardHoteles" className="menu-item">
            <img src={hotelesIcon} alt="Hoteles Icon" className="icon" />
            <span>Hoteles</span>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

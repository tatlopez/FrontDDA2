import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import './menu.css';
import logo from '../../assets/logo.png';
import editIcon from '../../assets/edit-icon.png';
import menuIcon from '../../assets/menu-icon.png';

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
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="menu-items">
          <Link to="/" className="menu-item">
            <img src={editIcon} alt="Home Icon" className="icon" />
            <span>Home</span>
          </Link>
          <Link to="/reservas" className="menu-item">
            <img src={editIcon} alt="Reservas Icon" className="icon" />
            <span>Reservas</span>
          </Link>
          <Link to="/habitaciones" className="menu-item">
            <img src={editIcon} alt="Habitaciones Icon" className="icon" />
            <span>Habitaciones</span>
          </Link>
          <Link to="/servicios" className="menu-item">
            <img src={editIcon} alt="Servicios Icon" className="icon" />
            <span>Servicios</span>
          </Link>
          <Link to="/clientes" className="menu-item">
            <img src={editIcon} alt="Clientes Icon" className="icon" />
            <span>Clientes</span>
          </Link>
          <Link to="/estadisticas" className="menu-item">
            <img src={editIcon} alt="Estadísticas Icon" className="icon" />
            <span>Estadísticas</span>
          </Link>
          <Link to="/hoteles" className="menu-item">
            <img src={editIcon} alt="Hoteles Icon" className="icon" />
            <span>Hoteles</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;

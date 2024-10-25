import React from "react";
import "./header.css";
import logoResponsive from '../../assets/logo-responsive.svg';
import menuIcon from '../../assets/menu-icon.svg';
import SearchBar from '../SearchBar/SearchBar';

function ResponsiveHeader({onMenuToggle}) {

    return (
        <div className="responsive-header-container">
            <img src={menuIcon} alt="Menu Icon" className="menu-icon" onClick={onMenuToggle}/>
            <img src={logoResponsive} alt="Logo" className="logo" />
            <SearchBar />
        </div>
    );
}

export default ResponsiveHeader;
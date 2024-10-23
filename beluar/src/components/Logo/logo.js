import React from "react";
import logo from '../../assets/logo.png';

function Logo() {
    return (
        <div className="logo-container">
            <img src={logo} alt="Logo" style={{margin:0, maxHeight:'50px'}}/>
        </div>
    );
}

export default Logo;
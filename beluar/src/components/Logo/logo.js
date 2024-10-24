import React from "react";
import logo from '../../assets/logo-no-background.png';

function Logo() {
    return (
        <div className="logo-container">
            <img src={logo} alt="Logo" style={{margin:'20px auto', maxHeight:'40px'}}/>
        </div>
    );
}

export default Logo;
import React from "react";
import './completeProfile.css';
import editIcon from '../../assets/icons/editIcon.svg';
import passwordIcon from '../../assets/icons/password.svg';
import logoutIcon from '../../assets/icons/logout.svg';

const completeProfile = () => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="profile-rectangle">
            <div className="profile-title">
                <p className="title-name">Juan Pérez</p>
                <p className="title-position">Staff</p>
            </div>
            <div className="divisor"></div>
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <div className="profile-stack">
                        <div className="profile-option">
                            <img src={editIcon} alt="Edit Icon" />
                            <p>Editar nombre</p>
                        </div>
                        <div className="profile-option">
                            <img src={passwordIcon} alt="Password Icon" />
                            <p>Cambiar contraseña</p>
                        </div>
                        <div className="profile-option">
                            <img src={logoutIcon} alt="Logout Icon" />
                            <p>Cerrar sesión</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default completeProfile;
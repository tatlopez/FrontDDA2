import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../assets/logo.png'; 
import login from '../../services/authentication/login';
import {jwtDecode} from 'jwt-decode';

function LoginForm() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        login(emailOrUsername, password)
            .then(data => {
                console.log('Success:', data);
                if(data.access) {
                    localStorage.setItem('token', data.access);
                    const decodedToken = jwtDecode(data.access);
                    localStorage.setItem('first_name', decodedToken.first_name);
                    navigate('/DashboardHoteles'); 
                }
            })
    };

    return (
        <div className="login-container">
            <img src={logo} alt="logo" className="login-logo"/>
            <form onSubmit={handleSubmit} className="login-form">
                <p>Log in</p>
                <div>
                    <label htmlFor="emailOrUsername">Email o nombre de usuario</label>
                    <input
                        type="text"
                        id="emailOrUsername"
                        placeholder="Ingresa tu email o nombre de usuario..."
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Ingresa tu contraseña..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">Log In</button>
            </form>
        </div>
    );
}

export default LoginForm;

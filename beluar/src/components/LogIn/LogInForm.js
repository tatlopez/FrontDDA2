import React, { useState } from 'react';
import './login.css';
import logo from '../../assets/logo.png'; 

function LoginForm() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email or Username:', emailOrUsername, 'Password:', password);
    };

    return (
        <div className="login-container">
            <img src={logo} alt="logo" className="login-logo"/>
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Log in</h1>
                <label htmlFor="emailOrUsername">Email o nombre de usuario</label>
                <input
                    type="text"
                    id="emailOrUsername"
                    placeholder="Ingresa tu email o nombre de usuario."
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Ingresa tu contraseña."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-button">Log In</button>
            </form>
            <p><a href="/forgot-password">Olvidé mi contraseña</a></p>
            <p>¿No tenés cuenta? <a href="/signup">Crear cuenta</a></p>
        </div>
    );
}

export default LoginForm;

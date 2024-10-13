import React, { useState } from 'react';
import './signin.css';
import logo from '../../assets/logo.png'; 
import signup from '../../services/authentication/signup.js';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        signup(email, name, password)
            .then(data => {
                console.log('Success:', data);
                if(data.access) {
                    localStorage.setItem('token', data.access);
                }
            })
    };

    return (
        <div className="signin-container">
            <img src={logo} alt="logo" className="signin-logo"/>
            <form onSubmit={handleSubmit} className="signin-form">
                <h1>Crear cuenta</h1>
                <label htmlFor="name">¿Cómo deberíamos llamarte?</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Ingresa tu nombre."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email">¿Cuál es tu email?</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Ingresa tu dirección de mail."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Crea una contraseña</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Ingresa una contraseña."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="password-hint">Usá más de 8 caracteres combinando letras, números y símbolos</p>
                <button type="submit">Crear cuenta</button>
            </form>
            <p>¿Ya tenés cuenta? <a href="/login">Ingresar</a></p>
        </div>
    );
}

export default SignInForm;

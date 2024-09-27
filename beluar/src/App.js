import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignInPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<div>Inicio o Bienvenida</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

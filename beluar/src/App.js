import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHoteles from './pages/DashboardHotelesPage.jsx'; 
import SignInPage from './pages/SignInPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardHabitaciones from './pages/DashboardHabitacionesPage.jsx';
import DashboardInicio from './pages/DashboardInicioPage.jsx';
import DashboardServicios from './pages/DashboardServiciosPage.jsx';
import DashboardReservas from './pages/DashboardReservasPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/DashboardServicios" element={<DashboardServicios />} />
          <Route path="/" element={<DashboardInicio />} />
          <Route path="/signup" element={<SignInPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/DashboardHabitaciones" element={<DashboardHabitaciones />} />
          <Route path="/DashboardHoteles" element={<DashboardHoteles />} />
          <Route path="/DashboardServicios" element={<DashboardServicios />} />
          <Route path="/DashboardReservas" element={<DashboardReservas />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

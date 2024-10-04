import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHoteles from './pages/DashboardHotelesPage'; 
import SignInPage from './pages/SignInPage';
import LoginPage from './pages/LoginPage';
import DashboardHabitaciones from './pages/DashboardHabitacionesPage';
import DashboardInicio from './components/DashboardInicio/dashboardInicio';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DashboardInicio />} />
          <Route path="/signup" element={<SignInPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/DashboardHabitaciones" element={<DashboardHoteles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

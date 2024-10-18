import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import './dashboardEstadisticas.css';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import MiniCard from './MiniCard';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

const DashboardEstadisticas = () => {
    const [habitacionesData, setHabitacionesData] = useState({
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Ocupación de Habitaciones',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: [60, 75, 70, 90, 85, 80],
            },
        ],
    });

    const [serviciosData, setServiciosData] = useState({
        labels: ['Spa', 'Restaurante', 'Gym', 'Tours', 'Bar'],
        datasets: [
            {
                label: 'Servicios Contratados',
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                data: [40, 30, 50, 60, 45],
            },
        ],
    });

    const [reservasData, setReservasData] = useState({
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Reservas',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                data: [65, 59, 80, 81, 56, 55],
            },
        ],
    });

    const [huespedesData, setHuespedesData] = useState({
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Huéspedes por Mes',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,1)',
                pointBorderColor: 'rgba(153,102,255,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                data: [10, 15, 20, 25, 30, 35],
            },
        ],
    });

    useEffect(() => {
        // Future enhancement: Fetch real-time data for the charts
    }, []);

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container">
                <Header />
                <div className="dashboard-body">
                    <div className="dashboard-estadisticas">
                        <h2 className="section-title">Estadísticas</h2>

                        {/* Habitaciones Section */}
                        <div className="card-habitaciones">
                            <h3>Habitaciones</h3>
                            <div className="mini-cards-container">
                                <MiniCard
                                    title="Reservadas hoy"
                                    number="15"
                                    percentage="30%"
                                    backgroundColor="rgba(135, 191, 112, 0.51)"
                                    titleColor="#4C8732"
                                    percentageColor="#4C8732"
                                />
                                <MiniCard
                                    title="Desocupadas hoy"
                                    number="10"
                                    percentage="15%"
                                    backgroundColor="rgba(251, 139, 129, 0.50)"
                                    titleColor="#E01300"
                                    percentageColor="#E01300"
                                />
                            </div>
                            <div className="charts-container">
                                <div className="chart">
                                    <Bar data={habitacionesData} />
                                </div>
                                <div className="chart">
                                    <Line data={reservasData} />
                                </div>
                            </div>
                        </div>

                        {/* Servicios Section */}
                        <div className="card-servicios">
                            <h3>Servicios</h3>
                            <div className="mini-cards-container">
                                <MiniCard
                                    title="Servicios Populares"
                                    number="75"
                                    percentage="60%"
                                    backgroundColor="rgba(135, 191, 112, 0.51)"
                                    titleColor="#4C8732"
                                    percentageColor="#4C8732"
                                />
                                <MiniCard
                                    title="Nuevos Servicios"
                                    number="25"
                                    percentage="40%"
                                    backgroundColor="rgba(226,221,80,0.5)"
                                    titleColor="#E19110"
                                    percentageColor="#E19110"
                                />
                            </div>
                            <div className="charts-container">
                                <div className="chart">
                                    <Pie data={serviciosData} options={{ maintainAspectRatio: false, responsive: true }} height={200} />
                                </div>
                                <div className="chart">
                                    <Bar
                                        data={{
                                            labels: ['Spa', 'Restaurante', 'Gym', 'Tours', 'Bar'],
                                            datasets: [{
                                                label: 'Uso de Servicios',
                                                data: [40, 30, 50, 60, 45],
                                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                                            }]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Huespedes Section */}
                        <div className="card-huespedes">
                            <h3>Huéspedes</h3>
                            <div className="mini-cards-container">
                                <MiniCard
                                    title="Total de Huéspedes"
                                    number="100"
                                    percentage="50%"
                                    backgroundColor="rgba(135, 191, 112, 0.51)"
                                    titleColor="#4C8732"
                                    percentageColor="#4C8732"
                                />
                                <MiniCard
                                    title="Huéspedes Nuevos"
                                    number="25"
                                    percentage="25%"
                                    backgroundColor="rgba(226,221,80,0.5)"
                                    titleColor="#E19110"
                                    percentageColor="#E19110"
                                />
                            </div>
                            <div className="charts-container">
                                <div className="chart">
                                    <Line data={huespedesData} />
                                </div>
                                <div className="chart">
                                    <Bar
                                        data={{
                                            labels: ['Adultos', 'Niños', 'Mayores'],
                                            datasets: [{
                                                label: 'Tipos de Huéspedes',
                                                data: [30, 10, 5],
                                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                            }]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Reservas Section */}
                        <div className="card-reservas">
                            <h3>Reservas</h3>
                            <div className="mini-cards-container">
                                <MiniCard
                                    title="Reservas para Hoy"
                                    number="20"
                                    percentage="10%"
                                    backgroundColor="rgba(135, 191, 112, 0.51)"
                                    titleColor="#4C8732"
                                    percentageColor="#4C8732"
                                />
                                <MiniCard
                                    title="Reservas Canceladas"
                                    number="5"
                                    percentage="5%"
                                    backgroundColor="rgba(251, 139, 129, 0.50)"
                                    titleColor="#E01300"
                                    percentageColor="#E01300"
                                />
                            </div>
                            <div className="charts-container">
                                <div className="chart">
                                    <Line data={reservasData} />
                                </div>
                                <div className="chart">
                                    <Bar
                                        data={{
                                            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                                            datasets: [{
                                                label: 'Reservas por Mes',
                                                data: [15, 25, 35, 45, 55, 65],
                                                backgroundColor: '#FF6384',
                                            }]
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardEstadisticas;

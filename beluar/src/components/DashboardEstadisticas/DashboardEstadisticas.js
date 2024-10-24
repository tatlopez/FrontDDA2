import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { ScaleLoader } from 'react-spinners'; // Importar el loader
import './dashboardEstadisticas.css';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import MiniCard from './MiniCard';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

const DashboardEstadisticas = () => {
    const [loading, setLoading] = useState(true); // Estado de carga
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Simular una llamada a la API
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simula un retraso de 2 segundos
            // Aquí puedes realizar la llamada a tu API y actualizar los estados correspondientes
            // setHabitacionesData(...); // Actualiza con los datos de la API
            // setServiciosData(...); // Actualiza con los datos de la API
            // setReservasData(...); // Actualiza con los datos de la API
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container">
                <Header />
                <div className="dashboard-body">
                    <div className="dashboard-estadisticas">
                        <p className="section-title">Estadísticas</p>

                        {loading ? ( // Mostrar el loader si loading es verdadero
                            <div className="loader-container">
                                <ScaleLoader size={50} color={"#6E28F5"} loading={loading} height={65}/>
                            </div>
                        ) : (
                            <>
                                {/* Tarjeta de estadísticas de reservas */}
                                <div className="stats-card">
                                    <p>Reservas</p>
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

                                {/* Contenedor para las dos tarjetas angostas */}
                                <div className="narrow-cards-container">
                                    {/* Tarjeta de servicios populares */}
                                    <div className="narrow-card">
                                        <p>Servicios Populares</p>
                                        <div className="mini-cards-container">
                                            <MiniCard
                                                title="Servicios Populares"
                                                number="75"
                                                percentage="60%"
                                                backgroundColor="rgba(135, 191, 112, 0.51)"
                                                titleColor="#4C8732"
                                                percentageColor="#4C8732"
                                            />
                                        </div>
                                        <div className="chart">
                                            <Pie data={serviciosData} options={{ maintainAspectRatio: false, responsive: true }} height={200} />
                                        </div>
                                    </div>

                                    {/* Tarjeta de reservas canceladas */}
                                    <div className="narrow-card">
                                        <p>Reservas Canceladas</p>
                                        <div className="mini-cards-container">
                                            <MiniCard
                                                title="Reservas Canceladas"
                                                number="5"
                                                percentage="5%"
                                                backgroundColor="rgba(251, 139, 129, 0.50)"
                                                titleColor="#E01300"
                                                percentageColor="#E01300"
                                            />
                                        </div>
                                        <div className="chart">
                                            <Bar
                                                data={{
                                                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                                                    datasets: [{
                                                        label: 'Reservas Canceladas',
                                                        data: [5, 4, 6, 3, 2, 5], // Datos de ejemplo
                                                        backgroundColor: '#FF6384',
                                                    }]
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardEstadisticas;

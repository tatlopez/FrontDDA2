import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { ScaleLoader } from 'react-spinners'; // Importar el loader
import './dashboardEstadisticas.css';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import MiniCard from './MiniCard';
import get_cancelled_reservations from '../../services/statistics/get_cancelled_reservations';
import get_reservations_per_month from '../../services/statistics/get_reservations_per_month';
import get_room_status_today from '../../services/statistics/get_room_status_today';
import get_popular_services from '../../services/statistics/get_popular_services';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

const DashboardEstadisticas = () => {
    const [loading, setLoading] = useState(true); // Estado de carga

    const hotel = JSON.parse(localStorage.getItem('selectedHotel'));
    const [roomStatusData, setRoomStatusData] = useState([]);

    const [cancelledReservationsData, setCancelledReservationsData] = useState({
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Reservas Canceladas',
                data: new Array(12).fill(0), // Inicializa con 12 valores en 0
                backgroundColor: '#FF6384',
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
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
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
                data: new Array(12).fill(0), // Inicializa con 12 valores en 0
            },
        ],
    });

    // Mapa de meses en español
    const monthMap = {
        'January': 0,
        'February': 1,
        'March': 2,
        'April': 3,
        'May': 4,
        'June': 5,
        'July': 6,
        'August': 7,
        'September': 8,
        'October': 9,
        'November': 10,
        'December': 11,
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // Llamada a la API para obtener las reservas por mes
            get_reservations_per_month(hotel.id)
                .then((res) => {
                    // Crear un array de 12 meses con los datos devueltos por la API
                    const updatedData = new Array(12).fill(0);
                    
                    // Mapear los datos de la API a los índices de los meses
                    Object.entries(res).forEach(([month, value]) => {
                        const monthIndex = monthMap[month];
                        if (monthIndex !== undefined) {
                            updatedData[monthIndex] = value;
                        }
                    });

                    // Actualizar el estado del gráfico de reservas
                    setReservasData((prevData) => ({
                        ...prevData,
                        datasets: [
                            {
                                ...prevData.datasets[0],
                                data: updatedData, // Asignar los datos mapeados
                            },
                        ],
                    }));
                })
                .catch((err) => {
                    console.error('Error:', err);
                });

            get_popular_services(hotel.id)
                .then((res) => {
                    // Crear un array de objetos con los servicios populares
                    const updatedData = Object.entries(res).map(([service, value]) => ({
                        service,
                        value,
                    }));

                    // Actualizar el estado del gráfico de servicios
                    setServiciosData((prevData) => ({
                        ...prevData,
                        datasets: [
                            {
                                ...prevData.datasets[0],
                                data: updatedData.map((item) => item.value),
                            },
                        ],
                        labels: updatedData.map((item) => item.service),
                    }));
                })
                .catch((err) => {
                    console.error('Error:', err);
                });


                get_cancelled_reservations(hotel.id)
                .then((res) => {
                    // Crear un array de 12 meses con los datos devueltos por la API
                    const updatedData = new Array(12).fill(0);
            
                    // Mapear los datos de la API a los índices de los meses
                    Object.entries(res).forEach(([month, value]) => {
                        const monthIndex = monthMap[month];
                        if (monthIndex !== undefined) {
                            updatedData[monthIndex] = value;
                        }
                    });
            
                    // Actualizar el estado del gráfico de reservas canceladas
                    setCancelledReservationsData((prevData) => ({
                        ...prevData,
                        datasets: [
                            {
                                ...prevData.datasets[0],
                                data: updatedData, // Asignar los datos mapeados
                            },
                        ],
                    }));
                })
                .catch((err) => {
                    console.error('Error:', err);
                });

                get_room_status_today(hotel.id)
                .then((res) => {
                    setRoomStatusData(res);
                    console.log('room status data: ',roomStatusData)
                })
                .catch((err) => {
                    console.error('Error:', err);
                });

            setLoading(false);
        };
        fetchData();
    }, [hotel.id]);

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container">
                <Header hotelName={hotel.name}/>
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
                                    <p>Habitaciones</p>
                                    <div className="mini-cards-container">
                                        <MiniCard
                                            title="Habitaciones ocupadas"
                                            number={roomStatusData.occupied_rooms}
                                            backgroundColor="rgba(135, 191, 112, 0.51)"
                                            titleColor="#4C8732"
                                            percentageColor="#4C8732"
                                        />
                                        <MiniCard
                                            title="Habitaciones libres"
                                            number={roomStatusData.unoccupied_rooms}
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
                                                data={reservasData}
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
                                                number={serviciosData.labels.length}
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
                                                number={cancelledReservationsData.datasets[0].data.reduce((acc, curr) => acc + curr, 0)}
                                                backgroundColor="rgba(251, 139, 129, 0.50)"
                                                titleColor="#E01300"
                                                percentageColor="#E01300"
                                            />
                                        </div>
                                        <div className="chart">
                                            <Bar
                                                data={cancelledReservationsData}
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

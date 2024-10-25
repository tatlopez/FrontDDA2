import React, { useEffect, useState } from "react";
import "./dashboardInicio.css";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import ResponsiveHeader from "../Header/responsiveHeader.js";
import calendarCheck from "../../assets/calendar-check.svg";
import calendarCross from "../../assets/calendar-cross.svg";
import coupon1 from "../../assets/coupon 1.svg";
import coupon2 from "../../assets/coupon 2.svg";
import get_reservations from "../../services/reservations/get_reservations";
import get_room_status_today from "../../services/statistics/get_room_status_today";
import get_rooms from "../../services/rooms/get_rooms";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function DashboardInicio() {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [todayCheckIns, setTodayCheckIns] = useState(0);
    const [todayCheckOuts, setTodayCheckOuts] = useState(0);
    const [roomStatus, setRoomStatus] = useState([]);
    const [rooms, setRooms] = useState([]);

    const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

    const roomStateMapping = {
        'A': 'Disponible',
        'B': 'Ocupada',
        'M': 'Mantenimiento',
    }

    useEffect(() => {
        get_reservations(hotel.id)
            .then((res) => {
                const loadedReservas = res || [];
                
                // Get today's date
                const today = dayjs().format('YYYY-MM-DD');

                // Calculate today's check-ins and check-outs
                const todayCheckIns = loadedReservas.filter(reservation =>
                    dayjs(reservation.start_date).format('YYYY-MM-DD') === today
                );

                const todayCheckOuts = loadedReservas.filter(reservation =>
                    dayjs(reservation.end_date).format('YYYY-MM-DD') === today
                );

                // Update the state with the results
                setReservations(loadedReservas);
                setTodayCheckIns(todayCheckIns.length);
                setTodayCheckOuts(todayCheckOuts.length);
            })
            .catch((err) => {
                console.log(err);
            });
        
        get_room_status_today(hotel.id)
            .then((res) => {
                setRoomStatus(res);
            })
            .catch((err) => {
                console.log(err);
            }
        );  

        get_rooms(hotel.id)
            .then((res) => {
                setRooms(res);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [hotel.id]); // Add hotel.id as a dependency to re-fetch when it changes

    // Function to calculate the absolute difference from today
    const calculateDateDifference = (date) => {
        return Math.abs(dayjs().diff(dayjs(date), 'day'));
    };

    const handleReservaButton = () => {
        navigate('/DashboardReservas');
    };

    const handleHabitacionButton = () => {
        navigate('/DashboardHabitaciones');
    };

    return (
        <div className="page-container">
            <Menu className="menu" />
            <div className="content-container1">
                <Header hotelName={hotel.name} className="header"/>
                <ResponsiveHeader hotelName={hotel.name} className="header-responsive"/>
                <div className="dashboard-body1">
                    <div className="dashboard-top">
                        {/* Resumen de tu día */}
                        <div className="dashboard-resume">
                            <p className="title">Resumen de tu día</p>
                            <div className="cards">
                                <div className="cards-row">
                                    <div className="resume-card" style={{backgroundColor: 'rgba(135,191,112,0.5)', color: '#4C8732'}}>
                                        <div className="card-title">
                                            <img src={calendarCheck} className="card-icon" alt="Check-ins"/>
                                            <p className="resume-title">Check-ins</p>
                                        </div>
                                        <p className="resume-number">{todayCheckIns}</p>
                                    </div>
                                    <div className="resume-card" style={{backgroundColor: 'rgba(251,139,129,0.5)', color: '#E01300'}}>
                                        <div className="card-title">
                                            <img src={calendarCross} className="card-icon" alt="Check-outs"/>
                                            <p className="resume-title">Check-outs</p>
                                        </div>
                                        <p className="resume-number">{todayCheckOuts}</p>
                                    </div>
                                </div>
                                <div className="cards-row">
                                    <div className="resume-card" style={{backgroundColor: 'rgba(62,174,226,0.5)', color: '#317CF5'}}>
                                        <div className="card-title">
                                            <img src={coupon1} className="card-icon" alt="Servicios reservados"/>
                                            <p className="resume-title">Habitaciones reservadas</p>
                                        </div>
                                        <p className="resume-number">{roomStatus.occupied_rooms}</p>
                                    </div>
                                    <div className="resume-card" style={{backgroundColor: 'rgba(226,221,80,0.5)', color: '#E19110'}}>
                                        <div className="card-title">
                                            <img src={coupon2} className="card-icon" alt="Servicios libres"/>
                                            <p className="resume-title">Habitaciones libres</p>
                                        </div>
                                        <p className="resume-number">{roomStatus.unoccupied_rooms}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fin resumen de tu día */}
                        {/* Habitaciones para limpiar */}
                        <div className="dashboard-rooms">
                            <p className="title">Estado de las habitaciones libres</p>
                            <div className="rooms">
                                <table className="reservations-table">
                                    <thead>
                                        <tr>
                                            <th>Habitación</th>
                                            <th>Estado</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {rooms
                                    .filter((room) => room.state !== 'B') 
                                    .slice(0, 4) // Mostrar solo las primeras 4 habitaciones
                                    .map((room, index) => (
                                        <tr key={index}>
                                            <td data-label="N° de habitación">#{room.floor + room.name}</td>
                                            <td data-label="Estado" className="room-status">{roomStateMapping[room.state]}</td>
                                            <td data-label="Precio">${room.price}</td>
                                            <td><button className="ver-btn" onClick={handleHabitacionButton}>Ver habitación</button></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Fin habitaciones */}
                    </div>
                    {/* Tabla de reservas */}
                    <div className="dashboard-reservations">
                        <p className="title">Próximas reservas</p>
                        <table className="reservations-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Check-in</th>
                                    <th>Check-out</th>
                                    <th>Habitación</th>
                                    <th>Servicios extra</th>
                                    <th>Total de la reserva</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations
                                    .sort((a, b) => calculateDateDifference(a.start_date) - calculateDateDifference(b.start_date)) // Ordenar por proximidad a la fecha actual
                                    .slice(0, 5) // Mostrar las 5 reservas más cercanas
                                    .map((reservation, index) => (
                                        <tr key={index}>
                                            <td data-label="Nombre">{reservation.client_info.surname + ', ' + reservation.client_info.name}</td>
                                            <td data-label="Check-in">{reservation.start_date}</td>
                                            <td data-label="Check-out">{reservation.end_date}</td>
                                            <td data-label="Habitación" className="room-number"><p>{'#' + reservation.room_info.floor + reservation.room_info.name}</p></td>

                                            <td data-label="Servicios extra">
                                                {reservation.services.length > 0 ? (
                                                    <>
                                                        {reservation.services.slice(0, 2).map((service, index) => (
                                                            <span key={index}>
                                                                {service.service.name}
                                                                {index < Math.min(1, reservation.services.length - 1) && ', '}
                                                            </span>
                                                        ))}
                                                        {reservation.services.length > 2 && (
                                                            <details>
                                                                <summary></summary>
                                                                {reservation.services.slice(2).map((service, index) => (
                                                                    <div key={index + 2}>{service.service.name + ' '}</div>
                                                                ))}
                                                            </details>
                                                        )}
                                                    </>
                                                ) : (
                                                    'Sin servicios contratados'
                                                )}
                                            </td>
                                            <td data-label="Total de la reserva">${reservation.total_price}</td>
                                            <td><button className="ver-btn" onClick={handleReservaButton}>Ver reserva</button></td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Fin tabla de reservas */}
                </div>
            </div>
        </div>
    );
}

export default DashboardInicio;

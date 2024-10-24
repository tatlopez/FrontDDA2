import React, { useEffect, useState } from "react";
import "./dashboardInicio.css";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import calendarCheck from "../../assets/calendar-check.svg";
import calendarCross from "../../assets/calendar-cross.svg";
import coupon1 from "../../assets/coupon 1.svg";
import coupon2 from "../../assets/coupon 2.svg";
import get_reservations from "../../services/reservations/get_reservations";

function DashboardInicio() {

    const [reservations, setReservations] = useState([]);

    const hotel = JSON.parse(localStorage.getItem('selectedHotel'));

    useEffect(() => {

        get_reservations(hotel.id)
            .then((res) => {
                const loadedReservas = res || [];
                console.log(loadedReservas);
                setReservations(loadedReservas);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const rooms = [
        { number: '3A', status: 'Disponible', price: 300, image: 'room1.jpg' },
        { number: '7B', status: 'Limpieza', price: 250, image: 'room2.jpg' },
        { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg' },
        { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg' },
    ];

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container1">
                <Header hotelName={hotel.name}/>
                <div className="dashboard-body1">
                    <div className="dashboard-top">
                        {/* Resumen de tu día*/}
                        <div className="dashboard-resume">
                            <p className="title">Resumen de tu día</p>
                            <div className="cards">
                                <div className="cards-row">
                                    <div className="resume-card" style={{backgroundColor: 'rgba(135,191,112,0.5)', color: '#4C8732'}}>
                                        <div className="card-title">
                                            <img src={calendarCheck} className="card-icon" alt="Check-ins"/>
                                            <p className="resume-title">Check-ins</p>
                                        </div>
                                        <p className="resume-number">15</p>
                                    </div>
                                    <div className="resume-card" style={{backgroundColor: 'rgba(251,139,129,0.5)', color: '#E01300'}}>
                                        <div className="card-title">
                                            <img src={calendarCross} className="card-icon" alt="Check-outs"/>
                                            <p className="resume-title">Check-outs</p>
                                        </div>
                                        <p className="resume-number">12</p>
                                    </div>
                                </div>
                                <div className="cards-row">
                                    <div className="resume-card" style={{backgroundColor: 'rgba(62,174,226,0.5)', color: '#317CF5'}}>
                                        <div className="card-title">
                                            <img src={coupon1} className="card-icon" alt="coupon 1"/>
                                            <p className="resume-title">Servicios reservados</p>
                                        </div>
                                        <p className="resume-number">7</p>
                                    </div>
                                    <div className="resume-card" style={{backgroundColor: 'rgba(226,221,80,0.5)', color: '#E19110'}}>
                                        <div className="card-title">
                                            <img src={coupon2} className="card-icon" alt="coupon 2"/>
                                            <p className="resume-title">Servicios libres</p>
                                        </div>
                                        <p className="resume-number">13</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fin resumen de tu día*/}
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
                                        {rooms.map((room, index) => (
                                            <tr key={index}>
                                                <td>#{room.number}</td>
                                                <td className="room-status">{room.status}</td>
                                                <td>${room.price}</td>
                                                <td><button className="ver-btn">Ver habitación</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Fin check ins rapidos */}
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
                                    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date)) // Ordena por fecha de inicio
                                    .slice(0, 5) // Solo muestra las primeras 5 reservas
                                    .map((reservation, index) => (
                                        <tr key={index}>
                                            <td>{reservation.client_info.surname + ', ' + reservation.client_info.name}</td>
                                            <td>{reservation.start_date}</td>
                                            <td>{reservation.end_date}</td>
                                            <td className="room-number"><p>{'#' + reservation.room_info.floor + reservation.room_info.name}</p></td>

                                            <td>
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
                                            <td>${reservation.total_price}</td>
                                            <td><button className="ver-btn">Ver reserva</button></td>
                                        </tr>
                                    ))}
                            </tbody>

                        </table>
                    </div>
                    {/* Fin tabla de reservas */}
                </div>
            </div>
        </div>
    )
}

export default DashboardInicio;
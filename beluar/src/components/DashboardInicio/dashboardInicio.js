import React from "react";
import "./dashboardInicio.css";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import calendarCheck from "../../assets/calendar-check.svg";
import calendarCross from "../../assets/calendar-cross.svg";
import coupon1 from "../../assets/coupon 1.svg";
import coupon2 from "../../assets/coupon 2.svg";

function DashboardInicio() {

    const reservations = [
        {
          name: 'Fernández, Martín',
          checkIn: '15/09/2024',
          checkOut: '20/09/2024',
          room: '#3B',
          extraServices: 'Desayuno, Traslado al hotel',
          amount: 'USD $120',
        },
        {
          name: 'Rodríguez, Catalina',
          checkIn: '16/09/2024',
          checkOut: '19/09/2024',
          room: '#7J',
          extraServices: 'Spa, Almuerzo buffet',
          amount: 'USD $85',
        },
        {
          name: 'Gómez, Luis',
          checkIn: '18/09/2024',
          checkOut: '21/09/2024',
          room: '#5C',
          extraServices: 'Wi-Fi premium, Cena a la habitación',
          amount: 'USD $65',
        },
        {
          name: 'Torres, Julia',
          checkIn: '14/09/2024',
          checkOut: '17/09/2024',
          room: '#9L',
          extraServices: 'Gimnasio, Desayuno buffet',
          amount: 'USD $40',
        },
        {
          name: 'Pereyra, Esteban',
          checkIn: '19/09/2024',
          checkOut: '23/09/2024',
          room: '#8D',
          extraServices: 'Spa, Wi-Fi premium',
          amount: 'USD $110',
        },
        {
          name: 'Suárez, Natalia',
          checkIn: '20/09/2024',
          checkOut: '25/09/2024',
          room: '#6A',
          extraServices: 'Desayuno, Estacionamiento',
          amount: 'USD $95',
        }
    ];

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container">
                <Header />
                <div className="dashboard-body">
                    <div className="dashboard-top">
                        <div className="dashboard-resume">
                            <p className="title">Resumen de tu día</p>
                            <div className="cards">
                                <div className="cards-row">
                                    <div className="card">
                                        <div className="card-title">
                                            <img src={calendarCheck} className="card-icon"/>
                                            <p className="resume-title">Check-ins</p>
                                        </div>
                                        <p className="resume-number">15</p>
                                    </div>
                                    <div className="card">
                                        <div className="card-title">
                                            <img src={calendarCross} className="card-icon"/>
                                            <p className="resume-title">Check-outs</p>
                                        </div>
                                        <p className="resume-number">12</p>
                                    </div>
                                </div>
                                <div className="cards-row">
                                    <div className="card">
                                        <div className="card-title">
                                            <img src={coupon1} className="card-icon"/>
                                            <p className="resume-title">Servicios reservados</p>
                                        </div>
                                        <p className="resume-number">7</p>
                                    </div>
                                    <div className="card">
                                        <div className="card-title">
                                            <img src={coupon2} className="card-icon"/>
                                            <p className="resume-title">Servicios libres</p>
                                        </div>
                                    <p className="resume-number">13</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-checkIn">
                            <p className="title">Check-in/check out</p>
                            <div className="buttons">
                                <button className="button">Check-in</button>
                                <button className="button">Check-out</button>
                            </div>
                            <div className="fields">
                                <div className="field">
                                    <label htmlFor="name">N° habitación</label>
                                    <input type="text" id="habitacion" name="habitacion"/>
                                </div>
                                <div className="field">
                                    <label htmlFor="room">Apellido y nombre</label>
                                    <input type="text" id="name" name="name"/>
                                </div>
                                <div className="divisor"></div>
                                <div className="balance">
                                    <p className="balance-title">Saldo restante</p>
                                    <p className="balance-number">$$$$</p>
                                </div>
                                <div className="payment-buttons">
                                    <button className="payment-button">Abonar total</button>
                                    <button className="ticket-button">Descargar factura</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <th>A abonar</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((reservation, index) => (
                                        <tr key={index}>
                                        <td>{reservation.name}</td>
                                        <td>{reservation.checkIn}</td>
                                        <td>{reservation.checkOut}</td>
                                        <td className="room-number">{reservation.room}</td>
                                        <td>{reservation.extraServices} <span className="dropdown-icon">▾</span></td>
                                        <td>{reservation.amount}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardInicio;
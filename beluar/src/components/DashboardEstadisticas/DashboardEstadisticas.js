import React, { useState } from 'react';
import './dashboardEstadisticas.css';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import MiniCard from './MiniCard'; 
import ServicioCard from './ServicioCard'; 



function DashboardEstadisticas() {

    return (
        <div className="page-container">
            <Menu />
            <div className="content-container">
                <Header /> 
                <div className="dashboard-body">
                    <div className="dashboard-estadisticas">
                        <h2 className="section-title">Estadísticas</h2>

                        <div className="row">

                            {/* HABITACIONES */}
                            <div className="card-habitaciones">
                                <h3>Habitaciones</h3>
                                <div className="mini-cards-container">
                                    <MiniCard
                                        title="Reservadas para el dia de hoy"
                                        number="15"
                                        percentage="30%"
                                        backgroundColor="rgba(135, 191, 112, 0.51)"
                                        titleColor="#4C8732"
                                        percentageColor="#4C8732"
                                    />
                                    <MiniCard
                                        title="Desocupadas para el dia de hoy"
                                        number="10"
                                        percentage="15%"
                                        backgroundColor="rgba(251, 139, 129, 0.50)"
                                        titleColor="#E01300"
                                        percentageColor="#E01300"
                                    />
                                </div>
                            </div>

                            {/* Facturación total */}
                            <div className="facturacion">
                            <h3>Facturación total del día de hoy</h3>
                            <div className="facturacion-valor">USD $356K</div>
                            </div>
                        </div>

                        <div className="row">
                            {/*SERVICIOS */}
                            <div className="card-servicios">
                            <h3>Servicios</h3>
                            <div className="servicios-container">
                                <ServicioCard
                                title="Más popular"
                                serviceName="Tarde de spa"
                                percentage="23%"
                                imgUrl="/path/to/image1.png"
                                />
                                <ServicioCard
                                title="Menos popular"
                                serviceName="Acceso al salón VIP"
                                percentage="10%"
                                imgUrl="/path/to/image2.png"
                                />
                                <div className="servicios-ingresos">
                                <h3>Ingresos generados por la contratación de servicios</h3>
                                <div className="ingresos-valor">USD $267K</div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="row">
                            {/* HUESPEDES */}
                            <div className="card-huespedes">
                            <h3>Huéspedes</h3>
                            <MiniCard
                                title="Estadía promedio (días)"
                                number="5"
                                percentage="10%"
                                backgroundColor="rgba(226, 221, 80, 0.50)"
                                titleColor="#E19110"
                                percentageColor="#E19110"
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardEstadisticas;

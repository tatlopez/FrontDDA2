import React, { useState } from 'react';
import './dashboardHabitaciones.css';
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Listas from '../Listas/Lista';
import InfoCard from '../Cards/infoCard';
import EditableCard from '../Cards/editableCard';
import Header from '../Header/Header';
import signoMas from '../../assets/signo-mas.png';

const roomsData = [
  { number: '3A', status: 'Disponible', price: 300, image: 'room1.jpg', type: 'habitacion' },
  { number: '7B', status: 'Limpieza', price: 250, image: 'room2.jpg', type: 'habitacion' },
  { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg', type: 'habitacion' },
  { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg', type: 'habitacion' },
  { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg', type: 'habitacion' },
  { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg', type: 'habitacion' },
  { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg', type: 'habitacion' },
  { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg', type: 'habitacion' },
];

function DashboardHabitaciones() {
  const [rooms, setRooms] = useState(roomsData);
  const [selectedRoom, setSelectedRoom] = useState(roomsData[0]);
  const [editingRoom, setEditingRoom] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = rooms.filter(room =>
    room.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setEditingRoom(false);
  };

  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setEditingRoom(true);
  };

  const handleSave = (updatedRoom) => {
    const updatedRooms = rooms.map(room =>
      room.number === updatedRoom.number ? updatedRoom : room
    );
    setRooms(updatedRooms);
    setSelectedRoom(updatedRoom);
    setEditingRoom(false);
  };

  return (
    <div className="page-container">
      <Menu />
      <div className="content-container">
        <Header />
        <div className="dashboard-body">
          <div className="rooms-section">
            <div className="rooms-header">
              <p>Habitaciones</p>
              <div className="search-and-add">
                <SearchBar setSearchTerm={setSearchTerm} placeholder="Buscar habitación..." />
                <button className="add-room-button">
                  <img src={signoMas} alt="Add Icon" />
                </button>
              </div>
            </div>
            <div className="rooms-list" style={{ maxHeight: '530px', overflowY: 'auto' }}>
              {filteredRooms.map((room) => (
                <Listas key={room.number} item={room} type={'habitacion'} onEditClick={handleEditClick} onRoomClick={handleRoomClick} />
              ))}
            </div>
          </div>
          <div className="room-detail-section">
            {editingRoom ? (
              <EditableCard item={selectedRoom} type={selectedRoom.type} onSave={handleSave} />
            ) : (
              <InfoCard item={selectedRoom} type={selectedRoom.type} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHabitaciones;

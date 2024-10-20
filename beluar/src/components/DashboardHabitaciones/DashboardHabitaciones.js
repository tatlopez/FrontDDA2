import React, { useEffect, useState } from 'react'; 
import './dashboardHabitaciones.css';
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Listas from '../Listas/Lista';
import InfoCard from '../Cards/infoCard';
import EditableCard from '../Cards/editableCard';
import ConfirmActionModal from '../PopUp/ConfirmActionModal';
import Header from '../Header/Header';
import signoMas from '../../assets/signo-mas.png';
import AgregarHabitacionModal from './CrearHabitacion';
import get_rooms from '../../services/rooms/get_rooms';

/* const roomsData = [
  { number: '3A', status: 'Disponible', price: 300, image: 'room1.jpg', type: 'habitacion' },
  { number: '7B', status: 'Limpieza', price: 250, image: 'room2.jpg', type: 'habitacion' },
  { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg', type: 'habitacion' },
  { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg', type: 'habitacion' },
  { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg', type: 'habitacion' },
  { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg', type: 'habitacion' },
  { number: '5A', status: 'Disponible', price: 250, image: 'room4.jpg', type: 'habitacion' },
  { number: '6H', status: 'Ocupada', price: 100, image: 'room5.jpg', type: 'habitacion' },
]; */

function DashboardHabitaciones() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editingRoom, setEditingRoom] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);

  const hotel = JSON.parse(localStorage.getItem('selectedHotel'));
  
  useEffect(() => {
    get_rooms(hotel.id)
      .then((res) => {
        console.log('Rooms:', res);
        setRooms(res || []);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }, []);

  const filteredRooms = rooms.filter(room =>
    String(room.floor).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setEditingRoom(false);
  };

  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setEditingRoom(true);
  };

  const handleDeleteClick = (room) => {
    setSelectedRoom(room);
    setShowConfirmModal(true);
  };

  const handleSave = (updatedRoom) => {
    const updatedRooms = rooms.map(room =>
      room.number === updatedRoom.number ? updatedRoom : room
    );
    setRooms(updatedRooms);
    setSelectedRoom(updatedRoom);
    setEditingRoom(false);
  };

  const handleConfirmDelete = () => {
    const updatedRooms = rooms.filter(room => room.number !== selectedRoom.number);
    setRooms(updatedRooms);
    setSelectedRoom(updatedRooms[0] || null);  
    setShowConfirmModal(false);
  };

  const handleAddRoom = (newRoom) => {
    setRooms([...rooms, newRoom]);
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
                <button className="add-room-button" onClick={() => setShowAddRoomModal(true)}>
                  <img src={signoMas} alt="Add Icon" />
                </button>
              </div>
            </div>
            <div className="rooms-list" style={{ maxHeight: '530px', overflowY: 'auto' }}>
              {filteredRooms.map((room) => (
                <Listas key={room.number} item={room} type={'habitacion'} onEditClick={handleEditClick} onRoomClick={handleRoomClick} onDeleteClick={handleDeleteClick} />
              ))}
            </div>
          </div>
          <div className="room-detail-section">
            {editingRoom ? (
              <EditableCard item={selectedRoom} type={selectedRoom.type} onSave={handleSave} />
            ) : (
              <InfoCard item={selectedRoom} type={selectedRoom?.type} onEdit={handleEditClick} onDelete={() => setShowConfirmModal(true)} />
            )}
          </div>
        </div>
      </div>
      {showAddRoomModal && (
        <AgregarHabitacionModal
          onClose={() => setShowAddRoomModal(false)}
          onSave={handleAddRoom}
        />
      )}
      {showConfirmModal && (
        <ConfirmActionModal
          actionType="eliminarHabitacion"
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default DashboardHabitaciones;

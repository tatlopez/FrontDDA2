import React, { useEffect, useState } from 'react'; 
import './dashboardHabitaciones.css';
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Listas from '../Listas/Lista';
import InfoCard from '../Cards/infoCard';
import EditableCard from '../Cards/editableCard';
import ConfirmActionModal from '../PopUp/ConfirmActionModal';
import Header from '../Header/Header';
import addIcon from '../../assets/signo-mas.svg';
import AgregarHabitacionModal from './CrearHabitacion';
import get_rooms from '../../services/rooms/get_rooms';
import delete_room from '../../services/rooms/delete_room';


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
        const loadedRooms = res || []
        setRooms(loadedRooms);
        console.log('DEL BACK', loadedRooms);
        if (loadedRooms.length > 0) {
          setSelectedRoom(loadedRooms[0]);
        }

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
    const updatedRooms = rooms.map(room => (room.id === updatedRoom.id ? updatedRoom : room));
    setRooms(updatedRooms);
    setSelectedRoom(updatedRoom);
    setEditingRoom(false);
  };

  const handleConfirmDelete = () => {
    delete_room(selectedRoom.id)
    .then(() => {
      const updatedRooms = rooms.filter(room => room.id !== selectedRoom.id);
      setRooms(updatedRooms);
      setSelectedRoom(updatedRooms[0] || null);  
      setShowConfirmModal(false);
    })
    .catch((err) => {
      console.error('Error:', err);
    });
  };

  const handleAddRoom = (newRoom) => {
    setRooms([...rooms, newRoom]);
  };

  return (
    <div className="page-container">
      <Menu />
      <div className="content-container">
        <Header hotelName={hotel.name}/>
        <div className="dashboard-body">
          <div className="rooms-section">
            <div className="rooms-header">
              <p>Habitaciones</p>
              <div className="search-and-add">
                <SearchBar setSearchTerm={setSearchTerm} placeholder="Buscar habitación..." />
                <button className="add-room-button" onClick={() => setShowAddRoomModal(true)}>
                  <img src={addIcon} alt="Add Icon" />
                </button>
              </div>
            </div>
            <div className="rooms-list" style={{ maxHeight: '530px', overflowY: 'auto' }}>
              {filteredRooms.map((room) => (
                <Listas
                  key={room.id}
                  item={room}
                  type={'habitacion'}
                  onEditClick={handleEditClick}
                  onRoomClick={handleRoomClick}
                  isSelected={selectedRoom && selectedRoom.id === room.id}
                />
              ))}
            </div>
          </div>
          <div className="room-detail-section">
            {editingRoom ? (
              <EditableCard item={selectedRoom} type={'habitacion'} onSave={handleSave} />
            ) : (
              <InfoCard item={selectedRoom} type={'habitacion'} onEdit={handleEditClick} onDelete={() => setShowConfirmModal(true)} />
            )}
          </div>
        </div>
      </div>
      {showAddRoomModal && (
        <AgregarHabitacionModal
          onClose={() => setShowAddRoomModal(false)}
          onSave={(newRoom) => {
            handleAddRoom(newRoom);
            setShowAddRoomModal(false);
          }}
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

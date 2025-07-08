import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import RoomList from '../../components/rooms/RoomList.jsx';
import RoomForm from '../../components/rooms/RoomForm.jsx';
import { toast } from 'react-hot-toast';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.get('/rooms');
      setRooms(response.data);
    } catch (error) {
      toast.error('Failed to load rooms');
    }
  };

  const handleSave = async (roomData) => {
    try {
      if (editingRoom) {
        await api.put(`/rooms/${editingRoom._id}`, roomData);
        toast.success('Room updated successfully');
      } else {
        await api.post('/rooms', roomData);
        toast.success('Room created successfully');
      }
      fetchRooms();
      setShowForm(false);
      setEditingRoom(null);
    } catch (error) {
      toast.error('Failed to save room');
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await api.delete(`/rooms/${id}`);
        toast.success('Room deleted successfully');
        fetchRooms();
      } catch (error) {
        toast.error('Failed to delete room');
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Room Management</h1>
        <button
          onClick={() => {
            setEditingRoom(null);
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Add New Room
        </button>
      </div>

      {showForm ? (
        <RoomForm 
          room={editingRoom} 
          onSave={handleSave} 
          onCancel={() => {
            setShowForm(false);
            setEditingRoom(null);
          }} 
        />
      ) : (
        <RoomList 
          rooms={rooms} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}
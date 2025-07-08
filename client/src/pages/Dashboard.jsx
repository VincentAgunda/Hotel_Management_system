import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookingsToday: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Rooms</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalRooms}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Available Rooms</h3>
          <p className="text-3xl font-bold text-green-600">{stats.availableRooms}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Today's Bookings</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.bookingsToday}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        {/* Activity list would go here */}
      </div>
    </div>
  );
}
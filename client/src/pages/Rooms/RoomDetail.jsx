import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await api.get(`/rooms/${id}`);
        setRoom(response.data);
      } catch (error) {
        toast.error('Failed to load room details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoom();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading room details...</div>;
  if (!room) return <div className="text-center py-8">Room not found</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Room {room.roomNumber}</h1>
              <p className="text-gray-600 capitalize">{room.type}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              room.status === 'available' ? 'bg-green-100 text-green-800' :
              room.status === 'occupied' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {room.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Price:</span> ${room.price}/night</p>
                <p><span className="font-medium">Description:</span> {room.description || 'No description available'}</p>
              </div>
              
              {room.amenities && room.amenities.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map(amenity => (
                      <span key={amenity} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Bookings</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Current and upcoming bookings will appear here</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Edit Room
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Delete Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
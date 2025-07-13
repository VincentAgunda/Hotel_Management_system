import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

export default function BookingDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(`/bookings/${id}`);
        setBooking(response.data);
      } catch (error) {
        toast.error('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooking();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading booking details...</div>;
  if (!booking) return <div className="text-center py-8">Booking not found</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Booking #{booking._id.slice(-6).toUpperCase()}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking Information</h2>
              <div className="space-y-3">
                <p><span className="font-medium">Guest:</span> {booking.guestName}</p>
                <p><span className="font-medium">Email:</span> {booking.guestEmail}</p>
                <p><span className="font-medium">Phone:</span> {booking.guestPhone || 'Not provided'}</p>
                <p><span className="font-medium">Check-in:</span> {new Date(booking.checkIn).toLocaleDateString()}</p>
                <p><span className="font-medium">Check-out:</span> {new Date(booking.checkOut).toLocaleDateString()}</p>
                <p><span className="font-medium">Status:</span> <span className={`px-2 py-1 rounded-full text-xs ${
                  booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                  booking.status === 'checked-in' ? 'bg-green-100 text-green-800' :
                  booking.status === 'checked-out' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>{booking.status}</span></p>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Room Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><span className="font-medium">Room:</span> {booking.room?.roomNumber || 'Not assigned'}</p>
                <p><span className="font-medium">Type:</span> {booking.room?.type || 'Unknown'}</p>
                <p><span className="font-medium">Price:</span> ${booking.totalPrice || '0.00'}</p>
              </div>
              
              {booking.specialRequests && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Special Requests</h3>
                  <p className="bg-yellow-50 p-3 rounded-lg">{booking.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Edit Booking
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Check-in
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
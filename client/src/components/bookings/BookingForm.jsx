import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import Button from '../ui/Button';

export default function BookingForm({ booking, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    room: '',
    checkIn: format(new Date(), 'yyyy-MM-dd'),
    checkOut: format(new Date(Date.now() + 86400000 * 2), 'yyyy-MM-dd'),
    adults: 1,
    children: 0,
    specialRequests: ''
  });
  
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/rooms');
        setRooms(response.data);
      } catch (error) {
        toast.error('Failed to load rooms');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRooms();
    
    if (booking) {
      setFormData({
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        guestPhone: booking.guestPhone || '',
        room: booking.room?._id || '',
        checkIn: format(new Date(booking.checkIn), 'yyyy-MM-dd'),
        checkOut: format(new Date(booking.checkOut), 'yyyy-MM-dd'),
        adults: booking.adults || 1,
        children: booking.children || 0,
        specialRequests: booking.specialRequests || ''
      });
    }
  }, [booking]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.guestName || !formData.guestEmail || !formData.room) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }
    
    onSave(formData);
  };
  
  if (loading) return <div className="text-center py-4">Loading form data...</div>;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name *</label>
          <input
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guest Email *</label>
          <input
            type="email"
            name="guestEmail"
            value={formData.guestEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guest Phone</label>
          <input
            type="tel"
            name="guestPhone"
            value={formData.guestPhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room *</label>
          <select
            name="room"
            value={formData.room}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a room</option>
            {rooms.map(room => (
              <option key={room._id} value={room._id}>
                {room.roomNumber} - {room.type} (${room.price}/night)
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date *</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            min={format(new Date(), 'yyyy-MM-dd')}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date *</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            min={formData.checkIn}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adults *</label>
          <input
            type="number"
            name="adults"
            value={formData.adults}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            min="1"
            max="10"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            min="0"
            max="10"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows="3"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="primary"
        >
          {booking ? 'Update Booking' : 'Create Booking'}
        </Button>
      </div>
    </form>
  );
}
import { useState } from 'react';
import { format, addMonths, subMonths, isSameDay } from 'date-fns';

export default function BookingCalendar({ bookings }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  // Generate days in month
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  
  const days = [];
  let day = new Date(startDate);
  
  while (day <= endDate) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  
  // Check if a day has a booking
  const getBookingsForDay = (date) => {
    return bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      return date >= checkIn && date <= checkOut;
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Booking Calendar</h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <span className="text-lg">◀</span>
            </button>
            <span className="font-medium text-gray-700">
              {format(currentDate, 'MMMM yyyy')}
            </span>
            <button 
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <span className="text-lg">▶</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = isSameDay(day, new Date());
            const dayBookings = getBookingsForDay(day);
            
            return (
              <div 
                key={index}
                className={`min-h-24 p-1 border rounded ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                } ${isToday ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <div className={`text-right text-sm p-1 ${
                  isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto' : ''
                }`}>
                  {format(day, 'd')}
                </div>
                
                <div className="mt-1 space-y-1">
                  {dayBookings.map(booking => (
                    <div 
                      key={booking._id} 
                      className="bg-blue-100 text-blue-800 text-xs p-1 rounded truncate"
                      title={`${booking.guestName} - Room ${booking.room?.roomNumber || 'N/A'}`}
                    >
                      {booking.guestName.split(' ')[0]} - {booking.room?.roomNumber || '?'}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
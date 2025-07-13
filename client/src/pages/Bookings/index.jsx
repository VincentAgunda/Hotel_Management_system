import { useState, useEffect } from 'react';
import api from '../../services/api.js';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BookingCalendar from '../../components/bookings/BookingCalendar.jsx';
import BookingForm from '../../components/bookings/BookingForm.jsx';
import BookingsTable from '../../components/bookings/BookingsTable.jsx';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Bookings error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (bookingData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (editingBooking) {
        await api.put(`/bookings/${editingBooking._id}`, bookingData);
      } else {
        await api.post('/bookings', bookingData);
      }
      
      fetchBookings();
      setShowForm(false);
      setEditingBooking(null);
    } catch (err) {
      setError('Failed to save booking');
      console.error('Save booking error:', err);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        setLoading(true);
        setError(null);
        await api.delete(`/bookings/${id}`);
        fetchBookings();
      } catch (err) {
        setError('Failed to delete booking');
        console.error('Delete booking error:', err);
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#323c42' }}>
          Booking Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingBooking(null);
            setShowForm(true);
          }}
          sx={{ 
            bgcolor: '#323c42',
            '&:hover': { bgcolor: '#2a3338' }
          }}
        >
          Add New Booking
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {showForm && (
        <Box sx={{ mb: 4 }}>
          <BookingForm 
            booking={editingBooking} 
            onSave={handleSave} 
            onCancel={() => {
              setShowForm(false);
              setEditingBooking(null);
            }} 
          />
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <BookingCalendar bookings={bookings} />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#323c42' }}>
          All Bookings
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <BookingsTable 
            bookings={bookings} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </Box>
    </Container>
  );
}
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { 
  mockRooms, 
  formatKES,
  calculateBookingTotal,
  initialBookingState
} from '../../data/hotelData';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(initialBookingState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const room = mockRooms.find(r => r.id === id);

  if (!room) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Room not found
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Back to Home
        </Button>
      </Container>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.checkIn || !bookingData.checkOut) {
      setError('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Date validation
    if (new Date(bookingData.checkOut) <= new Date(bookingData.checkIn)) {
      setError('Check-out date must be after check-in date');
      return;
    }

    // Guest validation
    const totalGuests = parseInt(bookingData.adults) + parseInt(bookingData.children);
    if (totalGuests > room.maxGuests) {
      setError(`This room accommodates maximum ${room.maxGuests} guests`);
      return;
    }

    // If all validations pass
    setError('');
    console.log('Booking data:', { room, ...bookingData });
    setSuccess(true);

    // Simulate successful booking
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const bookingTotal = calculateBookingTotal(
    room, 
    bookingData.checkIn, 
    bookingData.checkOut
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Button
        component={Link}
        to={`/rooms/${room.id}`}
        startIcon={<ArrowBackIcon />}
        variant="text"
        sx={{ mb: 2, color: 'text.secondary' }}
      >
        Back to Room Details
      </Button>

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
        Book Your Stay
      </Typography>

      {success ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h4" sx={{ mb: 2, color: 'success.main', fontWeight: 600 }}>
            Booking Confirmed!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
            Thank you for your reservation. A confirmation has been sent to {bookingData.email}.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
          >
            Back to Home
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Guest Information
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        required 
                        fullWidth 
                        label="First Name" 
                        name="firstName" 
                        value={bookingData.firstName} 
                        onChange={handleChange} 
                        size="small" 
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        required 
                        fullWidth 
                        label="Last Name" 
                        name="lastName" 
                        value={bookingData.lastName} 
                        onChange={handleChange} 
                        size="small" 
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        required 
                        fullWidth 
                        label="Email" 
                        name="email" 
                        type="email" 
                        value={bookingData.email} 
                        onChange={handleChange} 
                        size="small" 
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        fullWidth 
                        label="Phone" 
                        name="phone" 
                        value={bookingData.phone} 
                        onChange={handleChange} 
                        size="small" 
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        required 
                        fullWidth 
                        label="Check-in" 
                        name="checkIn" 
                        type="date" 
                        InputLabelProps={{ shrink: true }} 
                        value={bookingData.checkIn} 
                        onChange={handleChange} 
                        size="small" 
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        required 
                        fullWidth 
                        label="Check-out" 
                        name="checkOut" 
                        type="date" 
                        InputLabelProps={{ shrink: true }} 
                        value={bookingData.checkOut} 
                        onChange={handleChange} 
                        size="small" 
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Adults</InputLabel>
                        <Select 
                          name="adults" 
                          value={bookingData.adults} 
                          onChange={handleChange} 
                          label="Adults"
                        >
                          {[1, 2, 3, 4, 5].map(num => 
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Children</InputLabel>
                        <Select 
                          name="children" 
                          value={bookingData.children} 
                          onChange={handleChange} 
                          label="Children"
                        >
                          {[0, 1, 2, 3, 4].map(num => 
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        multiline 
                        rows={3} 
                        label="Special Requests" 
                        name="specialRequests" 
                        value={bookingData.specialRequests} 
                        onChange={handleChange} 
                        size="small" 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        size="large" 
                        sx={{ mt: 1 }}
                      >
                        Complete Booking
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Booking Summary
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ width: 80, height: 80, borderRadius: 1.5, overflow: 'hidden', mr: 2, flexShrink: 0 }}>
                      <img src={room.image} alt={room.type} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{room.type} Room</Typography>
                      <Typography variant="body2" color="text.secondary">Max Guests: {room.maxGuests}</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>{formatKES(room.price)}</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  {bookingTotal ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{formatKES(room.price)} x {bookingTotal.nights} {bookingTotal.nights === 1 ? 'night' : 'nights'}</Typography>
                        <Typography variant="body2">{formatKES(bookingTotal.subtotal)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Taxes & Fees (16%)</Typography>
                        <Typography variant="body2">{formatKES(bookingTotal.tax)}</Typography>
                      </Box>
                      <Divider sx={{ my: 1.5 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{formatKES(bookingTotal.total)}</Typography>
                      </Box>
                    </>
                  ) : (
                    <Typography color="text.secondary" variant="body2" align="center">
                      Select your dates to see the total price.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookingForm;
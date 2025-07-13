import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { 
  Hotel as HotelIcon,
  Bed as BedIcon,
  EventAvailable as EventAvailableIcon,
  MonetizationOn as MonetizationOnIcon
} from '@mui/icons-material';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookingsToday: 0,
    revenue: 0,
    maintenanceRooms: 0,
    reservedRooms: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsResponse = await api.get('/dashboard/stats');
        const bookingsResponse = await api.get('/bookings?limit=5');
        
        setStats(statsResponse.data);
        setRecentBookings(bookingsResponse.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const StatCard = ({ title, value, icon }) => (
    <Card sx={{ height: '100%', bgcolor: '#ffffff' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="#6d8791" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" color="#323c42" fontWeight={700}>
              {value}
            </Typography>
          </Box>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: '#e9c4d6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Typography variant="body1">
          Please try refreshing the page or check your connection
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700, color: '#323c42' }}>
        Dashboard
      </Typography>
      
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Total Rooms" 
                value={stats.totalRooms} 
                icon={<HotelIcon sx={{ color: '#323c42' }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Available Rooms" 
                value={stats.availableRooms} 
                icon={<BedIcon sx={{ color: '#323c42' }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Today's Bookings" 
                value={stats.bookingsToday} 
                icon={<EventAvailableIcon sx={{ color: '#323c42' }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Revenue" 
                value={`$${stats.revenue.toLocaleString()}`} 
                icon={<MonetizationOnIcon sx={{ color: '#323c42' }} />}
              />
            </Grid>
          </Grid>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Card sx={{ mb: 3, bgcolor: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#323c42' }}>
                    Recent Bookings
                  </Typography>
                  {recentBookings.length > 0 ? (
                    <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none', bgcolor: 'transparent' }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Guest</TableCell>
                            <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Room</TableCell>
                            <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Dates</TableCell>
                            <TableCell align="center" sx={{ color: '#6d8791', fontWeight: 600 }}>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recentBookings.map(booking => (
                            <TableRow key={booking._id}>
                              <TableCell>
                                <Typography variant="subtitle2" color="#323c42">{booking.guestName}</Typography>
                                <Typography variant="body2" color="#6d8791">{booking.guestEmail}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" color="#323c42">
                                  {booking.room ? `Room ${booking.room.roomNumber}` : 'Not assigned'}
                                </Typography>
                                <Typography variant="body2" color="#6d8791" sx={{ textTransform: 'capitalize' }}>
                                  {booking.room?.type || 'Unknown'}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" color="#323c42">
                                  {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Chip 
                                  label={booking.status} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: '#e9c4d6',
                                    color: '#323c42',
                                    fontWeight: 500
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography variant="body1" color="#6d8791" sx={{ py: 2 }}>
                      No recent bookings found
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Card sx={{ bgcolor: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#323c42' }}>
                    Room Status
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        bgcolor: '#323c42', 
                        p: 2, 
                        borderRadius: 2,
                        textAlign: 'center'
                      }}>
                        <Typography variant="h4" color="#ede6e6">
                          {stats.totalRooms - stats.availableRooms}
                        </Typography>
                        <Typography variant="body2" color="#6d8791">
                          Occupied
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        bgcolor: '#6d8791', 
                        p: 2, 
                        borderRadius: 2,
                        textAlign: 'center'
                      }}>
                        <Typography variant="h4" color="#ede6e6">
                          {stats.maintenanceRooms}
                        </Typography>
                        <Typography variant="body2" color="#e9c4d6">
                          Maintenance
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        bgcolor: '#ede6e6', 
                        p: 2, 
                        borderRadius: 2,
                        textAlign: 'center',
                        border: '1px solid #6d8791'
                      }}>
                        <Typography variant="h4" color="#323c42">
                          {stats.availableRooms}
                        </Typography>
                        <Typography variant="body2" color="#6d8791">
                          Available
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        bgcolor: '#e9c4d6', 
                        p: 2, 
                        borderRadius: 2,
                        textAlign: 'center'
                      }}>
                        <Typography variant="h4" color="#323c42">
                          {stats.reservedRooms}
                        </Typography>
                        <Typography variant="body2" color="#323c42">
                          Reserved
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
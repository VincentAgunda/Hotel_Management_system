import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layouts
import AdminLayout from './components/layout/AdminLayout';
import GuestLayout from './components/layout/GuestLayout';

// Guest pages
import GuestHomepage from './pages/guest/GuestHomepage';
import RoomDetail from './pages/guest/RoomDetail';
import BookingForm from './pages/guest/BookingForm';

// Admin pages
import Dashboard from './pages/Dashboard';
import AdminRooms from './pages/Rooms';
import AdminBookings from './pages/Bookings';
import AdminGuests from './pages/Guests';
import AdminStaff from './pages/Staff';
import AdminRoomDetail from './pages/Rooms/RoomDetail';
import AdminBookingDetail from './pages/Bookings/BookingDetail';

// Auth
import Login from './pages/Login';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#323c42',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e9c4d6',
      contrastText: '#323c42'
    },
    background: {
      default: '#f8f9fa'
    }
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem'
    },
    body1: {
      fontSize: '1rem'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          padding: '10px 20px'
        },
        containedPrimary: {
          backgroundColor: '#323c42',
          '&:hover': {
            backgroundColor: '#2a3338',
          }
        },
        containedSecondary: {
          backgroundColor: '#e9c4d6',
          color: '#323c42',
          '&:hover': {
            backgroundColor: '#dbb1c5',
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
          }
        }
      }
    }
  }
});

// Mock authentication context
const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  
  const login = (userData) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Guest routes */}
          <Route element={<GuestLayout />}>
            <Route path="/" element={<GuestHomepage />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            {/* Fixed route parameter to match links */}
            <Route path="/book/:id" element={<BookingForm />} />
          </Route>
          
          {/* Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="rooms/:id" element={<AdminRoomDetail />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="bookings/:id" element={<AdminBookingDetail />} />
            <Route path="guests" element={<AdminGuests />} />
            <Route path="staff" element={<AdminStaff />} />
          </Route>
          
          {/* Redirect to home for unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
export { AuthContext };
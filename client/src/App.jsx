import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import Dashboard from './pages/Dashboard.jsx';
import Rooms from './pages/Rooms/index.jsx';
import Bookings from './pages/Bookings/index.jsx';
import Guests from './pages/Guests.jsx';
import Staff from './pages/Staff.jsx';
import Login from './pages/Login.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import RoomDetail from './pages/Rooms/RoomDetail.jsx';
import BookingDetail from './pages/Bookings/BookingDetail.jsx';

// Custom theme with your color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#323c42', // Dark blue-gray
      light: '#6d8791', // Medium blue-gray
      contrastText: '#ede6e6' // Light beige
    },
    secondary: {
      main: '#e9c4d6', // Light pink
      contrastText: '#323c42'
    },
    background: {
      default: '#ede6e6', // Light beige
      paper: '#ffffff'
    },
    text: {
      primary: '#323c42', // Dark blue-gray
      secondary: '#6d8791' // Medium blue-gray
    }
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h5: {
      fontWeight: 700,
      color: '#323c42'
    },
    h6: {
      fontWeight: 600,
      color: '#323c42'
    },
    body1: {
      color: '#323c42'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ede6e6',
          color: '#323c42',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#6d879120 !important',
          }
        }
      }
    }
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            transition: 'margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            marginLeft: sidebarOpen ? '240px' : '0px',
            width: sidebarOpen ? 'calc(100% - 240px)' : '100%',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="xl" sx={{ py: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomDetail />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:id" element={<BookingDetail />} />
              <Route path="/guests" element={<Guests />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
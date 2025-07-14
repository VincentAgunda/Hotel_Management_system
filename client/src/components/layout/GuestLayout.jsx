// src/layout/GuestLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const GuestLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                flexGrow: 1, 
                textDecoration: 'none', 
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}
            >
              LuxeStay Hotel
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button 
                component={Link} 
                to="/" 
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                Home
              </Button>
              <Button 
                component={Link} 
                to="/" 
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                Rooms
              </Button>
              <Button 
                component={Link} 
                to="/" 
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                Contact
              </Button>
              <Button 
                component={Link} 
                to="/login"
                startIcon={<AccountCircleIcon />}
                variant="outlined"
                sx={{ 
                  borderColor: 'primary.main', 
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(50, 60, 66, 0.05)',
                    borderColor: 'primary.dark'
                  }
                }}
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Main Content */}
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Box>
      
      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                LuxeStay Hotel
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 300 }}>
                Luxury accommodation with world-class amenities and exceptional service for the discerning traveler.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Contact Us
              </Typography>
              <Typography variant="body2">
                123 Luxury Avenue, Prestige District
              </Typography>
              <Typography variant="body2">
                Phone: +1 (555) 123-4567
              </Typography>
              <Typography variant="body2">
                Email: info@luxestayhotel.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Quick Links
              </Typography>
              <Button component={Link} to="/" sx={{ color: 'white', display: 'block', textAlign: 'left' }}>
                Home
              </Button>
              <Button component={Link} to="/" sx={{ color: 'white', display: 'block', textAlign: 'left' }}>
                Our Rooms
              </Button>
              <Button component={Link} to="/" sx={{ color: 'white', display: 'block', textAlign: 'left' }}>
                Contact
              </Button>
              <Button component={Link} to="/login" sx={{ color: 'white', display: 'block', textAlign: 'left' }}>
                Admin Login
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="body2" align="center">
              © {new Date().getFullYear()} LuxeStay Hotel. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default GuestLayout;
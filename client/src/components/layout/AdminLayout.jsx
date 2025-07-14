// src/layout/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Container } from '@mui/material';
import Navbar from '../admin/Navbar';
import Sidebar from '../admin/Sidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
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
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;
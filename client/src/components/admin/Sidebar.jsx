import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Box,
  Typography // Added missing import
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BedIcon from '@mui/icons-material/Bed';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
  { name: 'Rooms', path: '/admin/rooms', icon: <BedIcon /> },
  { name: 'Bookings', path: '/admin/bookings', icon: <CalendarTodayIcon /> },
  { name: 'Guests', path: '/admin/guests', icon: <PeopleIcon /> },
  { name: 'Staff', path: '/admin/staff', icon: <BadgeIcon /> },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          borderRight: 'none',
          backgroundColor: '#f8f9fa',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ 
          bgcolor: '#323c42', 
          width: 40, 
          height: 40, 
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2
        }}>
          <BedIcon sx={{ color: '#ede6e6' }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#323c42' }}>
          Hotel Admin
        </Typography>
      </Box>
      <Divider />
      
      <List sx={{ mt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                borderRadius: 1,
                mx: 1,
                '&.active': {
                  bgcolor: '#e9c4d6',
                  color: '#323c42',
                  '& .MuiListItemIcon-root': {
                    color: '#323c42',
                  },
                },
                '&:hover': {
                  bgcolor: '#6d879120',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: '#6d8791' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ 
                  style: { 
                    fontWeight: 500,
                    color: '#323c42'
                  } 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
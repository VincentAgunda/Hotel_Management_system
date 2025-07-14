import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Link } from 'react-router-dom';

// Format currency for Kenyan Shillings
const formatKES = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(amount);
};

const roomTypes = ['All', 'Single', 'Double', 'Suite', 'Deluxe', 'Presidential'];
const amenities = ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Hairdryer', 'Balcony'];

// Mock room data with prices in KES
const mockRooms = [
  {
    id: '101',
    type: 'Deluxe',
    description: 'Spacious room with king-size bed and city view',
    price: 199 * 130,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe'],
    image: '/deluxe-room.jpg'
  },
  {
    id: '102',
    type: 'Suite',
    description: 'Luxurious suite with separate living area and jacuzzi',
    price: 299 * 130,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Hairdryer', 'Balcony'],
    image: '/suite-room.jpg'
  },
  {
    id: '103',
    type: 'Single',
    description: 'Cozy room perfect for solo travelers',
    price: 99 * 130,
    amenities: ['WiFi', 'TV', 'AC'],
    image: '/single-room.jpg'
  },
  {
    id: '104',
    type: 'Double',
    description: 'Comfortable room with two queen beds',
    price: 149 * 130,
    amenities: ['WiFi', 'TV', 'AC', 'Safe'],
    image: '/double-room.jpg'
  },
  {
    id: '105',
    type: 'Presidential',
    description: 'Ultimate luxury with panoramic views and premium amenities',
    price: 599 * 130,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Hairdryer', 'Balcony'],
    image: '/presidential-room.jpg'
  },
  {
    id: '106',
    type: 'Double',
    description: 'Modern room with city skyline views',
    price: 159 * 130,
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Hairdryer'],
    image: '/double-room-2.jpg'
  }
];

const GuestHomepage = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const [filteredRooms, setFilteredRooms] = useState(mockRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Filter rooms based on search, type, and amenities
  useEffect(() => {
    let result = rooms;
    
    if (searchTerm) {
      result = result.filter(room => 
        room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedType !== 'All') {
      result = result.filter(room => room.type === selectedType);
    }
    
    if (selectedAmenities.length > 0) {
      result = result.filter(room => 
        selectedAmenities.every(amenity => room.amenities.includes(amenity))
      );
    }
    
    setFilteredRooms(result);
  }, [searchTerm, selectedType, selectedAmenities, rooms]);

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      {/* Compact Hero Section */}
      <Box sx={{ 
        bgcolor: 'rgba(50, 60, 66, 0.05)', 
        borderRadius: 2,
        p: 3,
        mb: 3,
        textAlign: 'center',
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
          Welcome to LuxeStay Hotel
        </Typography>
        <Typography variant="subtitle1" component="p" sx={{ mb: 2, mx: 'auto' }}>
          Luxury rooms with premium amenities
        </Typography>
        
        <Box sx={{ 
          maxWidth: 800, 
          mx: 'auto', 
          bgcolor: 'white', 
          p: 2, 
          borderRadius: 2, 
          boxShadow: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 1
        }}>
          <TextField
            label="Check-in"
            type="date"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Check-out"
            type="date"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Guests</InputLabel>
            <Select label="Guests" defaultValue={2}>
              <MenuItem value={1}>1 Guest</MenuItem>
              <MenuItem value={2}>2 Guests</MenuItem>
              <MenuItem value={3}>3 Guests</MenuItem>
              <MenuItem value={4}>4 Guests</MenuItem>
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            color="primary" 
            size="medium"
            sx={{ minWidth: '100px' }}
          >
            Search
          </Button>
        </Box>
      </Box>
      
      {/* Room Filters */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
          Find Your Perfect Room
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1, mb: 1 }}>
          <TextField
            placeholder="Search rooms..."
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />
          
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Room Type</InputLabel>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              label="Room Type"
            >
              {roomTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mb: 0.5 }}>
            Filter by Amenities:
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {amenities.map(amenity => (
              <Chip
                key={amenity}
                label={amenity}
                clickable
                size="small"
                color={selectedAmenities.includes(amenity) ? 'primary' : 'default'}
                onClick={() => toggleAmenity(amenity)}
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Stack>
        </Box>
      </Box>
      
      {/* Room Listing with 3 columns */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
        Our Rooms
      </Typography>
      
      {filteredRooms.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            No rooms match your filters
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => {
              setSearchTerm('');
              setSelectedType('All');
              setSelectedAmenities([]);
            }}
          >
            Clear Filters
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredRooms.map(room => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 1 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={room.image}
                  alt={room.type}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, py: 1, px: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700 }}>
                      {room.type}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {formatKES(room.price)}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
                    {room.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                    {room.amenities.map(amenity => (
                      <Chip 
                        key={amenity} 
                        label={amenity} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'rgba(233, 196, 214, 0.3)',
                          color: 'primary.main',
                          fontSize: '0.7rem',
                          height: 22
                        }} 
                      />
                    ))}
                  </Box>
                </CardContent>
                
                <Box sx={{ p: 1, pt: 0, display: 'flex', gap: 1 }}>
                  <Button 
                    component={Link} 
                    to={`/rooms/${room.id}`}
                    variant="outlined" 
                    size="small"
                    sx={{ flex: 1 }}
                  >
                    Details
                  </Button>
                  <Button 
                    component={Link} 
                    to={`/book/${room.id}`}
                    variant="contained" 
                    color="primary" 
                    size="small"
                    sx={{ flex: 1 }}
                  >
                    Book
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Compact Hotel Features */}
      <Box sx={{ mt: 4, bgcolor: 'rgba(50, 60, 66, 0.03)', p: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
          Why Choose LuxeStay?
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', px: 1 }}>
              <BedIcon sx={{ fontSize: 30, color: 'primary.main', mb: 0.5 }} />
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                Premium Comfort
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                Luxurious bedding for ultimate relaxation
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', px: 1 }}>
              <WifiIcon sx={{ fontSize: 30, color: 'primary.main', mb: 0.5 }} />
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                High-Speed WiFi
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                Complimentary high-speed internet
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', px: 1 }}>
              <BathtubIcon sx={{ fontSize: 30, color: 'primary.main', mb: 0.5 }} />
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                Luxury Bathrooms
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                Premium toiletries and plush towels
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', px: 1 }}>
              <AcUnitIcon sx={{ fontSize: 30, color: 'primary.main', mb: 0.5 }} />
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                Climate Control
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                Personalized temperature settings
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default GuestHomepage;
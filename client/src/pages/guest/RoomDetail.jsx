import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  CardMedia,
  Rating,
  Stack,
  Chip
} from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// --- DATA ---
const mockRooms = [
  {
    id: '101',
    type: 'Deluxe',
    description: 'Spacious room with king-size bed and city view.',
    price: 25870, // 199 * 130
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe'],
    image: '/deluxe-room.jpg',
    size: '450 sq ft',
    beds: '1 King Bed',
    maxGuests: 2,
    details: 'Our Deluxe Rooms offer a perfect blend of comfort and style. Featuring floor-to-ceiling windows with stunning city views, a plush king-size bed with premium linens, and a spacious marble bathroom with a rainfall shower.',
    images: ['/deluxe-room-1.jpg', '/deluxe-room-2.jpg', '/deluxe-room-3.jpg', '/deluxe-bathroom.jpg'],
    rating: 4.7,
    reviews: 128,
  },
  {
    id: '102',
    type: 'Suite',
    description: 'Luxurious suite with a separate living area and jacuzzi.',
    price: 38870, // 299 * 130
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Safe', 'Hairdryer', 'Balcony'],
    image: '/suite-room.jpg',
    size: '800 sq ft',
    beds: '1 King Bed',
    maxGuests: 3,
    details: 'Experience ultimate luxury in our spacious suites featuring a separate living area, dining space, and a private balcony. The bedroom features a king-size bed, and the luxurious bathroom includes a deep soaking tub.',
    images: ['/suite-room-1.jpg', '/suite-room-2.jpg', '/suite-room-3.jpg', '/suite-bathroom.jpg'],
    rating: 4.9,
    reviews: 94,
  }
];

// --- UTILITY FUNCTION ---
const formatKES = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(amount);
};

// --- SUB-COMPONENTS ---
const RoomGallery = ({ room }) => (
  <>
    <CardMedia
      component="img"
      height="500"
      image={room.image}
      alt={room.type}
      sx={{ borderRadius: 3, objectFit: 'cover' }}
    />
    <Box sx={{ mt: 2, display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
      {room.images.map((img, index) => (
        <CardMedia
          key={index}
          component="img"
          height="100"
          image={img}
          alt={`Room view ${index + 1}`}
          sx={{
            width: 150,
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
        />
      ))}
    </Box>
  </>
);

const features = [
  { icon: <BedIcon color="primary" sx={{ mr: 1 }} />, label: (room) => room.beds },
  { icon: <BathtubIcon color="primary" sx={{ mr: 1 }} />, label: () => 'Marble bathroom' },
  { icon: <WifiIcon color="primary" sx={{ mr: 1 }} />, label: () => 'Free WiFi' },
  { icon: <AcUnitIcon color="primary" sx={{ mr: 1 }} />, label: () => 'Climate control' },
  { icon: <PoolIcon color="primary" sx={{ mr: 1 }} />, label: () => 'Pool access' },
  { icon: <FitnessCenterIcon color="primary" sx={{ mr: 1 }} />, label: () => 'Gym access' },
];

const BookingCard = ({ room }) => (
  <Box sx={{ position: 'sticky', top: 100, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
      {formatKES(room.price)}
      <Typography component="span" variant="body1" color="text.secondary"> / night</Typography>
    </Typography>
    
    <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
      <Rating value={room.rating} precision={0.1} readOnly sx={{ mr: 1 }} />
      <Typography variant="body2" color="text.secondary">
        {room.rating} ({room.reviews} reviews)
      </Typography>
    </Box>

    <Typography variant="body1" sx={{ mb: 3 }}>
      {room.description}
    </Typography>

    <Grid container spacing={2} sx={{ mb: 3 }}>
      {features.map((feature, index) => (
        <Grid item xs={6} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          {feature.icon}
          <Typography variant="body2">{feature.label(room)}</Typography>
        </Grid>
      ))}
    </Grid>

    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
      {room.amenities.map(amenity => (
        <Chip key={amenity} label={amenity} size="small" variant="outlined" color="primary" />
      ))}
    </Stack>

    <Button component={Link} to={`/book/${room.id}`} variant="contained" fullWidth size="large">
      Book Now
    </Button>
  </Box>
);


// --- MAIN PAGE COMPONENT ---
const RoomDetail = () => {
  const { id } = useParams();
  const room = mockRooms.find(r => r.id === id);

  if (!room) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4">Room not found</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
        {room.type} Room
      </Typography>
      
      <Button component={Link} to="/" variant="text" sx={{ mb: 3 }}>
        &larr; Back to all rooms
      </Button>

      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <RoomGallery room={room} />
          <Divider sx={{ my: 4 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            About this room
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
            {room.details}
          </Typography>
        </Grid>

        <Grid item xs={12} md={5}>
          <BookingCard room={room} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoomDetail;
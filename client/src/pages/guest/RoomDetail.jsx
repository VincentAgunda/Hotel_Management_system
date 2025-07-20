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
import {
  mockRooms,
  formatKES,
  features
} from '../../data/hotelData';

const RoomGallery = ({ room }) => (
  <>
    {/* Main image - Reduced height and potentially max-height for responsiveness */}
    <CardMedia
      component="img"
      height="300" // **Reduced height from 500 to 300**
      // You could also use maxHeight for responsiveness, e.g., sx={{ maxHeight: { xs: 200, sm: 300, md: 400 }, borderRadius: 3, objectFit: 'cover' }}
      image={room.image}
      alt={room.type}
      sx={{ borderRadius: 3, objectFit: 'cover', width: '100%' }} // Added width: '100%' for good measure
    />
    {/* Gallery of smaller images */}
    <Box sx={{ mt: 2, overflowX: 'hidden', pb: 2 }}> {/* Changed overflowX to 'hidden' */}
      <Grid container spacing={1}>
        {room.images.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <CardMedia
              component="img"
              height="100"
              image={img}
              alt={`Room view ${index + 1}`}
              sx={{
                width: '100%',
                borderRadius: 2,
                cursor: 'pointer',
                objectFit: 'cover',
                '&:hover': { opacity: 0.8 }
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  </>
);

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
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Grid item xs={6} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon color={feature.color} sx={{ mr: 1 }} />
            <Typography variant="body2">{feature.label(room)}</Typography>
          </Grid>
        );
      })}
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
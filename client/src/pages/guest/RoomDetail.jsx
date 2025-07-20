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
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  mockRooms,
  formatKES,
  features
} from '../../data/hotelData';

const RoomGallery = ({ room }) => (
  <>
    <CardMedia
      component="img"
      height="400"
      image={room.image}
      alt={room.type}
      sx={{ borderRadius: 3, objectFit: 'cover', width: '100%', mb: 2 }}
    />

    <Typography variant="h6" sx={{ mb: 1 }}>
      More Photos
    </Typography>

    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 1,
        pb: 2
      }}
    >
      {room.images.map((img, index) => (
        <CardMedia
          key={index}
          component="img"
          image={img}
          alt={`Room view ${index + 1}`}
          sx={{
            width: '100%',
            height: 100,
            borderRadius: 2,
            cursor: 'pointer',
            objectFit: 'cover',
            transition: '0.3s',
            '&:hover': { opacity: 0.85 }
          }}
        />
      ))}
    </Box>
  </>
);

const BookingCard = ({ room }) => (
  <Box
    sx={{
      position: 'sticky',
      top: 100,
      p: 3,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      bgcolor: 'background.paper',
      boxShadow: 2
    }}
  >
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

    <Divider sx={{ my: 2 }} />

    <Typography variant="body1" sx={{ mb: 2 }}>
      {room.description}
    </Typography>

    <Grid container spacing={2} sx={{ mb: 3 }}>
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Grid item xs={6} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={feature.label(room)}>
              <Icon color={feature.color} sx={{ mr: 1 }} />
            </Tooltip>
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

    <Button
      component={Link}
      to={`/book/${room.id}`}
      variant="contained"
      fullWidth
      size="large"
      sx={{ mt: 2 }}
    >
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton component={Link} to="/" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Back to All Rooms
        </Typography>
      </Box>

      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
        {room.type} Room
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <RoomGallery room={room} />
          <Divider sx={{ my: 4 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            About This Room
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

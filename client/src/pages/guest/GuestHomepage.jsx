import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
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
import WifiIcon from '@mui/icons-material/Wifi';
import BathtubIcon from '@mui/icons-material/Bathtub';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Link } from 'react-router-dom';
import { 
  mockRooms, 
  formatKES, 
  amenities, 
  roomTypes 
} from '../../data/hotelData';

const GuestHomepage = () => {
  const [filteredRooms, setFilteredRooms] = useState(mockRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    let result = mockRooms;

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
  }, [searchTerm, selectedType, selectedAmenities]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ?
      prev.filter(a => a !== amenity) :
      [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedAmenities([]);
  };

  const halfPoint = Math.ceil(filteredRooms.length / 2);
  const firstHalfRooms = filteredRooms.slice(0, halfPoint);
  const secondHalfRooms = filteredRooms.slice(halfPoint);

  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <Box sx={{
        bgcolor: 'rgba(50, 60, 66, 0.05)',
        borderRadius: 2,
        p: 2,
        mb: 2,
        textAlign: 'center',
      }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          LuxeStay Hotel
        </Typography>
        <Typography variant="subtitle2" component="p" sx={{ mb: 2 }}>
          Luxury rooms with premium amenities
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
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
              ),
              sx: { height: 40 }
            }}
          />

          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Room Type</InputLabel>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              label="Room Type"
              sx={{ height: 40 }}
            >
              {roomTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.8rem' }}>
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
                sx={{ fontSize: '0.7rem', height: 26, mb: 0.5 }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Our Rooms
        </Typography>
        {(searchTerm || selectedType !== 'All' || selectedAmenities.length > 0) && (
          <Button
            variant="text"
            size="small"
            onClick={clearFilters}
            sx={{ fontSize: '0.75rem' }}
          >
            Clear Filters
          </Button>
        )}
      </Box>

      {filteredRooms.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            No rooms match your filters
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'flex-start',
              margin: '-6px',
              mb: 2,
            }}
          >
            {firstHalfRooms.map(room => (
              <Box
                key={room.id}
                sx={{
                  flexGrow: 1,
                  flexShrink: 0,
                  flexBasis: {
                    xs: 'calc(50% - 6px)',
                    sm: 'calc(33.333% - 8px)',
                    md: 'calc(25% - 9px)',
                    lg: 'calc(20% - 9.6px)',
                  },
                  maxWidth: {
                    xs: 'calc(50% - 6px)',
                    sm: 'calc(33.333% - 8px)',
                    md: 'calc(25% - 9px)',
                    lg: 'calc(20% - 9.6px)',
                  },
                  padding: '6px',
                  boxSizing: 'border-box'
                }}
              >
                <Card sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  boxShadow: 0,
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 1.5,
                  height: '100%',
                }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={room.image}
                    alt={room.type}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 1, pb: 0, minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" component="h3" sx={{ fontWeight: 700 }}>
                        {room.type}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {formatKES(room.price)}
                      </Typography>
                    </Box>

                    <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.2, display: 'block', mt: 0.5 }}>
                      {room.description}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                      {room.amenities.slice(0, 3).map(amenity => (
                        <Chip
                          key={amenity}
                          label={amenity}
                          size="small"
                          sx={{
                            fontSize: '0.6rem',
                            height: 20,
                            padding: '0 2px',
                            bgcolor: 'rgba(233, 196, 214, 0.2)',
                            color: 'primary.dark'
                          }}
                        />
                      ))}
                      {room.amenities.length > 3 && (
                        <Chip
                          label={`+${room.amenities.length - 3}`}
                          size="small"
                          sx={{
                            fontSize: '0.6rem',
                            height: 20,
                            padding: '0 2px',
                            bgcolor: 'rgba(0,0,0,0.05)'
                          }}
                        />
                      )}
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 0.5, display: 'flex', gap: 0.5 }}>
                    <Button
                      component={Link}
                      to={`/rooms/${room.id}`}
                      variant="outlined"
                      size="small"
                      sx={{
                        flex: 1,
                        fontSize: '0.65rem',
                        py: 0.25,
                        minWidth: 0
                      }}
                    >
                      Details
                    </Button>
                    <Button
                      component={Link}
                      to={`/book/${room.id}`}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        flex: 1,
                        fontSize: '0.65rem',
                        py: 0.25,
                        minWidth: 0
                      }}
                    >
                      Book
                    </Button>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>

          {secondHalfRooms.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'flex-start',
                margin: '-6px',
                mt: 2,
              }}
            >
              {secondHalfRooms.map(room => (
                <Box
                  key={room.id}
                  sx={{
                    flexGrow: 1,
                    flexShrink: 0,
                    flexBasis: {
                      xs: 'calc(50% - 6px)',
                      sm: 'calc(33.333% - 8px)',
                      md: 'calc(25% - 9px)',
                      lg: 'calc(20% - 9.6px)',
                    },
                    maxWidth: {
                      xs: 'calc(50% - 6px)',
                      sm: 'calc(33.333% - 8px)',
                      md: 'calc(25% - 9px)',
                      lg: 'calc(20% - 9.6px)',
                    },
                    padding: '6px',
                    boxSizing: 'border-box'
                  }}
                >
                  <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: 0,
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 1.5,
                    height: '100%',
                  }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={room.image}
                      alt={room.type}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 1, pb: 0, minHeight: '120px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" component="h3" sx={{ fontWeight: 700 }}>
                          {room.type}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {formatKES(room.price)}
                        </Typography>
                      </Box>

                      <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.2, display: 'block', mt: 0.5 }}>
                        {room.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                        {room.amenities.slice(0, 3).map(amenity => (
                          <Chip
                            key={amenity}
                            label={amenity}
                            size="small"
                            sx={{
                              fontSize: '0.6rem',
                              height: 20,
                              padding: '0 2px',
                              bgcolor: 'rgba(233, 196, 214, 0.2)',
                              color: 'primary.dark'
                            }}
                          />
                        ))}
                        {room.amenities.length > 3 && (
                          <Chip
                            label={`+${room.amenities.length - 3}`}
                            size="small"
                            sx={{
                              fontSize: '0.6rem',
                              height: 20,
                              padding: '0 2px',
                              bgcolor: 'rgba(0,0,0,0.05)'
                            }}
                          />
                        )}
                      </Box>
                    </CardContent>

                    <Box sx={{ p: 0.5, display: 'flex', gap: 0.5 }}>
                      <Button
                        component={Link}
                        to={`/rooms/${room.id}`}
                        variant="outlined"
                        size="small"
                        sx={{
                          flex: 1,
                          fontSize: '0.65rem',
                          py: 0.25,
                          minWidth: 0
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        component={Link}
                        to={`/book/${room.id}`}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          flex: 1,
                          fontSize: '0.65rem',
                          py: 0.25,
                          minWidth: 0
                        }}
                      >
                        Book
                      </Button>
                    </Box>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}

      <Box sx={{ mt: 3, bgcolor: 'rgba(50, 60, 66, 0.03)', p: 2, borderRadius: 2 }}>
        <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 700, mb: 1.5 }}>
          Why Choose LuxeStay?
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            margin: '-4px'
          }}
        >
          <Box sx={{
            flexGrow: 1, flexShrink: 0,
            flexBasis: {
              xs: 'calc(50% - 4px)',
              sm: 'calc(33.333% - 5.33px)',
              md: 'calc(25% - 6px)'
            },
            maxWidth: {
              xs: 'calc(50% - 4px)',
              sm: 'calc(33.333% - 5.33px)',
              md: 'calc(25% - 6px)'
            },
            padding: '4px',
            boxSizing: 'border-box',
            textAlign: 'center', px: 0.5
          }}>
            <BedIcon sx={{ fontSize: 24, color: 'primary.main', mb: 0.25 }} />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
              Premium Comfort
            </Typography>
          </Box>

          <Box sx={{
            flexGrow: 1, flexShrink: 0,
            flexBasis: {
              xs: 'calc(50% - 4px)',
              sm: 'calc(33.333% - 5.33px)',
              md: 'calc(25% - 6px)'
            },
            maxWidth: {
              xs: 'calc(50% - 4px)',
              sm: 'calc(33.333% - 5.33px)',
              md: 'calc(25% - 6px)'
            },
            padding: '4px',
            boxSizing: 'border-box',
            textAlign: 'center', px: 0.5
          }}>
            <WifiIcon sx={{ fontSize: 24, color: 'primary.main', mb: 0.25 }} />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
              High-Speed WiFi
            </Typography>
          </Box>

          <Box sx={{
            flexGrow: 1, flexShrink: 0,
            flexBasis: {
              xs: 'calc(50% - 4px)',
              sm: 'calc(33.333% - 5.33px)',
              md: 'calc(25% - 6px)'
            },
            maxWidth: {
              xs: 'calc(50% - 4px)',
              sm: 'calc(33.333% - 5.33px)',
              md: 'calc(25% - 6px)'
            },
            padding: '4px',
            boxSizing: 'border-box',
            textAlign: 'center', px: 0.5
          }}>
            <BathtubIcon sx={{ fontSize: 24, color: 'primary.main', mb: 0.25 }} />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
              Luxury Bathrooms
            </Typography>
          </Box>

          <Box sx={{
            flexGrow: 1, flexShrink: 0,
            flexBasis: {
              xs: 'calc(50% - 4px)',
              sm: 'calc(33.333% - 5.33px)',
              md: 'calc(25% - 6px)'
            },
            maxWidth: {
              xs: 'calc(50% - 4px)',
              sm: 'calc(33.333% - 5.33px)',
              md: 'calc(25% - 6px)'
            },
            padding: '4px',
            boxSizing: 'border-box',
            textAlign: 'center', px: 0.5
          }}>
            <AcUnitIcon sx={{ fontSize: 24, color: 'primary.main', mb: 0.25 }} />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
              Climate Control
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default GuestHomepage;
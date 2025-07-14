import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/guests');
        setGuests(response.data);
      } catch (err) {
        setError('Failed to load guests');
        console.error('Guests error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGuests();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center', 
        mb: 3,
        gap: isMobile ? 2 : 0
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#323c42' }}>
          Guest Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ 
            bgcolor: '#323c42',
            '&:hover': { bgcolor: '#2a3338' }
          }}
        >
          Add New Guest
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : guests.length === 0 ? (
        <Typography variant="body1" color="#6d8791">
          No guests found
        </Typography>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: 2, 
            overflow: 'auto',
            maxHeight: 'calc(100vh - 200px)'
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f7fa' }}>
                <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Email</TableCell>
                {!isMobile && (
                  <>
                    <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Phone</TableCell>
                    <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Last Stay</TableCell>
                  </>
                )}
                <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guests.map(guest => (
                <TableRow key={guest._id}>
                  <TableCell>
                    <Typography variant="subtitle2" color="#323c42">{guest.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="#323c42">{guest.email}</Typography>
                  </TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>
                        <Typography variant="body2" color="#323c42">{guest.phone || 'N/A'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="#323c42">
                          {guest.lastStay ? new Date(guest.lastStay).toLocaleDateString() : 'Never'}
                        </Typography>
                      </TableCell>
                    </>
                  )}
                  <TableCell>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: isMobile ? 1 : 0
                    }}>
                      <Button sx={{ color: '#323c42' }}>View</Button>
                      <Button sx={{ color: '#323c42' }}>Edit</Button>
                      <Button sx={{ color: '#d32f2f' }}>Delete</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
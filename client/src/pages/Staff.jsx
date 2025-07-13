import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BadgeIcon from '@mui/icons-material/Badge';

export default function Staff() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/users/staff');
        setStaffMembers(response.data);
      } catch (err) {
        setError('Failed to load staff members');
        console.error('Staff error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStaff();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#323c42' }}>
          Staff Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ 
            bgcolor: '#323c42',
            '&:hover': { bgcolor: '#2a3338' }
          }}
        >
          Add Staff Member
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
      ) : staffMembers.length === 0 ? (
        <Typography variant="body1" color="#6d8791">
          No staff members found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {staffMembers.map(staff => (
            <Grid item xs={12} sm={6} md={4} key={staff._id}>
              <Card sx={{ bgcolor: '#ffffff', borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: '#e9c4d6', 
                      width: 56, 
                      height: 56,
                      mr: 2,
                      color: '#323c42'
                    }}>
                      <BadgeIcon fontSize="large" />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#323c42' }}>
                        {staff.name}
                      </Typography>
                      <Typography variant="body2" color="#6d8791">
                        {staff.email}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    mt: 2,
                    p: 2,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2
                  }}>
                    <Box>
                      <Typography variant="body2" color="#6d8791">
                        Role
                      </Typography>
                      <Typography variant="body1" color="#323c42">
                        {staff.role}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="#6d8791">
                        Status
                      </Typography>
                      <Typography variant="body1" color="#323c42">
                        {staff.status}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ 
                        borderColor: '#323c42', 
                        color: '#323c42',
                        '&:hover': { borderColor: '#2a3338' }
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ 
                        borderColor: '#d32f2f', 
                        color: '#d32f2f',
                        '&:hover': { borderColor: '#b71c1c' }
                      }}
                    >
                      Disable
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Paper,
  Typography,
  Button,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookingsTable({ bookings, onEdit, onDelete }) {
  if (bookings.length === 0) {
    return (
      <Typography variant="body1" color="#6d8791" sx={{ py: 2 }}>
        No bookings found
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#f5f7fa' }}>
            <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Guest</TableCell>
            <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Room</TableCell>
            <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Dates</TableCell>
            <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ color: '#6d8791', fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map(booking => (
            <TableRow key={booking._id}>
              <TableCell>
                <Typography variant="subtitle2" color="#323c42">{booking.guestName}</Typography>
                <Typography variant="body2" color="#6d8791">{booking.guestEmail}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="#323c42">
                  {booking.room ? `Room ${booking.room.roomNumber}` : 'Not assigned'}
                </Typography>
                <Typography variant="body2" color="#6d8791" sx={{ textTransform: 'capitalize' }}>
                  {booking.room?.type || 'Unknown'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="#323c42">
                  {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip 
                  label={booking.status} 
                  size="small" 
                  sx={{ 
                    bgcolor: '#e9c4d6',
                    color: '#323c42',
                    fontWeight: 500
                  }}
                />
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => onEdit(booking)}
                  sx={{ color: '#323c42', mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(booking._id)}
                  sx={{ color: '#d32f2f' }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
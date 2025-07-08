import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['single', 'double', 'suite', 'deluxe'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  amenities: [String],
  status: {
    type: String,
    enum: ['available', 'occupied', 'maintenance'],
    default: 'available'
  }
}, {
  timestamps: true
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
import Room from '../models/Room.js';

// @desc    Get all rooms
// @route   GET /api/rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a room
// @route   POST /api/rooms
export const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ message: 'Invalid room data' });
  }
};

// @desc    Update a room
// @route   PUT /api/rooms/:id
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: 'Invalid room data' });
  }
};

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room removed' });
  } catch (error) {
    res.status(404).json({ message: 'Room not found' });
  }
};
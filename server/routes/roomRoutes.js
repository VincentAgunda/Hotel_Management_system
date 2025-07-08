import express from 'express';
import { 
  getRooms, 
  createRoom, 
  updateRoom, 
  deleteRoom 
} from '../controllers/roomController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getRooms)
  .post(auth, createRoom);

router.route('/:id')
  .put(auth, updateRoom)
  .delete(auth, deleteRoom);

export default router;
import express from 'express';
import { loginUser, getUserProfile } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/profile', auth, getUserProfile);

export default router;
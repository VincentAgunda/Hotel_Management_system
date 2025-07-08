import express from 'express';
import authRoutes from './authRoutes.js';
import roomRoutes from './roomRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);

export default router;
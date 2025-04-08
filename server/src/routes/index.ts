import { Router } from 'express';
import { authRoutes } from './auth-routes';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public authentication routes
router.use('/auth', authRoutes);

// Protected API routes
router.use('/api', authenticateToken, apiRoutes);

export default router;
import express from 'express';
import {
  authenticateGoogleUser,
  authenticateUserByEmailAndPassword,
  getUserProfile,
  registerUser,
} from '../controllers/user';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', authenticateUserByEmailAndPassword);
router.post('/login/google', authenticateGoogleUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/').post(registerUser);

export default router;

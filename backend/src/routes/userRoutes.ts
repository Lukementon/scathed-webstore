import express from 'express';
import {
  authenticateGoogleUser,
  authenticateUserByEmailAndPassword,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/user';
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', authenticateUserByEmailAndPassword);
router.post('/login/google', authenticateGoogleUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/').post(registerUser);

export default router;

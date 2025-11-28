import { Router } from 'express';
import { body } from 'express-validator';
import {
  sendVerification,
  verifyEmail,
  resendVerification,
} from '../controllers/email.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route   POST /api/email/send-verification
 * @desc    Send email verification link
 * @access  Private (requires authentication)
 */
router.post('/send-verification', authenticate, sendVerification);

/**
 * @route   POST /api/email/verify
 * @desc    Verify email with token
 * @access  Public
 */
router.post(
  '/verify',
  [body('token').notEmpty().withMessage('Token is required')],
  verifyEmail
);

/**
 * @route   POST /api/email/resend-verification
 * @desc    Resend verification email
 * @access  Private (requires authentication)
 */
router.post('/resend-verification', authenticate, resendVerification);

export default router;

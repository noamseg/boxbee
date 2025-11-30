import { Router } from 'express';
import { body } from 'express-validator';
import {
  signup,
  login,
  getMe,
  refreshAccessToken,
  googleAuth,
  appleAuth,
  linkGoogle,
  linkApple,
  completeOnboarding
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long')
  ],
  signup
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ],
  login
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', authenticate, getMe);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post(
  '/refresh',
  [body('refreshToken').notEmpty().withMessage('Refresh token is required')],
  refreshAccessToken
);

/**
 * @route   POST /api/auth/google
 * @desc    Authenticate with Google
 * @access  Public
 */
router.post(
  '/google',
  [
    body('idToken')
      .notEmpty()
      .withMessage('Google ID token is required'),
    body('name')
      .optional()
      .trim()
  ],
  googleAuth
);

/**
 * @route   POST /api/auth/apple
 * @desc    Authenticate with Apple
 * @access  Public
 */
router.post(
  '/apple',
  [
    body('idToken')
      .notEmpty()
      .withMessage('Apple ID token is required'),
    body('name')
      .optional()
      .trim()
  ],
  appleAuth
);

/**
 * @route   POST /api/auth/link/google
 * @desc    Link Google account to existing user
 * @access  Private
 */
router.post(
  '/link/google',
  authenticate,
  [
    body('idToken')
      .notEmpty()
      .withMessage('Google ID token is required')
  ],
  linkGoogle
);

/**
 * @route   POST /api/auth/link/apple
 * @desc    Link Apple account to existing user
 * @access  Private
 */
router.post(
  '/link/apple',
  authenticate,
  [
    body('idToken')
      .notEmpty()
      .withMessage('Apple ID token is required')
  ],
  linkApple
);

/**
 * @route   POST /api/auth/complete-onboarding
 * @desc    Mark user onboarding as complete
 * @access  Private
 */
router.post('/complete-onboarding', authenticate, completeOnboarding);

export default router;

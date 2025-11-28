import { Router } from 'express';
import { body } from 'express-validator';
import {
  estimateDuration,
  breakdownTask,
  parseTask,
  getCoachingMessage,
} from '../controllers/ai.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All AI routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/ai/estimate-duration
 * @desc    Get AI estimation for task duration
 * @access  Private
 */
router.post(
  '/estimate-duration',
  [
    body('taskName')
      .trim()
      .notEmpty()
      .withMessage('Task name is required')
      .isLength({ max: 200 })
      .withMessage('Task name must be at most 200 characters'),
  ],
  estimateDuration
);

/**
 * @route   POST /api/ai/breakdown-task
 * @desc    Get AI suggestions for breaking down a complex task
 * @access  Private
 */
router.post(
  '/breakdown-task',
  [
    body('taskName')
      .trim()
      .notEmpty()
      .withMessage('Task name is required')
      .isLength({ max: 200 })
      .withMessage('Task name must be at most 200 characters'),
  ],
  breakdownTask
);

/**
 * @route   POST /api/ai/parse-task
 * @desc    Parse natural language task input
 * @access  Private
 */
router.post(
  '/parse-task',
  [
    body('input')
      .trim()
      .notEmpty()
      .withMessage('Input is required')
      .isLength({ max: 300 })
      .withMessage('Input must be at most 300 characters'),
  ],
  parseTask
);

/**
 * @route   GET /api/ai/coaching-message
 * @desc    Get personalized AI coaching message
 * @access  Private
 */
router.get('/coaching-message', getCoachingMessage);

export default router;

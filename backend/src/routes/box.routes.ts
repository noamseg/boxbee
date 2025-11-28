import { Router } from 'express';
import { body, query } from 'express-validator';
import {
  createBox,
  getBoxes,
  getBoxById,
  updateBox,
  deleteBox,
  startBox,
  completeBox,
} from '../controllers/box.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All box routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/boxes
 * @desc    Create a new box
 * @access  Private
 */
router.post(
  '/',
  [
    body('taskName')
      .trim()
      .notEmpty()
      .withMessage('Task name is required')
      .isLength({ max: 200 })
      .withMessage('Task name must be at most 200 characters'),
    body('category')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Category must be at most 50 characters'),
    body('duration')
      .isInt({ min: 1, max: 480 })
      .withMessage('Duration must be between 1 and 480 minutes'),
    body('scheduledFor')
      .optional()
      .isISO8601()
      .withMessage('Scheduled time must be a valid date'),
    body('aiSuggested')
      .optional()
      .isBoolean()
      .withMessage('aiSuggested must be a boolean'),
    body('aiEstimated')
      .optional()
      .isBoolean()
      .withMessage('aiEstimated must be a boolean'),
  ],
  createBox
);

/**
 * @route   GET /api/boxes
 * @desc    Get all boxes for authenticated user
 * @access  Private
 */
router.get(
  '/',
  [
    query('status')
      .optional()
      .isIn(['scheduled', 'active', 'paused', 'completed', 'cancelled'])
      .withMessage('Invalid status value'),
    query('startDate')
      .optional()
      .isISO8601()
      .withMessage('Start date must be a valid date'),
    query('endDate')
      .optional()
      .isISO8601()
      .withMessage('End date must be a valid date'),
  ],
  getBoxes
);

/**
 * @route   GET /api/boxes/:id
 * @desc    Get a single box by ID
 * @access  Private
 */
router.get('/:id', getBoxById);

/**
 * @route   PATCH /api/boxes/:id
 * @desc    Update a box
 * @access  Private
 */
router.patch(
  '/:id',
  [
    body('taskName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Task name cannot be empty')
      .isLength({ max: 200 })
      .withMessage('Task name must be at most 200 characters'),
    body('category')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Category must be at most 50 characters'),
    body('duration')
      .optional()
      .isInt({ min: 1, max: 480 })
      .withMessage('Duration must be between 1 and 480 minutes'),
    body('scheduledFor')
      .optional()
      .isISO8601()
      .withMessage('Scheduled time must be a valid date'),
    body('status')
      .optional()
      .isIn(['scheduled', 'active', 'paused', 'completed', 'cancelled'])
      .withMessage('Invalid status value'),
    body('focusQuality')
      .optional()
      .isIn(['great', 'okay', 'rough'])
      .withMessage('Invalid focus quality value'),
    body('completionStatus')
      .optional()
      .isIn(['completed', 'partial', 'skipped'])
      .withMessage('Invalid completion status value'),
    body('actualDuration')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Actual duration must be a non-negative integer'),
  ],
  updateBox
);

/**
 * @route   DELETE /api/boxes/:id
 * @desc    Delete a box
 * @access  Private
 */
router.delete('/:id', deleteBox);

/**
 * @route   POST /api/boxes/:id/start
 * @desc    Start a box (enter focus mode)
 * @access  Private
 */
router.post('/:id/start', startBox);

/**
 * @route   POST /api/boxes/:id/complete
 * @desc    Complete a box with reflection data
 * @access  Private
 */
router.post(
  '/:id/complete',
  [
    body('focusQuality')
      .notEmpty()
      .withMessage('Focus quality is required')
      .isIn(['great', 'okay', 'rough'])
      .withMessage('Invalid focus quality value'),
    body('completionStatus')
      .notEmpty()
      .withMessage('Completion status is required')
      .isIn(['completed', 'partial', 'skipped'])
      .withMessage('Invalid completion status value'),
    body('notes')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Notes must be at most 500 characters'),
    body('actualDuration')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Actual duration must be a non-negative integer'),
  ],
  completeBox
);

export default router;

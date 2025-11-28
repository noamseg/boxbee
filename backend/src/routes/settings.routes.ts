import { Router } from 'express';
import { body } from 'express-validator';
import { getSettings, updateSettings } from '../controllers/settings.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All settings routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/settings
 * @desc    Get user settings
 * @access  Private
 */
router.get('/', getSettings);

/**
 * @route   PATCH /api/settings
 * @desc    Update user settings
 * @access  Private
 */
router.patch(
  '/',
  [
    body('notifyFiveMinWarning').optional().isBoolean(),
    body('notifyCompletion').optional().isBoolean(),
    body('notifyCoaching').optional().isBoolean(),
    body('notifyMorningPlanning').optional().isBoolean(),
    body('morningPlanningTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('notifyEveningReflection').optional().isBoolean(),
    body('notifyWeeklyReport').optional().isBoolean(),
    body('weeklyReportDay').optional().isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    body('weeklyReportTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('quietHoursEnabled').optional().isBoolean(),
    body('quietHoursStart').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('quietHoursEnd').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('coachPersonality').optional().isIn(['friendly', 'professional', 'minimal']),
    body('coachFrequency').optional().isIn(['lots', 'often', 'some', 'rare']),
    body('aiLearningEnabled').optional().isBoolean(),
    body('aiAutoAdjustTime').optional().isBoolean(),
    body('theme').optional().isIn(['light', 'dark', 'auto']),
  ],
  updateSettings
);

export default router;

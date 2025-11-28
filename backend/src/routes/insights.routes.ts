import { Router } from 'express';
import { getWeeklyStats, getAIInsights } from '../controllers/insights.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All insights routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/insights/weekly
 * @desc    Get weekly statistics for authenticated user
 * @access  Private
 */
router.get('/weekly', getWeeklyStats);

/**
 * @route   GET /api/insights/ai-insights
 * @desc    Get AI-generated insights based on user data
 * @access  Private
 */
router.get('/ai-insights', getAIInsights);

export default router;

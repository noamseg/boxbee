import { Request, Response, NextFunction } from 'express';
import insightsService from '../services/insights.service';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest } from '../types';

/**
 * @route   GET /api/insights/weekly
 * @desc    Get weekly statistics for authenticated user
 * @access  Private
 */
export const getWeeklyStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const stats = await insightsService.getWeeklyStats(userId);

    res.json({
      success: true,
      data: { stats },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/insights/ai-insights
 * @desc    Get AI-generated insights based on user data
 * @access  Private
 */
export const getAIInsights = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const insights = await insightsService.generateInsights(userId);

    res.json({
      success: true,
      data: { insights },
    });
  } catch (error) {
    next(error);
  }
};

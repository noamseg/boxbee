import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import aiService from '../services/ai.service';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest } from '../types';

/**
 * @route   POST /api/ai/estimate-duration
 * @desc    Get AI estimation for task duration
 * @access  Private
 */
export const estimateDuration = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400, errors.array());
    }

    if (!aiService.isAvailable()) {
      throw new AppError('AI service is not configured', 503);
    }

    const { taskName } = req.body;

    const estimation = await aiService.estimateTaskDuration(taskName);

    res.json({
      success: true,
      data: estimation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/ai/breakdown-task
 * @desc    Get AI suggestions for breaking down a complex task
 * @access  Private
 */
export const breakdownTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400, errors.array());
    }

    if (!aiService.isAvailable()) {
      throw new AppError('AI service is not configured', 503);
    }

    const { taskName } = req.body;

    const breakdown = await aiService.breakdownTask(taskName);

    res.json({
      success: true,
      data: breakdown,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/ai/parse-task
 * @desc    Parse natural language task input
 * @access  Private
 */
export const parseTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400, errors.array());
    }

    if (!aiService.isAvailable()) {
      throw new AppError('AI service is not configured', 503);
    }

    const { input } = req.body;

    const parsed = await aiService.parseNaturalLanguageTask(input);

    res.json({
      success: true,
      data: parsed,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/ai/coaching-message
 * @desc    Get personalized AI coaching message
 * @access  Private
 */
export const getCoachingMessage = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    if (!aiService.isAvailable()) {
      // Return default message if AI not configured
      res.json({
        success: true,
        data: {
          message: 'Keep up the great work! 🐝',
        },
      });
      return;
    }

    // Get user's recent boxes for context
    // This is a simplified version - in production, fetch from database
    const recentBoxes: Array<{
      taskName: string;
      focusQuality: string;
      completionStatus: string;
    }> = [];

    const timeOfDay = new Date().getHours() < 12 ? 'morning' :
                      new Date().getHours() < 18 ? 'afternoon' : 'evening';

    const message = await aiService.generateCoachingMessage({
      recentBoxes,
      timeOfDay,
    });

    res.json({
      success: true,
      data: { message },
    });
  } catch (error) {
    next(error);
  }
};

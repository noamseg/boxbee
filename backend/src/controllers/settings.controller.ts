import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/database';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest } from '../types';

/**
 * @route   GET /api/settings
 * @desc    Get user settings
 * @access  Private
 */
export const getSettings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    let settings = await prisma.userSettings.findUnique({
      where: { userId },
    });

    // Create default settings if they don't exist
    if (!settings) {
      settings = await prisma.userSettings.create({
        data: { userId },
      });
    }

    res.json({
      success: true,
      data: { settings },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/settings
 * @desc    Update user settings
 * @access  Private
 */
export const updateSettings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400, errors.array());
    }

    const userId = req.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const {
      notifyFiveMinWarning,
      notifyCompletion,
      notifyCoaching,
      notifyMorningPlanning,
      morningPlanningTime,
      notifyEveningReflection,
      notifyWeeklyReport,
      weeklyReportDay,
      weeklyReportTime,
      quietHoursEnabled,
      quietHoursStart,
      quietHoursEnd,
      coachPersonality,
      coachFrequency,
      aiLearningEnabled,
      aiAutoAdjustTime,
      theme,
    } = req.body;

    // Build update data object
    const updateData: any = {};
    if (notifyFiveMinWarning !== undefined) updateData.notifyFiveMinWarning = notifyFiveMinWarning;
    if (notifyCompletion !== undefined) updateData.notifyCompletion = notifyCompletion;
    if (notifyCoaching !== undefined) updateData.notifyCoaching = notifyCoaching;
    if (notifyMorningPlanning !== undefined) updateData.notifyMorningPlanning = notifyMorningPlanning;
    if (morningPlanningTime !== undefined) updateData.morningPlanningTime = morningPlanningTime;
    if (notifyEveningReflection !== undefined) updateData.notifyEveningReflection = notifyEveningReflection;
    if (notifyWeeklyReport !== undefined) updateData.notifyWeeklyReport = notifyWeeklyReport;
    if (weeklyReportDay !== undefined) updateData.weeklyReportDay = weeklyReportDay;
    if (weeklyReportTime !== undefined) updateData.weeklyReportTime = weeklyReportTime;
    if (quietHoursEnabled !== undefined) updateData.quietHoursEnabled = quietHoursEnabled;
    if (quietHoursStart !== undefined) updateData.quietHoursStart = quietHoursStart;
    if (quietHoursEnd !== undefined) updateData.quietHoursEnd = quietHoursEnd;
    if (coachPersonality !== undefined) updateData.coachPersonality = coachPersonality;
    if (coachFrequency !== undefined) updateData.coachFrequency = coachFrequency;
    if (aiLearningEnabled !== undefined) updateData.aiLearningEnabled = aiLearningEnabled;
    if (aiAutoAdjustTime !== undefined) updateData.aiAutoAdjustTime = aiAutoAdjustTime;
    if (theme !== undefined) updateData.theme = theme;

    const settings = await prisma.userSettings.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        ...updateData,
      },
    });

    res.json({
      success: true,
      data: { settings },
    });
  } catch (error) {
    next(error);
  }
};

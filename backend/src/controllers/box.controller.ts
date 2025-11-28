import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/database';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest } from '../types';

/**
 * @route   POST /api/boxes
 * @desc    Create a new box
 * @access  Private
 */
export const createBox = async (
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
      taskName,
      category,
      duration,
      scheduledFor,
      aiSuggested,
      aiEstimated,
    } = req.body;

    const box = await prisma.box.create({
      data: {
        userId,
        taskName,
        category,
        duration,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        aiSuggested: aiSuggested || false,
        aiEstimated: aiEstimated || false,
        status: 'scheduled',
      },
    });

    res.status(201).json({
      success: true,
      data: { box },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/boxes
 * @desc    Get all boxes for authenticated user
 * @access  Private
 */
export const getBoxes = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const { status, startDate, endDate } = req.query;

    const where: any = { userId };

    // Filter by status if provided
    if (status && typeof status === 'string') {
      where.status = status;
    }

    // Filter by date range if provided
    if (startDate || endDate) {
      where.scheduledFor = {};
      if (startDate) {
        where.scheduledFor.gte = new Date(startDate as string);
      }
      if (endDate) {
        where.scheduledFor.lte = new Date(endDate as string);
      }
    }

    const boxes = await prisma.box.findMany({
      where,
      orderBy: [
        { scheduledFor: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json({
      success: true,
      data: { boxes },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/boxes/:id
 * @desc    Get a single box by ID
 * @access  Private
 */
export const getBoxById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const { id } = req.params;

    const box = await prisma.box.findUnique({
      where: { id },
    });

    if (!box) {
      throw new AppError('Box not found', 404);
    }

    // Ensure the box belongs to the authenticated user
    if (box.userId !== userId) {
      throw new AppError('Not authorized to access this box', 403);
    }

    res.json({
      success: true,
      data: { box },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/boxes/:id
 * @desc    Update a box
 * @access  Private
 */
export const updateBox = async (
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

    const { id } = req.params;
    const {
      taskName,
      category,
      duration,
      scheduledFor,
      status,
      startedAt,
      completedAt,
      actualDuration,
      focusQuality,
      completionStatus,
      notes,
    } = req.body;

    // Check if box exists and belongs to user
    const existingBox = await prisma.box.findUnique({
      where: { id },
    });

    if (!existingBox) {
      throw new AppError('Box not found', 404);
    }

    if (existingBox.userId !== userId) {
      throw new AppError('Not authorized to update this box', 403);
    }

    // Build update data object
    const updateData: any = {};
    if (taskName !== undefined) updateData.taskName = taskName;
    if (category !== undefined) updateData.category = category;
    if (duration !== undefined) updateData.duration = duration;
    if (scheduledFor !== undefined) {
      updateData.scheduledFor = scheduledFor ? new Date(scheduledFor) : null;
    }
    if (status !== undefined) updateData.status = status;
    if (startedAt !== undefined) {
      updateData.startedAt = startedAt ? new Date(startedAt) : null;
    }
    if (completedAt !== undefined) {
      updateData.completedAt = completedAt ? new Date(completedAt) : null;
    }
    if (actualDuration !== undefined) updateData.actualDuration = actualDuration;
    if (focusQuality !== undefined) updateData.focusQuality = focusQuality;
    if (completionStatus !== undefined) updateData.completionStatus = completionStatus;
    if (notes !== undefined) updateData.notes = notes;

    const box = await prisma.box.update({
      where: { id },
      data: updateData,
    });

    res.json({
      success: true,
      data: { box },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/boxes/:id
 * @desc    Delete a box
 * @access  Private
 */
export const deleteBox = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const { id } = req.params;

    // Check if box exists and belongs to user
    const box = await prisma.box.findUnique({
      where: { id },
    });

    if (!box) {
      throw new AppError('Box not found', 404);
    }

    if (box.userId !== userId) {
      throw new AppError('Not authorized to delete this box', 403);
    }

    await prisma.box.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Box deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/boxes/:id/start
 * @desc    Start a box (enter focus mode)
 * @access  Private
 */
export const startBox = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const { id } = req.params;

    const box = await prisma.box.findUnique({
      where: { id },
    });

    if (!box) {
      throw new AppError('Box not found', 404);
    }

    if (box.userId !== userId) {
      throw new AppError('Not authorized to start this box', 403);
    }

    if (box.status !== 'scheduled') {
      throw new AppError('Box has already been started or completed', 400);
    }

    const updatedBox = await prisma.box.update({
      where: { id },
      data: {
        status: 'active',
        startedAt: new Date(),
      },
    });

    res.json({
      success: true,
      data: { box: updatedBox },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/boxes/:id/complete
 * @desc    Complete a box with reflection data
 * @access  Private
 */
export const completeBox = async (
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

    const { id } = req.params;
    const { focusQuality, completionStatus, notes, actualDuration } = req.body;

    const box = await prisma.box.findUnique({
      where: { id },
    });

    if (!box) {
      throw new AppError('Box not found', 404);
    }

    if (box.userId !== userId) {
      throw new AppError('Not authorized to complete this box', 403);
    }

    if (box.status === 'completed') {
      throw new AppError('Box has already been completed', 400);
    }

    const updatedBox = await prisma.box.update({
      where: { id },
      data: {
        status: 'completed',
        completedAt: new Date(),
        focusQuality,
        completionStatus,
        notes,
        actualDuration,
      },
    });

    res.json({
      success: true,
      data: { box: updatedBox },
    });
  } catch (error) {
    next(error);
  }
};

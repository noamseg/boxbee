import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/database';
import {
  hashPassword,
  comparePassword,
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/auth.utils';
import { AppError } from '../middleware/error.middleware';
import oauthService from '../services/oauth.service';

/**
 * Register a new user
 * POST /api/auth/signup
 */
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400, errors.array());
    }

    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        onboardingCompleted: true,
        createdAt: true
      }
    });

    // Create default user settings
    await prisma.userSettings.create({
      data: {
        userId: user.id
      }
    });

    // Generate JWT tokens
    const accessToken = generateToken({
      userId: user.id,
      email: user.email
    });

    // Generate refresh token
    const refreshToken = await generateRefreshToken(user.id);

    res.status(201).json({
      success: true,
      data: {
        user,
        token: accessToken,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400, errors.array());
    }

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.password) {
      throw new AppError('Invalid email or password', 401);
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate JWT tokens
    const accessToken = generateToken({
      userId: user.id,
      email: user.email
    });

    // Generate refresh token
    const refreshToken = await generateRefreshToken(user.id);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          onboardingCompleted: user.onboardingCompleted,
          createdAt: user.createdAt
        },
        token: accessToken,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user
 * GET /api/auth/me
 */
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError('Not authenticated', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        onboardingCompleted: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh access token
 * POST /api/auth/refresh
 */
export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token is required', 400);
    }

    // Verify refresh token
    const userId = await verifyRefreshToken(refreshToken);

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        onboardingCompleted: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Generate new access token
    const newAccessToken = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Optionally generate new refresh token (rotation)
    const newRefreshToken = await generateRefreshToken(user.id);

    res.json({
      success: true,
      data: {
        token: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Authenticate with Google
 * POST /api/auth/google
 */
export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idToken, name } = req.body;

    if (!idToken) {
      throw new AppError('Google ID token is required', 400);
    }

    // Authenticate or create user
    const user = await oauthService.authenticateWithGoogle(idToken, { name });

    // Generate JWT tokens
    const accessToken = generateToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = await generateRefreshToken(user.id);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          onboardingCompleted: user.onboardingCompleted,
          createdAt: user.createdAt,
        },
        token: accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Authenticate with Apple
 * POST /api/auth/apple
 */
export const appleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idToken, name } = req.body;

    if (!idToken) {
      throw new AppError('Apple ID token is required', 400);
    }

    // Authenticate or create user
    const user = await oauthService.authenticateWithApple(idToken, { name });

    // Generate JWT tokens
    const accessToken = generateToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = await generateRefreshToken(user.id);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          onboardingCompleted: user.onboardingCompleted,
          createdAt: user.createdAt,
        },
        token: accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Link Google account to existing user
 * POST /api/auth/link/google
 */
export const linkGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError('Not authenticated', 401);
    }

    const { idToken } = req.body;

    if (!idToken) {
      throw new AppError('Google ID token is required', 400);
    }

    const user = await oauthService.linkGoogleAccount(req.user.userId, idToken);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          onboardingCompleted: user.onboardingCompleted,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Link Apple account to existing user
 * POST /api/auth/link/apple
 */
export const linkApple = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError('Not authenticated', 401);
    }

    const { idToken } = req.body;

    if (!idToken) {
      throw new AppError('Apple ID token is required', 400);
    }

    const user = await oauthService.linkAppleAccount(req.user.userId, idToken);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          onboardingCompleted: user.onboardingCompleted,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Complete onboarding
 * POST /api/auth/complete-onboarding
 */
export const completeOnboarding = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError('Not authenticated', 401);
    }

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: { onboardingCompleted: true },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        onboardingCompleted: true,
        createdAt: true,
      },
    });

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

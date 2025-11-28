import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { JwtPayload } from '../middleware/auth.middleware';
import { prisma } from '../config/database';
import { AppError } from '../middleware/error.middleware';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const REFRESH_TOKEN_EXPIRES_DAYS = 30;

/**
 * Generate JWT access token
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

/**
 * Generate refresh token and store in database
 */
export const generateRefreshToken = async (userId: string): Promise<string> => {
  // Generate random token
  const token = randomBytes(40).toString('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_DAYS);

  // Delete old refresh tokens for this user (keep only latest)
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });

  // Store new refresh token
  await prisma.refreshToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return token;
};

/**
 * Verify refresh token and return userId
 */
export const verifyRefreshToken = async (token: string): Promise<string> => {
  const refreshToken = await prisma.refreshToken.findUnique({
    where: { token },
  });

  if (!refreshToken) {
    throw new AppError('Invalid refresh token', 401);
  }

  if (refreshToken.expiresAt < new Date()) {
    // Delete expired token
    await prisma.refreshToken.delete({
      where: { id: refreshToken.id },
    });
    throw new AppError('Refresh token has expired', 401);
  }

  return refreshToken.userId;
};

/**
 * Hash password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compare password with hash
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

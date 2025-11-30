import { Request } from 'express';
import { JwtPayload } from '../middleware/auth.middleware';

/**
 * Extended Express Request with authenticated user
 */
export interface AuthRequest extends Request {
  user?: JwtPayload;
  userId?: string; // Convenience property extracted from user
}

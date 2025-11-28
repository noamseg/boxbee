import apiService from './api.service';
import {
  AuthResponse,
  SignupRequest,
  LoginRequest,
  User,
  RefreshTokenResponse,
} from '../types/auth.types';

class AuthService {
  /**
   * Sign up a new user
   */
  async signup(data: SignupRequest): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/signup', data);
  }

  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', data);
  }

  /**
   * Get current user
   */
  async getMe(): Promise<{ success: boolean; data: { user: User } }> {
    return apiService.get('/auth/me');
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return apiService.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
  }

  /**
   * Send email verification
   */
  async sendVerificationEmail(): Promise<{ success: boolean; message: string }> {
    return apiService.post('/email/send-verification');
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    return apiService.post('/email/verify', { token });
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(): Promise<{ success: boolean; message: string }> {
    return apiService.post('/email/resend-verification');
  }
}

export default new AuthService();

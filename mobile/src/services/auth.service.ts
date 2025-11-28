import apiService from './api.service';
import {
  AuthResponse,
  SignupRequest,
  LoginRequest,
  User,
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
   * Refresh token (future implementation)
   */
  async refreshToken(): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/refresh');
  }
}

export default new AuthService();

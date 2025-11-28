import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import authService from '../services/auth.service';
import {
  User,
  AuthContextType,
  SignupRequest,
  LoginRequest,
} from '../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from secure storage on app start
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('auth_token');
      const storedRefreshToken = await SecureStore.getItemAsync('refresh_token');
      const storedUser = await SecureStore.getItemAsync('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupRequest) => {
    try {
      const response = await authService.signup(data);
      await saveAuth(
        response.data.token,
        response.data.refreshToken,
        response.data.user
      );
    } catch (error: any) {
      throw new Error(error.response?.data?.error?.message || 'Signup failed');
    }
  };

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      await saveAuth(
        response.data.token,
        response.data.refreshToken,
        response.data.user
      );
    } catch (error: any) {
      throw new Error(error.response?.data?.error?.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('user');
      setToken(null);
      setRefreshToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authService.getMe();
      setUser(response.data.user);
      await SecureStore.setItemAsync('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Error refreshing user:', error);
      await logout();
    }
  };

  const sendVerificationEmail = async () => {
    try {
      await authService.sendVerificationEmail();
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error?.message || 'Failed to send verification email'
      );
    }
  };

  const verifyEmail = async (verificationToken: string) => {
    try {
      await authService.verifyEmail(verificationToken);
      // Refresh user to get updated emailVerified status
      await refreshUser();
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error?.message || 'Email verification failed'
      );
    }
  };

  const saveAuth = async (
    authToken: string,
    authRefreshToken: string,
    userData: User
  ) => {
    await SecureStore.setItemAsync('auth_token', authToken);
    await SecureStore.setItemAsync('refresh_token', authRefreshToken);
    await SecureStore.setItemAsync('user', JSON.stringify(userData));
    setToken(authToken);
    setRefreshToken(authRefreshToken);
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    token,
    refreshToken,
    isLoading,
    isAuthenticated: !!user && !!token,
    signup,
    login,
    logout,
    refreshUser,
    sendVerificationEmail,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

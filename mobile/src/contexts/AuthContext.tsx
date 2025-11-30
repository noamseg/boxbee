import React, { createContext, useState, useContext, useEffect, useMemo, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import authService from '../services/auth.service';
import oauthService from '../services/oauth.service';
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const loginWithGoogle = async () => {
    try {
      const response = await oauthService.signInWithGoogle();
      await saveAuth(
        response.data.token,
        response.data.refreshToken,
        response.data.user
      );
    } catch (error: any) {
      throw new Error(error.message || 'Google sign-in failed');
    }
  };

  const loginWithApple = async () => {
    try {
      const response = await oauthService.signInWithApple();
      await saveAuth(
        response.data.token,
        response.data.refreshToken,
        response.data.user
      );
    } catch (error: any) {
      throw new Error(error.message || 'Apple sign-in failed');
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

  const completeOnboarding = async () => {
    try {
      const response = await authService.completeOnboarding();
      setUser(response.data.user);
      await SecureStore.setItemAsync('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  };

  const resetOnboarding = async () => {
    try {
      // For testing purposes - resets onboarding status locally
      if (user) {
        const updatedUser = { ...user, onboardingCompleted: false };
        setUser(updatedUser);
        await SecureStore.setItemAsync('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error resetting onboarding:', error);
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

  const value: AuthContextType = useMemo(() => ({
    user,
    token,
    refreshToken,
    isLoading: isLoading === true,
    isAuthenticated: !!(user && token),
    hasCompletedOnboarding: user?.onboardingCompleted === true,
    signup,
    login,
    loginWithGoogle,
    loginWithApple,
    logout,
    refreshUser,
    sendVerificationEmail,
    verifyEmail,
    completeOnboarding,
    resetOnboarding,
  }), [user, token, refreshToken, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

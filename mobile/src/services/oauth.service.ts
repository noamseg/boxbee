import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import apiClient from './api.service';
import { AuthResponse } from '../types/auth.types';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '846199067258-36tonhshu5v2lamqrbsbheg685v2q2hf.apps.googleusercontent.com',
  iosClientId: '846199067258-3i68n828p5m9av5o4gb7j1ds439csdc3.apps.googleusercontent.com',
  offlineAccess: true,
});

class OAuthService {
  /**
   * Sign in with Google
   */
  async signInWithGoogle(): Promise<AuthResponse> {
    try {
      // Check if device supports Google Play Services (Android)
      await GoogleSignin.hasPlayServices();

      // Get user info from Google
      const userInfo = await GoogleSignin.signIn();

      // Debug: Log the userInfo structure
      console.log('Google Sign-In Response:', JSON.stringify(userInfo, null, 2));

      const idToken = userInfo.idToken || userInfo.data?.idToken;
      if (!idToken) {
        throw new Error('No ID token received from Google');
      }

      // Send ID token to backend
      const response = await apiClient.post<AuthResponse>('/auth/google', {
        idToken: idToken,
        name: userInfo.user?.name || userInfo.data?.user?.name,
      });

      return response;
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      if (error.code === 'SIGN_IN_CANCELLED') {
        throw new Error('Sign in was cancelled');
      } else if (error.code === 'IN_PROGRESS') {
        throw new Error('Sign in is already in progress');
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        throw new Error('Google Play Services not available');
      }
      throw new Error(error.response?.data?.error?.message || 'Google sign-in failed');
    }
  }

  /**
   * Sign in with Apple
   */
  async signInWithApple(): Promise<AuthResponse> {
    try {
      // Check if Apple Authentication is available
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (!isAvailable) {
        throw new Error('Apple Sign-In is not available on this device');
      }

      // Request Apple authentication
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('No identity token received from Apple');
      }

      // Build full name if available
      let name: string | undefined;
      if (credential.fullName) {
        const { givenName, familyName } = credential.fullName;
        if (givenName || familyName) {
          name = [givenName, familyName].filter(Boolean).join(' ');
        }
      }

      // Send identity token to backend
      const response = await apiClient.post<AuthResponse>('/auth/apple', {
        idToken: credential.identityToken,
        name,
      });

      return response;
    } catch (error: any) {
      console.error('Apple sign-in error:', error);
      if (error.code === 'ERR_REQUEST_CANCELED') {
        throw new Error('Sign in was cancelled');
      }
      throw new Error(error.response?.data?.error?.message || 'Apple sign-in failed');
    }
  }

  /**
   * Link Google account to existing user
   */
  async linkGoogleAccount(): Promise<void> {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (!userInfo.data?.idToken) {
        throw new Error('No ID token received from Google');
      }

      await apiClient.post('/auth/link/google', {
        idToken: userInfo.data.idToken,
      });
    } catch (error: any) {
      console.error('Google account linking error:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to link Google account');
    }
  }

  /**
   * Link Apple account to existing user
   */
  async linkAppleAccount(): Promise<void> {
    try {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (!isAvailable) {
        throw new Error('Apple Sign-In is not available on this device');
      }

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('No identity token received from Apple');
      }

      await apiClient.post('/auth/link/apple', {
        idToken: credential.identityToken,
      });
    } catch (error: any) {
      console.error('Apple account linking error:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to link Apple account');
    }
  }

  /**
   * Sign out from Google
   */
  async signOutGoogle(): Promise<void> {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Error signing out from Google:', error);
    }
  }

  /**
   * Check if user is signed in with Google
   */
  async isSignedInWithGoogle(): Promise<boolean> {
    try {
      return await GoogleSignin.isSignedIn();
    } catch (error) {
      return false;
    }
  }
}

export default new OAuthService();

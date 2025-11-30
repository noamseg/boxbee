import { OAuth2Client } from 'google-auth-library';
import appleSignin from 'apple-signin-auth';
import { prisma } from '../config/database';
import { User } from '@prisma/client';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export interface GoogleTokenPayload {
  email: string;
  name?: string;
  picture?: string;
  sub: string; // Google user ID
  email_verified: boolean;
}

export interface AppleTokenPayload {
  email: string;
  sub: string; // Apple user ID
  email_verified?: boolean | string;
}

class OAuthService {
  /**
   * Verify Google ID token and return user info
   */
  async verifyGoogleToken(idToken: string): Promise<GoogleTokenPayload> {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error('Invalid Google token');
      }

      return {
        email: payload.email!,
        name: payload.name,
        picture: payload.picture,
        sub: payload.sub,
        email_verified: payload.email_verified || false,
      };
    } catch (error) {
      console.error('Error verifying Google token:', error);
      throw new Error('Invalid Google token');
    }
  }

  /**
   * Verify Apple ID token and return user info
   */
  async verifyAppleToken(idToken: string): Promise<AppleTokenPayload> {
    try {
      const { sub, email, email_verified } = await appleSignin.verifyIdToken(idToken, {
        audience: process.env.APPLE_CLIENT_ID!,
        ignoreExpiration: false,
      });

      if (!email) {
        throw new Error('Email not provided by Apple');
      }

      return {
        email,
        sub,
        email_verified: email_verified === 'true' || email_verified === true,
      };
    } catch (error) {
      console.error('Error verifying Apple token:', error);
      throw new Error('Invalid Apple token');
    }
  }

  /**
   * Find or create user from Google OAuth
   */
  async authenticateWithGoogle(
    idToken: string,
    userInfo?: { name?: string }
  ): Promise<User> {
    const tokenPayload = await this.verifyGoogleToken(idToken);

    // Check if user exists with this Google ID
    let user = await prisma.user.findFirst({
      where: { googleId: tokenPayload.sub },
    });

    if (user) {
      // User exists with this Google account, return it
      return user;
    }

    // Check if user exists with this email
    user = await prisma.user.findFirst({
      where: { email: tokenPayload.email },
    });

    if (user) {
      // User exists with this email but hasn't linked Google account yet
      // Link the Google account to existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: tokenPayload.sub,
          emailVerified: tokenPayload.email_verified || user.emailVerified,
        },
      });
      return user;
    }

    // Create new user with Google account
    user = await prisma.user.create({
      data: {
        email: tokenPayload.email,
        name: userInfo?.name || tokenPayload.name || tokenPayload.email.split('@')[0],
        googleId: tokenPayload.sub,
        emailVerified: tokenPayload.email_verified,
        password: null, // No password for OAuth users
      },
    });

    // Create default user settings
    await prisma.userSettings.create({
      data: {
        userId: user.id,
      },
    });

    return user;
  }

  /**
   * Find or create user from Apple OAuth
   */
  async authenticateWithApple(
    idToken: string,
    userInfo?: { name?: string }
  ): Promise<User> {
    const tokenPayload = await this.verifyAppleToken(idToken);

    // Check if user exists with this Apple ID
    let user = await prisma.user.findFirst({
      where: { appleId: tokenPayload.sub },
    });

    if (user) {
      // User exists with this Apple account, return it
      return user;
    }

    // Check if user exists with this email (unless it's a private relay email)
    const isPrivateEmail = tokenPayload.email.includes('privaterelay.appleid.com');

    if (!isPrivateEmail) {
      user = await prisma.user.findFirst({
        where: { email: tokenPayload.email },
      });

      if (user) {
        // User exists with this email but hasn't linked Apple account yet
        // Link the Apple account to existing user
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            appleId: tokenPayload.sub,
            emailVerified: Boolean(tokenPayload.email_verified) || user.emailVerified,
          },
        });
        return user;
      }
    }

    // Create new user with Apple account
    user = await prisma.user.create({
      data: {
        email: tokenPayload.email,
        name: userInfo?.name || tokenPayload.email.split('@')[0],
        appleId: tokenPayload.sub,
        emailVerified: Boolean(tokenPayload.email_verified),
        password: null, // No password for OAuth users
      },
    });

    // Create default user settings
    await prisma.userSettings.create({
      data: {
        userId: user.id,
      },
    });

    return user;
  }

  /**
   * Link Google account to existing authenticated user
   */
  async linkGoogleAccount(userId: string, idToken: string): Promise<User> {
    const tokenPayload = await this.verifyGoogleToken(idToken);

    // Check if this Google ID is already linked to another account
    const existingUser = await prisma.user.findFirst({
      where: {
        googleId: tokenPayload.sub,
        NOT: { id: userId },
      },
    });

    if (existingUser) {
      throw new Error('This Google account is already linked to another user');
    }

    // Link the Google account
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        googleId: tokenPayload.sub,
      },
    });

    return user;
  }

  /**
   * Link Apple account to existing authenticated user
   */
  async linkAppleAccount(userId: string, idToken: string): Promise<User> {
    const tokenPayload = await this.verifyAppleToken(idToken);

    // Check if this Apple ID is already linked to another account
    const existingUser = await prisma.user.findFirst({
      where: {
        appleId: tokenPayload.sub,
        NOT: { id: userId },
      },
    });

    if (existingUser) {
      throw new Error('This Apple account is already linked to another user');
    }

    // Link the Apple account
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        appleId: tokenPayload.sub,
      },
    });

    return user;
  }
}

export default new OAuthService();

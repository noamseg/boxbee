/**
 * BoxBee Design System - Theme Constants
 * Based on design/01-Design-System.md
 */

// Color Palette
export const colors = {
  // Honey Spectrum (Primary)
  honeyLight: '#FDB44B',
  honey: '#F5A623',
  honeyDeep: '#E69500',
  honeyCream: '#FFF5E1',

  // Bee Black & White
  beeBlack: '#1A1A1A',
  white: '#FFFFFF',

  // Hexagon Grays (Neutral)
  gray900: '#1A1A1A',
  gray800: '#2D2D2D',
  gray700: '#404040',
  gray600: '#6B6B6B',
  gray500: '#9CA3AF',
  gray400: '#BDBDBD',
  gray300: '#D1D5DB',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  gray50: '#F9FAFB',

  // Semantic Colors
  successGreen: '#10B981',
  errorRed: '#EF4444',
  warningOrange: '#F59E0B',
  infoBlue: '#3B82F6',

  // Background
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',
};

// Typography
export const typography = {
  // Font Families
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    mono: 'JetBrainsMono-Regular',
  },

  // Type Scale
  display: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700' as const,
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600' as const,
  },
  h3: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  timer: {
    fontSize: 72,
    lineHeight: 80,
    fontWeight: '400' as const,
    fontFamily: 'JetBrainsMono-Regular',
  },
};

// Spacing (8-point grid)
export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
};

// Border Radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Animation Durations
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
};

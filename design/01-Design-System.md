# BoxBee Design System

**Version:** 1.0
**Date:** November 28, 2024
**Status:** Implementation Ready
**For:** React Native Development

---

## Overview

BoxBee's design system is built around the bee/honeycomb metaphor - creating a warm, productive, and structured experience. The system prioritizes:

- **Modern Minimalism** - Clean, purposeful design
- **Warm & Inviting** - Honey-inspired color palette
- **Geometric Structure** - Hexagons as subtle recurring motif
- **Professional Polish** - Suitable for knowledge workers

---

## Design Tokens

### Colors

#### Primary Palette (Honey)
```javascript
// React Native / JavaScript
export const colors = {
  // Primary - Honey Spectrum
  honeyLight: '#FDB44B',    // Backgrounds, highlights
  honey: '#F5A623',          // Primary actions, brand color
  honeyDeep: '#E69500',      // Hover states, emphasis
  amberDark: '#CC7A00',      // Shadows, depth

  // Secondary - Bee & Wax
  beeBlack: '#1A1A1A',       // Text, strong contrast
  beeGray: '#4A4A4A',        // Secondary text
  pollen: '#FFF4E0',         // Subtle backgrounds
  waxWhite: '#FFFBF5',       // Off-white backgrounds

  // Neutrals - Hexagon Grays
  comb900: '#0F0F0F',        // Darkest (dark mode bg)
  comb700: '#2C2C2C',        // Dark surfaces
  comb500: '#6B6B6B',        // Disabled states
  comb300: '#ADADAD',        // Borders, dividers
  comb100: '#F0F0F0',        // Light backgrounds
  comb50: '#FAFAFA',         // Lightest surfaces

  // Semantic
  success: '#4CAF50',        // Completed tasks
  warning: '#FF9800',        // Warnings, extensions
  error: '#F44336',          // Errors, abandoned
  focus: '#FDB44B',          // Active focus state

  // Gradients
  honeyGradient: ['#FDB44B', '#F5A623'],
  surfaceGradient: ['#FFFBF5', '#FFF4E0'],
};
```

#### Dark Mode Palette
```javascript
export const darkColors = {
  // Backgrounds
  background: '#0F0F0F',     // comb900
  surface: '#1A1A1A',        // beeBlack
  surfaceElevated: '#2C2C2C', // comb700

  // Honey (slightly brighter in dark)
  honeyLight: '#FFB84D',
  honey: '#F5A623',
  honeyDeep: '#E69500',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#ADADAD',  // comb300
  textTertiary: '#6B6B6B',   // comb500

  // Semantic (same as light mode)
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};
```

#### Color Usage Rules
```javascript
// Light Mode
background: colors.waxWhite,
surface: '#FFFFFF',
text: colors.beeBlack,
textSecondary: colors.beeGray,
border: colors.comb100,
accent: colors.honey,

// Dark Mode
background: darkColors.background,
surface: darkColors.surface,
text: darkColors.textPrimary,
textSecondary: darkColors.textSecondary,
border: darkColors.comb700,
accent: darkColors.honey,
```

---

### Typography

#### Font Families
```javascript
export const fonts = {
  // iOS
  ios: {
    display: 'SF Pro Display',
    text: 'SF Pro Text',
    mono: 'SF Mono',
  },

  // Android
  android: {
    display: 'Roboto',
    text: 'Roboto',
    mono: 'Roboto Mono',
  },

  // Web fallback
  web: {
    display: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    text: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'JetBrains Mono, "SF Mono", Monaco, monospace',
  },
};
```

#### Type Scale
```javascript
export const typography = {
  // Display
  displayLarge: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700',
    letterSpacing: -0.5,
  },

  display: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: -0.5,
  },

  // Headlines
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    letterSpacing: 0,
  },

  headlineSmall: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: 0,
  },

  // Body
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: 0,
  },

  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0,
  },

  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0,
  },

  // Special
  timer: {
    fontSize: 72,
    lineHeight: 72,
    fontWeight: '500',
    fontFamily: 'mono', // Use mono font
    letterSpacing: -1,
  },

  // Labels
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0,
  },
};
```

---

### Spacing

#### 8-Point Grid System
```javascript
export const spacing = {
  1: 4,    // 0.25rem
  2: 8,    // 0.5rem
  3: 12,   // 0.75rem
  4: 16,   // 1rem
  5: 20,   // 1.25rem
  6: 24,   // 1.5rem
  8: 32,   // 2rem
  10: 40,  // 2.5rem
  12: 48,  // 3rem
  16: 64,  // 4rem
  20: 80,  // 5rem
  24: 96,  // 6rem
};

// Usage
padding: spacing[4],        // 16px
marginBottom: spacing[6],   // 24px
gap: spacing[3],           // 12px
```

#### Layout Spacing
```javascript
export const layout = {
  screenPadding: spacing[4],        // 16px horizontal
  sectionSpacing: spacing[8],       // 32px between sections
  cardPadding: spacing[5],          // 20px inside cards
  listItemSpacing: spacing[3],      // 12px between list items
  modalPadding: spacing[6],         // 24px modal content
};
```

---

### Border Radius

```javascript
export const borderRadius = {
  none: 0,
  small: 8,      // Buttons, inputs
  medium: 12,    // Cards, modals
  large: 16,     // Large cards, screens
  xlarge: 24,    // Hero elements
  full: 9999,    // Circular (use with square dimensions)
};
```

---

### Shadows

```javascript
// Light Mode
export const shadows = {
  // Elevation 1 - Subtle (hover states)
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  // Elevation 2 - Default (cards)
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  // Elevation 3 - Raised (active cards, modals)
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },

  // Elevation 4 - Floating (FAB, tooltips)
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 8,
  },

  // Colored shadow (for primary buttons)
  honey: {
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
};

// Dark Mode - More prominent shadows
export const darkShadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },

  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },

  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 5,
  },
};
```

---

## Components

### Buttons

#### Primary Button
```javascript
const PrimaryButton = StyleSheet.create({
  container: {
    backgroundColor: colors.honey,
    borderRadius: borderRadius.small,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...shadows.honey,
  },

  text: {
    ...typography.body,
    fontWeight: '600',
    color: colors.beeBlack,
  },

  // States
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  disabled: {
    backgroundColor: colors.comb300,
    shadowOpacity: 0,
  },
});

// With gradient (optional, use library like react-native-linear-gradient)
gradient: {
  colors: colors.honeyGradient,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  angle: 135,
}
```

#### Secondary Button
```javascript
const SecondaryButton = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.comb100,
    borderRadius: borderRadius.small,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },

  text: {
    ...typography.body,
    fontWeight: '600',
    color: colors.beeBlack,
  },

  pressed: {
    borderColor: colors.honey,
    backgroundColor: 'rgba(245, 166, 35, 0.05)',
  },
});
```

#### Icon Button
```javascript
const IconButton = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.comb50,
  },

  pressed: {
    backgroundColor: colors.honey,
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: colors.beeBlack,
  },
});
```

#### FAB (Floating Action Button)
```javascript
const FAB = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing[6],
    right: spacing[4],
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.honey,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.xl,
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: colors.beeBlack,
  },
});
```

---

### Input Fields

```javascript
const Input = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },

  label: {
    ...typography.bodySmall,
    color: colors.beeGray,
    marginBottom: spacing[2],
  },

  input: {
    backgroundColor: colors.comb50,
    borderWidth: 2,
    borderColor: colors.comb100,
    borderRadius: borderRadius.small,
    paddingVertical: 14,
    paddingHorizontal: 16,
    ...typography.body,
    color: colors.beeBlack,
    minHeight: 48,
  },

  focused: {
    borderColor: colors.honey,
    backgroundColor: '#FFFFFF',
    // Add glow with shadow
    shadowColor: colors.honey,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  error: {
    borderColor: colors.error,
  },

  disabled: {
    backgroundColor: colors.comb100,
    opacity: 0.6,
  },

  placeholder: {
    color: colors.comb300,
  },

  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing[1],
  },
});
```

---

### Cards

```javascript
const Card = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.medium,
    padding: spacing[5],
    marginBottom: spacing[4],
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.comb100,
  },

  // Active/selected state
  active: {
    borderWidth: 2,
    borderColor: colors.honey,
    backgroundColor: colors.pollen,
    ...shadows.lg,
  },

  // Pressable state
  pressed: {
    transform: [{ scale: 0.98 }],
    ...shadows.sm,
  },
});

// Active Box Card (special styling)
const ActiveBoxCard = StyleSheet.create({
  container: {
    backgroundColor: colors.waxWhite,
    borderRadius: borderRadius.large,
    padding: spacing[6],
    marginBottom: spacing[4],
    borderWidth: 2,
    borderColor: colors.honey,
    ...shadows.honey,
  },
});
```

---

### Progress Indicators

#### Progress Ring (Focus Mode)
```javascript
// Using react-native-svg
const ProgressRing = {
  size: 280,
  strokeWidth: 8,

  // Background circle
  background: {
    stroke: colors.comb100,
    strokeWidth: 8,
    fill: 'transparent',
  },

  // Progress circle
  progress: {
    stroke: colors.honey,  // Or use gradient
    strokeWidth: 8,
    fill: 'transparent',
    strokeLinecap: 'round',
    // Animate strokeDashoffset based on progress
  },

  // Gradient (SVG LinearGradient)
  gradient: {
    id: 'honeyGradient',
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '100%',
    stops: [
      { offset: '0%', stopColor: colors.honeyLight },
      { offset: '100%', stopColor: colors.honey },
    ],
  },
};
```

#### Progress Bar (Linear)
```javascript
const ProgressBar = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: colors.comb100,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },

  fill: {
    height: '100%',
    backgroundColor: colors.honey,
    borderRadius: borderRadius.full,
    // Animate width based on progress
  },

  // With gradient
  gradient: {
    height: '100%',
    // Use LinearGradient component
    colors: colors.honeyGradient,
  },
});
```

#### Hexagonal Progress (Weekly)
```javascript
const HexagonProgress = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[1],
  },

  hexagon: {
    width: 32,
    height: 36,
    // Use react-native-svg or clipPath
    // Each hexagon represents 1 box
  },

  empty: {
    backgroundColor: colors.comb100,
  },

  filled: {
    backgroundColor: colors.honey,
  },

  // SVG path for hexagon shape
  path: 'M16 0 L32 9 L32 27 L16 36 L0 27 L0 9 Z',
};
```

---

### Modal / Bottom Sheet

```javascript
const Modal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: borderRadius.large,
    borderTopRightRadius: borderRadius.large,
    padding: spacing[6],
    paddingBottom: spacing[8],
    ...shadows.xl,
  },

  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.comb300,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
    marginBottom: spacing[4],
  },

  title: {
    ...typography.headline,
    marginBottom: spacing[4],
  },
});
```

---

### List Items

```javascript
const ListItem = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.comb100,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.small,
    borderWidth: 2,
    borderColor: colors.comb300,
    marginRight: spacing[3],
  },

  checked: {
    backgroundColor: colors.honey,
    borderColor: colors.honey,
  },

  content: {
    flex: 1,
  },

  title: {
    ...typography.body,
    color: colors.beeBlack,
  },

  subtitle: {
    ...typography.bodySmall,
    color: colors.beeGray,
    marginTop: spacing[1],
  },

  completed: {
    textDecorationLine: 'line-through',
    color: colors.comb500,
  },
});
```

---

### Chips / Tags

```javascript
const Chip = StyleSheet.create({
  container: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: borderRadius.full,
    backgroundColor: colors.pollen,
    alignSelf: 'flex-start',
  },

  text: {
    ...typography.bodySmall,
    color: colors.beeBlack,
    fontWeight: '600',
  },

  // Variants
  selected: {
    backgroundColor: colors.honey,
  },

  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.comb300,
  },
});
```

---

## Animations

### Timing Functions
```javascript
export const animations = {
  // Durations (ms)
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 400,
    slower: 600,
  },

  // Easing
  easing: {
    easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  },
};
```

### Common Animations

#### Fade In/Out
```javascript
import { Animated } from 'react-native';

const opacity = new Animated.Value(0);

Animated.timing(opacity, {
  toValue: 1,
  duration: animations.duration.normal,
  useNativeDriver: true,
}).start();
```

#### Scale Press
```javascript
const scale = new Animated.Value(1);

// On press in
Animated.spring(scale, {
  toValue: 0.98,
  useNativeDriver: true,
}).start();

// On press out
Animated.spring(scale, {
  toValue: 1,
  friction: 3,
  tension: 40,
  useNativeDriver: true,
}).start();
```

#### Slide Up (Modal)
```javascript
const translateY = new Animated.Value(300);

Animated.spring(translateY, {
  toValue: 0,
  friction: 8,
  tension: 40,
  useNativeDriver: true,
}).start();
```

#### Breathing Background (Focus Mode)
```javascript
import { Animated, Easing } from 'react-native';

const breatheScale = new Animated.Value(1);

Animated.loop(
  Animated.sequence([
    Animated.timing(breatheScale, {
      toValue: 1.02,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }),
    Animated.timing(breatheScale, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }),
  ])
).start();
```

---

## Hexagon System

### Hexagon SVG Path
```javascript
// Regular hexagon (pointy top)
const hexagonPath = (width, height) => {
  const w = width;
  const h = height;
  return `M${w/2} 0 L${w} ${h*0.25} L${w} ${h*0.75} L${w/2} ${h} L0 ${h*0.75} L0 ${h*0.25} Z`;
};

// Usage with react-native-svg
import Svg, { Path } from 'react-native-svg';

<Svg width={32} height={36}>
  <Path
    d={hexagonPath(32, 36)}
    fill={colors.honey}
  />
</Svg>
```

### Hexagon Background Pattern
```javascript
// Very subtle hexagon grid for backgrounds
const HexagonPattern = {
  // Use SVG pattern or image
  opacity: 0.03,
  scale: 1.0,

  // Animation for "breathing" effect
  breathe: {
    scaleFrom: 1.0,
    scaleTo: 1.02,
    duration: 4000,
  },
};
```

---

## Icons

### Icon System
```javascript
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,  // Default
  lg: 32,
  xl: 48,
};

const Icon = StyleSheet.create({
  container: {
    width: iconSizes.md,
    height: iconSizes.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Icon colors
  primary: {
    tintColor: colors.beeBlack,
  },

  secondary: {
    tintColor: colors.beeGray,
  },

  accent: {
    tintColor: colors.honey,
  },

  disabled: {
    tintColor: colors.comb500,
  },
});
```

### Required Icons
See `03-Asset-Requirements.md` for complete list.

---

## Accessibility

### Color Contrast
```javascript
// WCAG AA Compliant combinations
const accessiblePairs = {
  // Text on backgrounds
  textOnWhite: colors.beeBlack,        // 16.1:1 (AAA)
  textOnHoney: colors.beeBlack,        // Good contrast
  textOnDark: '#FFFFFF',               // 16.1:1 (AAA)

  // Never use
  honeyOnWhite: 'AVOID for small text', // 3.8:1 (AA Large only)
};
```

### Focus Indicators
```javascript
const FocusIndicator = StyleSheet.create({
  outline: {
    borderWidth: 2,
    borderColor: colors.honey,
    borderRadius: borderRadius.small,
  },

  glow: {
    shadowColor: colors.honey,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
```

### Touch Targets
```javascript
// Minimum touch target: 44x44 points
const minTouchTarget = {
  minWidth: 44,
  minHeight: 44,
};

// For smaller visual elements, increase hit area
const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};
```

---

## Platform Specifics

### iOS Specific
```javascript
import { Platform } from 'react-native';

const iosStyles = Platform.OS === 'ios' ? {
  // Use native blur
  useBlurView: true,

  // Safe area handling
  paddingTop: safeAreaInsets.top,
  paddingBottom: safeAreaInsets.bottom,

  // Status bar
  statusBarStyle: 'dark-content', // or 'light-content' for dark mode
} : {};
```

### Android Specific
```javascript
const androidStyles = Platform.OS === 'android' ? {
  // Elevation for shadows
  elevation: 3,

  // Status bar
  StatusBar.setBackgroundColor(colors.waxWhite),
  StatusBar.setBarStyle('dark-content'),

  // Ripple effect
  background: {
    android_ripple: {
      color: colors.honey,
      borderless: false,
    },
  },
} : {};
```

---

## Dark Mode

### Theme Provider
```javascript
import { useColorScheme } from 'react-native';

const theme = useColorScheme() === 'dark' ? darkColors : colors;

// Usage
<View style={{ backgroundColor: theme.background }}>
  <Text style={{ color: theme.textPrimary }}>Hello</Text>
</View>
```

### Auto-switching Components
```javascript
const ThemedCard = StyleSheet.create({
  light: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.comb100,
  },

  dark: {
    backgroundColor: darkColors.surface,
    borderColor: darkColors.comb700,
  },
});
```

---

## Export / Usage

### Design Tokens Export
```javascript
// tokens.js
export const tokens = {
  colors,
  darkColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  darkShadows,
  animations,
  layout,
};

// Usage in components
import { tokens } from './tokens';

const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing[4],
    backgroundColor: tokens.colors.waxWhite,
    borderRadius: tokens.borderRadius.medium,
    ...tokens.shadows.md,
  },

  title: {
    ...tokens.typography.headline,
    color: tokens.colors.beeBlack,
  },
});
```

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2024-11-28 | Initial design system | UX Expert (Sally) |

---

**Next Steps:**
1. Review and approve design tokens
2. Set up theme provider in React Native
3. Create reusable component library
4. Implement dark mode support
5. Create Storybook for component showcase (optional)

---

**Questions?** Reference the PRD for additional context or see Screen Specifications for detailed layouts.

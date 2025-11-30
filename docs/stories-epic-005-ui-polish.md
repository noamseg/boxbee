# User Stories: EPIC-005 - UI/Visual Polish Pass

## Epic Context
**Epic**: UI/Visual Polish Pass
**Epic ID**: EPIC-005
**Priority**: Medium
**Dependencies**: None (but should be done after other epics are complete)
**Business Value**: Improve perceived quality and reduce cognitive load

---

## Story 1: Consistent Icon System

### Story Details
**Story ID**: BB-051
**Title**: As a user, I want consistent icons so the app feels more professional
**Priority**: P0 (Critical)
**Story Points**: 3
**Sprint**: Sprint 1

### User Story
```
As a visual learner who processes UI quickly
I want all icons to follow a consistent design system
So that the app feels polished and I can recognize actions instantly
```

### Acceptance Criteria
- [ ] All icons use SF Symbols (iOS) or Material Icons (Android)
- [ ] Icon sizes consistent: Small (16px), Medium (24px), Large (32px)
- [ ] Icon weights consistent: Regular for most, Bold for emphasis
- [ ] Color usage consistent: Primary for actions, Gray for inactive, Category colors for categories
- [ ] Replace all custom/mismatched icons with system icons
- [ ] Icons align with text baselines correctly
- [ ] Touch targets minimum 44x44px (iOS HIG compliance)
- [ ] Icon inventory document created listing all icons and usage

### Icons to Update
```
Navigation:
- Home: house.fill (SF) / home (Material)
- Calendar: calendar (SF) / event (Material)
- Completed: checkmark.circle (SF) / check_circle (Material)
- Settings: gearshape (SF) / settings (Material)

Box States:
- Scheduled: clock (SF) / schedule (Material)
- Active: play.circle.fill (SF) / play_circle_filled (Material)
- Paused: pause.circle (SF) / pause_circle (Material)
- Completed: checkmark.circle.fill (SF) / check_circle (Material)
- Cancelled: xmark.circle (SF) / cancel (Material)

Actions:
- Create: plus.circle.fill (SF) / add_circle (Material)
- Edit: pencil (SF) / edit (Material)
- Delete: trash (SF) / delete (Material)
- Archive: archivebox (SF) / archive (Material)
- Restore: arrow.uturn.backward (SF) / restore (Material)

Categories:
- Work: briefcase.fill (SF) / work (Material)
- Personal: person.fill (SF) / person (Material)
- Health: heart.fill (SF) / favorite (Material)
- Learning: book.fill (SF) / menu_book (Material)

Integrations:
- Spotify: Custom Spotify icon
- Google Calendar: Custom Google icon
- AI/OpenAI: sparkles (SF) / auto_awesome (Material)
```

### Technical Notes
- Installation:
  ```bash
  # React Native Vector Icons
  npm install react-native-vector-icons
  ```
- Component wrapper:
  ```typescript
  import Icon from 'react-native-vector-icons/Ionicons';
  import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
  import { Platform } from 'react-native';

  interface AppIconProps {
    name: string;
    size?: number;
    color?: string;
  }

  export const AppIcon: React.FC<AppIconProps> = ({
    name,
    size = 24,
    color = theme.colors.text
  }) => {
    const IconComponent = Platform.OS === 'ios' ? Icon : MaterialIcon;
    return <IconComponent name={name} size={size} color={color} />;
  };
  ```
- Icon mapping:
  ```typescript
  const iconMap = {
    home: { ios: 'home', android: 'home' },
    calendar: { ios: 'calendar', android: 'event' },
    completed: { ios: 'checkmark-circle', android: 'check-circle' },
    // ... all icons
  };
  ```

### Definition of Done
- [ ] All icons replaced with system icons
- [ ] Icon component wrapper created
- [ ] Sizes standardized (16/24/32px)
- [ ] Colors consistent with design system
- [ ] Touch targets meet 44x44px minimum
- [ ] Icon inventory document created
- [ ] Visual QA review passed
- [ ] Tested on iOS and Android
- [ ] Designer approval

---

## Story 2: Improved Visual Hierarchy

### Story Details
**Story ID**: BB-052
**Title**: As a user, I want better visual hierarchy so I can scan my boxes quickly
**Priority**: P0 (Critical)
**Story Points**: 5
**Sprint**: Sprint 1

### User Story
```
As a busy user who glances at my schedule frequently
I want clear visual hierarchy in the UI
So that I can quickly identify what's important
```

### Acceptance Criteria
- [ ] Typography scale applied consistently:
  - H1: 32px Bold (Page titles)
  - H2: 24px Semibold (Section headers)
  - H3: 18px Medium (Card titles)
  - Body: 16px Regular (Body text)
  - Caption: 14px Regular (Metadata)
  - Small: 12px Regular (Labels)
- [ ] Color hierarchy:
  - High emphasis: Primary text color (black/white)
  - Medium emphasis: Secondary text (gray-700/gray-300)
  - Low emphasis: Tertiary text (gray-500)
- [ ] Spacing follows 8px grid system
- [ ] Active/important elements have higher visual weight
- [ ] Completed/archived elements have lower visual weight (muted)
- [ ] Clear separation between sections (dividers, cards, spacing)
- [ ] Focus state clearly visible (box shadow, border, color change)

### Design Updates

**Box Card Hierarchy:**
```
┌─────────────────────────────────────────┐
│ Team Meeting                      [⋮]  │  ← H3, high emphasis
│ 2:00 PM - 3:00 PM · 1 hour             │  ← Body, medium emphasis
│ Work                                    │  ← Caption, category badge
│ Discuss Q4 roadmap and priorities      │  ← Caption, low emphasis
└─────────────────────────────────────────┘
```

**Section Headers:**
```
Upcoming                           [See All]  ← H2
─────────────────────────────────────────────  ← Divider
```

**Navigation Tabs:**
```
Active: Bold label + Icon tinted primary
Inactive: Regular label + Icon tinted gray-500
```

### Technical Notes
- Typography system:
  ```typescript
  // theme.ts
  export const typography = {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32
    },
    h3: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 24
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20
    },
    small: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16
    }
  };
  ```
- Text component:
  ```typescript
  interface TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
    color?: 'primary' | 'secondary' | 'tertiary';
    weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  }

  export const Text: React.FC<TextProps> = ({
    variant = 'body',
    color = 'primary',
    weight,
    children,
    ...props
  }) => {
    const style = [
      typography[variant],
      { color: theme.colors.text[color] },
      weight && { fontWeight: fontWeights[weight] }
    ];

    return <RNText style={style} {...props}>{children}</RNText>;
  };
  ```
- Spacing scale:
  ```typescript
  export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  };
  ```

### Definition of Done
- [ ] Typography scale defined and applied
- [ ] Color hierarchy implemented
- [ ] 8px spacing grid enforced
- [ ] All text components use Text wrapper
- [ ] Visual weight reflects importance
- [ ] Section separation clear
- [ ] Focus states visible
- [ ] Design system documentation updated
- [ ] Visual QA review passed
- [ ] Designer approval

---

## Story 3: Smooth Transitions and Micro-interactions

### Story Details
**Story ID**: BB-053
**Title**: As a user, I want smooth transitions so the app feels polished
**Priority**: P1 (High)
**Story Points**: 3
**Sprint**: Sprint 2

### User Story
```
As a user who appreciates delightful experiences
I want smooth animations and transitions
So that the app feels responsive and high-quality
```

### Acceptance Criteria
- [ ] Page transitions: Smooth slide/fade (300ms duration)
- [ ] Modal animations: Scale up from center with fade
- [ ] List item animations: Staggered fade-in when loading
- [ ] Button press: Scale down 0.95x on touch
- [ ] Swipe actions: Smooth reveal with haptic feedback
- [ ] Box state changes: Color transition (200ms)
- [ ] Loading states: Skeleton screens instead of spinners
- [ ] Delete/archive: Slide out animation before removal
- [ ] Success actions: Subtle bounce or checkmark animation
- [ ] All animations 60fps (no janky motion)
- [ ] Reduced motion: Respect accessibility setting

### Animations to Implement

**Button Press:**
```typescript
const AnimatedButton: React.FC = ({ onPress, children }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};
```

**List Item Stagger:**
```typescript
const AnimatedList: React.FC = ({ items }) => {
  return items.map((item, index) => (
    <Animated.View
      key={item.id}
      entering={FadeInDown.delay(index * 50).springify()}
      exiting={FadeOutUp.springify()}
    >
      <ListItem data={item} />
    </Animated.View>
  ));
};
```

**Success Checkmark:**
```typescript
const SuccessCheckmark: React.FC = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Icon name="checkmark-circle" size={64} color="green" />
    </Animated.View>
  );
};
```

### Technical Notes
- Animation library: `react-native-reanimated` (better performance)
- Haptics: `expo-haptics` for tactile feedback
  ```typescript
  import * as Haptics from 'expo-haptics';

  const handleDelete = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // ... delete logic
  };
  ```
- Accessibility: Respect `prefers-reduced-motion`
  ```typescript
  import { AccessibilityInfo } from 'react-native';

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReducedMotion);
  }, []);

  const animationDuration = reducedMotion ? 0 : 300;
  ```

### Definition of Done
- [ ] All page transitions animated
- [ ] Modal animations smooth
- [ ] List items stagger on load
- [ ] Button press feedback implemented
- [ ] Swipe actions with haptics
- [ ] State change transitions
- [ ] Skeleton loading screens
- [ ] Delete/archive animations
- [ ] Success animations
- [ ] 60fps maintained (profiled)
- [ ] Reduced motion setting respected
- [ ] QA tested on iOS and Android

---

## Story 4: Dark Mode Optimization

### Story Details
**Story ID**: BB-054
**Title**: As a user, I want dark mode to look great on OLED screens
**Priority**: P1 (High)
**Story Points**: 2
**Sprint**: Sprint 2

### User Story
```
As a user who prefers dark mode
I want the dark theme optimized for OLED displays
So that it's easy on my eyes and saves battery
```

### Acceptance Criteria
- [ ] True black backgrounds (#000000) for OLED battery savings
- [ ] Text colors optimized for readability on dark (not pure white)
- [ ] Category colors adjusted for dark mode (desaturated, higher luminosity)
- [ ] Elevation system: Subtle borders instead of shadows
- [ ] Input fields: Slightly elevated backgrounds
- [ ] No pure white anywhere (max #F5F5F5 equivalent in dark)
- [ ] Auto-switch based on system preference
- [ ] Manual override toggle in Settings
- [ ] Theme persists across app restarts
- [ ] Smooth transition when switching themes (fade)

### Color Palette - Dark Mode
```typescript
export const darkTheme = {
  colors: {
    // Backgrounds
    background: '#000000',      // True black for OLED
    surface: '#1C1C1E',         // Elevated surfaces
    surfaceElevated: '#2C2C2E', // Modals, cards

    // Text
    textPrimary: '#F5F5F5',     // Not pure white
    textSecondary: '#ABABAB',
    textTertiary: '#8E8E93',

    // Primary
    primary: '#FFD60A',         // Brighter honey for dark
    primaryVariant: '#FFC700',

    // Status colors (adjusted for dark)
    success: '#32D74B',         // iOS green for dark
    warning: '#FF9F0A',         // iOS orange for dark
    error: '#FF453A',           // iOS red for dark

    // Category colors (desaturated for dark)
    categoryWork: '#64D2FF',    // Lighter blue
    categoryPersonal: '#BF5AF2', // Purple
    categoryHealth: '#FF6482',  // Pink
    categoryLearning: '#FFD60A', // Yellow

    // Borders & dividers
    border: '#38383A',
    divider: '#38383A',

    // Special
    overlay: 'rgba(0, 0, 0, 0.5)'
  }
};
```

### Light Mode Colors (for comparison)
```typescript
export const lightTheme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceElevated: '#FFFFFF',

    textPrimary: '#000000',
    textSecondary: '#3C3C43',
    textTertiary: '#8E8E93',

    primary: '#F7B32B',
    primaryVariant: '#E0A020',

    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',

    categoryWork: '#007AFF',
    categoryPersonal: '#AF52DE',
    categoryHealth: '#FF2D55',
    categoryLearning: '#FF9500',

    border: '#C6C6C8',
    divider: '#E5E5EA',

    overlay: 'rgba(0, 0, 0, 0.3)'
  }
};
```

### Technical Notes
- Theme provider:
  ```typescript
  import { useColorScheme } from 'react-native';

  const ThemeProvider: React.FC = ({ children }) => {
    const systemTheme = useColorScheme();
    const [themeOverride, setThemeOverride] = useState<'light' | 'dark' | 'auto'>('auto');

    const theme = useMemo(() => {
      if (themeOverride === 'auto') {
        return systemTheme === 'dark' ? darkTheme : lightTheme;
      }
      return themeOverride === 'dark' ? darkTheme : lightTheme;
    }, [systemTheme, themeOverride]);

    return (
      <ThemeContext.Provider value={{ theme, setThemeOverride }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  ```
- Smooth theme transition:
  ```typescript
  const [theme, setTheme] = useState(lightTheme);
  const opacity = useRef(new Animated.Value(1)).current;

  const switchTheme = (newTheme) => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();

    setTimeout(() => setTheme(newTheme), 150);
  };
  ```

### Definition of Done
- [ ] Dark theme colors defined
- [ ] True black backgrounds implemented
- [ ] Text colors optimized for readability
- [ ] Category colors adjusted
- [ ] Elevation system works in dark mode
- [ ] Auto-switch based on system
- [ ] Manual toggle in Settings
- [ ] Theme persists on restart
- [ ] Smooth transition animation
- [ ] All screens reviewed in both modes
- [ ] QA tested on OLED devices
- [ ] Designer approval

---

## Additional Stories (Future Backlog)

### Backlog Stories
**BB-055**: Custom theme colors (user can choose accent color)
**BB-056**: High contrast mode for accessibility
**BB-057**: Adaptive icons (iOS 18+ tinted icons)
**BB-058**: Seasonal themes (holiday themes, etc.)

---

## Story Dependencies Graph

```
BB-051 (Icon system)  ──┐
                        ├──→ All work together
BB-052 (Visual hierarchy)┤    (can be parallel)
                        │
BB-053 (Animations)  ───┤
                        │
BB-054 (Dark mode)  ────┘
```

---

## Sprint Planning

### Sprint 1 (1 week)
- BB-051: Consistent icon system
- BB-052: Visual hierarchy improvements
- **Goal**: Professional, scannable UI

### Sprint 2 (1 week)
- BB-053: Smooth transitions
- BB-054: Dark mode optimization
- **Goal**: Polished, delightful experience

---

## Testing Plan

### Visual QA
- Compare before/after screenshots for all screens
- Icon audit: Verify all icons from system library
- Typography audit: Verify font sizes, weights, line heights
- Spacing audit: Measure with design tools (8px grid)
- Color contrast: WCAG AA compliance (4.5:1 for text)

### Animation Testing
- Frame rate profiling: Maintain 60fps
- Timing verification: Animations feel natural (not too fast/slow)
- Accessibility: Reduced motion works correctly

### Device Testing
- OLED devices (iPhone X+, Samsung Galaxy S20+): Dark mode battery impact
- Large screens (iPad, tablets): Spacing scales appropriately
- Small screens (iPhone SE): Elements not cramped
- Both iOS and Android: Icons, typography render correctly

### User Acceptance Testing
- 10 users test both light and dark modes
- Metrics: % who notice and appreciate polish
- Success criteria: 80%+ rate UI as "professional" or "delightful"
- Collect feedback on readability, scannability

---

## Design System Documentation

### Components to Document
- Typography scale with usage guidelines
- Color palette with semantic usage
- Icon library with mappings
- Spacing scale
- Animation durations and easings
- Elevation system (shadows/borders)

### Documentation Format
Create `/docs/design-system.md`:
```markdown
# BoxBee Design System

## Colors
- Primary: #F7B32B (Honey) - CTAs, active states
- Success: #34C759 - Completed boxes
- ...

## Typography
- H1 (32px Bold): Page titles only
- H2 (24px Semibold): Section headers
- ...

## Icons
- All icons use SF Symbols (iOS) / Material Icons (Android)
- Sizes: 16px (small), 24px (default), 32px (large)
- ...

## Spacing
- Follow 8px grid
- Component padding: 16px
- ...
```

---

**Document End**

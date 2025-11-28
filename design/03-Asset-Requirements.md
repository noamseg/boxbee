# BoxBee Asset Requirements

**Version:** 1.0
**Date:** November 28, 2024
**Purpose:** Complete inventory of design assets needed for development

---

## Overview

This document catalogs all visual and media assets required to build BoxBee. Assets are organized by category with specifications for format, size, and usage.

**Design Principles:**
- Modern, minimal aesthetic
- Bee/hexagon/honey theme (tasteful, not cartoonish)
- Consistent stroke weights and corner radii
- Scalable vector formats where possible

**Reference:**
- `01-Design-System.md` for colors, spacing, and component specs
- `02-Screen-Specifications.md` for context and placement

---

## 1. App Icons & Branding

### 1.1 App Icon

**Primary App Icon:**
- **Sizes (iOS):**
  - 1024x1024px (App Store)
  - 180x180px (@3x, iPhone)
  - 120x120px (@2x, iPhone)
  - 167x167px (@2x, iPad Pro)
  - 152x152px (@2x, iPad)
  - 76x76px (@1x, iPad)

- **Sizes (Android):**
  - 512x512px (Play Store)
  - 192x192px (xxxhdpi)
  - 144x144px (xxhdpi)
  - 96x96px (xhdpi)
  - 72x72px (hdpi)
  - 48x48px (mdpi)
  - Adaptive icon: 108x108dp foreground + background layers

**Design Specs:**
- **Concept:** Minimalist bee inside hexagon
- **Background:** Honey gradient (#FDB44B → #F5A623)
- **Foreground:** Simplified bee silhouette in beeBlack (#1A1A1A)
- **Style:** Flat design, no gradients on bee, clean geometric shapes
- **No text:** Icon only, no "BoxBee" text

**Deliverables:**
```
/assets/app-icon/
  ios/
    AppIcon.appiconset/
      icon-1024.png
      icon-60@2x.png
      icon-60@3x.png
      ... (all iOS sizes)
  android/
    mipmap-mdpi/ic_launcher.png
    mipmap-hdpi/ic_launcher.png
    ... (all Android densities)
    ic_launcher_foreground.xml
    ic_launcher_background.xml
```

---

### 1.2 Launch Screen (Splash)

**iOS:**
- **Format:** LaunchScreen.storyboard with centered logo
- **Background:** White (#FFFFFF)
- **Logo:** Bee icon (120x120pt) centered
- **No loading indicators** (iOS guidelines)

**Android:**
- **Format:** XML drawable
- **Background:** Honey cream (#FFF5E1)
- **Logo:** Vector drawable, 120dp centered
- **Optional:** Fade out animation

**Deliverable:**
```
/assets/splash/
  ios/LaunchScreen.storyboard
  android/drawable/splash_background.xml
```

---

## 2. Custom Icons

### 2.1 Tab Bar Icons

**Required Icons (24x24dp base):**

1. **Home (Today View)**
   - **Inactive:** House outline, gray600, 1.5pt stroke
   - **Active:** House filled, honeyDeep
   - **Design:** Simple house with peaked roof, minimal detail

2. **Insights**
   - **Inactive:** Lightbulb outline, gray600
   - **Active:** Lightbulb filled with sparkle, honeyDeep
   - **Design:** Rounded bulb, small spark at top when active

3. **Settings**
   - **Inactive:** Gear/cog outline, gray600
   - **Active:** Gear filled, honeyDeep
   - **Design:** 6-tooth gear, hexagonal center hole

**Format:** SVG (source) + React Native compatible (react-native-svg)
**Sizes:** 24x24dp (base), 32x32dp (Android large text), 48x48dp (@3x)

**Deliverable:**
```
/assets/icons/tabs/
  home-outline.svg
  home-filled.svg
  insights-outline.svg
  insights-filled.svg
  settings-outline.svg
  settings-filled.svg
```

---

### 2.2 Action Icons

**Standard Size:** 24x24dp
**Stroke:** 1.5-2pt, rounded caps/joins
**Color:** Inherit from parent (themed)

**Required Icons:**

| Icon Name | Usage | Design Notes |
|-----------|-------|--------------|
| `plus` | Create box (FAB) | Rounded + symbol, 3pt stroke |
| `close` | Close modals | X shape, 2pt stroke |
| `arrow-right` | Next actions | Right chevron, rounded |
| `arrow-left` | Back navigation | Left chevron |
| `pause` | Pause focus mode | Two vertical bars |
| `play` | Resume focus | Triangle pointing right |
| `stop` | End box early | Square, rounded corners |
| `check` | Mark complete | Rounded checkmark |
| `edit` | Edit box | Pencil, 45° angle |
| `delete` | Delete box | Trash can outline |
| `calendar` | Schedule | Grid calendar, minimal |
| `clock` | Time/duration | Clock face, hands at 3:00 |
| `notification-bell` | Alerts | Bell outline, minimal |
| `microphone` | Voice input | Classic mic shape |
| `share` | Share report | iOS-style share (arrow up from box) |
| `more-horizontal` | More options | Three dots horizontal |
| `more-vertical` | More options | Three dots vertical |
| `info` | Information | Circle with 'i' |
| `warning` | Errors/alerts | Triangle with '!' |
| `success` | Success states | Circle with checkmark |

**Deliverable:**
```
/assets/icons/actions/
  plus.svg
  close.svg
  arrow-right.svg
  ... (all action icons)
```

---

### 2.3 Category Icons (for boxes)

**Size:** 20x20dp
**Style:** Duotone (outline + subtle fill)
**Color:** Themed per category

**Icons Needed:**

| Category | Icon | Color |
|----------|------|-------|
| Email | Envelope | Blue (#3B82F6) |
| Writing | Pen/document | Purple (#8B5CF6) |
| Coding | Code brackets | Green (#10B981) |
| Meeting | People/chat | Orange (#F59E0B) |
| Creative | Palette | Pink (#EC4899) |
| Reading | Book open | Indigo (#6366F1) |
| Exercise | Dumbbell | Red (#EF4444) |
| Learning | Graduation cap | Teal (#14B8A6) |
| Planning | Checklist | Gray (#6B7280) |
| Break | Coffee cup | Brown (#92400E) |
| Other | Hexagon | Gray (#9CA3AF) |

**Deliverable:**
```
/assets/icons/categories/
  email.svg
  writing.svg
  coding.svg
  ... (all category icons)
```

---

### 2.4 System Icons (Use SF Symbols / Material Icons)

For standard system actions, use platform defaults:

**iOS (SF Symbols):**
- `person.circle` - Profile
- `gearshape` - Settings (fallback)
- `bell` - Notifications (fallback)
- `square.and.arrow.up` - Share (fallback)
- `ellipsis` - More options (fallback)

**Android (Material Icons):**
- `account_circle` - Profile
- `settings` - Settings
- `notifications` - Notifications
- `share` - Share
- `more_horiz` / `more_vert` - More options

**Implementation:** Import from platform libraries, no custom assets needed.

---

## 3. Bee Mascot Illustrations

### 3.1 Primary Bee Character

**Concept:**
- Simplified, geometric bee
- Friendly, not realistic
- Hexagonal body segments
- Minimal facial features (dots for eyes, simple smile)
- Rounded wings (slightly transparent)

**Color Palette:**
- Body: honeyDeep (#E69500) with darker stripes (#CC7A00)
- Wings: honeyCream (#FFF5E1) at 60% opacity
- Eyes: beeBlack (#1A1A1A)
- Outline: 2pt stroke, beeBlack

**Variations Needed:**

1. **Neutral Bee** (default)
   - Size: 120x120px
   - Standing upright, wings at rest
   - Slight smile
   - Usage: Welcome screen, empty states

2. **Excited Bee** (celebration)
   - Size: 140x140px
   - Wings spread wide
   - Big smile
   - Sparkles around bee
   - Usage: Completion celebration, success states

3. **Focused Bee** (working)
   - Size: 100x100px
   - Wearing tiny hexagonal "glasses"
   - Serious/concentrated expression
   - Small briefcase or tool
   - Usage: Focus mode, "working on..." states

4. **Sleeping Bee** (rest)
   - Size: 100x100px
   - Eyes closed, "Z Z Z" above
   - Relaxed posture
   - Usage: Quiet hours, DND mode

5. **Thinking Bee** (AI processing)
   - Size: 80x80px
   - Hand to chin (or antenna)
   - Question mark or lightbulb nearby
   - Usage: AI loading, "thinking..."

6. **Confused Bee** (error)
   - Size: 100x100px
   - Tilted head
   - Puzzled expression
   - Small "?" above head
   - Usage: Error states, troubleshooting

**Deliverable:**
```
/assets/illustrations/bee/
  bee-neutral.svg
  bee-excited.svg
  bee-focused.svg
  bee-sleeping.svg
  bee-thinking.svg
  bee-confused.svg
  bee-animated/ (see animation section)
```

---

### 3.2 Onboarding Illustrations

**Slide 1: Create Boxes**
- **Scene:** Box → Timer → Checkmark flow
- **Size:** 240x160px
- **Style:** Minimal line art with honey accent
- **Elements:**
  - Empty hexagon box (outline)
  - Arrow pointing right
  - Hexagon with timer icon
  - Arrow pointing right
  - Hexagon with checkmark (honey fill)
- **Colors:** Gray outlines, honey for complete state

**Slide 2: Focus Mode**
- **Scene:** Bee inside large hexagon with radiating focus lines
- **Size:** 240x160px
- **Style:** Geometric shapes, centered composition
- **Elements:**
  - Large hexagon frame
  - Focused bee (working)
  - Concentric hexagons fading out (focus effect)
- **Colors:** Honey gradient background, beeBlack for bee

**Slide 3: AI Insights**
- **Scene:** Bee + lightbulb + pattern graph
- **Size:** 240x160px
- **Style:** Modern tech illustration
- **Elements:**
  - Thinking bee (left)
  - Glowing lightbulb (center, honey glow)
  - Simple line graph showing upward trend (right)
- **Colors:** Honey for highlights, gray for graph

**Slide 4: Notifications**
- **Scene:** Bell with honey drip notification badge
- **Size:** 160x160px (centered, square)
- **Style:** Icon-based, simple
- **Elements:**
  - Large bell outline
  - Hexagonal notification badge (top right)
  - Small bee peeking from behind bell
- **Colors:** Gray bell, honey badge, cute bee

**Deliverable:**
```
/assets/illustrations/onboarding/
  slide-1-create.svg
  slide-2-focus.svg
  slide-3-insights.svg
  slide-4-notifications.svg
```

---

### 3.3 Empty State Illustrations

**Size:** 100x100px (consistent)
**Style:** Minimal, friendly, not sad

1. **No Boxes Yet**
   - Neutral bee with empty hexagon box
   - Welcoming posture

2. **No Insights**
   - Bee looking at empty chart/graph
   - Encouraging expression

3. **No Presets**
   - Bee with empty list/clipboard
   - Helpful gesture

4. **No Internet**
   - Bee tangled in disconnected cables
   - Confused but friendly

5. **Search No Results**
   - Bee with magnifying glass
   - Shrug gesture

**Deliverable:**
```
/assets/illustrations/empty-states/
  no-boxes.svg
  no-insights.svg
  no-presets.svg
  no-internet.svg
  no-results.svg
```

---

## 4. Decorative Elements

### 4.1 Hexagon Patterns

**Usage:** Backgrounds, decorative fills, progress indicators

**Variants:**

1. **Single Hexagon** (base shape)
   - **Size:** 40x40px base unit
   - **Format:** SVG path
   - **Stroke:** 2pt, gray300 or honey
   - **Fill:** Transparent or honey gradient

2. **Hexagon Grid Pattern**
   - **Size:** Tileable 200x200px
   - **Pattern:** Offset rows (honeycomb pattern)
   - **Opacity:** 0.05 (very subtle)
   - **Usage:** Background texture, focus mode

3. **Progress Hexagons** (individual)
   - **Sizes:** 24x24px, 32x32px, 40x40px
   - **States:** Empty (outline), Filling (gradient fill), Filled (solid)
   - **Animation:** Support for filling from top to bottom

**SVG Hexagon Path (40px):**
```svg
<svg width="40" height="40" viewBox="0 0 40 40">
  <path d="M20 2 L34 11 L34 29 L20 38 L6 29 L6 11 Z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"/>
</svg>
```

**Deliverable:**
```
/assets/shapes/
  hexagon-single.svg
  hexagon-grid-pattern.svg
  hexagon-progress-empty.svg
  hexagon-progress-filling.svg
  hexagon-progress-filled.svg
```

---

### 4.2 Honey Drip Effect

**Usage:** Completion animations, loading states

**Design:**
- Viscous liquid dripping down
- Honey color (#F5A623)
- Smooth, rounded shapes
- 3-4 frame animation

**Variants:**
1. **Single Drip** - For small elements
2. **Multiple Drips** - For larger areas
3. **Drip and Pool** - Fills container from bottom

**Deliverable:**
```
/assets/effects/
  honey-drip/
    frame-1.svg
    frame-2.svg
    frame-3.svg
    frame-4.svg
    drip-animated.json (Lottie)
```

---

## 5. Animations (Lottie)

**Format:** Lottie JSON (exported from After Effects)
**Optimization:** <50KB per animation
**FPS:** 30fps (mobile-optimized)

### 5.1 Core Animations

**1. Loading Spinner (Bee Flying)**
- **Duration:** 1.5s loop
- **Description:** Bee flies in circular path with wing flapping
- **Size:** 80x80px
- **Usage:** Loading states, AI processing
- **File:** `loading-bee.json`

**2. Box Complete Celebration**
- **Duration:** 2s (one-time)
- **Description:** Confetti explosion with hexagons
- **Elements:**
  - 15-20 hexagons in honey colors
  - Burst from center
  - Gravity fall with rotation
  - Fade out at bottom
- **Size:** Full screen
- **Usage:** Completion celebration (P1)
- **File:** `celebration-confetti.json`

**3. Honey Progress Fill**
- **Duration:** Variable (based on progress %)
- **Description:** Hexagon fills from top to bottom with honey
- **Style:** Viscous liquid effect, realistic flow
- **Size:** 40x40px base, scalable
- **Usage:** Progress indicators, focus mode
- **File:** `honey-fill.json`

**4. Welcome Bee Entrance**
- **Duration:** 1.2s (one-time)
- **Description:** Bee flies in from bottom-right with bounce
- **Elements:**
  - Wing flapping during flight
  - Bounce on landing
  - Settle into neutral pose
- **Size:** 120x120px
- **Usage:** Welcome screen, first launch
- **File:** `welcome-bee-entrance.json`

**5. Checkmark Success**
- **Duration:** 0.6s (one-time)
- **Description:** Hexagon scales in, checkmark draws
- **Style:** Line drawing animation
- **Color:** Success green → honeyDeep
- **Size:** 60x60px
- **Usage:** Success confirmations, form submissions
- **File:** `checkmark-success.json`

**6. Breathing Background (Focus Mode)**
- **Duration:** 8s loop (4s in, 4s out)
- **Description:** Subtle scale + opacity pulse
- **Effect:** Calming, meditative
- **Opacity range:** 0.3 → 0.5 → 0.3
- **Size:** Full screen overlay
- **Usage:** Focus mode background
- **File:** `breathing-background.json`

---

### 5.2 Micro-Interactions

**Button Interactions:**
- **Tap Feedback:** Scale 1.0 → 0.95 → 1.0 (200ms)
- **Honey Ripple:** Circular expand with honey color (300ms)

**Toggle Switches:**
- **ON:** Knob slides right with honey trail (250ms)
- **OFF:** Knob slides left, trail fades (250ms)

**Toast Notifications:**
- **Enter:** Slide up + fade in (300ms, ease-out)
- **Exit:** Slide down + fade out (200ms, ease-in)

**Modal Transitions:**
- **Present:** Slide up from bottom (400ms, spring)
- **Dismiss:** Slide down (300ms, ease-in)

**Implementation:** Use React Native Animated API (no Lottie needed for these)

---

## 6. Sounds & Haptics

### 6.1 Sound Effects (Optional, P1)

**Format:** .mp3 (iOS), .mp3/.ogg (Android)
**Duration:** <2 seconds each
**Volume:** Normalized to -6dB

**Sounds Needed:**

1. **Box Created**
   - **Description:** Light, positive chime
   - **Pitch:** Medium-high
   - **Duration:** 0.5s
   - **Feel:** Encouraging, friendly
   - **File:** `box-created.mp3`

2. **Timer Start**
   - **Description:** Gentle "begin" tone
   - **Pitch:** Rising (low → mid)
   - **Duration:** 0.8s
   - **Feel:** Focused, calm
   - **File:** `timer-start.mp3`

3. **Timer Complete**
   - **Description:** Pleasant bell chime
   - **Pitch:** High, clear
   - **Duration:** 1.2s
   - **Feel:** Accomplishment, celebration
   - **File:** `timer-complete.mp3`

4. **Notification (5 min warning)**
   - **Description:** Subtle alert tone
   - **Pitch:** Mid-range
   - **Duration:** 0.6s
   - **Feel:** Gentle reminder, not jarring
   - **File:** `notification-warning.mp3`

5. **Error/Problem**
   - **Description:** Soft error tone
   - **Pitch:** Low, short
   - **Duration:** 0.4s
   - **Feel:** Not harsh, just informative
   - **File:** `error.mp3`

**User Setting:** All sounds can be disabled in Settings > Notifications

**Deliverable:**
```
/assets/sounds/
  box-created.mp3
  timer-start.mp3
  timer-complete.mp3
  notification-warning.mp3
  error.mp3
```

---

### 6.2 Haptic Feedback Patterns

**Platform:** iOS (UIImpactFeedbackGenerator), Android (Vibration API)

**Haptic Events:**

| Event | iOS Haptic | Android Pattern | Notes |
|-------|-----------|-----------------|-------|
| Button tap | Light | 10ms | Subtle feedback |
| Toggle switch | Medium | 20ms | Clear action |
| Box created | Medium | 30ms | Satisfying confirmation |
| Timer milestone | Light | 15ms | Gentle notification |
| 5-min warning | Medium, Medium (gap 100ms) | [0, 50, 100, 50] | Double tap |
| Timer complete | Success (heavy) | [0, 50, 100, 50, 100, 100] | Celebration pattern |
| Error | Error (heavy) | [0, 100] | Single strong pulse |
| Pull to refresh | Selection | n/a | iOS only |

**User Setting:** Haptics can be disabled in iOS Settings (respect user's system preference)

**Implementation:**
```javascript
// iOS
import { Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const triggerHaptic = (type) => {
  if (Platform.OS === 'ios') {
    ReactNativeHapticFeedback.trigger(type);
  } else {
    // Android vibration pattern
  }
};
```

---

## 7. App Store Assets

### 7.1 iOS App Store

**Screenshots (Required Sizes):**

**iPhone 6.7" (iPhone 14 Pro Max, 15 Pro Max):**
- Size: 1290 x 2796 pixels
- Quantity: 3-10 screenshots
- Priority: Highest (this is the default view)

**iPhone 6.5" (iPhone 11 Pro Max, XS Max):**
- Size: 1242 x 2688 pixels
- Quantity: 3-10 screenshots

**iPhone 5.5" (iPhone 8 Plus, 7 Plus):**
- Size: 1242 x 2208 pixels
- Quantity: 3-10 screenshots

**Recommended Screenshots:**
1. **Today View** - "Your command center for focused work"
2. **Box Creation** - "Create a box in seconds with AI"
3. **Focus Mode** - "Distraction-free environment"
4. **Completion** - "Reflect and improve"
5. **Weekly Report** - "Insights that help you grow"

**Screenshot Design:**
- Device frame: Optional (clean without often better)
- Title overlay: Large, readable text at top
- Feature callout: Arrow or highlight on key UI element
- Brand colors: Use honey accents consistently

**App Preview Video (Optional):**
- **Duration:** 15-30 seconds
- **Size:** 1080 x 1920 (portrait) or 1920 x 1080 (landscape)
- **Format:** .mp4 or .mov, H.264, AAC audio
- **Content:** Quick demo of create → focus → complete flow
- **No audio required:** Use captions for accessibility

**App Icon:**
- Size: 1024 x 1024 pixels
- Format: PNG (no alpha channel)
- Color space: sRGB

---

### 7.2 Google Play Store

**Feature Graphic:**
- **Size:** 1024 x 500 pixels
- **Format:** PNG or JPG
- **Content:**
  - "BoxBee" wordmark (left)
  - Tagline: "Time-box your day with AI"
  - Bee mascot (right)
  - Honey gradient background

**Screenshots (Phone):**
- **Size:** 1080 x 1920 pixels (minimum)
- **Quantity:** 2-8 screenshots
- **Content:** Same as iOS screenshots, optimized for Android

**Screenshots (Tablet - Optional):**
- **Size:** 1920 x 1200 pixels
- **Quantity:** 2-8 screenshots

**App Icon:**
- Size: 512 x 512 pixels
- Format: PNG (with alpha for round icons)
- Note: Also need adaptive icon layers

**Promo Video (Optional):**
- **Duration:** 30 seconds - 2 minutes
- **Format:** YouTube URL
- **Content:** Product overview, features, benefits

---

### 7.3 Marketing Assets

**Logo Variations:**

1. **Full Logo (Horizontal)**
   - Bee icon + "BoxBee" wordmark
   - Size: Vector (scalable)
   - Usage: Website, marketing materials
   - Variants: Color, white, black

2. **Wordmark Only**
   - "BoxBee" text
   - Font: Custom or Inter Bold
   - Usage: Website header, emails

3. **Icon Only**
   - Bee in hexagon
   - Usage: Social media profile pictures

**Social Media Assets:**

- **Twitter/X Header:** 1500 x 500px
- **Facebook Cover:** 820 x 312px
- **Instagram Profile:** 320 x 320px (icon)
- **LinkedIn Banner:** 1584 x 396px

**Website:**
- **Hero Image:** 1920 x 1080px (app screenshots + graphics)
- **Feature Graphics:** 600 x 400px (3-4 key features)
- **Favicon:** 32 x 32px (bee icon simplified)

**Deliverable:**
```
/marketing/
  app-store/
    ios/
      screenshots/
        today-view.png
        box-creation.png
        focus-mode.png
        completion.png
        weekly-report.png
      app-icon-1024.png
      preview-video.mp4 (optional)
    android/
      feature-graphic.png
      screenshots/
        today-view.png
        ...
      app-icon-512.png
  logo/
    full-logo-color.svg
    full-logo-white.svg
    full-logo-black.svg
    wordmark-color.svg
    icon-only.svg
  social/
    twitter-header.png
    facebook-cover.png
    instagram-profile.png
    linkedin-banner.png
```

---

## 8. Asset Optimization Guidelines

### 8.1 Image Formats

**Vector Graphics (Preferred):**
- **Format:** SVG
- **Usage:** Icons, logos, illustrations
- **Optimization:** Remove unnecessary metadata, compress paths
- **Tool:** SVGO or SVGOMG

**Raster Images:**
- **Format:** PNG (transparency needed), WebP (photos), JPG (no transparency)
- **Optimization:** TinyPNG, ImageOptim
- **Resolution:** Provide @1x, @2x, @3x for iOS; mdpi through xxxhdpi for Android

---

### 8.2 File Naming Conventions

**Pattern:** `category-name-variant-size.ext`

**Examples:**
```
icon-home-outline-24.svg
icon-home-filled-24.svg
bee-neutral-120.svg
illustration-onboarding-slide1-240x160.svg
button-primary-default@2x.png
```

**Rules:**
- Lowercase only
- Hyphen-separated (no spaces or underscores)
- Descriptive names (avoid "image1", "icon2")
- Include size if multiple variants
- Include state/variant if applicable

---

### 8.3 Performance Targets

**File Size Limits:**
- SVG icons: <5KB each
- Illustrations: <30KB each
- Lottie animations: <50KB each
- App icon (1024px): <500KB
- Screenshots: <1MB each

**Optimization Tools:**
- **SVG:** SVGO, SVGOMG
- **PNG:** TinyPNG, ImageOptim, pngquant
- **JPG:** ImageOptim, MozJPEG
- **Lottie:** LottieFiles optimizer

---

## 9. Asset Delivery Checklist

### Phase 1: Core Assets (Sprint 1-2)
- [ ] App icon (all sizes)
- [ ] Tab bar icons (home, insights, settings)
- [ ] Core action icons (plus, close, back, check, edit, delete)
- [ ] Launch screen assets
- [ ] Primary bee mascot (neutral, excited)

### Phase 2: Onboarding & Features (Sprint 3-4)
- [ ] Onboarding illustrations (4 slides)
- [ ] Empty state illustrations
- [ ] Category icons (all 11)
- [ ] Hexagon shapes and patterns
- [ ] Loading bee animation (Lottie)

### Phase 3: Advanced Features (Sprint 5-6)
- [ ] Additional bee mascot variants (focused, thinking, confused, sleeping)
- [ ] Honey drip animation
- [ ] Progress fill animations
- [ ] Celebration confetti animation
- [ ] All remaining action icons

### Phase 4: Polish & Launch (Sprint 9-10)
- [ ] Breathing background animation (focus mode)
- [ ] Checkmark success animation
- [ ] Sound effects (if implementing)
- [ ] App Store screenshots (iOS + Android)
- [ ] Feature graphic (Android)
- [ ] App preview video (optional)
- [ ] Marketing assets (logo variations, social media)

---

## 10. Design Handoff Format

**For Developers:**

**Organized Folder Structure:**
```
/assets/
  icons/
    tabs/
    actions/
    categories/
  illustrations/
    bee/
    onboarding/
    empty-states/
  animations/
    lottie/
  shapes/
  effects/
  sounds/

/app-store/
  ios/
    screenshots/
    app-icon/
  android/
    screenshots/
    feature-graphic/

/marketing/
  logo/
  social/
```

**Metadata File (JSON):**
```json
{
  "icons": [
    {
      "name": "home-outline",
      "path": "assets/icons/tabs/home-outline.svg",
      "size": "24x24",
      "usage": "Tab bar - inactive state",
      "color": "gray600"
    },
    // ... all icons
  ],
  "illustrations": [
    {
      "name": "bee-neutral",
      "path": "assets/illustrations/bee/bee-neutral.svg",
      "size": "120x120",
      "usage": "Welcome screen, empty states"
    },
    // ... all illustrations
  ]
}
```

**Design Tokens (JS export):**
```javascript
// Auto-generated from Design System
export const assets = {
  icons: {
    tabs: {
      home: require('./assets/icons/tabs/home-outline.svg'),
      homeActive: require('./assets/icons/tabs/home-filled.svg'),
      // ...
    },
    actions: {
      plus: require('./assets/icons/actions/plus.svg'),
      // ...
    }
  },
  illustrations: {
    bee: {
      neutral: require('./assets/illustrations/bee/bee-neutral.svg'),
      excited: require('./assets/illustrations/bee/bee-excited.svg'),
      // ...
    }
  }
};
```

---

## 11. Third-Party Asset Resources

**Free/Licensed Assets (as placeholders during development):**

**Icon Sets:**
- [Heroicons](https://heroicons.com/) - Free MIT license
- [Feather Icons](https://feathericons.com/) - Free MIT license
- [Material Icons](https://fonts.google.com/icons) - Apache 2.0

**Illustrations:**
- [unDraw](https://undraw.co/) - Free for commercial use
- [Storyset](https://storyset.com/) - Free with attribution

**Animations:**
- [LottieFiles](https://lottiefiles.com/) - Free + premium options
- [UIMovement](https://uimovement.com/) - Inspiration

**Recommendation:** Use third-party placeholders during initial development, replace with custom assets before launch for brand consistency.

---

## 12. Accessibility Requirements

**Icon Accessibility:**
- All icons must have accessibility labels
- Minimum touch target: 44x44pt (iOS), 48x48dp (Android)
- Contrast ratio: 4.5:1 minimum against background

**Animation Accessibility:**
- Respect `prefers-reduced-motion` system setting
- Provide static alternatives for all animations
- No flashing effects >3 times per second (seizure risk)

**Color Accessibility:**
- Don't rely on color alone (use icons + text)
- Test all assets in grayscale mode
- Provide high-contrast variants if needed

---

## Summary

**Total Assets Required:**
- **Icons:** ~40 (tabs, actions, categories, system)
- **Illustrations:** ~15 (bee variants, onboarding, empty states)
- **Animations:** 6 Lottie files + micro-interactions
- **Sounds:** 5 audio files (optional)
- **App Store:** 10-20 screenshots + feature graphic
- **Shapes/Effects:** Hexagons, honey drips, patterns

**Timeline:**
- **Phase 1 (Weeks 1-4):** Core assets for MVP
- **Phase 2 (Weeks 5-8):** Feature assets
- **Phase 3 (Weeks 9-12):** Polish assets
- **Phase 4 (Weeks 17-20):** Marketing & launch assets

**Design Resources Needed:**
- **Illustrator/Figma:** For custom icons and illustrations
- **After Effects:** For Lottie animations
- **Audio Editor:** For sound effects (if implementing)
- **Photoshop/Sketch:** For app store screenshots

---

## Design Assets Status

**Delivered:**
- ✅ Design System specification (`01-Design-System.md`)
- ✅ Screen specifications (`02-Screen-Specifications.md`)
- ✅ Asset requirements list (this document)

**Next Steps:**
1. **Designer:** Create assets per specifications
2. **Developer:** Set up asset pipeline (react-native-svg, Lottie, etc.)
3. **PM:** Review and approve assets before implementation
4. **QA:** Test assets on various devices and screen sizes

---

**Ready for asset creation! 🎨🐝**

*Last updated: November 28, 2024*

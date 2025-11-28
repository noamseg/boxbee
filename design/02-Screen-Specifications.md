# BoxBee Screen Specifications

**Version:** 1.0
**Date:** November 28, 2024
**Purpose:** Implementation-ready screen layouts for React Native development

---

## Overview

This document provides pixel-perfect specifications for all BoxBee screens, designed for React Native implementation. All measurements use the 8-point grid from the Design System.

**Reference Documents:**
- `01-Design-System.md` for component specs and tokens
- `BoxBee-PRD.md` for feature requirements
- `02-User-Stories-Sprint-Ready.md` for acceptance criteria

---

## Navigation Structure

```
┌─────────────────────────────────────┐
│         Tab Navigator               │
│  (Today | Insights | Settings)      │
└─────────────────────────────────────┘
         ↑
         │
    Stack Navigators:
    • Onboarding Stack (first launch)
    • Today Stack (home, box creation, focus)
    • Insights Stack (patterns, reports)
    • Settings Stack (account, preferences)
    • Modals (overlay entire app)
```

---

## 1. Onboarding Flow (US-1.1, US-1.2)

### 1.1 Welcome Screen

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │ ← Top safe area
│         [Skip] (top right)          │ spacing: 16
│                                     │
│                                     │
│                                     │
│      🐝 (Bee illustration)          │ ← Centered
│      120x120 animated SVG           │
│                                     │
│         BoxBee                      │ ← typography.display
│                                     │ color: beeBlack
│      Time-box your day,             │ ← typography.h2
│      accomplish more                │ color: gray700
│                                     │
│                                     │
│                                     │
│   ┌───────────────────────────┐    │
│   │   Get Started  →          │    │ ← Primary button
│   └───────────────────────────┘    │ spacing: 16 from bottom
│                                     │
│        Already a bee?               │ ← typography.body
│            Sign In                  │ ← Link (honeyDeep)
│                                     │
└─────────────────────────────────────┘
```

**Spacing:**
- Top padding: `spacing[4]` (16px) from safe area
- Bee illustration: `spacing[16]` (64px) from top
- Title below bee: `spacing[6]` (24px)
- Subtitle below title: `spacing[2]` (8px)
- Button from bottom: `spacing[8]` (32px) from safe area
- Sign in link: `spacing[3]` (12px) below button

**Components:**
- Skip button: `<Button variant="ghost" size="small">`
- Get Started: `<Button variant="primary" size="large">`
- Sign In: `<Text style={typography.bodyBold}` with `color: honeyDeep`

**Animations:**
- Bee entrance: Fade + scale from 0.8 to 1.0 over 600ms
- Content: Fade in sequentially (title → subtitle → button) with 100ms stagger

**States:**
- Default (shown above)
- Loading (when button pressed): Replace button text with spinner

---

### 1.2 Value Proposition Screen (Slide 1)

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│              ●●○○ (dots)            │ ← Page indicator
│                                     │ spacing: 20 from top
│                                     │
│     ┌─────────────────────┐        │
│     │                     │         │
│     │   📦→⏱️→✅ (flow)   │         │ ← Illustration
│     │                     │         │ 240x160
│     └─────────────────────┘        │
│                                     │
│      Create boxes in seconds       │ ← typography.h1
│                                     │ color: beeBlack
│    Just tell BoxBee what you       │ ← typography.body
│    want to work on. Our AI         │ color: gray700
│    estimates the time needed.      │ lineHeight: 24
│                                     │
│                                     │
│                                     │
│   ┌───────────────────────────┐    │
│   │        Next  →             │    │ ← Primary button
│   └───────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

**Spacing:**
- Page dots: `spacing[5]` (20px) from top safe area
- Illustration: `spacing[12]` (48px) from dots
- Title: `spacing[8]` (32px) below illustration
- Body: `spacing[3]` (12px) below title
- Button: `spacing[8]` (32px) from bottom safe area
- Side padding: `spacing[6]` (24px) throughout

**Animations:**
- Slide transition: Horizontal swipe with spring physics
- On appear: Illustration fades in, then text from bottom with slide

**Gesture:**
- Swipe left/right to navigate between slides
- Tap "Next" to advance

---

### 1.3 Permission Request Screen

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│              ○○●○                   │
│                                     │
│     ┌─────────────────────┐        │
│     │    🔔 (bell icon)   │         │
│     │       160x160       │         │
│     └─────────────────────┘        │
│                                     │
│      Stay on track with            │ ← typography.h1
│      gentle reminders              │
│                                     │
│    Get notified 5 minutes          │ ← typography.body
│    before your box ends, and       │
│    celebrate when you finish.      │
│                                     │
│                                     │
│   ┌───────────────────────────┐    │
│   │  Enable Notifications  →   │    │ ← Primary button
│   └───────────────────────────┘    │
│                                     │
│           Maybe Later               │ ← Ghost button
│                                     │
└─────────────────────────────────────┘
```

**Components:**
- Primary: `<Button variant="primary">` triggers permission prompt
- Secondary: `<Button variant="ghost">` skips to next screen

**Platform-Specific:**
- **iOS:** Tapping "Enable Notifications" triggers native permission dialog
- **Android:** Different flow for Android 12+ vs older versions
- Handle "denied" state gracefully (allow skip)

**States:**
- Default (shown above)
- Permission granted: Auto-advance to next screen with checkmark animation
- Permission denied: Show "Maybe Later" as only option

---

### 1.4 Create First Box

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│              ○○○● (final dot)       │
│                                     │
│     ┌─────────────────────┐        │
│     │   ✨🐝 (sparkle bee) │         │
│     │       120x120       │         │
│     └─────────────────────┘        │
│                                     │
│        Create your first box       │ ← typography.h1
│                                     │
│    What do you want to work on     │ ← typography.body
│    right now?                       │
│                                     │
│   ┌───────────────────────────┐    │
│   │ Write blog post...  🎤     │    │ ← Input field
│   └───────────────────────────┘    │ (from Design System)
│                                     │
│   AI suggests: 45 minutes ⏱️       │ ← Chip (honeyLight bg)
│                                     │
│   ┌───────────────────────────┐    │
│   │      Create Box  →         │    │ ← Primary (honey)
│   └───────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

**Interaction Flow:**
1. User types task name
2. On pause (500ms debounce), AI suggests duration
3. Duration appears as editable chip below input
4. "Create Box" button becomes enabled
5. On tap, creates box and transitions to Today View

**Spacing:**
- Input field: `spacing[8]` (32px) below body text
- AI suggestion chip: `spacing[3]` (12px) below input
- Create button: `spacing[6]` (24px) below chip

**States:**
- **Empty:** Button disabled, no AI suggestion
- **Typing:** Subtle spinner in input field
- **AI Loaded:** Chip appears with fade-in animation
- **Creating:** Button shows spinner, input disabled
- **Success:** Confetti animation, transition to Today View

**Animations:**
- AI chip entrance: Slide up + fade (300ms)
- Success: Hexagon particles burst from button

---

## 2. Today View (US-5.1, US-5.3)

### 2.1 Today View - Default State

**Layout:**
```
┌─────────────────────────────────────┐
│ ☀️ Thursday, Nov 28        👤       │ ← Header
│                                     │ spacing[4] padding
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃  🐝 Working on...             ┃ │ ← Active Box Card
│ ┃                               ┃ │ (honeyLight bg)
│ ┃  Write quarterly report       ┃ │ typography.h2
│ ┃                               ┃ │
│ ┃      ⬡ 23:45 ⬡              ┃ │ ← Hexagon timer
│ ┃                               ┃ │ typography.timer
│ ┃  ⬢⬢⬢⬢⬢⬡⬡⬡ (progress)        ┃ │ ← Hexagons fill
│ ┃                               ┃ │
│ ┃  [⏸️ Pause]  [➕ Extend]      ┃ │ ← Action buttons
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                     │
│ Up Next  ━━━━━━━━━━━━━━━━━━━━━━━ │ ← Section header
│                                     │ typography.h3
│ ┌─────────────────────────────┐    │
│ │ ⏰ 2:00 PM                  │    │ ← Scheduled box
│ │ Team standup meeting        │    │ (card component)
│ │ 15 min  •  Scheduled        │    │
│ └─────────────────────────────┘    │
│                                     │
│ ┌─────────────────────────────┐    │
│ │ 💡 AI suggests...           │    │ ← AI suggestion
│ │ Review PR #234              │    │ (honeyCream bg)
│ │ ~20 min                     │    │
│ └─────────────────────────────┘    │
│                                     │
│ Weekly Progress  ━━━━━━━━━━━━━━━━ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░  12/18 boxes    │ ← Progress bar
│                                     │
│           [➕] (FAB)                │ ← Floating button
└─────────────────────────────────────┘ (bottom right)
```

**Components Used:**
- Active Box: Custom `<ActiveBoxCard>` (see Design System)
- Scheduled boxes: `<BoxListItem variant="scheduled">`
- AI suggestion: `<BoxListItem variant="suggestion">`
- Progress bar: `<ProgressBar variant="hexagonal">`
- FAB: `<FloatingActionButton icon="plus">`

**Spacing:**
- Header: `spacing[4]` (16px) padding, `spacing[3]` (12px) below safe area
- Active box: `spacing[4]` (16px) side margins
- Section headers: `spacing[6]` (24px) top, `spacing[3]` (12px) bottom
- List items: `spacing[3]` (12px) between items
- FAB: `spacing[4]` (16px) from bottom-right

**Gestures:**
- Tap active box → Enter Focus Mode (full screen)
- Swipe left on scheduled box → Delete/Reschedule options
- Tap scheduled box → Edit modal
- Tap AI suggestion → Create box immediately
- Pull to refresh → Update data

**Animations:**
- Timer: Updates every second, pulse on minute change
- Progress hexagons: Fill left-to-right with honey gradient
- New box appears: Slide in from bottom
- Delete: Swipe animation with fade out

---

### 2.2 Today View - Empty State

**Layout:**
```
┌─────────────────────────────────────┐
│ ☀️ Thursday, Nov 28        👤       │
│                                     │
│                                     │
│                                     │
│         🐝 (bee illustration)       │ ← Centered
│            100x100                  │
│                                     │
│     No boxes buzzing yet!           │ ← typography.h2
│                                     │ color: gray600
│   Create a box to start your       │ ← typography.body
│   productive day.                   │
│                                     │
│   ┌───────────────────────────┐    │
│   │   Create First Box  →      │    │ ← Primary button
│   └───────────────────────────┘    │
│                                     │
│ Weekly Progress  ━━━━━━━━━━━━━━━━ │
│ ░░░░░░░░░░░░░░░░░  0/18 boxes      │
│                                     │
│           [➕]                      │
└─────────────────────────────────────┘
```

**State Conditions:**
- Shown when: No active box AND no scheduled boxes for today
- First launch: Shows after onboarding
- New day: Shows at midnight if no boxes scheduled

---

### 2.3 Today View - Loading State

**Layout:**
```
┌─────────────────────────────────────┐
│ ☀️ Thursday, Nov 28        👤       │
│                                     │
│ ┌─────────────────────────────┐    │
│ │                             │    │ ← Skeleton card
│ │  ▓▓▓▓▓▓▓░░░░░               │    │ (shimmer effect)
│ │                             │    │
│ │  ▓▓▓▓░░░░░░░░░░             │    │
│ └─────────────────────────────┘    │
│                                     │
│ Up Next                             │
│ ┌─────────────────────────────┐    │
│ │ ▓▓▓▓░░░░░░░░░░              │    │ ← Skeleton items
│ └─────────────────────────────┘    │
│ ┌─────────────────────────────┐    │
│ │ ▓▓▓▓▓▓░░░░░░░░              │    │
│ └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

**Implementation:**
```javascript
<SkeletonCard
  height={200}
  borderRadius={borderRadius.lg}
  shimmerColors={[gray100, gray200, gray100]}
/>
```

---

## 3. Box Creation Modal (US-2.1, US-2.2, US-2.3)

### 3.1 Box Creation - Default

**Layout:**
```
┌─────────────────────────────────────┐
│  [×]                    Create Box  │ ← Modal header
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ (with drag handle)
│                                     │
│  What are you working on?           │ ← Label
│  ┌───────────────────────────┐     │
│  │ Write newsletter...   🎤  │     │ ← Input (voice opt)
│  └───────────────────────────┘     │
│                                     │
│  ⏱️ Duration                        │ ← Section header
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│  │ 15  │ │ 30  │ │ 45  │ │ 60  │  │ ← Duration chips
│  └─────┘ └─────┘ └─────┘ └─────┘  │ (AI suggested: honey)
│  ┌─────┐ ┌─────┐                   │
│  │ 90  │ │Custom│                  │
│  └─────┘ └─────┘                   │
│                                     │
│  📅 When?                           │
│  ⦿ Start now                       │ ← Radio options
│  ○ Schedule for later              │
│                                     │
│  Recent & Presets                  │ ← Collapsible
│  ┌─────────────────────────────┐   │
│  │ 📧 Check emails (15 min)    │   │ ← Preset items
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 📝 Write blog post (45 min) │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌───────────────────────────────┐ │
│  │      Create & Start  →        │ │ ← Primary button
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Spacing:**
- Modal padding: `spacing[5]` (20px) sides, `spacing[4]` (16px) top
- Between sections: `spacing[6]` (24px)
- Between elements: `spacing[3]` (12px)
- Duration chips: `spacing[2]` (8px) gap between

**Components:**
- Input: `<TextInput icon="microphone" placeholder="Write newsletter...">`
- Duration chips: `<Chip selectable>` (selected has honey background)
- Radio: `<RadioButton>` custom styled with bee theme
- Presets: `<BoxListItem variant="preset" onPress={fillForm}>`
- Button: `<Button variant="primary">` (text changes based on "when")

**Animations:**
- Modal entrance: Slide up from bottom (400ms spring)
- AI suggestion: Duration chip pulses when AI populates it
- Keyboard: Modal shifts up to avoid keyboard

**States:**

**Empty:**
```
Button text: "Create Box" (disabled)
AI indicator: Not shown
```

**AI Processing:**
```
Input: "write blog post" (user typed)
Below input: "🐝 Thinking..." (small, gray)
Duration chips: 45-min chip shows subtle pulse
```

**AI Ready:**
```
Below input: "✨ AI suggests 45 minutes"
Duration chip "45": Selected, honey background
Button: "Create & Start" (enabled, honey)
```

**Scheduled Mode:**
```
When "Schedule for later" selected:

Show date/time picker:
┌─────────────────────────────┐
│ 📅 Today, 2:00 PM      ▼   │ ← Expandable picker
└─────────────────────────────┘

Button text: "Schedule Box"
```

**Error State:**
```
Input border: errorRed
Below input: "⚠️ Task name required"
Button: Disabled
```

---

### 3.2 Box Creation - Presets Expanded

**Layout:**
```
┌─────────────────────────────────────┐
│  [×]                    Create Box  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│  (Input and Duration sections...)   │
│                                     │
│  Recent & Presets            [▼]   │ ← Expanded
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│  Recent  |  AI Presets             │ ← Tabs
│  ━━━━━                             │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📧 Check emails             │   │ ← Recent (used 2h ago)
│  │ 15 min  •  Used 2h ago      │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 📝 Write blog post          │   │
│  │ 45 min  •  Used yesterday   │   │
│  └─────────────────────────────┘   │
│                                     │
│  (Scrollable list...)               │
│                                     │
└─────────────────────────────────────┘
```

**Tab: AI Presets**
```
│  Recent  |  AI Presets             │
│           ━━━━━━━━━                │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 💡 Based on your patterns   │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 📊 Review analytics         │   │ ← AI learned
│  │ 30 min  •  Best at 10am     │   │ (w/ timing hint)
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ ✍️ Deep writing session     │   │
│  │ 90 min  •  Peak flow time   │   │
│  └─────────────────────────────┘   │
```

**Interaction:**
- Tap preset → Fills input + duration + auto-closes section
- Swipe left on preset → Delete option (Recent only)
- Tab switch: Smooth transition

---

## 4. Focus Mode (US-3.1, US-3.2, US-3.4)

### 4.1 Focus Mode - Active

**Layout (Full Screen):**
```
┌─────────────────────────────────────┐
│                                     │ ← Status bar hidden
│                                     │
│              [×]                    │ ← Exit (top left)
│                                     │ spacing[2] from top
│                                     │
│                                     │
│        ⬡  42:18  ⬡                 │ ← Hexagon timer
│                                     │ typography.timer
│                                     │ (72pt, mono)
│                                     │
│     ⬢⬢⬢⬢⬢⬢⬡⬡⬡⬡                   │ ← Progress hexagons
│                                     │ 60% filled
│                                     │
│                                     │
│     Write quarterly report          │ ← Task name
│                                     │ typography.h2
│                                     │ color: gray600
│                                     │
│                                     │
│         Stay focused! 🐝            │ ← AI coaching
│    You're in your flow zone.       │ (optional, P1)
│                                     │ typography.body
│                                     │ (fades in/out)
│                                     │
│                                     │
│                                     │
│  [⏸️ Pause]  [➕5]  [⚙️ Settings]   │ ← Controls
│                                     │ spacing[6] from bottom
│                                     │
└─────────────────────────────────────┘
```

**Background:**
- Subtle gradient: `honeyCream` → `white`
- Breathing animation: Slow pulse (4s inhale, 4s exhale)
- Hexagon pattern: Very faint, fixed background

**Spacing:**
- Exit button: `spacing[2]` (8px) from top-left safe area
- Timer: Vertically centered (slightly above due to controls)
- Progress hexagons: `spacing[4]` (16px) below timer
- Task name: `spacing[6]` (24px) below hexagons
- AI coaching: `spacing[8]` (32px) below task name
- Controls: `spacing[6]` (24px) from bottom safe area

**Components:**
- Timer: Custom hexagon-framed display
- Progress: `<HexagonProgressIndicator filled={6} total={10}>`
- Controls: `<Button variant="secondary" size="small">`

**Animations:**

**Background Breathing:**
```javascript
// Slow scale pulse
Animated.loop(
  Animated.sequence([
    Animated.timing(scale, { toValue: 1.02, duration: 4000 }),
    Animated.timing(scale, { toValue: 1.0, duration: 4000 }),
  ])
)
```

**Hexagon Fill:**
```javascript
// Honey drip effect as progress increases
// Each hexagon fills from top to bottom
strokeDashoffset: interpolate progress
```

**AI Coaching Messages:**
```javascript
// Fade in at 25%, 50%, 75% complete
// Duration: 3 seconds visible, then fade out
messages: [
  { at: 0.25, text: "You're doing great! Keep going. 🐝" },
  { at: 0.50, text: "Halfway there. Stay focused! 💪" },
  { at: 0.75, text: "Almost done. Finish strong! ⚡" },
]
```

**Gesture:**
- Double tap screen → Show/hide controls
- Swipe down from top → Exit confirmation

**Haptics:**
- Minute milestones: Gentle tap
- 5-minute warning: Double tap
- Completion: Success pattern

**Notifications:**
- 5 min remaining: "⏰ 5 minutes left on [task name]"
- 1 min remaining: "⏰ Almost done! 1 minute left"
- Completion: "🎉 Box complete! Time to reflect."

---

### 4.2 Focus Mode - Paused

**Layout:**
```
┌─────────────────────────────────────┐
│              [×]                    │
│                                     │
│                                     │
│        ⬡  42:18  ⬡                 │ ← Timer (static)
│                                     │ opacity: 0.6
│                                     │
│     ⬢⬢⬢⬢⬢⬢⬡⬡⬡⬡                   │ ← Grayed out
│                                     │
│                                     │
│         ⏸️ Paused                   │ ← Status
│                                     │ typography.h2
│                                     │
│    Take a break. Resume when       │ ← Helper text
│    you're ready.                    │
│                                     │
│                                     │
│                                     │
│  [▶️ Resume]  [⏹️ End Box]          │ ← Large buttons
│                                     │
└─────────────────────────────────────┘
```

**Visual Changes:**
- Background: Desaturated (gray tint overlay)
- Timer: No updates, reduced opacity
- Hexagons: Gray instead of honey
- No breathing animation

**Platform Specific:**
- **iOS:** Continues in background via background execution
- **Android:** Shows persistent notification with resume action

---

### 4.3 Focus Mode - 5 Min Warning

**Layout:**
```
┌─────────────────────────────────────┐
│              [×]                    │
│                                     │
│        ⬡  04:32  ⬡                 │ ← Timer (orange)
│                                     │ color: honeyDeep
│                                     │
│     ⬢⬢⬢⬢⬢⬢⬢⬢⬢⬡                   │ ← 90% filled
│                                     │
│                                     │
│         ⏰ Almost there!            │ ← Warning badge
│      5 minutes remaining            │ (honeyDeep bg)
│                                     │
│                                     │
│  [⏸️ Pause]  [➕5]  [⚙️ Settings]   │
│                                     │
└─────────────────────────────────────┘
```

**Visual Changes:**
- Timer color: Changes to `honeyDeep`
- Warning badge: Slides in from top with bounce
- Subtle vibration (if enabled)

---

## 5. Completion Flow (US-4.1, US-4.2)

### 5.1 Completion Reflection

**Layout (Modal):**
```
┌─────────────────────────────────────┐
│                                     │
│         🎉 (celebration)            │ ← Animated icon
│            100x100                  │
│                                     │
│       Box complete!                 │ ← typography.h1
│                                     │ color: honeyDeep
│                                     │
│    How did it go?                   │ ← typography.body
│                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐           │
│  │  😊  │ │  😐  │ │  😟  │          │ ← Focus quality
│  │Great│ │ Okay │ │Rough│          │ (chip buttons)
│  └─────┘ └─────┘ └─────┘           │
│                                     │
│  Did you finish?                    │
│  ⦿ Yes, completed!                 │ ← Radio
│  ○ Partial progress                │
│  ○ Didn't get to it                │
│                                     │
│  ┌───────────────────────────┐     │
│  │ Add quick note (optional) │     │ ← Optional input
│  └───────────────────────────┘     │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Done  →                │ │ ← Primary
│  └───────────────────────────────┘ │
│                                     │
│          Skip                       │ ← Link
│                                     │
└─────────────────────────────────────┘
```

**Spacing:**
- Top padding: `spacing[8]` (32px)
- Celebration to title: `spacing[4]` (16px)
- Between sections: `spacing[6]` (24px)
- Focus chips: `spacing[2]` (8px) gap
- Button from bottom: `spacing[6]` (24px)

**Animations:**

**Celebration Entrance (P1):**
```javascript
// Confetti burst + scale celebration icon
// Hexagon particles in honey colors
particleEmitter({
  count: 20,
  shape: 'hexagon',
  colors: [honeyLight, honey, honeyDeep],
  duration: 2000,
  gravity: 0.5,
})
```

**Focus Quality Selection:**
```javascript
// Selected chip: Scale up + honey background
// Unselected: Gray + scale down
```

**Completion Options:**
- "Yes, completed": Triggers celebration animation (if P1 implemented)
- "Partial progress": Neutral acknowledgment
- "Didn't get to it": No celebration, gentle encouragement message

**Auto-Save:**
- Reflection data saved on any selection
- "Skip" still saves focus quality if selected
- Modal auto-closes after "Done" with slide-down

---

### 5.2 Celebration Animation (P1)

**Full Screen Overlay:**
```
┌─────────────────────────────────────┐
│        ✨ 🎉 ✨ 🐝 ✨ 🎉 ✨         │ ← Particle effects
│                                     │
│                                     │
│         🏆 (trophy)                 │ ← Large icon
│          140x140                    │
│                                     │
│      You did it!                    │ ← typography.display
│                                     │ color: honeyDeep
│                                     │
│    You completed Write blog post    │ ← Task name
│       in 45 minutes.                │ typography.h2
│                                     │
│    ┌─────────────────────────┐     │
│    │  +15 XP  •  🔥 3 streak  │     │ ← Stats (optional)
│    └─────────────────────────┘     │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Animation Sequence:**
1. Full-screen overlay fades in (200ms)
2. Trophy icon scales from 0 to 1 with bounce (500ms)
3. Confetti rains from top (2 seconds)
4. Stats counter animates up
5. Auto-dismiss after 3 seconds OR tap to dismiss
6. Returns to Today View

**Trigger Conditions:**
- Only for "Yes, completed!" selection
- Only if P1 feature implemented (US-4.2)

---

## 6. Weekly Report (US-6.3)

### 6.1 Weekly Hive Report

**Layout:**
```
┌─────────────────────────────────────┐
│  [←]          Hive Report           │ ← Header
│  Nov 20 - Nov 26                    │ typography.caption
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 🐝 Your week in boxes         │ │ ← Summary card
│  │                               │ │ (honey gradient)
│  │     42 boxes completed        │ │ typography.h1
│  │     31.5 hours of focus       │ │ typography.h2
│  │     87% completion rate       │ │
│  │                               │ │
│  │  ⬢⬢⬢⬢⬢⬢⬡ (vs goal)          │ │ ← Progress
│  └───────────────────────────────┘ │
│                                     │
│  💡 Insights                        │ ← Section
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ 🔥 Best focus time            │ │ ← Insight card
│  │ You're most productive        │ │
│  │ between 9-11 AM.              │ │
│  │ ▓▓▓▓▓░░░░░░░ (chart)          │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ ⏱️ Time estimation             │ │
│  │ You're getting better!        │ │
│  │ 78% of boxes finished on      │ │
│  │ time (↑12% vs last week).    │ │
│  └───────────────────────────────┘ │
│                                     │
│  Top Tasks  ━━━━━━━━━━━━━━━━━━━━━ │
│  1. 📧 Email (8 boxes, 2.5h)      │ ← List items
│  2. 📝 Writing (6 boxes, 4.5h)    │
│  3. 💻 Coding (5 boxes, 8h)       │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Share Report  📤             │ │ ← Secondary button
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Spacing:**
- Section headers: `spacing[6]` (24px) top margin
- Cards: `spacing[4]` (16px) between
- Side padding: `spacing[5]` (20px)

**Components:**
- Summary card: Custom gradient background (honeyLight → honey)
- Insight cards: `<Card>` with icon + body text
- Charts: Custom SVG bar charts with honey colors
- Share button: `<Button variant="secondary" icon="share">`

**Scrolling:**
- Vertical scroll for all insights
- Header sticky at top
- Pull to refresh regenerates report

**Share Functionality:**
- Generates image of report
- Options: Save to photos, Share to social, Email
- Format: Beautiful card with BoxBee branding

---

### 6.2 Weekly Report - Loading

**Layout:**
```
┌─────────────────────────────────────┐
│  [←]          Hive Report           │
│  Nov 20 - Nov 26                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│         🐝 (bee animation)          │ ← Loading state
│          80x80                      │
│                                     │
│    Gathering your insights...      │ ← typography.body
│                                     │ color: gray600
│                                     │
│    ⬢⬡⬡⬡⬡⬡⬡⬡⬡⬡                   │ ← Progress
│                                     │ (fills slowly)
│                                     │
└─────────────────────────────────────┘
```

**Animation:**
- Bee floats up and down gently
- Progress hexagons fill left to right
- Estimated time: 2-3 seconds

---

## 7. Settings Screens (US-7.x)

### 7.1 Settings Home

**Layout:**
```
┌─────────────────────────────────────┐
│  [←]            Settings            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│  👤 Noam Segal                      │ ← Profile section
│     noam@example.com                │
│     BoxBee Pro  •  🐝               │ ← Badge
│                                     │
│  Account  ━━━━━━━━━━━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ 💳 Subscription              →│ │ ← List items
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ 👤 Profile                   →│ │
│  └───────────────────────────────┘ │
│                                     │
│  Preferences  ━━━━━━━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ 🔔 Notifications             →│ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ 🐝 AI Coach                  →│ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ 🌙 Appearance                →│ │
│  └───────────────────────────────┘ │
│                                     │
│  Data  ━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ 📦 Export Data               →│ │
│  └───────────────────────────────┘ │
│                                     │
│  About  ━━━━━━━━━━━━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ 📄 Privacy Policy            →│ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ 📜 Terms of Service          →│ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ ❓ Help & Support            →│ │
│  └───────────────────────────────┘ │
│                                     │
│  Version 1.0.0 (Build 42)           │ ← Footer
│  Made with 🐝 by BoxBee             │
│                                     │
│           Sign Out                  │ ← Danger link
│                                     │
└─────────────────────────────────────┘
```

**Components:**
- Profile section: Custom card with avatar + info
- List items: `<SettingsListItem icon="" label="" onPress={}>`
- Section headers: `typography.h3` with gray line
- Footer: `typography.caption` centered

**Spacing:**
- Profile section: `spacing[6]` (24px) padding
- Section headers: `spacing[6]` (24px) top, `spacing[3]` (12px) bottom
- List items: No spacing (divider lines between)
- Footer: `spacing[8]` (32px) top

---

### 7.2 Subscription Management (US-7.2)

**Layout:**
```
┌─────────────────────────────────────┐
│  [←]         Subscription           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 🐝 BoxBee Pro                 │ │ ← Current plan card
│  │                               │ │ (honey gradient)
│  │ Active since Nov 1, 2024      │ │
│  │ Renews: Dec 1, 2024           │ │
│  │                               │ │
│  │ Monthly  •  $9.99/month       │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Change Plan                   │ │ ← Action button
│  └───────────────────────────────┘ │
│                                     │
│  Features Included  ━━━━━━━━━━━━━ │
│  ✅ Unlimited boxes                │ ← Feature list
│  ✅ AI time estimation             │
│  ✅ Pattern insights               │
│  ✅ Weekly Hive reports            │
│  ✅ Priority support               │
│                                     │
│  Billing History  ━━━━━━━━━━━━━━━ │
│  Nov 1, 2024    $9.99    [Receipt]│ ← List items
│  Oct 1, 2024    $9.99    [Receipt]│
│  Sep 1, 2024    $9.99    [Receipt]│
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Manage in App Store          →│ │ ← External link
│  └───────────────────────────────┘ │
│                                     │
│        Cancel Subscription          │ ← Danger link
│                                     │
└─────────────────────────────────────┘
```

**Plan Selection Modal:**
```
┌─────────────────────────────────────┐
│  [×]         Choose Your Plan       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 💰 Monthly                    │ │ ← Plan card
│  │                               │ │ (unselected)
│  │ $9.99 / month                 │ │
│  │                               │ │
│  │ [Select]                      │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│  ┃ 🎯 Yearly     SAVE 25%       ┃ │ ← Selected
│  ┃                               ┃ │ (honey border)
│  ┃ $89.99 / year                 ┃ │
│  ┃ Just $7.49/month              ┃ │
│  ┃                               ┃ │
│  ┃ [✓ Selected]                  ┃ │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ ⭐ Lifetime                   │ │
│  │                               │ │
│  │ $199.99 once                  │ │
│  │ Never pay again               │ │
│  │                               │ │
│  │ [Select]                      │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Continue to Payment  →     │ │ ← Primary button
│  └───────────────────────────────┘ │
│                                     │
│  14-day free trial • Cancel anytime │ ← Fine print
│                                     │
└─────────────────────────────────────┘
```

**States:**
- **Free Trial:** Shows days remaining, "Upgrade" CTA
- **Active Subscription:** Shows renewal date, manage options
- **Cancelled:** Shows "Resubscribe" option
- **Expired:** Shows "Your access ended on..." with upgrade CTA

**Platform Integration:**
- iOS: RevenueCat → Apple IAP
- Android: RevenueCat → Google Play Billing
- Restore purchases button for users who reinstall

---

### 7.3 Notification Preferences (US-7.3)

**Layout:**
```
┌─────────────────────────────────────┐
│  [←]        Notifications           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│  Focus Sessions  ━━━━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ 5-minute warning         [ON] │ │ ← Toggle
│  │ Get notified before end       │ │ subtitle
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ Box completion           [ON] │ │
│  │ Celebrate your wins           │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ Coaching messages       [OFF] │ │
│  │ Gentle encouragement (P1)     │ │
│  └───────────────────────────────┘ │
│                                     │
│  Daily Reminders  ━━━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ Morning planning         [ON] │ │
│  │ 8:00 AM                   [>] │ │ ← Time picker
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ Evening reflection      [OFF] │ │
│  │ Review your day               │ │
│  └───────────────────────────────┘ │
│                                     │
│  Weekly Updates  ━━━━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ Hive Report              [ON] │ │
│  │ Monday at 9:00 AM         [>] │ │
│  └───────────────────────────────┘ │
│                                     │
│  Quiet Hours  ━━━━━━━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ Do Not Disturb          [OFF] │ │
│  │ 10:00 PM - 7:00 AM        [>] │ │
│  └───────────────────────────────┘ │
│                                     │
│  ⚠️ If notifications aren't        │ ← Warning (if denied)
│  working, enable them in Settings  │
│  ┌───────────────────────────────┐ │
│  │ Open System Settings          │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Toggles:**
- Component: `<Switch>` (platform-native styled with honey color)
- ON: `honeyDeep`, OFF: `gray300`
- Immediate save on toggle

**Time Pickers:**
- Tap row → Open native time picker (iOS/Android)
- Format: 12-hour with AM/PM

---

### 7.4 AI Coach Customization (US-7.4, P1)

**Layout:**
```
┌─────────────────────────────────────┐
│  [←]          AI Coach              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│  Coach Personality  ━━━━━━━━━━━━━━ │
│  Choose how your AI coach speaks    │
│                                     │
│  ⦿ Friendly & Encouraging           │ ← Radio group
│     "You're doing amazing! 🐝"      │ (example preview)
│                                     │
│  ○ Professional & Direct            │
│     "Task complete. Next box?"      │
│                                     │
│  ○ Minimal & Quiet                  │
│     "✓" (no messages)               │
│                                     │
│  Coaching Frequency  ━━━━━━━━━━━━━ │
│  ┌─────┬─────┬─────┬─────┐         │
│  │Lots │Often│Some │Rare │         │ ← Slider chips
│  └─────┴─────┴─────┴─────┘         │
│       ●━━━━○━━━━○━━━━○             │ (slider: "Often")
│                                     │
│  Custom Prompts (Pro)  ━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ Morning motivation            │ │ ← Text inputs
│  │ Let's make today productive!  │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ Focus reminder                │ │
│  │ Stay present. You've got this │ │
│  └───────────────────────────────┘ │
│                                     │
│  AI Time Estimation  ━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ Learning mode           [ON]  │ │
│  │ AI learns from your history   │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ Auto-adjust times      [OFF]  │ │
│  │ AI updates box duration       │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Reset AI Learning             │ │ ← Danger button
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Personality Previews:**
- Tapping radio shows live example message
- Updates all coaching messages immediately

**Reset Confirmation:**
```
┌─────────────────────────────────────┐
│  Reset AI Learning?                 │
│                                     │
│  This will clear all learned        │
│  patterns and time estimates.       │
│  You cannot undo this action.       │
│                                     │
│  [Cancel]     [Reset Learning]      │
│               (red button)          │
└─────────────────────────────────────┘
```

---

### 7.5 Data Export (US-7.5, P1)

**Layout:**
```
┌─────────────────────────────────────┐
│  [←]          Export Data           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                     │
│  Download your BoxBee data in       │
│  portable formats.                  │
│                                     │
│  Export Format  ━━━━━━━━━━━━━━━━━━ │
│  ⦿ JSON (complete data)             │
│  ○ CSV (boxes only)                 │
│  ○ PDF (summary report)             │
│                                     │
│  Date Range  ━━━━━━━━━━━━━━━━━━━━ │
│  ┌───────────────────────────────┐ │
│  │ All time                  [▼] │ │ ← Dropdown
│  └───────────────────────────────┘ │
│                                     │
│  Options: Last week, Last month,    │
│  Last year, Custom range            │
│                                     │
│  Include  ━━━━━━━━━━━━━━━━━━━━━━━ │
│  [✓] Boxes and tasks                │ ← Checkboxes
│  [✓] Completion data                │
│  [✓] AI insights                    │
│  [✓] Settings & preferences         │
│  [ ] Personal notes                 │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 📦 Export Data (2.3 MB)       │ │ ← Primary button
│  └───────────────────────────────┘ │ (shows est. size)
│                                     │
│  Export history:                    │
│  • Nov 1, 2024 - JSON (1.8 MB)     │ ← Previous exports
│  • Oct 1, 2024 - CSV (450 KB)      │ (tap to re-download)
│                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  🔒 Your data is encrypted and      │ ← Privacy note
│  never shared without permission.   │
│                                     │
└─────────────────────────────────────┘
```

**Export Flow:**
1. User taps "Export Data"
2. Loading modal shows progress
3. File prepared (2-5 seconds)
4. Native share sheet opens
5. Options: Save to Files, AirDrop, Email, etc.

**Loading State:**
```
┌─────────────────────────────────────┐
│                                     │
│         📦 (box animation)          │
│                                     │
│    Preparing your data...          │
│                                     │
│    ▓▓▓▓▓▓▓▓░░░░░░  60%            │
│                                     │
└─────────────────────────────────────┘
```

---

## 8. Cross-Screen Patterns

### 8.1 Error States

**Network Error:**
```
┌─────────────────────────────────────┐
│                                     │
│         📡 (disconnected icon)      │
│            80x80                    │
│                                     │
│     Connection lost                 │ ← typography.h2
│                                     │
│  Check your internet connection     │ ← typography.body
│  and try again.                     │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Try Again               │ │ ← Secondary button
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Generic Error:**
```
┌─────────────────────────────────────┐
│         ⚠️ (warning icon)           │
│                                     │
│     Something went wrong            │
│                                     │
│  We couldn't complete that action.  │
│  Please try again.                  │
│                                     │
│  ┌───────────────────────────────┐ │
│  │        Try Again               │ │
│  └───────────────────────────────┘ │
│                                     │
│         Contact Support             │ ← Link
│                                     │
└─────────────────────────────────────┘
```

**Form Validation Error:**
```
┌─────────────────────────────┐
│ Task name                   │
│ ┌─────────────────────────┐ │
│ │                         │ │ ← Red border
│ └─────────────────────────┘ │
│ ⚠️ Task name required       │ ← errorRed text
└─────────────────────────────┘
```

---

### 8.2 Loading Patterns

**Page Loading:**
- Skeleton screens (shown in Today View)
- Shimmer effect with gray gradients
- Maintain layout structure

**Button Loading:**
```jsx
<Button loading={true}>
  <ActivityIndicator color="white" />
</Button>
```

**Inline Loading:**
```
Saving...  ⏳
```

---

### 8.3 Success Confirmations

**Toast (bottom):**
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ ✅ Box created successfully   │ │ ← Toast
│  └───────────────────────────────┘ │ (honeyCream bg)
│                                     │ spacing[4] from bottom
└─────────────────────────────────────┘
```

**Duration:** 3 seconds, auto-dismiss
**Animation:** Slide up + fade in, slide down + fade out

---

### 8.4 Empty States

**Pattern for all empty states:**
```
┌─────────────────────────────────────┐
│                                     │
│         [Icon] 100x100              │ ← Context-specific
│                                     │
│       [Heading]                     │ ← typography.h2
│                                     │
│   [Descriptive text explaining      │ ← typography.body
│   why empty and what to do]         │
│                                     │
│   ┌───────────────────────────┐    │
│   │   [Primary Action]  →      │    │
│   └───────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

Examples:
- No boxes: 🐝 "No boxes buzzing yet!"
- No insights: 💡 "Keep completing boxes to unlock insights"
- No presets: 📋 "No recent boxes yet"

---

## 9. Platform-Specific Notes

### 9.1 iOS Specific

**Safe Areas:**
- All screens respect `SafeAreaView`
- Notch/Dynamic Island handled automatically
- Home indicator spacing: `spacing[3]` (12px)

**Navigation:**
- Use iOS native back swipe gesture
- Navigation bar: Translucent blur effect
- Large titles for top-level screens

**Modals:**
- Present with slide-up animation
- Drag handle at top of sheets
- Swipe down to dismiss

**Haptics:**
- Use `UIImpactFeedbackGenerator`:
  - Light: Button taps, toggles
  - Medium: Box creation, completion
  - Heavy: Errors
  - Success: Box complete celebration

---

### 9.2 Android Specific

**Material Design:**
- Ripple effects on all touchable elements
- FAB follows Material elevation guidelines
- Use Android native navigation (back button)

**Status Bar:**
- Translucent with scrim on colored backgrounds
- Color matches screen theme

**Snackbar vs Toast:**
- Use Snackbar for actions ("Undo")
- Use Toast for simple confirmations

**Permissions:**
- Request permissions in context
- Show rationale before requesting
- Handle "Don't ask again" gracefully

---

## 10. Accessibility

### 10.1 Screen Reader Support

**Labels:**
```jsx
// All interactive elements need labels
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Create new box"
  accessibilityHint="Opens box creation form"
>
```

**Headings:**
```jsx
<Text
  accessibilityRole="header"
  accessibilityLevel={1}
>
  Today View
</Text>
```

**Live Regions:**
```jsx
// Timer updates
<Text
  accessibilityLiveRegion="polite"
  accessibilityLabel={`${minutes} minutes, ${seconds} seconds remaining`}
>
  {timerDisplay}
</Text>
```

---

### 10.2 Focus Order

**Tab Navigation:**
1. Header actions (skip, close)
2. Primary content (input, timer)
3. Secondary actions (pause, extend)
4. Navigation tabs

**Focus Indicators:**
- Visible outline: 2px solid `honeyDeep`
- Offset: 2px from element

---

### 10.3 Text Scaling

**Support Dynamic Type:**
- All text scales with system settings
- Test at 200% scale
- Minimum touch target: 44x44pt

**Maximum Scales:**
- Timer: 1.5x (too large = layout break)
- Body text: 2.0x
- Buttons: No max (always readable)

---

## 11. Development Notes

### 11.1 Component Reusability

**Shared Components:**
- Use components from Design System doc
- Maintain single source of truth
- Theme via context/props

**Screen-Specific Components:**
- Keep in screen's directory
- Export if reused elsewhere

---

### 11.2 State Management

**Local State:**
- Form inputs (controlled components)
- UI toggles (accordion, tabs)
- Animation values

**Global State:**
- User session
- Active box
- App settings

**Server State:**
- All box data (query/mutation)
- User profile
- AI insights

---

### 11.3 Performance Targets

**Metrics:**
- Screen load: <1 second
- Animation FPS: 60 (maintained)
- Input response: <100ms
- API calls: <2 seconds P95

**Optimization:**
- Lazy load heavy components
- Virtualize long lists
- Memoize expensive calculations
- Image optimization (WebP, lazy load)

---

## 12. Testing Checklist

**Per Screen:**
- [ ] All states render correctly (default, loading, error, empty)
- [ ] Animations smooth (60 FPS)
- [ ] Gestures work (tap, swipe, scroll)
- [ ] Keyboard handling (doesn't hide content)
- [ ] Safe areas respected (notch, home indicator)
- [ ] Accessibility labels present
- [ ] Dark mode compatible (if implemented)
- [ ] Haptics fire appropriately (iOS)
- [ ] Platform-specific behaviors work (iOS/Android)
- [ ] Works offline (where applicable)

**Cross-Device:**
- [ ] iPhone SE (small screen)
- [ ] iPhone 14 Pro (Dynamic Island)
- [ ] iPhone 14 Pro Max (large screen)
- [ ] Android small (5.5")
- [ ] Android large (6.7")
- [ ] Tablet (if supported)

---

## Design Handoff Checklist

**For Developers:**
- ✅ All screens specified with layouts
- ✅ Spacing using design system tokens
- ✅ Component references clear
- ✅ States documented (loading, error, empty, success)
- ✅ Animations described
- ✅ Gestures defined
- ✅ Platform differences noted
- ✅ Accessibility requirements listed

**Next Document:**
See `03-Asset-Requirements.md` for complete asset list (icons, images, animations).

---

**Ready for development! 🐝**

*Last updated: November 28, 2024*

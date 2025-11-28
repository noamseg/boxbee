# BoxBee User Stories - Sprint Ready

**Version:** 1.0
**Date:** November 28, 2024
**Format:** Ready for import into Jira, Linear, or GitHub Issues

---

## How to Use This Document

Each story below is formatted for easy copy/paste into your project management tool:
- **ID:** Unique identifier
- **Title:** One-liner summary
- **Priority:** P0 (Must Have) or P1 (Should Have)
- **Points:** Story point estimate
- **Epic:** Parent epic reference
- **Description:** User story format
- **Acceptance Criteria:** Testable requirements
- **Technical Notes:** Implementation hints
- **Dependencies:** Blockers

---

## Epic 1: User Onboarding

### US-1.1: First-Time User Onboarding

**Priority:** P0
**Points:** 5
**Epic:** E1 - User Onboarding

**User Story:**
```
As a new user
I want to quickly understand what BoxBee does and create my first box
So that I can start being productive immediately
```

**Acceptance Criteria:**
- [ ] Onboarding flow has maximum 4 screens
- [ ] User can complete in < 60 seconds
- [ ] User understands time-boxing concept after viewing
- [ ] User creates their first box within the onboarding flow
- [ ] User grants necessary permissions (notifications minimum)
- [ ] Skip/back navigation available
- [ ] Works on both iOS and Android

**Technical Notes:**
- Use React Native onboarding library (e.g., react-native-onboarding-swiper)
- Store onboarding_completed flag in user profile
- Analytics tracking on each screen
- Screen 1: Welcome + value prop
- Screen 2: How time-boxing works
- Screen 3: AI coach introduction
- Screen 4: Permissions + first box creation

**Dependencies:**
- None (first feature)

**Testing:**
- [ ] Unit tests for onboarding state management
- [ ] E2E test: Complete full flow
- [ ] A/B test different copy/visuals
- [ ] Measure completion rate and drop-off points

---

### US-1.2: Permission Requests

**Priority:** P0
**Points:** 3
**Epic:** E1 - User Onboarding

**User Story:**
```
As a new user
I want to understand why permissions are needed
So that I feel comfortable granting them
```

**Acceptance Criteria:**
- [ ] Clear explanation for notification permission (with examples)
- [ ] Clear explanation for calendar permission (optional)
- [ ] Ability to skip optional permissions
- [ ] Ability to enable permissions later in Settings
- [ ] Follows iOS/Android platform best practices
- [ ] No permission requests before user sees value
- [ ] Graceful handling of permission denial

**Technical Notes:**
- Use react-native-permissions library
- iOS: Configure Info.plist with permission descriptions
- Android: Configure AndroidManifest.xml
- Request notifications after onboarding screen 3
- Request calendar as optional in screen 4
- Store permission states in local storage

**Dependencies:**
- US-1.1 (permissions requested during onboarding)

**Testing:**
- [ ] Test permission grant flow (iOS/Android)
- [ ] Test permission denial flow
- [ ] Test "ask later" functionality
- [ ] Verify Settings page can trigger permission prompts

---

## Epic 2: Box Creation

### US-2.1: Quick Box Creation with AI

**Priority:** P0
**Points:** 8
**Epic:** E2 - Box Creation

**User Story:**
```
As a user
I want to quickly create a time-boxed task using natural language
So that I can start working without friction
```

**Acceptance Criteria:**
- [ ] Single text input accepts natural language
- [ ] AI parses task name and duration from input
- [ ] AI response within 1 second (95th percentile)
- [ ] User can override AI-suggested duration
- [ ] Box created in < 10 seconds total time
- [ ] Works for variety of inputs:
  - [ ] "Code review for 30 minutes"
  - [ ] "Write report" (no duration specified)
  - [ ] "Quick email check" (implicit short duration)
- [ ] Graceful fallback if AI fails (default 30 min)
- [ ] Loading state during AI processing

**Technical Notes:**
- OpenAI GPT-4o-mini for parsing
- Prompt template in Feature Spec F1
- API endpoint: POST /boxes/parse
- Debounce input (500ms) before API call
- Cache common phrases to reduce API calls
- Fallback to 30 minutes if parsing fails
- Store parsed result in box metadata

**Dependencies:**
- OpenAI API integration
- Backend /boxes/parse endpoint
- User authentication (US-7.1)

**Testing:**
- [ ] Unit tests: Parse various input formats
- [ ] Unit tests: Handle AI timeout/errors
- [ ] Integration test: Full creation flow
- [ ] Performance test: <1s API response
- [ ] Manual test: 20+ real-world phrases
- [ ] A/B test: AI vs manual duration input

**Cost Estimate:** ~$0.001 per box creation

---

### US-2.2: Start Box Immediately or Schedule

**Priority:** P0
**Points:** 5
**Epic:** E2 - Box Creation

**User Story:**
```
As a user
I want to choose when to start my box
So that I can plan ahead or start immediately
```

**Acceptance Criteria:**
- [ ] Default option: "Start Now"
- [ ] Option: "Later Today" (prompts for time)
- [ ] Option: "Schedule" (date + time picker)
- [ ] Scheduled boxes appear in Today View
- [ ] Notification sent at scheduled time
- [ ] Can edit scheduled time before box starts
- [ ] Timezone handling for scheduled boxes

**Technical Notes:**
- Store scheduled_time in boxes table (nullable)
- If null, box starts immediately
- Use react-native-date-picker for time selection
- Schedule local notifications for start time
- Background job checks for scheduled boxes
- Update box status from "scheduled" to "active" at start time

**Dependencies:**
- US-2.1 (box creation)
- US-3.3 (notifications setup)
- Today View (US-5.1)

**Testing:**
- [ ] Test immediate start flow
- [ ] Test scheduled start (various times)
- [ ] Test notification delivery at scheduled time
- [ ] Test timezone edge cases
- [ ] Test editing scheduled time

---

### US-2.3: Quick Box Presets

**Priority:** P1
**Points:** 5
**Epic:** E2 - Box Creation

**User Story:**
```
As a returning user
I want to quickly recreate common boxes
So that I don't have to type the same tasks repeatedly
```

**Acceptance Criteria:**
- [ ] "Recent" section shows last 5 unique boxes
- [ ] One-tap to recreate with same duration
- [ ] "For You" section shows AI suggestions based on:
  - [ ] Time of day patterns
  - [ ] Day of week patterns
  - [ ] Completion history
- [ ] Presets update dynamically as patterns change
- [ ] Can dismiss AI suggestions
- [ ] Recent boxes don't show duplicates

**Technical Notes:**
- Query boxes table for recent unique tasks
- Deduplicate by task_description (case-insensitive)
- AI suggestions use pattern_recognition queries
- Cache suggestions (refresh every 6 hours)
- Tap preset → pre-fill creation modal
- Store preset_used flag for analytics

**Dependencies:**
- US-2.1 (box creation)
- US-6.2 (pattern recognition for "For You")
- Minimum usage data (>10 boxes)

**Testing:**
- [ ] Test recent boxes display
- [ ] Test deduplication logic
- [ ] Test AI suggestion accuracy
- [ ] Test preset creation flow
- [ ] Measure adoption rate

---

## Epic 3: Focus Mode & Active Box

### US-3.1: Immersive Focus Mode

**Priority:** P0
**Points:** 8
**Epic:** E3 - Focus Mode & Active Box

**User Story:**
```
As a user working in a box
I want a distraction-free interface
So that I can maintain deep focus
```

**Acceptance Criteria:**
- [ ] Full-screen timer display (hide navigation)
- [ ] Large, readable countdown (72pt font)
- [ ] Minimal UI elements (task name, timer, controls only)
- [ ] Progress ring fills as time elapses (positive framing)
- [ ] Smooth animations at 60 FPS
- [ ] Works in portrait and landscape orientations
- [ ] Status bar hidden
- [ ] Haptic feedback at key moments (start, 5 min warning, complete)
- [ ] Breathing animation on background (subtle, 4-second cycle)

**Technical Notes:**
- Use React Native Reanimated for 60 FPS animations
- Progress ring: SVG with animated stroke-dashoffset
- Timer updates every second using setInterval
- Hide status bar: StatusBar.setHidden(true)
- Hexagonal background pattern as SVG
- Breathing animation: scale 1.0 → 1.02 → 1.0 (4s loop)
- Haptics: react-native-haptic-feedback
- Keep screen awake: react-native-keep-awake

**Dependencies:**
- US-2.1 (box must be created)
- Timer logic (countdown calculation)

**Testing:**
- [ ] Performance test: 60 FPS sustained
- [ ] Battery test: <2% drain per hour
- [ ] Visual test: All screen sizes
- [ ] Orientation test: Portrait ↔ Landscape
- [ ] Interruption test: Phone calls, notifications
- [ ] Memory leak test: 1-hour session

**Design References:**
- Calm app (breathing animation)
- Forest app (progress visual)

---

### US-3.2: Box Controls During Work

**Priority:** P0
**Points:** 5
**Epic:** E3 - Focus Mode & Active Box

**User Story:**
```
As a user in an active box
I want simple controls without breaking focus
So that I can adjust if needed
```

**Acceptance Criteria:**
- [ ] Pause/Resume button (single tap)
- [ ] Extend box button with options (+5, +15, +30 min)
- [ ] Finish Early button
- [ ] Abandon box option (with confirmation dialog)
- [ ] Controls don't dominate screen (minimal, bottom placement)
- [ ] Actions require intentional tap (prevent accidents)
- [ ] Visual feedback on interaction (button press state)

**Technical Notes:**
- Bottom bar with 3 icon buttons
- Pause: Clock icon, toggles to Play when paused
- Extend: Plus icon, opens modal with time options
- Finish: Check icon, opens completion flow
- Abandon: Trash icon, shows confirmation alert
- Update box status in DB on each action
- Track extensions_count and pauses_count

**Dependencies:**
- US-3.1 (focus mode)
- Timer state management

**Testing:**
- [ ] Test pause/resume timer accuracy
- [ ] Test extend functionality (each increment)
- [ ] Test finish early flow
- [ ] Test abandon confirmation
- [ ] Test tap targets (44x44pt minimum)
- [ ] Test accidental tap prevention

---

### US-3.3: Time-Based Notifications

**Priority:** P0
**Points:** 5
**Epic:** E3 - Focus Mode & Active Box

**User Story:**
```
As a user in an active box
I want gentle notifications at key moments
So that I stay aware of time without constant checking
```

**Acceptance Criteria:**
- [ ] 5-minute warning notification (sound + haptic)
- [ ] Box completion notification (celebration sound + haptic)
- [ ] Notifications work when app is backgrounded
- [ ] Notifications work when phone is locked
- [ ] Respects system Do Not Disturb settings
- [ ] Configurable in Settings (can disable each type)
- [ ] Gentle, non-jarring sounds
- [ ] Custom notification content (shows task name, time remaining)

**Technical Notes:**
- Use react-native-push-notification
- iOS: Configure notification categories and sounds
- Android: Configure notification channels
- Schedule local notifications when box starts
- Cancel notifications if box ended early
- Custom sounds: gentle chime for warning, celebration for completion
- Notification payload includes box_id for deep linking

**Dependencies:**
- US-1.2 (notification permission)
- US-3.1 (active box)

**Testing:**
- [ ] Test 5-min warning delivery (foreground/background/locked)
- [ ] Test completion notification
- [ ] Test DND respect (should still show when checking phone)
- [ ] Test notification cancellation on early finish
- [ ] Test Settings toggle disables notifications
- [ ] Test custom sounds play correctly

---

### US-3.4: AI Coaching During Box

**Priority:** P1
**Points:** 3
**Epic:** E3 - Focus Mode & Active Box

**User Story:**
```
As a user working in a box
I want gentle AI encouragement
So that I stay motivated
```

**Acceptance Criteria:**
- [ ] Occasional encouragement messages (max 2-3 per box)
- [ ] Context-aware messages:
  - [ ] "Halfway there" at 50% mark
  - [ ] "You're on pace" if progressing well
  - [ ] "Almost done" at 80% mark
- [ ] Messages fade after 2-3 seconds (don't linger)
- [ ] No distracting animations
- [ ] Can be disabled in Settings
- [ ] Messages don't interrupt if user switched apps

**Technical Notes:**
- Display messages as toast/snackbar
- Trigger at specific time milestones (25%, 50%, 75%)
- Use AI to select message based on context (optional)
- Store messages in constants file (fallback)
- Fade animation: opacity 1.0 → 0.0 over 2s
- Check coaching_enabled preference before showing

**Dependencies:**
- US-3.1 (focus mode)
- US-7.4 (AI preferences)

**Testing:**
- [ ] Test message display timing
- [ ] Test fade animation
- [ ] Test Settings disable toggle
- [ ] Measure user sentiment (helpful vs. annoying)
- [ ] A/B test: with vs. without coaching

---

## Epic 4: Box Completion & Reflection

### US-4.1: Quick Completion Reflection

**Priority:** P0
**Points:** 5
**Epic:** E4 - Box Completion & Reflection

**User Story:**
```
As a user completing a box
I want to quickly log the outcome
So that the app learns from my performance
```

**Acceptance Criteria:**
- [ ] Automatic prompt when timer expires
- [ ] Three-tap completion status:
  - [ ] ✅ Completed
  - [ ] ⚠️ Almost (partially done)
  - [ ] ❌ Not completed
- [ ] Optional focus quality rating (3 levels: 😐 🙂 😄)
- [ ] Can skip focus quality question
- [ ] Takes < 5 seconds total
- [ ] Can be dismissed to complete later (reminder after 5 min)
- [ ] Data saved to boxes table

**Technical Notes:**
- Show modal when box.status → "completed"
- Update completion_status field on selection
- Update focus_quality field (nullable, 1-5 scale)
- 3-level rating maps to: 1-2 (low), 3-4 (medium), 5 (high)
- Store completed_at timestamp
- Calculate actual_duration (end_time - start_time)
- Analytics: track reflection completion rate

**Dependencies:**
- US-3.1 (box completion triggers this)
- Boxes table schema

**Testing:**
- [ ] Test auto-prompt on completion
- [ ] Test each completion status saves correctly
- [ ] Test skip focus quality flow
- [ ] Test dismiss and reminder
- [ ] Test data persistence
- [ ] Time the flow (<5s)

---

### US-4.2: Box Completion Celebration

**Priority:** P1
**Points:** 3
**Epic:** E4 - Box Completion & Reflection

**User Story:**
```
As a user completing a box
I want to feel a sense of accomplishment
So that I'm motivated to continue
```

**Acceptance Criteria:**
- [ ] Satisfying animation on completion (honey drop or sparkle)
- [ ] Haptic feedback (success pattern)
- [ ] Positive message displayed (e.g., "Great work!", "Box completed!")
- [ ] Shows weekly progress update (e.g., "3/15 boxes this week")
- [ ] Not over-the-top (maintains professional feel)
- [ ] Skippable (tap to dismiss immediately)
- [ ] Different animations for milestones (e.g., 10th box, weekly goal)

**Technical Notes:**
- Animation: Lottie file (honey drop or confetti)
- Duration: 1.5 seconds
- Haptic: "success" pattern (iOS impact feedback heavy)
- Message rotation: Array of positive messages
- Query weekly progress: COUNT boxes WHERE this week
- Special animation for milestones (check progress ≥ goal)
- Tap anywhere to dismiss

**Dependencies:**
- US-4.1 (completion flow)
- US-5.3 (weekly progress data)

**Testing:**
- [ ] Test animation performance (60 FPS)
- [ ] Test haptic feedback
- [ ] Test weekly progress calculation
- [ ] Test milestone detection
- [ ] Test skip/dismiss functionality
- [ ] User feedback: delightful vs. annoying

---

## Epic 5: Today View & Dashboard

### US-5.1: Today View Home Screen

**Priority:** P0
**Points:** 8
**Epic:** E5 - Today View & Dashboard

**User Story:**
```
As a user opening the app
I want to see my day at a glance
So that I know what I'm working on
```

**Acceptance Criteria:**
- [ ] Active box prominently displayed (if running)
  - [ ] Shows task name, time remaining, progress
  - [ ] Tap to enter full focus mode
- [ ] AI suggestion card (if available)
  - [ ] Shows recommended next box
  - [ ] "Start" and "Skip" buttons
- [ ] Today's scheduled boxes list (chronological order)
  - [ ] Shows time, task name, duration
  - [ ] Checkbox for completed boxes
  - [ ] Swipe actions: Edit, Delete
- [ ] Weekly progress indicator
  - [ ] Progress bar or hexagonal fill
  - [ ] "X/Y boxes this week"
  - [ ] Streak counter
- [ ] Floating Action Button (FAB) for quick add
- [ ] Loads in < 1 second
- [ ] Pull-to-refresh functionality

**Technical Notes:**
- FlatList for boxes (performance with many items)
- Query: boxes WHERE user_id AND DATE(start_time) = TODAY
- Active box: boxes WHERE status = 'active'
- Use React Query for data fetching and caching
- Optimistic updates on actions (mark complete, delete)
- FAB: react-native-paper or custom component
- Pull-to-refresh: RefreshControl

**Dependencies:**
- US-2.1 (boxes to display)
- US-3.1 (active box)
- US-5.3 (weekly progress)
- US-5.2 (AI suggestions)

**Testing:**
- [ ] Load time test: <1s with 100 boxes
- [ ] Test active box display and tap action
- [ ] Test scheduled boxes list rendering
- [ ] Test swipe actions (edit/delete)
- [ ] Test pull-to-refresh
- [ ] Test empty states (no boxes today)

---

### US-5.2: AI Smart Suggestions

**Priority:** P1
**Points:** 8
**Epic:** E5 - Today View & Dashboard

**User Story:**
```
As a user planning my day
I want AI to suggest what to box next
So that I spend less time deciding
```

**Acceptance Criteria:**
- [ ] Suggests boxes based on time of day patterns
- [ ] Suggests boxes based on recent history
- [ ] Suggests boxes based on completion patterns
- [ ] Shows one primary suggestion (not overwhelming)
- [ ] Suggestion is dismissible (swipe or X button)
- [ ] Updates throughout the day (e.g., different suggestions at 9am vs 2pm)
- [ ] Can be disabled in Settings
- [ ] Shows rationale (e.g., "You usually do code reviews in the morning")

**Technical Notes:**
- Backend endpoint: GET /suggestions/next
- Algorithm:
  1. Check time of day (morning/afternoon/evening)
  2. Query user's most common tasks for this time slot
  3. Exclude already completed today
  4. Rank by completion_rate for this time
  5. Return top suggestion
- Cache suggestions (TTL: 1 hour)
- Fall back to most recent incomplete box if no pattern
- Store suggestion_dismissed events for learning

**Dependencies:**
- US-6.2 (pattern recognition)
- Minimum 20 completed boxes for patterns

**Testing:**
- [ ] Test suggestions match time-of-day patterns
- [ ] Test suggestion changes throughout day
- [ ] Test dismissal and non-repetition
- [ ] Test Settings disable toggle
- [ ] Measure acceptance rate (target >40%)

---

### US-5.3: Weekly Progress Tracking

**Priority:** P0
**Points:** 5
**Epic:** E5 - Today View & Dashboard

**User Story:**
```
As a user
I want to see my progress toward weekly goals
So that I stay motivated
```

**Acceptance Criteria:**
- [ ] Visual progress bar (hexagonal fill pattern)
- [ ] Displays "X/Y boxes this week"
- [ ] Target boxes per week (AI-adjusted based on user's pace)
- [ ] Streak counter (consecutive days with ≥1 completed box)
- [ ] Tap progress to see detailed breakdown
- [ ] Updates in real-time as boxes are completed
- [ ] Resets Sunday night / Monday morning

**Technical Notes:**
- Query: COUNT boxes WHERE user_id AND week_start ≤ created_at ≤ week_end AND status = 'completed'
- Calculate streak: consecutive days with completed_boxes > 0
- AI goal: AVG(boxes_per_week over last 4 weeks) * 1.1 (10% stretch)
- Store weekly_goal in user_preferences
- Progress bar: filled hexagons (7 days × 3 boxes = 21 hexagons typical)
- Real-time update: Optimistic UI update, then sync

**Dependencies:**
- Completed boxes data
- User preferences table

**Testing:**
- [ ] Test weekly count accuracy
- [ ] Test goal calculation
- [ ] Test streak calculation
- [ ] Test reset timing (Sunday/Monday boundary)
- [ ] Test tap to view details
- [ ] Test real-time updates

---

## Epic 6: AI Insights & Patterns

### US-6.1: Real-Time AI Assistance

**Priority:** P0
**Points:** 13
**Epic:** E6 - AI Insights & Patterns

**User Story:**
```
As a user creating a box
I want AI to help me estimate time accurately
So that I improve my planning skills
```

**Acceptance Criteria:**
- [ ] AI suggests duration based on task description
- [ ] Shows confidence level (High/Medium/Low) or rationale
- [ ] Learns from user's actual completion times
- [ ] Adapts suggestions over time (improves accuracy)
- [ ] User can easily override suggestion
- [ ] Cold start: Uses GPT-4o-mini for generic tasks
- [ ] Warm start: Uses user history when available (>5 boxes in category)
- [ ] Shows rationale: "Based on similar tasks" or "Your usual time for writing"

**Technical Notes:**
- See Feature Spec F3 for full algorithm
- Cold start: GPT-4o-mini API call
- Warm start: Query user_patterns table
- Categorization: OpenAI embeddings (text-embedding-3-small)
- Cache category embeddings to reduce costs
- Update patterns after each completion
- Store estimation_source in box metadata (for tracking)
- API endpoint: POST /boxes/estimate

**Dependencies:**
- OpenAI API integration
- User history (grows over time)
- Embeddings cache

**Testing:**
- [ ] Test cold start estimation accuracy (manual eval)
- [ ] Test warm start with user history
- [ ] Test categorization accuracy
- [ ] Test continuous learning (accuracy improves)
- [ ] Performance test: <1s response time
- [ ] Cost test: <$0.02 per box

**Success Metric:** Estimation within ±15 min, 70%+ of time

---

### US-6.2: Pattern Recognition Insights

**Priority:** P1
**Points:** 13
**Epic:** E6 - AI Insights & Patterns

**User Story:**
```
As a user
I want to discover my productivity patterns
So that I can work smarter
```

**Acceptance Criteria:**
- [ ] AI analyzes completion rate by time of day
- [ ] AI analyzes estimation accuracy by task type
- [ ] AI identifies optimal box duration for user
- [ ] AI detects day-of-week performance patterns
- [ ] Insights delivered non-intrusively (card on home screen)
- [ ] Maximum 1 insight per day (not overwhelming)
- [ ] Each insight includes actionable recommendation
- [ ] User can mark insight as "helpful" or "not helpful"
- [ ] Minimum 10 completed boxes before generating insights

**Technical Notes:**
- See Feature Spec F4 for SQL queries
- Daily background job runs pattern analysis
- 5 pattern types:
  1. Time-of-day effectiveness
  2. Task duration sweet spot
  3. Estimation accuracy trend
  4. Day-of-week rhythm
  5. Task-specific patterns
- Prioritize insights by impact (biggest difference)
- Store in insights table
- Cache results (refresh daily)
- Feedback loop: Adjust future insights based on user ratings

**Dependencies:**
- US-4.1 (completion data)
- Minimum 10 completed boxes
- Background job scheduler

**Testing:**
- [ ] Test each pattern type detection
- [ ] Test insight generation logic
- [ ] Test prioritization algorithm
- [ ] Test delivery timing (not overwhelming)
- [ ] Test feedback mechanism
- [ ] Measure "helpful" rating (target >60%)

---

### US-6.3: Weekly Hive Report

**Priority:** P1
**Points:** 8
**Epic:** E6 - AI Insights & Patterns

**User Story:**
```
As a user
I want a weekly summary of my performance
So that I can reflect and improve
```

**Acceptance Criteria:**
- [ ] Delivered Sunday 7pm local time OR on next app open after Sunday
- [ ] Shows summary stats:
  - [ ] Boxes completed
  - [ ] Total focus time
  - [ ] Completion rate
  - [ ] Current streak
- [ ] Includes 1-2 personalized insights with recommendations
- [ ] Visual data representation (bar chart for daily boxes)
- [ ] Improvement metrics vs. previous week
- [ ] Suggests goal for next week (AI-adjusted)
- [ ] Can be accessed anytime in "Insights" section
- [ ] Push notification when report ready

**Technical Notes:**
- See Feature Spec F5 for generation logic
- Background job: Sunday 7pm (user's local timezone)
- Store in weekly_reports table
- Generate report data:
  - Query all boxes for week
  - Calculate stats
  - Run top 2 insights
  - Compare to previous week
  - Suggest next week goal
- Local notification trigger
- Report history: Keep last 12 weeks
- Export option (PDF or email)

**Dependencies:**
- US-6.2 (insights)
- US-5.3 (weekly progress)
- Minimum 1 week of data

**Testing:**
- [ ] Test report generation accuracy
- [ ] Test delivery timing (timezone handling)
- [ ] Test notification delivery
- [ ] Test visual chart rendering
- [ ] Test week-over-week comparison
- [ ] Test access to historical reports
- [ ] User feedback: Value of report

---

## Epic 7: Settings & Account Management

### US-7.1: User Account Creation

**Priority:** P0
**Points:** 8
**Epic:** E7 - Settings & Account Management

**User Story:**
```
As a new user
I want to create an account easily
So that my data syncs across devices
```

**Acceptance Criteria:**
- [ ] Email + password signup
- [ ] Social login options:
  - [ ] Sign in with Google
  - [ ] Sign in with Apple
- [ ] Email verification flow
- [ ] Profile creation (name, optional photo)
- [ ] Password requirements clearly stated (8+ chars, letters + numbers)
- [ ] Error handling for existing email, weak password
- [ ] Follows security best practices (hashed passwords, HTTPS)
- [ ] Auto-login after signup

**Technical Notes:**
- Backend: POST /auth/signup
- Password hashing: bcrypt (10 rounds)
- JWT token generation (7-day expiration)
- Refresh token for long-term sessions
- Email verification: Send verification email, verify token
- Social login: OAuth 2.0
  - Google: react-native-google-signin
  - Apple: @invertase/react-native-apple-authentication
- Store tokens securely: react-native-keychain
- Navigate to onboarding after signup

**Dependencies:**
- Email service (SendGrid or similar)
- OAuth provider setup

**Testing:**
- [ ] Test email/password signup flow
- [ ] Test Google Sign-In (iOS + Android)
- [ ] Test Apple Sign-In (iOS)
- [ ] Test email verification
- [ ] Test error handling (duplicate email, weak password)
- [ ] Security audit: Password storage, token handling

---

### US-7.2: Subscription Management

**Priority:** P0
**Points:** 8
**Epic:** E7 - Settings & Account Management

**User Story:**
```
As a user
I want to manage my subscription
So that I can upgrade, downgrade, or cancel
```

**Acceptance Criteria:**
- [ ] 14-day free trial automatically applied on signup
- [ ] Clear trial end date displayed in app
- [ ] In-app purchase flow for iOS
- [ ] In-app purchase flow for Android (Google Play Billing)
- [ ] Subscription tiers:
  - [ ] Monthly: $9.99
  - [ ] Annual: $89.99
  - [ ] Lifetime: $199
- [ ] Subscription status visible in Settings
- [ ] Cancel subscription option (keeps access until period end)
- [ ] Restore purchases option
- [ ] Receipt/billing history

**Technical Notes:**
- Use RevenueCat for cross-platform IAP
- Configure products in App Store Connect + Google Play Console
- API: POST /subscriptions/purchase
- Store subscription_tier and expires_at in users table
- Trial logic: expires_at = signup_date + 14 days
- Server-side validation of receipts
- Webhooks for subscription events (renewal, cancellation)
- Paywall screen if trial expired and no subscription

**Dependencies:**
- RevenueCat account setup
- App Store Connect setup (iOS)
- Google Play Console setup (Android)

**Testing:**
- [ ] Test free trial activation
- [ ] Test IAP flow (iOS + Android)
- [ ] Test each subscription tier
- [ ] Test subscription cancellation
- [ ] Test restore purchases
- [ ] Test paywall when trial expires
- [ ] Test subscription status display

**Revenue Target:** 15% conversion from trial

---

### US-7.3: Notification Preferences

**Priority:** P0
**Points:** 3
**Epic:** E7 - Settings & Account Management

**User Story:**
```
As a user
I want to control what notifications I receive
So that I'm not annoyed
```

**Acceptance Criteria:**
- [ ] Toggle: Box reminders (scheduled start time)
- [ ] Toggle: Box warnings (5 min remaining)
- [ ] Toggle: Box completion notifications
- [ ] Toggle: Weekly insights/reports
- [ ] Toggle: AI suggestions
- [ ] Changes apply immediately (no restart required)
- [ ] Persisted across app sessions
- [ ] Clear explanation for each notification type

**Technical Notes:**
- Store in notification_preferences (JSONB in users table)
- Default all to true (opt-out model)
- Check preferences before scheduling notifications
- API: PATCH /user/preferences
- Local storage sync with backend
- Settings screen: Toggle list component

**Dependencies:**
- US-3.3 (notifications setup)

**Testing:**
- [ ] Test each toggle on/off
- [ ] Test persistence after app restart
- [ ] Test notification delivery respects settings
- [ ] Test API sync

---

### US-7.4: AI Coach Customization

**Priority:** P1
**Points:** 5
**Epic:** E7 - Settings & Account Management

**User Story:**
```
As a user
I want to customize how AI coaches me
So that it matches my preferences
```

**Acceptance Criteria:**
- [ ] Coaching style selector:
  - [ ] Auto (learns what works)
  - [ ] Direct (straightforward, no fluff)
  - [ ] Encouraging (warm and supportive)
  - [ ] Analytical (data-focused)
  - [ ] Minimal (bare minimum)
- [ ] Insight frequency selector:
  - [ ] Every session
  - [ ] Daily
  - [ ] Weekly
  - [ ] Rarely
  - [ ] Never
- [ ] Insight types toggles:
  - [ ] Time-of-day patterns
  - [ ] Duration recommendations
  - [ ] Estimation accuracy
  - [ ] Day-of-week rhythms
- [ ] "Reset AI Learning" button (clears patterns, starts fresh)
- [ ] Changes reflected immediately in app behavior

**Technical Notes:**
- Store in ai_preferences (JSONB in users table)
- Coaching style affects message tone/wording
- Insight frequency controls delivery cadence
- Reset AI Learning: DELETE FROM user_patterns WHERE user_id
- API: PATCH /user/preferences
- Confirmation dialog for reset action

**Dependencies:**
- US-6.1 (AI assistance)
- US-6.2 (insights)

**Testing:**
- [ ] Test each coaching style variation
- [ ] Test frequency setting effect
- [ ] Test insight type toggles
- [ ] Test AI reset functionality
- [ ] Measure preference distribution

---

### US-7.5: Data Export

**Priority:** P1
**Points:** 3
**Epic:** E7 - Settings & Account Management

**User Story:**
```
As a user
I want to export my data
So that I own my information
```

**Acceptance Criteria:**
- [ ] Export all boxes to CSV format
- [ ] CSV includes: task, estimated_duration, actual_duration, completion_status, start_time, end_time
- [ ] Export file emailed to user's email address
- [ ] Alternative: Download file directly (iOS/Android file system)
- [ ] GDPR/CCPA compliant
- [ ] Includes data from all time (not just recent)
- [ ] Processing indicator while export generates

**Technical Notes:**
- API: POST /user/export
- Backend generates CSV file
- CSV columns: id, task_description, estimated_duration, actual_duration, status, completion_status, start_time, end_time, focus_quality, created_at
- Email export: Use email service to send attachment
- Direct download: react-native-fs for file handling
- GDPR compliance: Export all personal data on request
- Privacy policy link from Settings

**Dependencies:**
- Email service integration

**Testing:**
- [ ] Test CSV generation accuracy
- [ ] Test email delivery
- [ ] Test direct download (iOS + Android)
- [ ] Test large dataset export (1000+ boxes)
- [ ] Verify GDPR compliance

---

## Sprint Assignment Recommendation

### Sprint 1-2 (Weeks 1-4): Foundation
- US-7.1 (User Account Creation) - 8pts
- Infrastructure setup - ~15pts
- **Total: ~25pts**

### Sprint 3-4 (Weeks 5-8): Core Loop
- US-1.1 (Onboarding) - 5pts
- US-1.2 (Permissions) - 3pts
- US-2.1 (Box Creation, basic) - 5pts
- US-3.1 (Focus Mode) - 8pts
- US-3.2 (Box Controls) - 5pts
- US-4.1 (Completion) - 5pts
- **Total: ~30pts**

### Sprint 5-6 (Weeks 9-12): AI Integration
- US-2.1 (Complete with AI) - remaining 3pts
- US-6.1 (AI Assistance) - 13pts
- US-3.3 (Notifications) - 5pts
- US-2.2 (Scheduling) - 5pts
- **Total: ~25pts**

### Sprint 7-8 (Weeks 13-16): Dashboard & Monetization
- US-5.1 (Today View) - 8pts
- US-5.3 (Weekly Progress) - 5pts
- US-7.2 (Subscription) - 8pts
- US-7.3 (Notification Prefs) - 3pts
- US-6.2 (Insights) - 13pts
- **Total: ~35pts**

### Sprint 9-10 (Weeks 17-20): Polish & Launch
- All P1 stories - ~25pts
- Bug fixes & polish - ~10pts
- **Total: ~35pts**

---

## Story Point Reference

**1-2 points:** Simple, well-understood, minimal risk
**3-5 points:** Moderate complexity, some unknowns
**8 points:** Complex, multiple components, integration work
**13 points:** Very complex, high risk, requires R&D
**21+ points:** Epic too large, needs breaking down

---

**Total Stories:** 22
**Total Points:** 137
**Estimated Duration:** 17-20 weeks (assuming 7-8 points/week velocity)

---

**Next Actions:**
1. Import stories into your project management tool
2. Assign to sprints based on dependencies
3. Create technical spike stories where needed
4. Begin Sprint 1 planning session

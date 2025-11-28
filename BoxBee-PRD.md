# BoxBee Product Requirements Document (PRD)

**Version:** 1.0
**Date:** November 28, 2024
**Status:** Draft - MLP Specification
**Owner:** Product/Engineering
**Target Release:** v1.0 MLP

---

## Document Purpose

This Product Requirements Document (PRD) provides detailed technical specifications for the BoxBee Minimum Lovable Product (MLP). It is intended for:
- **Engineers**: Implementation specifications and acceptance criteria
- **Designers**: Feature requirements and user flows
- **QA**: Testing criteria and edge cases
- **Product**: Feature prioritization and scope management

---

## Table of Contents

1. [Product Overview](#product-overview)
2. [User Stories & Use Cases](#user-stories--use-cases)
3. [Feature Specifications](#feature-specifications)
4. [Technical Requirements](#technical-requirements)
5. [Data Models](#data-models)
6. [API Specifications](#api-specifications)
7. [UI/UX Requirements](#uiux-requirements)
8. [AI/ML Specifications](#aiml-specifications)
9. [Testing & Quality Assurance](#testing--quality-assurance)
10. [Success Metrics](#success-metrics)
11. [Out of Scope](#out-of-scope)

---

## Product Overview

### Vision
BoxBee is an AI-native mobile productivity app that helps knowledge workers master time-boxing to improve focus, task completion, and time estimation skills.

### MLP Goals
- Launch functional iOS and Android apps to app stores
- Deliver AI-powered time estimation and insights
- Achieve 75%+ task completion rate for active users
- Validate product-market fit with 15%+ trial conversion

### Target Users
- Primary: Tech/knowledge workers (ages 25-40)
- Platform: Mobile-first (iOS 15+, Android 12+)
- Context: Individual productivity (not teams)

### Key Differentiators
1. AI-native (not bolted on)
2. Brutally simple UX (<10 sec to action)
3. Active coaching during work
4. Personalized improvement insights

---

## User Stories & Use Cases

### Epic 1: User Onboarding

**US-1.1: First-Time User Onboarding**
```
As a new user
I want to quickly understand what BoxBee does and create my first box
So that I can start being productive immediately

Acceptance Criteria:
- Onboarding completes in < 60 seconds
- User creates first box within onboarding flow
- User understands core concept (time-boxing)
- User grants necessary permissions (notifications, optional calendar)
- No more than 4 onboarding screens

Priority: P0 (Must Have)
Estimated Effort: 5 points
```

**US-1.2: Permission Requests**
```
As a new user
I want to understand why permissions are needed
So that I feel comfortable granting them

Acceptance Criteria:
- Clear explanation for each permission
- Ability to skip optional permissions
- Ability to enable permissions later in settings
- Follows platform best practices (iOS/Android)

Priority: P0 (Must Have)
Estimated Effort: 3 points
```

### Epic 2: Box Creation

**US-2.1: Quick Box Creation with AI**
```
As a user
I want to quickly create a time-boxed task using natural language
So that I can start working without friction

Acceptance Criteria:
- Single text input accepts natural language
- AI parses task name and duration
- AI suggests duration within 1 second
- User can override AI suggestion
- Box created in < 10 seconds total
- Works for inputs like:
  - "Code review for 30 minutes"
  - "Write report"
  - "Quick email check"

Priority: P0 (Must Have)
Estimated Effort: 8 points
```

**US-2.2: Start Box Immediately or Schedule**
```
As a user
I want to choose when to start my box
So that I can plan ahead or start immediately

Acceptance Criteria:
- Default: Start immediately
- Option: Schedule for later today
- Option: Schedule for specific time
- Scheduled boxes appear in today view
- Notifications for scheduled boxes

Priority: P0 (Must Have)
Estimated Effort: 5 points
```

**US-2.3: Quick Box Presets**
```
As a returning user
I want to quickly recreate common boxes
So that I don't have to type the same tasks repeatedly

Acceptance Criteria:
- "Recent" dropdown shows last 5 unique boxes
- One-tap to recreate with same duration
- AI "For You" section suggests based on time/day
- Presets update dynamically based on patterns

Priority: P1 (Should Have)
Estimated Effort: 5 points
```

### Epic 3: Focus Mode & Active Box

**US-3.1: Immersive Focus Mode**
```
As a user working in a box
I want a distraction-free interface
So that I can maintain deep focus

Acceptance Criteria:
- Full-screen timer display
- Large, readable countdown
- Minimal UI elements
- Progress ring fills (positive framing)
- Smooth animations (60fps)
- Works in both portrait and landscape
- Status bar hidden
- Haptic feedback at key moments

Priority: P0 (Must Have)
Estimated Effort: 8 points
```

**US-3.2: Box Controls During Work**
```
As a user in an active box
I want simple controls without breaking focus
So that I can adjust if needed

Acceptance Criteria:
- Pause/resume button
- Extend box (+5, +15, +30 min)
- Finish early button
- Abandon box (with confirmation)
- Controls don't dominate the screen
- Actions require intentional tap (prevent accidents)

Priority: P0 (Must Have)
Estimated Effort: 5 points
```

**US-3.3: Time-Based Notifications**
```
As a user in an active box
I want gentle notifications at key moments
So that I stay aware of time without constant checking

Acceptance Criteria:
- 5-minute warning (gentle sound + haptic)
- Completion notification (celebration)
- Works when app is backgrounded
- Works when phone is locked
- Respects system Do Not Disturb
- Configurable in settings

Priority: P0 (Must Have)
Estimated Effort: 5 points
```

**US-3.4: AI Coaching During Box**
```
As a user working in a box
I want gentle AI encouragement
So that I stay motivated

Acceptance Criteria:
- Occasional encouragement messages (don't distract)
- Context-aware (e.g., "Halfway there" at 50%)
- Messages fade after 2-3 seconds
- No more than 2-3 messages per box
- Can be disabled in settings

Priority: P1 (Should Have)
Estimated Effort: 3 points
```

### Epic 4: Box Completion & Reflection

**US-4.1: Quick Completion Reflection**
```
As a user completing a box
I want to quickly log the outcome
So that the app learns from my performance

Acceptance Criteria:
- Automatic prompt when box ends
- Three-tap completion status (✅ ⚠️ ❌)
- Optional focus quality rating (3-level)
- Can skip focus quality
- Takes < 5 seconds
- Can be dismissed to complete later

Priority: P0 (Must Have)
Estimated Effort: 5 points
```

**US-4.2: Box Completion Celebration**
```
As a user completing a box
I want to feel a sense of accomplishment
So that I'm motivated to continue

Acceptance Criteria:
- Satisfying animation (honey drop or sparkle)
- Haptic feedback
- Positive message
- Shows weekly progress update
- Not over-the-top (professional feel)
- Skippable (tap to dismiss)

Priority: P1 (Should Have)
Estimated Effort: 3 points
```

### Epic 5: Today View & Dashboard

**US-5.1: Today View Home Screen**
```
As a user opening the app
I want to see my day at a glance
So that I know what I'm working on

Acceptance Criteria:
- Active box prominently displayed (if running)
- AI suggestion for next box
- Today's scheduled boxes (chronological)
- Weekly progress indicator
- Quick add button always visible
- Loads in < 1 second

Priority: P0 (Must Have)
Estimated Effort: 8 points
```

**US-5.2: AI Smart Suggestions**
```
As a user planning my day
I want AI to suggest what to box next
So that I spend less time deciding

Acceptance Criteria:
- Suggests based on time of day
- Suggests based on recent patterns
- Suggests based on completion history
- One primary suggestion, dismissable
- Updates throughout the day
- Can be disabled in settings

Priority: P1 (Should Have)
Estimated Effort: 8 points
```

**US-5.3: Weekly Progress Tracking**
```
As a user
I want to see my progress toward weekly goals
So that I stay motivated

Acceptance Criteria:
- Visual progress bar (hexagonal fill)
- Boxes completed this week count
- Target boxes per week (AI-adjusted)
- Streak counter (consecutive days)
- Tap to see more details

Priority: P0 (Must Have)
Estimated Effort: 5 points
```

### Epic 6: AI Insights & Patterns

**US-6.1: Real-Time AI Assistance**
```
As a user creating a box
I want AI to help me estimate time accurately
So that I improve my planning skills

Acceptance Criteria:
- AI suggests duration based on task description
- Shows confidence level or rationale
- Learns from user's actual completion times
- Adapts suggestions over time
- Can override suggestion easily

Priority: P0 (Must Have)
Estimated Effort: 13 points (AI integration)
```

**US-6.2: Pattern Recognition Insights**
```
As a user
I want to discover my productivity patterns
So that I can work smarter

Acceptance Criteria:
- AI analyzes completion rate by time of day
- AI analyzes estimation accuracy by task type
- AI identifies optimal box duration
- AI detects day-of-week patterns
- Insights delivered non-intrusively
- Maximum 1 insight per day (not overwhelming)

Priority: P1 (Should Have)
Estimated Effort: 13 points (AI + analytics)
```

**US-6.3: Weekly Hive Report**
```
As a user
I want a weekly summary of my performance
So that I can reflect and improve

Acceptance Criteria:
- Delivered Sunday evening or on next app open
- Shows: boxes completed, focus time, completion rate, streak
- Includes 1-2 personalized insights
- Includes 1 actionable recommendation
- Visual data representation (chart/graph)
- Can be accessed anytime in Insights section

Priority: P1 (Should Have)
Estimated Effort: 8 points
```

### Epic 7: Settings & Account Management

**US-7.1: User Account Creation**
```
As a new user
I want to create an account easily
So that my data syncs across devices

Acceptance Criteria:
- Email + password signup
- Social login options (Google, Apple)
- Email verification
- Profile creation (name, optional photo)
- Follows security best practices

Priority: P0 (Must Have)
Estimated Effort: 8 points
```

**US-7.2: Subscription Management**
```
As a user
I want to manage my subscription
So that I can upgrade, downgrade, or cancel

Acceptance Criteria:
- 14-day free trial automatically applied
- Clear trial end date displayed
- In-app purchase flow (iOS/Android)
- Subscription status visible
- Cancel/restore subscription
- Receipt/billing history

Priority: P0 (Must Have)
Estimated Effort: 8 points
```

**US-7.3: Notification Preferences**
```
As a user
I want to control what notifications I receive
So that I'm not annoyed

Acceptance Criteria:
- Toggle: Box reminders (start time)
- Toggle: Box warnings (5 min left)
- Toggle: Box completion
- Toggle: Weekly insights
- Toggle: AI suggestions
- Changes apply immediately

Priority: P0 (Must Have)
Estimated Effort: 3 points
```

**US-7.4: AI Coach Customization**
```
As a user
I want to customize how AI coaches me
So that it matches my preferences

Acceptance Criteria:
- Coaching style: Auto, Direct, Encouraging, Analytical, Minimal
- Insight frequency: Every session, Daily, Weekly, Rarely, Never
- Insight types: Toggles for each pattern type
- Reset AI learning option
- Changes reflected immediately

Priority: P1 (Should Have)
Estimated Effort: 5 points
```

**US-7.5: Data Export**
```
As a user
I want to export my data
So that I own my information

Acceptance Criteria:
- Export all boxes to CSV
- Export includes: task, duration, completion, timestamps
- Email export file
- GDPR/CCPA compliant

Priority: P1 (Should Have)
Estimated Effort: 3 points
```

---

## Feature Specifications

### F1: Natural Language Box Creation

**Overview**: Users can create boxes using conversational language; AI parses intent and suggests parameters.

**Input Examples**:
- "Code review for 30 minutes" → Task: "Code review", Duration: 30
- "Write report" → Task: "Write report", Duration: 45 (AI estimated)
- "Quick email check" → Task: "Email check", Duration: 15 (AI estimated)
- "Meeting prep at 2pm" → Task: "Meeting prep", Duration: 30, Time: 14:00

**AI Processing**:
1. Send input to GPT-4o-mini with prompt template
2. Extract: task name, duration (if specified), time (if specified)
3. If duration not specified, estimate based on:
   - Task type/category (from embeddings)
   - User's historical data (if available)
   - Typical durations for similar tasks
4. Return structured data within 1 second (timeout)

**Prompt Template**:
```
Parse this time-boxing request and extract structured data.
Input: "{user_input}"

Return JSON:
{
  "task_name": "string (concise, 2-5 words)",
  "duration_minutes": number (15, 30, 45, 60, or 90),
  "scheduled_time": "HH:MM or null",
  "confidence": "high|medium|low"
}

Examples:
Input: "Code review for 30 minutes"
Output: {"task_name": "Code review", "duration_minutes": 30, "scheduled_time": null, "confidence": "high"}

Input: "Write quarterly report"
Output: {"task_name": "Write quarterly report", "duration_minutes": 60, "scheduled_time": null, "confidence": "medium"}
```

**Fallback**:
- If AI fails or times out, use default duration (30 min)
- Log error for monitoring
- Continue with manual input

**Edge Cases**:
- Empty input → Prompt user
- Very long input (>100 chars) → Truncate or ask to simplify
- Ambiguous duration → Default to 30, let user adjust
- Invalid time format → Ignore, treat as "now"

**Success Metrics**:
- Parsing accuracy: >90% correct task extraction
- Duration estimation accuracy: Within ±15 min, 70%+ of time
- Response time: <1 second, 95th percentile
- User override rate: <30% (indicates good AI suggestions)

---

### F2: Focus Mode Experience

**Overview**: Full-screen, distraction-free interface during active box.

**Visual Components**:
1. **Task Name** (top, 20pt font)
2. **Timer** (center, 72pt font, countdown)
3. **Progress Ring** (surrounding timer, fills with amber color)
4. **Background Pattern** (subtle hexagons, breathing animation)
5. **Controls** (bottom, minimal: Pause, Extend, Finish Early)

**Animations**:
- **Entry**: Screen zooms in, other UI fades out (0.5s ease-in-out)
- **Breathing**: Background subtly pulses every 4 seconds
- **Progress**: Ring fills smoothly, no janky updates
- **Warnings**: Gentle pulse at 5 min, 1 min remaining
- **Exit**: Celebration animation (honey drop from top, 1.5s)

**States**:
1. **Running**: Timer counting down, ring filling
2. **Paused**: Timer stopped, "Paused" indicator, dim screen
3. **Extended**: Brief message "Added 15 minutes", then continue
4. **Warning**: At 5 min, ring turns amber, gentle notification
5. **Completion**: Timer hits 0:00, celebration triggers

**Behavior**:
- **Phone Lock**: Timer continues, show on lock screen
- **App Background**: Timer continues, notification updates time
- **App Foreground**: Resume focus mode display
- **Interruption** (call, etc.): Auto-pause, resume when back

**Accessibility**:
- VoiceOver support for all elements
- High contrast mode support
- Timer announced at intervals (5 min, 1 min, complete)
- Large tap targets for controls (44x44pt minimum)

**Performance Requirements**:
- 60 FPS during animations
- <1% battery drain per hour of focus mode
- Minimal memory footprint (<50MB)

---

### F3: AI Time Estimation Engine

**Overview**: Predict how long a task will take based on description and user history.

**Algorithm** (Cold Start - No User History):
```python
def estimate_duration_cold(task_description):
    # Use GPT-4o-mini to categorize and estimate
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "system",
            "content": "You are a time estimation expert. Estimate task duration in minutes."
        }, {
            "role": "user",
            "content": f"How long does this task typically take? '{task_description}'. Respond with just a number (15, 30, 45, 60, or 90)."
        }]
    )

    duration = parse_number(response.choices[0].message.content)

    # Snap to standard durations
    return snap_to_nearest([15, 30, 45, 60, 90], duration)
```

**Algorithm** (Warm Start - With User History):
```python
def estimate_duration_warm(task_description, user_id):
    # 1. Get task category from embeddings
    category = categorize_task(task_description)

    # 2. Query user's historical data for this category
    user_history = db.query(
        "SELECT AVG(actual_duration) FROM boxes WHERE user_id = ? AND category = ?",
        user_id, category
    )

    # 3. If enough data (>5 boxes in category), use historical average
    if user_history.count >= 5:
        avg_duration = user_history.avg_duration
        # Apply confidence interval (±10%)
        return round_to_nearest_5(avg_duration)

    # 4. Otherwise, blend cold start + partial history
    cold_estimate = estimate_duration_cold(task_description)
    if user_history.count > 0:
        # Weighted average (more history = more weight)
        weight = user_history.count / 5
        blended = (cold_estimate * (1 - weight)) + (user_history.avg_duration * weight)
        return round_to_nearest_5(blended)

    return cold_estimate
```

**Task Categorization**:
- Use OpenAI embeddings (text-embedding-3-small)
- Pre-defined categories: Coding, Writing, Meetings, Email, Admin, Design, Research, etc.
- Cluster similar tasks automatically
- Update categories as user adds more boxes

**Continuous Learning**:
- After each box completion, update user's category averages
- Track estimation error: `(actual - estimated) / estimated`
- Adjust future estimates based on error patterns
- Store per-category multipliers (e.g., user takes 1.4x longer on "writing")

**Explainability**:
- Show rationale: "Based on similar tasks" or "Your usual time for writing"
- Display confidence: High (>10 data points), Medium (3-10), Low (<3)
- Let user see and edit historical data if needed

**API Cost Optimization**:
- Cache embeddings for common task descriptions
- Batch similar requests
- Use cheaper model (gpt-4o-mini) for estimation
- Rate limit to prevent abuse
- Target: <$0.02 per box creation

---

### F4: Pattern Recognition & Insights

**Overview**: Analyze user behavior to surface actionable insights.

**Pattern Types**:

**1. Time-of-Day Effectiveness**
```sql
-- Calculate completion rate by time slot
SELECT
  CASE
    WHEN HOUR(start_time) < 12 THEN 'morning'
    WHEN HOUR(start_time) < 17 THEN 'afternoon'
    ELSE 'evening'
  END as time_slot,
  COUNT(*) as total_boxes,
  SUM(CASE WHEN completion_status = 'completed' THEN 1 ELSE 0 END) as completed,
  (completed * 100.0 / total_boxes) as completion_rate
FROM boxes
WHERE user_id = ?
  AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY time_slot
```

**Insight Template**:
```
If morning_rate - evening_rate > 15%:
  "You complete {morning_rate}% of morning boxes but only {evening_rate}% of evening boxes. You're a morning person - box hard tasks early."
```

**2. Task Duration Sweet Spot**
```sql
-- Find optimal duration range
SELECT
  CASE
    WHEN estimated_duration < 30 THEN '<30 min'
    WHEN estimated_duration <= 45 THEN '30-45 min'
    WHEN estimated_duration <= 60 THEN '45-60 min'
    ELSE '>60 min'
  END as duration_bucket,
  COUNT(*) as total_boxes,
  AVG(CASE WHEN completion_status = 'completed' THEN 100 ELSE 0 END) as completion_rate
FROM boxes
WHERE user_id = ?
  AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY duration_bucket
HAVING total_boxes >= 3  -- Minimum sample size
ORDER BY completion_rate DESC
```

**Insight Template**:
```
If best_bucket completion_rate > others by >20%:
  "Your sweet spot is {best_bucket} boxes ({completion_rate}% completion). Boxes over {poor_bucket} rarely get finished ({poor_rate}% completion). Break long tasks into smaller boxes."
```

**3. Estimation Accuracy Trend**
```sql
-- Track improvement over time
SELECT
  DATE(created_at) as date,
  AVG(ABS(actual_duration - estimated_duration)) as avg_error,
  AVG(ABS(actual_duration - estimated_duration) / estimated_duration * 100) as avg_error_pct
FROM boxes
WHERE user_id = ?
  AND completion_status = 'completed'
  AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(created_at)
ORDER BY date
```

**Insight Template**:
```
If week4_error < week1_error by >20%:
  "You're getting better at estimating! Week 1: ±{week1_error} min average error. Week 4: ±{week4_error} min. That's {improvement}% better! 🎯"
```

**4. Day-of-Week Rhythm**
```sql
-- Best and worst days
SELECT
  DAYNAME(start_time) as day_of_week,
  COUNT(*) as total_boxes,
  AVG(CASE WHEN completion_status = 'completed' THEN 100 ELSE 0 END) as completion_rate
FROM boxes
WHERE user_id = ?
  AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY day_of_week
HAVING total_boxes >= 2
ORDER BY completion_rate DESC
```

**Insight Template**:
```
best_day = query.first()
worst_day = query.last()

If best_day.rate - worst_day.rate > 20%:
  "{best_day.name} is your power day ({best_day.rate}% completion). {worst_day.name} is tough ({worst_day.rate}%). Schedule easier tasks on {worst_day.name}, hard work on {best_day.name}."
```

**5. Task-Specific Patterns**
```sql
-- Categorize tasks and find patterns
SELECT
  ai_task_category,
  COUNT(*) as total_boxes,
  AVG(estimated_duration) as avg_estimated,
  AVG(actual_duration) as avg_actual,
  AVG(actual_duration - estimated_duration) as avg_error
FROM boxes
WHERE user_id = ?
  AND ai_task_category IS NOT NULL
  AND completion_status = 'completed'
GROUP BY ai_task_category
HAVING total_boxes >= 5
```

**Insight Template**:
```
For each category where ABS(avg_error) > 10:
  "You underestimate '{category}' tasks by {error}% on average. Next time you box {category}, I'll suggest +{adjustment}% more time."
```

**Insight Delivery Rules**:
1. **Minimum data**: Need 10+ completed boxes before generating insights
2. **Frequency**: Max 1 insight per day (real-time suggestions don't count)
3. **Prioritization**: Order by impact (biggest completion rate difference)
4. **Actionability**: Every insight includes a "what to do about it"
5. **Dismissible**: User can mark "not helpful" to skip similar insights
6. **Timing**: Deliver when relevant (e.g., time-of-day insight in the morning)

**Technical Implementation**:
- Run analysis jobs daily (off-peak hours)
- Cache results to avoid repeated computation
- Store insights in database with user_id, type, generated_at
- Mark as shown/dismissed to avoid repetition
- A/B test insight formats for engagement

---

### F5: Weekly Hive Report

**Overview**: Comprehensive weekly summary delivered Sunday evening or on next app open.

**Content Structure**:

**Section 1: Summary Stats**
```
📊 Your Weekly Hive Report
Nov 20-26

📦 18 boxes completed
⏱️ 12h 45m focused work
🎯 82% completion rate
🔥 6-day streak

[See details →]
```

**Section 2: Visual Progress**
```
[Bar chart: boxes per day]

M  T  W  T  F  S  S
3  4  5  2  3  1  0

Best day: Wednesday (100% completion)
Toughest: Sunday (not enough data)
```

**Section 3: AI Insights** (1-2 personalized)
```
💡 Pattern Detected

You complete 85% of boxes scheduled before 11am
But only 45% after 2pm

🤖 Recommendation:
Box your hardest work in the morning.
Save admin tasks for afternoon.

[Use this tip] [Not helpful]
```

**Section 4: Improvement Metrics**
```
📈 Progress This Week

Estimation accuracy: 78% (↑12% from last week)
Average focus quality: 4.2/5
Boxes extended: 3 (17% of total)
Boxes abandoned: 1 (6% of total)

You're getting better! 🎉
```

**Section 5: Next Week Setup**
```
🎯 Next Week Goal

Based on your pace, try completing 20 boxes next week.
That's just 3-4 per day.

[Set this goal] [Adjust goal]
```

**Generation Logic**:
```python
def generate_weekly_report(user_id, week_start, week_end):
    # 1. Fetch all boxes for the week
    boxes = db.query("SELECT * FROM boxes WHERE user_id = ? AND start_time BETWEEN ? AND ?",
                     user_id, week_start, week_end)

    # 2. Calculate summary stats
    total_boxes = len(boxes)
    completed_boxes = sum(1 for b in boxes if b.completion_status == 'completed')
    completion_rate = completed_boxes / total_boxes if total_boxes > 0 else 0
    total_focus_time = sum(b.actual_duration for b in boxes if b.completion_status == 'completed')

    # 3. Calculate streak
    streak = calculate_streak(user_id, week_end)

    # 4. Generate insights (top 2)
    insights = generate_insights(user_id, boxes)
    top_insights = insights[:2]

    # 5. Calculate improvements
    prev_week_boxes = db.query("SELECT * FROM boxes WHERE user_id = ? AND start_time BETWEEN ? AND ?",
                               user_id, week_start - 7days, week_start)
    improvements = calculate_improvements(boxes, prev_week_boxes)

    # 6. Suggest next week goal
    avg_boxes_per_week = calculate_rolling_avg(user_id, 4)  # Last 4 weeks
    next_week_goal = round(avg_boxes_per_week * 1.1)  # 10% stretch

    # 7. Assemble report
    report = {
        "summary": {...},
        "daily_breakdown": [...],
        "insights": top_insights,
        "improvements": improvements,
        "next_week_goal": next_week_goal
    }

    return report
```

**Delivery Mechanism**:
- **Trigger**: Sunday 7pm local time OR first app open after Sunday
- **Notification**: "Your Weekly Hive Report is ready! 🐝"
- **Storage**: Save to insights table, accessible anytime
- **History**: Keep last 12 weeks available

**A/B Testing Opportunities**:
- Report format (detailed vs. concise)
- Insight types shown (motivational vs. analytical)
- Delivery timing (Sunday evening vs. Monday morning)
- Next week goal suggestion (stretch vs. conservative)

---

## Technical Requirements

### Platform Requirements

**iOS**:
- Minimum version: iOS 15.0+
- Target version: iOS 17.0
- Devices: iPhone 8 and newer
- Orientation: Portrait (primary), Landscape (supported)
- Dark mode: Required

**Android**:
- Minimum version: Android 12 (API 31)
- Target version: Android 14 (API 34)
- Devices: 5" screens and larger
- Orientation: Portrait (primary), Landscape (supported)
- Material Design 3

**Cross-Platform**:
- React Native 0.73+
- React Native Navigation 7.x
- React Native Reanimated 3.x
- React Native Gesture Handler 2.x

### Performance Requirements

**App Launch**:
- Cold start: <2 seconds (P90)
- Warm start: <1 second (P90)
- Time to interactive: <1.5 seconds

**API Response Times**:
- Box creation: <500ms (P95)
- AI estimation: <1s (P95)
- Data sync: <2s (P95)
- Insight generation: <3s (P95)

**Rendering**:
- 60 FPS during animations
- No jank during scrolling
- Smooth timer countdown (no skipped frames)

**Memory**:
- App footprint: <100MB
- Focus mode: <50MB
- Memory leaks: None detectable in 1-hour session

**Battery**:
- Background drain: <1% per hour
- Focus mode: <2% per hour
- Normal usage: <5% per hour

**Data Usage**:
- Initial sync: <5MB
- Daily usage: <1MB
- Cache aggressively to minimize cellular data

### Security Requirements

**Authentication**:
- JWT tokens with 7-day expiration
- Refresh token mechanism
- Rate limiting on login attempts (5 tries per 15 min)
- Password requirements: 8+ chars, letters + numbers

**Data Encryption**:
- At rest: AES-256 encryption
- In transit: TLS 1.3
- Local storage: Encrypted with device keychain

**Privacy**:
- GDPR compliant (data export, deletion)
- CCPA compliant
- No selling of user data
- Anonymize data for AI training (opt-in)
- Clear privacy policy

**API Security**:
- API key rotation
- Rate limiting (100 requests/min per user)
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS prevention

### Offline Capabilities

**Works Offline**:
- ✅ Create boxes (queued for sync)
- ✅ Start/stop focus mode
- ✅ Complete boxes
- ✅ View today's boxes
- ✅ View history (cached)

**Requires Online**:
- ❌ AI time estimation (fallback to defaults)
- ❌ AI insights generation
- ❌ Sync across devices
- ❌ Account creation/login

**Sync Strategy**:
- Queue operations while offline
- Auto-sync when connection restored
- Conflict resolution: Last-write-wins
- Show sync status indicator

### Accessibility Requirements

**Screen Reader Support**:
- All UI elements labeled
- Meaningful content descriptions
- Logical navigation order

**Visual**:
- Minimum contrast ratio: 4.5:1 (WCAG AA)
- Scalable text (up to 200%)
- Color not sole indicator (use icons/labels)
- Support system text size preferences

**Motor**:
- Minimum touch target: 44x44pt
- Gestures have button alternatives
- No time-sensitive actions (except timer itself)

**Cognitive**:
- Clear, simple language
- Consistent UI patterns
- Error messages explain what happened and how to fix
- Important actions require confirmation

---

## Data Models

### Database Schema

**Users Table**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    subscription_tier VARCHAR(20) DEFAULT 'trial',  -- trial, paid, lifetime
    subscription_expires_at TIMESTAMP,
    ai_preferences JSONB DEFAULT '{}',
    notification_preferences JSONB DEFAULT '{}',
    onboarding_completed BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription ON users(subscription_tier, subscription_expires_at);
```

**Boxes Table**
```sql
CREATE TABLE boxes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Box details
    task_description VARCHAR(500) NOT NULL,
    estimated_duration INT NOT NULL,  -- minutes
    actual_duration INT,  -- minutes, null if not completed

    -- Timing
    created_at TIMESTAMP DEFAULT NOW(),
    scheduled_time TIMESTAMP,  -- null if "start now"
    start_time TIMESTAMP,
    end_time TIMESTAMP,

    -- Status
    status VARCHAR(20) NOT NULL,  -- scheduled, active, paused, completed, abandoned
    completion_status VARCHAR(20),  -- completed, partial, not_completed

    -- User feedback
    focus_quality INT CHECK (focus_quality BETWEEN 1 AND 5),  -- nullable
    focus_tags JSONB DEFAULT '[]',  -- ["music", "coffee", etc.]

    -- AI metadata
    ai_task_category VARCHAR(50),  -- Coding, Writing, etc.
    ai_confidence VARCHAR(10),  -- high, medium, low
    ai_estimation_source VARCHAR(20),  -- cold_start, user_history, blended

    -- Tracking
    extensions_count INT DEFAULT 0,
    pauses_count INT DEFAULT 0,
    app_switches_count INT DEFAULT 0,  -- optional tracking

    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_boxes_user_id ON boxes(user_id);
CREATE INDEX idx_boxes_status ON boxes(status);
CREATE INDEX idx_boxes_start_time ON boxes(start_time);
CREATE INDEX idx_boxes_user_created ON boxes(user_id, created_at DESC);
CREATE INDEX idx_boxes_user_category ON boxes(user_id, ai_task_category);
```

**Insights Table**
```sql
CREATE TABLE insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    insight_type VARCHAR(50) NOT NULL,  -- time_of_day, duration, estimation, etc.
    content TEXT NOT NULL,
    recommendation TEXT,

    data JSONB,  -- Supporting data for the insight
    confidence_score FLOAT,  -- 0.0-1.0

    generated_at TIMESTAMP DEFAULT NOW(),
    shown_at TIMESTAMP,
    dismissed_at TIMESTAMP,
    user_feedback VARCHAR(20),  -- helpful, not_helpful, null

    priority INT DEFAULT 0  -- Higher = more important
);

CREATE INDEX idx_insights_user_id ON insights(user_id);
CREATE INDEX idx_insights_shown ON insights(shown_at);
CREATE INDEX idx_insights_type ON insights(insight_type);
```

**User Patterns Table** (Cached Analytics)
```sql
CREATE TABLE user_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    pattern_type VARCHAR(50) NOT NULL,  -- time_of_day, duration_sweet_spot, etc.
    data JSONB NOT NULL,

    calculated_at TIMESTAMP DEFAULT NOW(),
    valid_until TIMESTAMP,  -- Cache expiration

    UNIQUE(user_id, pattern_type)
);

CREATE INDEX idx_patterns_user_id ON user_patterns(user_id);
CREATE INDEX idx_patterns_valid ON user_patterns(valid_until);
```

**Weekly Reports Table**
```sql
CREATE TABLE weekly_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    week_start DATE NOT NULL,
    week_end DATE NOT NULL,

    report_data JSONB NOT NULL,  -- Full report content

    generated_at TIMESTAMP DEFAULT NOW(),
    viewed_at TIMESTAMP,

    UNIQUE(user_id, week_start)
);

CREATE INDEX idx_reports_user_id ON weekly_reports(user_id);
CREATE INDEX idx_reports_week ON weekly_reports(week_start);
```

### Local Storage (SQLite on Device)

**Purpose**: Offline support and fast reads

**Synced Tables**:
- Users (current user only)
- Boxes (last 90 days)
- Insights (last 30 days)
- Weekly Reports (last 12 weeks)

**Sync Strategy**:
- On app launch: Fetch updates since last_sync_at
- On box creation: Immediate sync attempt (queue if offline)
- On box completion: Immediate sync attempt
- Background sync: Every 15 minutes when app active

---

## API Specifications

### REST API Endpoints

**Base URL**: `https://api.boxbee.app/v1`

**Authentication**: Bearer token in `Authorization` header

---

#### Authentication Endpoints

**POST /auth/signup**
```json
Request:
{
  "email": "user@example.com",
  "password": "securepass123",
  "name": "John Doe"
}

Response: 201 Created
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-11-28T10:00:00Z"
  },
  "token": "jwt_token_here",
  "refresh_token": "refresh_token_here"
}

Errors:
400 - Invalid email format
409 - Email already exists
```

**POST /auth/login**
```json
Request:
{
  "email": "user@example.com",
  "password": "securepass123"
}

Response: 200 OK
{
  "user": {...},
  "token": "jwt_token_here",
  "refresh_token": "refresh_token_here"
}

Errors:
401 - Invalid credentials
429 - Too many attempts
```

**POST /auth/refresh**
```json
Request:
{
  "refresh_token": "refresh_token_here"
}

Response: 200 OK
{
  "token": "new_jwt_token_here"
}
```

---

#### Box Endpoints

**GET /boxes**
```
Query Params:
  - since: ISO timestamp (optional, for sync)
  - limit: int (default 50, max 100)
  - status: scheduled|active|completed|abandoned (optional)

Response: 200 OK
{
  "boxes": [
    {
      "id": "uuid",
      "task_description": "Code review",
      "estimated_duration": 30,
      "actual_duration": 32,
      "start_time": "2024-11-28T10:00:00Z",
      "end_time": "2024-11-28T10:32:00Z",
      "status": "completed",
      "completion_status": "completed",
      "focus_quality": 4,
      "ai_task_category": "Coding",
      "created_at": "2024-11-28T09:55:00Z"
    },
    ...
  ],
  "pagination": {
    "total": 250,
    "limit": 50,
    "offset": 0
  }
}
```

**POST /boxes**
```json
Request:
{
  "task_description": "Write unit tests",
  "estimated_duration": 60,
  "scheduled_time": null  // or ISO timestamp
}

Response: 201 Created
{
  "box": {
    "id": "uuid",
    "task_description": "Write unit tests",
    "estimated_duration": 60,
    "status": "scheduled",
    "created_at": "2024-11-28T10:00:00Z"
  }
}

Errors:
400 - Missing required fields
422 - Invalid duration
```

**POST /boxes/parse**
```json
Request:
{
  "input": "Code review for 30 minutes"
}

Response: 200 OK
{
  "parsed": {
    "task_description": "Code review",
    "estimated_duration": 30,
    "scheduled_time": null,
    "confidence": "high"
  },
  "ai_metadata": {
    "category": "Coding",
    "reasoning": "Based on task description"
  }
}

Errors:
400 - Empty input
500 - AI service error (returns defaults)
```

**PATCH /boxes/:id/start**
```json
Request: {}

Response: 200 OK
{
  "box": {
    "id": "uuid",
    "status": "active",
    "start_time": "2024-11-28T10:00:00Z"
  }
}

Errors:
404 - Box not found
409 - Box already started or completed
```

**PATCH /boxes/:id/complete**
```json
Request:
{
  "completion_status": "completed",  // completed|partial|not_completed
  "focus_quality": 4,  // optional, 1-5
  "focus_tags": ["music", "coffee"]  // optional
}

Response: 200 OK
{
  "box": {
    "id": "uuid",
    "status": "completed",
    "end_time": "2024-11-28T11:00:00Z",
    "actual_duration": 60,
    "completion_status": "completed",
    "focus_quality": 4
  },
  "weekly_progress": {
    "boxes_completed": 12,
    "goal": 20,
    "percentage": 60
  }
}
```

**PATCH /boxes/:id/extend**
```json
Request:
{
  "additional_minutes": 15  // 5, 15, or 30
}

Response: 200 OK
{
  "box": {
    "id": "uuid",
    "estimated_duration": 75,  // was 60, now 75
    "extensions_count": 1
  }
}
```

---

#### Insights Endpoints

**GET /insights**
```
Query Params:
  - type: time_of_day|duration|estimation|day_of_week (optional)
  - shown: true|false (optional)
  - limit: int (default 10)

Response: 200 OK
{
  "insights": [
    {
      "id": "uuid",
      "insight_type": "time_of_day",
      "content": "You complete 90% of morning boxes...",
      "recommendation": "Box your hardest work early.",
      "confidence_score": 0.92,
      "generated_at": "2024-11-28T10:00:00Z",
      "shown_at": null
    },
    ...
  ]
}
```

**POST /insights/generate**
```
Description: Trigger on-demand insight generation

Response: 202 Accepted
{
  "message": "Insights generation started",
  "job_id": "uuid"
}

Note: Actual insights delivered via GET /insights or push notification
```

**PATCH /insights/:id/feedback**
```json
Request:
{
  "feedback": "helpful"  // helpful|not_helpful
}

Response: 200 OK
{
  "insight": {
    "id": "uuid",
    "user_feedback": "helpful"
  }
}
```

---

#### Weekly Report Endpoint

**GET /reports/weekly**
```
Query Params:
  - week_start: YYYY-MM-DD (optional, defaults to current week)

Response: 200 OK
{
  "report": {
    "week_start": "2024-11-25",
    "week_end": "2024-12-01",
    "summary": {
      "total_boxes": 18,
      "completed_boxes": 15,
      "completion_rate": 0.83,
      "total_focus_time": 765,  // minutes
      "streak_days": 6
    },
    "daily_breakdown": [
      {"day": "Monday", "boxes": 3, "completed": 3},
      {"day": "Tuesday", "boxes": 4, "completed": 4},
      ...
    ],
    "insights": [
      {
        "type": "time_of_day",
        "content": "...",
        "recommendation": "..."
      }
    ],
    "improvements": {
      "estimation_accuracy": 78,
      "estimation_improvement": 12,  // % better than last week
      "avg_focus_quality": 4.2
    },
    "next_week_goal": 20
  }
}

Errors:
404 - No data for specified week
```

---

#### User Settings Endpoints

**GET /user/preferences**
```json
Response: 200 OK
{
  "ai_preferences": {
    "coaching_style": "auto",
    "insight_frequency": "weekly",
    "suggestion_enabled": true
  },
  "notification_preferences": {
    "box_reminders": true,
    "box_warnings": true,
    "weekly_insights": true
  }
}
```

**PATCH /user/preferences**
```json
Request:
{
  "ai_preferences": {
    "coaching_style": "direct"
  }
}

Response: 200 OK
{
  "preferences": {...}  // Updated full preferences
}
```

---

### AI Service Integration

**OpenAI API Usage**:

**1. Task Parsing** (gpt-4o-mini)
```python
def parse_task_input(user_input):
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": TASK_PARSING_SYSTEM_PROMPT},
            {"role": "user", "content": user_input}
        ],
        temperature=0.3,
        max_tokens=100,
        timeout=2.0
    )
    return parse_json(response.choices[0].message.content)
```

**2. Time Estimation** (gpt-4o-mini, cold start only)
```python
def estimate_duration_cold(task_description):
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": TIME_ESTIMATION_SYSTEM_PROMPT},
            {"role": "user", "content": f"Task: {task_description}"}
        ],
        temperature=0.5,
        max_tokens=10
    )
    return parse_number(response.choices[0].message.content)
```

**3. Task Categorization** (text-embedding-3-small)
```python
def categorize_task(task_description):
    embedding = openai.embeddings.create(
        model="text-embedding-3-small",
        input=task_description
    )

    vector = embedding.data[0].embedding

    # Compare to pre-defined category embeddings
    closest_category = find_nearest_category(vector, CATEGORY_EMBEDDINGS)

    return closest_category
```

**Cost Estimates**:
- Task parsing: ~$0.001 per request
- Time estimation: ~$0.0005 per request
- Categorization: ~$0.00002 per request
- **Total per box**: ~$0.002
- **Monthly per user** (60 boxes/month): ~$0.12

**Optimization Strategies**:
- Cache common task embeddings
- Batch requests when possible
- Use gpt-4o-mini instead of gpt-4o
- Implement request timeouts and fallbacks
- Monitor usage and set per-user rate limits

---

## UI/UX Requirements

### Design System

**Colors**:
```
Primary:
  - Honey Gold: #F5B041
  - Deep Honey: #E67E22

Neutrals:
  - Background Light: #F8F9F9
  - Background Dark: #1C1C1E
  - Text Primary: #2C3E50
  - Text Secondary: #7F8C8D
  - Text Light: #BDC3C7

Semantic:
  - Success: #27AE60
  - Warning: #F39C12
  - Error: #E74C3C
  - Info: #3498DB
```

**Typography**:
```
iOS:
  - Display: SF Pro Display
  - Text: SF Pro Text
  - Rounded: SF Pro Rounded (for timer)

Android:
  - Display: Roboto
  - Text: Roboto
  - Rounded: Roboto Mono (for timer)

Sizes:
  - H1: 32pt, Bold
  - H2: 24pt, Semibold
  - H3: 20pt, Semibold
  - Body: 16pt, Regular
  - Caption: 14pt, Regular
  - Timer: 72pt, Medium (SF Pro Rounded)
```

**Spacing**:
```
- XS: 4pt
- S: 8pt
- M: 16pt
- L: 24pt
- XL: 32pt
- XXL: 48pt
```

**Border Radius**:
```
- Small: 8pt (buttons, inputs)
- Medium: 16pt (cards)
- Large: 24pt (modals)
- Full: 50% (circular elements)
```

**Shadows**:
```
Light Mode:
  - Card: 0 2px 8px rgba(0,0,0,0.1)
  - Button: 0 1px 3px rgba(0,0,0,0.12)
  - Modal: 0 8px 24px rgba(0,0,0,0.15)

Dark Mode:
  - Card: 0 2px 8px rgba(0,0,0,0.3)
  - Button: 0 1px 3px rgba(0,0,0,0.4)
  - Modal: 0 8px 24px rgba(0,0,0,0.5)
```

### Component Specifications

**Button - Primary**
```
Height: 48pt
Padding: 12pt horizontal
Background: Honey Gold (#F5B041)
Text: White, 16pt, Semibold
Border Radius: 8pt
Shadow: 0 1px 3px rgba(0,0,0,0.12)

States:
  - Default: Full opacity
  - Hover: 90% opacity
  - Pressed: 80% opacity, slight scale down
  - Disabled: 40% opacity, no shadow
```

**Input Field**
```
Height: 48pt
Padding: 12pt horizontal
Background: Light gray (#F8F9F9)
Border: 1pt solid #E0E0E0
Text: 16pt, Regular
Border Radius: 8pt

States:
  - Default: Gray border
  - Focus: Honey Gold border, subtle glow
  - Error: Red border
  - Disabled: 50% opacity
```

**Progress Ring**
```
Diameter: 240pt (focus mode)
Stroke Width: 8pt
Background: Light gray (20% opacity)
Fill: Honey Gold
Animation: Smooth fill, no jumps
Cap: Round
```

**Card**
```
Background: White (light) / #2C2C2E (dark)
Border Radius: 16pt
Padding: 16pt
Shadow: Card shadow
```

### Screen Specifications

**Onboarding Screens** (4 screens)
```
Screen 1: Welcome
  - Hero icon/animation
  - Headline: "Stop planning. Start doing."
  - Subtext: One-liner value prop
  - CTA: "Get Started" button

Screen 2: Explanation
  - Visual: Diagram of time-boxing
  - Headline: "BoxBee helps you:"
  - 3 bullet points with icons
  - CTA: "Continue"

Screen 3: AI Introduction
  - Visual: AI robot icon
  - Headline: "Your AI Coach"
  - Explanation of AI features
  - CTA: "Let's Go"

Screen 4: Permissions
  - Notification toggle with explanation
  - Calendar toggle with explanation
  - CTA: "Continue" (goes to first box creation)
```

**Today View** (Home Screen)
```
Layout:
  [Header]
    - Logo/greeting
    - Settings icon (top right)

  [Active Box] (if exists)
    - Card with task name
    - Timer countdown
    - Progress bar
    - "Tap to view" button

  [AI Suggestion] (if exists)
    - Small card
    - Robot icon
    - Suggestion text
    - "Start" and "Skip" buttons

  [Today's Boxes]
    - List of scheduled boxes
    - Checkbox, time, task name
    - Swipe actions (edit, delete)

  [Weekly Progress]
    - Progress bar
    - "X/Y boxes this week"
    - Streak counter

  [FAB]
    - Large "+" button (bottom right)
    - Opens box creation modal

Interactions:
  - Pull to refresh
  - Swipe on box for actions
  - Tap active box to enter focus mode
  - Tap FAB to create box
```

**Focus Mode Screen**
```
Layout (Full Screen):
  [Top]
    - Task name (20pt, centered)

  [Center]
    - Timer (72pt, prominent)
    - Progress ring (surrounds timer)
    - Hexagonal pattern background

  [Bottom]
    - Pause button
    - Extend button (icon only)
    - Finish Early button

Visual:
  - Hide status bar
  - Hide navigation
  - Minimal UI
  - Breathing animation on background
  - Smooth countdown updates (every second)

Gestures:
  - Tap center to pause/resume
  - Swipe down to exit (with confirmation)
```

**Box Creation Modal**
```
Layout (Bottom Sheet):
  [Header]
    - "What are you boxing?" title
    - X to close

  [Input]
    - Large text input
    - Placeholder: "e.g., Code review, Write report"
    - Voice input button

  [AI Suggestion]
    - "🤖 I suggest 45 minutes"
    - Tap to accept, or...

  [Duration Options]
    - Chips: 15, 30, 45, 60, 90, Custom
    - Selected chip highlighted

  [When]
    - Toggle: Now | Later | Schedule
    - If Schedule: Show time picker

  [CTA]
    - Large button: "Create & Start" or "Create"

Behavior:
  - Auto-focus on input
  - AI processes on input blur (debounced)
  - Show loading state during AI request
  - Defaults to "Now" + AI-suggested duration
```

**Weekly Report Screen**
```
Layout (Scrollable):
  [Hero Card]
    - Week date range
    - 4 key stats (boxes, time, rate, streak)
    - Icon for each stat

  [Chart]
    - Bar chart: boxes per day
    - Labeled days
    - Best/worst day callouts

  [Insights] (Carousel)
    - Swipeable cards
    - 1-2 insights
    - Icon, title, content, recommendation
    - Action buttons

  [Improvements]
    - Card with metrics
    - Progress indicators
    - Celebratory tone

  [Next Week Goal]
    - Card with suggested goal
    - Adjustable
    - "Set Goal" button

Animations:
  - Fade in on load
  - Charts animate in
  - Celebration confetti (if major milestone)
```

---

## AI/ML Specifications

### Model Selection

**GPT-4o-mini**:
- **Use Cases**: Task parsing, time estimation (cold start), categorization
- **Cost**: ~$0.150 / 1M input tokens, ~$0.600 / 1M output tokens
- **Latency**: ~500ms average
- **Accuracy**: 85-90% for task understanding

**text-embedding-3-small**:
- **Use Cases**: Task similarity, categorization
- **Cost**: ~$0.020 / 1M tokens
- **Dimensions**: 1536
- **Performance**: Fast, good for semantic search

**Custom Models** (Future):
- **Use Cases**: Time estimation (warm start), pattern recognition
- **Technology**: scikit-learn, TensorFlow Lite (on-device)
- **Training**: On aggregated user data (anonymized, opt-in)

### Prompts

**Task Parsing Prompt**:
```
You are a productivity assistant that helps users create time-boxed tasks.

Parse the user's input and extract:
1. Task name (concise, 2-5 words)
2. Duration in minutes (15, 30, 45, 60, or 90)
3. Scheduled time if mentioned (HH:MM format or null)

Return ONLY valid JSON, no explanation.

Examples:

Input: "Code review for 30 minutes"
Output: {"task_name": "Code review", "duration_minutes": 30, "scheduled_time": null, "confidence": "high"}

Input: "Write quarterly report"
Output: {"task_name": "Write quarterly report", "duration_minutes": 60, "scheduled_time": null, "confidence": "medium"}

Input: "Meeting prep at 2pm"
Output: {"task_name": "Meeting prep", "duration_minutes": 30, "scheduled_time": "14:00", "confidence": "high"}

Input: "Quick email check"
Output: {"task_name": "Email check", "duration_minutes": 15, "scheduled_time": null, "confidence": "high"}

Now parse this:
Input: "{user_input}"
Output:
```

**Time Estimation Prompt** (Cold Start):
```
You are an expert at estimating how long tasks take for knowledge workers.

Task: "{task_description}"

Based on typical time requirements, estimate how long this task takes.
Respond with ONLY a number: 15, 30, 45, 60, or 90 (minutes).

Consider:
- Complexity of the task
- Typical focus session length
- Common task durations

Respond with just the number, nothing else.
```

**Insight Generation Prompt** (Future):
```
You are a productivity coach analyzing user data.

User's pattern:
{pattern_data_json}

Generate a brief, actionable insight (max 2 sentences) and a specific recommendation (1 sentence).

Format:
Insight: [observation]
Recommendation: [actionable next step]

Examples:

Data: {"morning_completion": 0.90, "afternoon_completion": 0.60}
Insight: You complete 90% of morning boxes but only 60% in the afternoon. You're a morning person.
Recommendation: Schedule your most important work before noon.

Data: {"<45min_completion": 0.88, ">60min_completion": 0.42}
Insight: You complete 88% of short boxes but only 42% of long ones. Shorter sessions work better for you.
Recommendation: Break tasks over 60 minutes into 2-3 smaller boxes.

Now generate for:
Data: {user_pattern_data}
```

### Training Data Collection

**For Custom Models** (Post-MLP):

**What to Collect**:
- Anonymized task descriptions (with user consent)
- Estimated vs. actual durations
- Task categories and patterns
- Completion status
- Time of day, day of week

**Privacy Protections**:
- Hash user IDs
- Remove personally identifiable information from task descriptions
- Aggregate data (no individual tracking)
- Opt-in only
- Allow data deletion anytime

**Training Process**:
1. Collect 10,000+ box completions (anonymized)
2. Train regression model for duration estimation
3. Train classification model for task categorization
4. Validate on held-out test set (20%)
5. A/B test custom model vs. GPT-4o-mini
6. Deploy if accuracy improvement >10% and cost reduction >50%

---

## Testing & Quality Assurance

### Unit Testing

**Coverage Target**: 80%+

**Key Areas**:
- AI parsing logic (mock OpenAI responses)
- Time calculation utilities
- Pattern recognition algorithms
- Data validation and sanitization
- API request/response handling

**Example Tests**:
```javascript
describe('Task Parser', () => {
  it('should parse task with duration', () => {
    const input = "Code review for 30 minutes";
    const result = parseTaskInput(input);
    expect(result.task_name).toBe("Code review");
    expect(result.duration_minutes).toBe(30);
  });

  it('should handle missing duration', () => {
    const input = "Write report";
    const result = parseTaskInput(input);
    expect(result.task_name).toBe("Write report");
    expect(result.duration_minutes).toBeGreaterThan(0);
  });

  it('should fallback on AI failure', () => {
    mockOpenAI.setError(new Error('Timeout'));
    const input = "Any task";
    const result = parseTaskInput(input);
    expect(result.duration_minutes).toBe(30); // Default
  });
});
```

### Integration Testing

**Scenarios**:
1. **Box Creation Flow**
   - User creates box → Saved to local DB → Synced to server → AI updates patterns

2. **Focus Mode Flow**
   - User starts box → Timer counts down → Notifications fire → Completion prompt

3. **Insight Generation**
   - User completes 10 boxes → Patterns calculated → Insight generated → Delivered to user

4. **Offline/Online Sync**
   - User creates box offline → App goes online → Box syncs → Server processes

**Tools**:
- Detox (React Native e2e testing)
- Jest (unit and integration)
- Postman/Supertest (API testing)

### User Acceptance Testing (UAT)

**Beta Testing Plan**:
- **Participants**: 50-100 target users
- **Duration**: 2 weeks
- **Platforms**: Mix of iOS and Android
- **Focus Areas**:
  - Onboarding clarity
  - AI suggestion accuracy
  - Focus mode experience
  - Insight relevance
  - Overall satisfaction

**Success Criteria**:
- 70%+ complete onboarding
- 40%+ Day 7 retention
- 4.0+ average rating
- <3 critical bugs
- AI suggestions accepted >50% of time

### Performance Testing

**Load Testing**:
- Simulate 1,000 concurrent users
- Measure API response times under load
- Identify bottlenecks

**Stress Testing**:
- Push beyond expected limits
- Test graceful degradation
- Ensure no data loss under stress

**Battery Testing**:
- Run focus mode for 8 hours
- Measure battery drain
- Target: <15% total drain

### Security Testing

**Penetration Testing**:
- Attempt SQL injection
- Test authentication bypass
- Check for XSS vulnerabilities
- Validate encryption

**Privacy Audit**:
- Verify GDPR compliance
- Check data retention policies
- Test data export/deletion
- Review third-party data sharing

---

## Success Metrics

### Product Metrics

**Acquisition**:
- App store impressions: Track
- Install rate: >20%
- Trial signup rate: >80% of installs

**Activation**:
- Onboarding completion: >70%
- First box created: >65%
- First box completed: >60%
- Time to first box: <5 minutes (P50)

**Engagement**:
- DAU/MAU: >30% (stickiness)
- Boxes per active user per week: >15
- Box completion rate: >75%
- Focus mode engagement: >80% of boxes use it
- Weekly report views: >50% of weekly active users

**Retention**:
- D1: >60%
- D7: >40%
- D30: >25%
- M3: >15%

**Revenue**:
- Trial-to-paid conversion: >15%
- Monthly churn: <5%
- ARPU: >$90/year
- LTV: >$200
- CAC: <$20

**Satisfaction**:
- App store rating: >4.5
- NPS: >40
- PMF survey "very disappointed": >40%
- Support tickets per user: <0.1

### AI Performance Metrics

**Estimation Accuracy**:
- Within ±15 min: >70%
- Within ±30 min: >90%
- Improvement over time: Measurable week-over-week

**Suggestion Acceptance**:
- AI time suggestions accepted: >50%
- AI next-box suggestions accepted: >40%
- AI insights marked "helpful": >60%

**Model Performance**:
- Task parsing accuracy: >90%
- Categorization accuracy: >85%
- API response time: <1s (P95)
- API error rate: <1%

### Business Metrics

**Growth**:
- MoM user growth: >20%
- Organic vs. paid acquisition ratio: >60% organic
- Referral rate: >10%
- Viral coefficient: >0.5

**Economics**:
- LTV:CAC ratio: >3:1 (target 10:1)
- Payback period: <3 months
- Gross margin: >70%
- Monthly burn rate: <$15k

---

## Out of Scope (MLP)

The following features are explicitly **NOT** included in the MLP and will be considered for future versions:

### v1.1 Features (Post-Launch)
- ❌ Home screen widgets
- ❌ Apple Watch / wearable support
- ❌ Calendar integration (read/write)
- ❌ Siri shortcuts / voice commands
- ❌ Focus sounds library (ambient noise)
- ❌ Advanced analytics dashboard
- ❌ Task templates
- ❌ Recurring boxes

### v2.0+ Features (Long-term)
- ❌ Team/collaboration features
- ❌ Integrations (Slack, Notion, etc.)
- ❌ Desktop/web app
- ❌ AI voice coach
- ❌ Predictive scheduling (calendar autopilot)
- ❌ Focus quality auto-detection (app usage monitoring)
- ❌ Gamification (achievements, leaderboards)
- ❌ Social features (sharing progress, challenges)

### Never (Against Core Philosophy)
- ❌ Complex project management (hierarchies, dependencies)
- ❌ Detailed task notes or attachments
- ❌ File storage
- ❌ Chat/communication features
- ❌ Kanban boards or alternative views

**Rationale**: Stay focused on core value prop (simple time-boxing with AI coaching). Avoid feature creep that compromises simplicity.

---

## Appendix

### A. Glossary

**Term** | **Definition**
--- | ---
Box | A time-boxed task commitment with fixed start/end time
Time-boxing | Allocating a fixed period for a task and stopping when time expires
Focus Mode | Full-screen interface during active box
MLP | Minimum Lovable Product - initial feature-complete version
Completion Status | Whether task was finished (completed/partial/not_completed)
Focus Quality | User-reported concentration level (1-5 scale)
AI Coach | Personalized AI that provides suggestions and insights
Hive Report | Weekly summary with stats and insights
Pattern | Recurring behavior detected by AI (e.g., time-of-day effectiveness)
Insight | Actionable recommendation based on patterns
Estimation Accuracy | How close estimated time was to actual time
Cold Start | AI estimation when no user history available
Warm Start | AI estimation using user's historical data

### B. Technical Debt Items

Items to address post-MLP:

1. **Migrate to custom ML models** - Reduce OpenAI API dependency
2. **Implement proper caching layer** - Redis for frequently accessed data
3. **Add comprehensive error monitoring** - Sentry integration
4. **Database indexing optimization** - Based on actual query patterns
5. **Refactor AI prompts** - A/B test and optimize based on results
6. **Implement rate limiting** - Prevent abuse of AI features
7. **Add request batching** - Reduce API calls
8. **Mobile performance profiling** - Identify and fix bottlenecks
9. **Accessibility audit** - Ensure WCAG compliance
10. **Security audit** - Third-party penetration testing

### C. Dependencies & Risks

**External Dependencies**:
- OpenAI API (critical path for AI features)
- Apple App Store approval process
- Google Play Store approval process
- Stripe/RevenueCat (payment processing)
- Cloud hosting provider (AWS/Railway)

**Key Risks**:

**Risk** | **Impact** | **Mitigation**
--- | --- | ---
OpenAI API cost overrun | High | Implement caching, rate limiting, custom models
App store rejection | Critical | Follow guidelines strictly, have legal review
Low trial conversion | High | A/B test pricing, onboarding, value props
Poor AI accuracy | Medium | Collect feedback, iterate prompts, add fallbacks
Competition launches similar | Medium | Move fast, focus on execution quality
Developer bandwidth | High | Ruthless prioritization, consider contractors

### D. Definition of Done

A feature is considered **DONE** when:

- ✅ Code written and peer-reviewed
- ✅ Unit tests written (>80% coverage)
- ✅ Integration tests pass
- ✅ Manual QA completed (iOS + Android)
- ✅ Accessibility tested (screen reader)
- ✅ Performance benchmarks met
- ✅ Documentation updated
- ✅ Deployed to staging
- ✅ Product owner approval
- ✅ Ready for production deployment

### E. Version History

**Version** | **Date** | **Changes** | **Author**
--- | --- | --- | ---
1.0 | 2024-11-28 | Initial PRD based on brainstorming session | Business Analyst (Mary)

---

## Approval & Sign-off

**Product Owner**: _________________ Date: _______

**Engineering Lead**: _________________ Date: _______

**Design Lead**: _________________ Date: _______

---

**Document Status**: ✅ Complete
**Next Steps**:
1. Review and approve PRD
2. Create technical architecture doc
3. Design UI mockups in Figma
4. Begin Sprint 1 planning

**Questions?** Contact: [To be filled in]

---

*End of Product Requirements Document*

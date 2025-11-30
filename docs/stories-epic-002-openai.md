# User Stories: EPIC-002 - OpenAI Integration & AI Insights

## Epic Context
**Epic**: OpenAI Integration & AI Insights
**Epic ID**: EPIC-002
**Priority**: High
**Dependencies**: None
**Enables**: EPIC-003 (BoxIt feature depends on this)

---

## Story 1: Weekly Productivity Summaries

### Story Details
**Story ID**: BB-021
**Title**: As a user, I want weekly summaries of my productivity so I can track progress
**Priority**: P0 (Critical)
**Story Points**: 8
**Sprint**: Sprint 1

### User Story
```
As a busy professional who wants to improve
I want to receive weekly productivity summaries
So that I can see trends and celebrate wins without manual tracking
```

### Acceptance Criteria
- [ ] User receives automated email every Monday at 9am (user's timezone)
- [ ] Email contains: total boxes completed, completion rate %, most productive day/time, insights
- [ ] AI generates personalized commentary on the week's performance
- [ ] Email includes visual chart/graph of daily completion rates
- [ ] User can opt-in/opt-out in settings
- [ ] Summaries stored in database for in-app viewing
- [ ] "View in app" link navigates to insights page
- [ ] Email is mobile-responsive and professional design

### Technical Notes
- Endpoint: `POST /api/ai/insights/weekly-summary`
- Cron job: Every Monday at 9am per user timezone
- OpenAI prompt: "Analyze user's weekly box data and generate encouraging summary"
- Email service: Use existing email service (e.g., SendGrid, AWS SES)
- Data query: Fetch boxes from last 7 days with completion status
- Template: HTML email template with BoxBee branding
- Cost control: Rate limit to 1 summary per week per user

### Example Output
```
Subject: Your BoxBee Weekly Summary - Nov 25-Dec 1

Hey [Name]!

You completed 23 out of 28 boxes this week (82% completion rate) - great work! 🎉

Key Insights:
- Your most productive day was Wednesday with 6/6 boxes completed
- Peak focus time: 9am-11am (95% completion rate)
- You've improved 15% from last week!

AI Insight:
You're consistently crushing your morning boxes. Consider scheduling
your most challenging tasks between 9-11am when you're in the zone.

[View Full Report in App]
```

### Definition of Done
- [ ] Cron job scheduling working with timezone support
- [ ] OpenAI integration generates insights from data
- [ ] Email template created and tested
- [ ] User can view past summaries in app
- [ ] Opt-in/opt-out setting functional
- [ ] Unit tests for insight generation
- [ ] Email delivery tested on multiple clients
- [ ] QA verified emails sent correctly

---

## Story 2: Peak Productivity Hours Detection

### Story Details
**Story ID**: BB-022
**Title**: As a user, I want AI to learn when I'm most productive so it can suggest optimal box times
**Priority**: P1 (High)
**Story Points**: 5
**Sprint**: Sprint 2
**Dependencies**: BB-021 (uses same data analysis)

### User Story
```
As a user who struggles to know when I work best
I want AI to identify my peak productivity hours
So that I can schedule important tasks at optimal times
```

### Acceptance Criteria
- [ ] AI analyzes historical box completion data by hour of day
- [ ] System identifies "peak hours" (>75% completion rate) and "low energy hours" (<50%)
- [ ] Minimum 2 weeks of data required before showing insights
- [ ] Peak hours displayed in insights page with visual heatmap
- [ ] Insights update weekly as new data comes in
- [ ] Recommendations shown when creating new boxes: "Schedule at 9am? That's your peak time!"
- [ ] Works across weekdays vs weekends separately
- [ ] Edge case: Not enough data shows "Keep using BoxBee to discover your patterns"

### Technical Notes
- Algorithm:
  ```typescript
  // Analyze completion rate by hour
  const hourlyStats = await prisma.$queryRaw`
    SELECT
      EXTRACT(HOUR FROM start_time) as hour,
      COUNT(*) as total_boxes,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      CAST(SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*) as completion_rate
    FROM boxes
    WHERE user_id = ${userId}
      AND start_time > NOW() - INTERVAL '14 days'
    GROUP BY EXTRACT(HOUR FROM start_time)
    ORDER BY hour
  `;

  const peakHours = hourlyStats.filter(h => h.completion_rate > 0.75);
  const lowEnergyHours = hourlyStats.filter(h => h.completion_rate < 0.50);
  ```
- Storage: Cache results in `insights` table
- Regeneration: Update every Monday with weekly summary
- Visualization: Heatmap component (24 hours x 7 days)

### Example Insight
```
Your Peak Productivity Hours:
🔥 9am-11am (92% completion rate)
🔥 2pm-3pm (78% completion rate)

Low Energy Hours:
😴 4pm-6pm (35% completion rate)

Recommendation: Schedule complex tasks in the morning
and save quick tasks for late afternoon.
```

### Definition of Done
- [ ] Peak hours algorithm implemented and tested
- [ ] Heatmap visualization component created
- [ ] Insights page shows peak hours
- [ ] Recommendations appear in box creation flow
- [ ] Unit tests for algorithm
- [ ] Works with varying data volumes
- [ ] Edge cases handled (new users, insufficient data)
- [ ] QA verified accuracy with sample data

---

## Story 3: Intelligent Time Estimation

### Story Details
**Story ID**: BB-023
**Title**: As a user, I want AI to improve time estimates based on my history
**Priority**: P1 (High)
**Story Points**: 8
**Sprint**: Sprint 2
**Dependencies**: BB-022 (uses historical data analysis)

### User Story
```
As a user who's bad at estimating time
I want AI to learn how long tasks actually take me
So that my future time estimates are more realistic
```

### Acceptance Criteria
- [ ] System tracks estimated vs actual duration for all completed boxes
- [ ] AI suggests duration when creating box based on task name and category
- [ ] Suggestions improve over time as more data is collected
- [ ] User can accept AI suggestion or override
- [ ] Shows accuracy metric: "AI estimates are 85% accurate for you"
- [ ] Category-based learning: "Your 'meetings' average 45min, not 30min"
- [ ] Handles new users: Uses generic estimates until enough personal data
- [ ] Confidence indicator: "High confidence" vs "Low confidence" suggestions

### Technical Notes
- Data model:
  ```typescript
  // Track estimation accuracy
  interface EstimationMetrics {
    taskKeywords: string[];
    category: string;
    estimatedDuration: number;
    actualDuration: number;
    accuracyScore: number; // 0-1
  }
  ```
- Algorithm:
  ```typescript
  async function suggestDuration(taskName: string, userId: string) {
    // Extract keywords
    const keywords = extractKeywords(taskName.toLowerCase());

    // Find similar past boxes
    const historicalBoxes = await prisma.box.findMany({
      where: {
        userId,
        status: 'completed',
        OR: keywords.map(kw => ({ name: { contains: kw } }))
      },
      select: {
        duration: true,
        actualDuration: true
      }
    });

    if (historicalBoxes.length < 3) {
      return getDefaultEstimate(taskName); // Fallback
    }

    // Calculate weighted average (recent data weighted higher)
    const avgDuration = calculateWeightedAverage(historicalBoxes);
    return Math.round(avgDuration / 15) * 15; // Round to 15min
  }
  ```
- Minimum data: 3 similar boxes before showing suggestions
- Fallback estimates: Defined in constants (meeting=60min, email=15min, etc.)

### Example Interaction
```
User creates box: "Team standup meeting"

AI Suggestion:
💡 Suggested duration: 30 minutes
Based on your 8 past standup meetings (avg: 28 min)
Confidence: High

[Accept] [Change to 45 min] [Custom]
```

### Definition of Done
- [ ] Estimation algorithm implemented
- [ ] Keyword extraction working
- [ ] Suggestion UI component created
- [ ] Accuracy tracking in database
- [ ] Fallback estimates defined for 15+ task types
- [ ] Unit tests for algorithm (>80% coverage)
- [ ] Integration test with sample user data
- [ ] Accuracy measured on test dataset (70%+ target)
- [ ] QA verified suggestions are reasonable

---

## Story 4: Contextual Coaching Suggestions

### Story Details
**Story ID**: BB-024
**Title**: As a user, I want coaching tips when I'm struggling with focus
**Priority**: P2 (Medium)
**Story Points**: 5
**Sprint**: Sprint 3
**Dependencies**: BB-022 (pattern recognition)

### User Story
```
As a user who sometimes struggles to stay focused
I want AI to offer helpful suggestions when I'm off track
So that I can get back on course without feeling judged
```

### Acceptance Criteria
- [ ] AI detects struggling patterns: 3+ boxes skipped/cancelled in a day
- [ ] In-app notification with coaching suggestion appears
- [ ] Suggestions are positive and actionable (not judgmental)
- [ ] User can dismiss or mark as helpful
- [ ] Different suggestions based on pattern: too many boxes, wrong times, etc.
- [ ] Suggestion examples: "Try shorter boxes", "Schedule breaks", "Your afternoons are tough - move complex tasks to morning"
- [ ] Frequency capped: Max 1 suggestion per day
- [ ] User can disable coaching in settings

### Technical Notes
- Pattern detection:
  ```typescript
  // Detect struggling patterns
  const patterns = {
    tooManySkipped: (boxes) => boxes.filter(b => b.status === 'skipped').length >= 3,
    overcommitted: (boxes) => boxes.length > 10 && completionRate < 0.5,
    wrongTiming: (boxes) => mostSkippedHour !== null && mostSkippedHour.rate > 0.7
  };
  ```
- OpenAI prompt: "Generate encouraging coaching tip for user who ${pattern}. Keep it under 50 words, positive tone."
- Notification: Use in-app notification system
- Storage: Track which suggestions were shown to avoid repetition

### Example Suggestions
```
Pattern: Too many boxes skipped in afternoon
Suggestion: "I noticed afternoons are challenging for you.
Try scheduling 2-3 smaller boxes instead of 5+ to build momentum! 💪"

Pattern: Boxes too long
Suggestion: "Long boxes can be draining! Try breaking your
2-hour tasks into 30-minute chunks with breaks in between. 🎯"

Pattern: Overcommitted
Suggestion: "You scheduled 12 boxes today but completed 4.
That's okay! Tomorrow, try 5-6 boxes and crush them all. 🚀"
```

### Definition of Done
- [ ] Pattern detection logic implemented
- [ ] OpenAI coaching generation working
- [ ] In-app notification component created
- [ ] User can dismiss/acknowledge suggestions
- [ ] Settings toggle for coaching enabled/disabled
- [ ] Frequency cap enforced (1/day max)
- [ ] Unit tests for pattern detection
- [ ] User testing confirms suggestions are helpful, not annoying
- [ ] QA verified suggestions appear appropriately

---

## Story 5: User-Provided OpenAI API Key

### Story Details
**Story ID**: BB-025
**Title**: As a power user, I want to add my own OpenAI API key to unlock unlimited insights
**Priority**: P2 (Medium)
**Story Points**: 3
**Sprint**: Sprint 3
**Dependencies**: None (but complements all AI features)

### User Story
```
As a power user who wants unlimited AI features
I want to provide my own OpenAI API key
So that I'm not limited by BoxBee's rate limits or quotas
```

### Acceptance Criteria
- [ ] Settings page has "OpenAI API Key" input field
- [ ] Input is password-masked (dots instead of characters)
- [ ] "Test Key" button validates the key works
- [ ] Validation shows green checkmark if valid, error message if invalid
- [ ] Key stored securely in database (encrypted)
- [ ] System uses user's key instead of BoxBee's key when available
- [ ] Badge or indicator shows "Unlimited AI" status
- [ ] User can remove key and revert to standard tier
- [ ] Instructions link: "How to get an API key from OpenAI"

### Technical Notes
- Database:
  ```sql
  ALTER TABLE users ADD COLUMN openai_api_key TEXT;
  ```
- Encryption: Use AES-256 encryption for storing keys
  ```typescript
  import crypto from 'crypto';

  function encryptApiKey(key: string): string {
    const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_SECRET);
    return cipher.update(key, 'utf8', 'hex') + cipher.final('hex');
  }

  function decryptApiKey(encrypted: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_SECRET);
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  }
  ```
- Validation endpoint: `POST /api/settings/validate-openai-key`
- Key selection logic: Check for user key first, fallback to system key
- Cost tracking: Show user their approximate OpenAI usage costs

### UI Design
```
Settings > AI Features

┌─────────────────────────────────────────┐
│ OpenAI API Key (Optional)               │
│                                         │
│ [••••••••••••••••••••] [Test Key]      │
│                                         │
│ ℹ️  Provide your own key for unlimited  │
│    AI insights. Get yours at:          │
│    platform.openai.com/api-keys        │
│                                         │
│ Status: ✅ Connected (Unlimited AI)     │
│                                         │
│ [Remove Key]                            │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] API key input field in settings
- [ ] Key validation endpoint working
- [ ] Encryption/decryption implemented
- [ ] System selects correct key (user vs system)
- [ ] Test button validates key successfully
- [ ] Instructions link added
- [ ] Unlimited badge shows when user key active
- [ ] Security review passed
- [ ] Unit tests for encryption
- [ ] QA verified flow end-to-end

---

## Story 6: Insights History Page

### Story Details
**Story ID**: BB-026
**Title**: As a user, I want to view all my past insights in one place
**Priority**: P2 (Medium)
**Story Points**: 5
**Sprint**: Sprint 3
**Dependencies**: BB-021, BB-022, BB-024

### User Story
```
As a user who wants to track my growth
I want to see all my past AI insights and summaries
So that I can reflect on my productivity journey
```

### Acceptance Criteria
- [ ] New "Insights" tab in navigation
- [ ] Page lists all insights chronologically (newest first)
- [ ] Each insight shows: date, type (summary/pattern/coaching), content
- [ ] Filter by type: All, Summaries, Patterns, Coaching
- [ ] Search functionality to find specific insights
- [ ] Infinite scroll or pagination for long lists
- [ ] Tap insight to expand and see full details
- [ ] "Mark as favorite" to save important insights
- [ ] Empty state: "Start using BoxBee to generate insights!"
- [ ] Pull-to-refresh to fetch latest insights

### Technical Notes
- Endpoint: `GET /api/ai/insights?type=all&limit=20&offset=0`
- Response:
  ```typescript
  interface Insight {
    id: string;
    userId: string;
    type: 'weekly_summary' | 'pattern' | 'coaching' | 'suggestion';
    title: string;
    content: string;
    generatedAt: Date;
    isFavorite: boolean;
    acknowledged: boolean;
  }
  ```
- Database query:
  ```typescript
  const insights = await prisma.insight.findMany({
    where: {
      userId,
      type: type === 'all' ? undefined : type
    },
    orderBy: { generatedAt: 'desc' },
    take: limit,
    skip: offset
  });
  ```
- Search: Full-text search on title and content

### UI Design
```
┌─────────────────────────────────────────┐
│ Insights                          🔍    │
├─────────────────────────────────────────┤
│ [All] [Summaries] [Patterns] [Coaching]│
├─────────────────────────────────────────┤
│                                         │
│ 📊 Weekly Summary - Dec 4, 2024        │
│ You completed 23/28 boxes this week...  │
│ ⭐                                      │
│                                         │
│ 🔥 Peak Hours Detected - Dec 1, 2024   │
│ Your most productive time is 9-11am...  │
│                                         │
│ 💡 Coaching Tip - Nov 28, 2024         │
│ Try shorter afternoon boxes...          │
│                                         │
│ [Load More]                             │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] Insights page created with navigation
- [ ] List displays all insights correctly
- [ ] Filtering by type working
- [ ] Search functionality implemented
- [ ] Pagination or infinite scroll working
- [ ] Favorite/unfavorite functionality
- [ ] Empty state UI
- [ ] Pull-to-refresh on mobile
- [ ] Performance tested with 100+ insights
- [ ] QA verified all filters and interactions

---

## Additional Stories (Future Backlog)

### Backlog Stories
**BB-027**: Export insights as PDF report
**BB-028**: Share insights with accountability partner
**BB-029**: Custom AI prompts (power users can write own prompts)
**BB-030**: Insight notifications via SMS (opt-in)

---

## Story Dependencies Graph

```
BB-021 (Weekly summaries)
   ↓
BB-022 (Peak hours) ──────┐
   ↓                      ↓
BB-023 (Time estimation)  BB-024 (Coaching)
   ↓                      ↓
   └──────────────────────┴──→ BB-026 (Insights page)

BB-025 (User API key) → Independent, enhances all above
```

---

## Sprint Planning

### Sprint 1 (2 weeks)
- BB-021: Weekly summaries
- BB-022: Peak hours detection
- **Goal**: Core AI analytics working, first insights generated

### Sprint 2 (2 weeks)
- BB-023: Time estimation
- BB-024: Coaching suggestions (partial)
- **Goal**: AI actively helping users improve

### Sprint 3 (2 weeks)
- BB-024: Coaching (complete)
- BB-025: User API keys
- BB-026: Insights page
- **Goal**: Complete AI insights feature set

---

## Testing Plan

### Unit Tests
- OpenAI integration: Mock API calls, test error handling
- Peak hours algorithm: Test with sample data, edge cases (new users)
- Time estimation: Verify keyword extraction, weighted averages
- Pattern detection: Test all patterns trigger correctly

### Integration Tests
- End-to-end: Create boxes → Generate insights → Display in app
- Email delivery: Weekly summary sent correctly
- API key validation: User key works, falls back to system key

### Performance Tests
- OpenAI response time: <3 seconds for insight generation
- Database queries: Peak hours calculation <500ms
- Email generation: Batch process 1000 users in <5 minutes

### User Acceptance Testing
- 10 beta users receive weekly summaries for 4 weeks
- Measure: Did insights help improve productivity? (survey)
- Success criteria: 70%+ find insights valuable and actionable
- Collect feedback on coaching tone and helpfulness

---

**Document End**

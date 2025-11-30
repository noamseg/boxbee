# User Stories: EPIC-006 - Completed Boxes Section

## Epic Context
**Epic**: Completed Boxes Section
**Epic ID**: EPIC-006
**Priority**: Medium
**Dependencies**: None
**Business Value**: Keeps main view focused while preserving history

---

## Story 1: Auto-Archive Completed Boxes

### Story Details
**Story ID**: BB-061
**Title**: As a user, I want completed boxes to disappear from my main view so it stays clean
**Priority**: P0 (Critical)
**Story Points**: 3
**Sprint**: Sprint 1

### User Story
```
As a user who completes many boxes
I want completed boxes to automatically move out of my main list
So that I can focus on what's left to do without clutter
```

### Acceptance Criteria
- [ ] Boxes with status 'completed' auto-archive after 24 hours
- [ ] Archived boxes removed from main list view
- [ ] Archived boxes remain in database (not deleted)
- [ ] Cron job runs hourly to check for boxes to archive
- [ ] "Recently Completed" section shows boxes from last 24 hours
- [ ] After 24 hours, boxes move to "Completed" section
- [ ] Setting: "Auto-archive after X hours" (default: 24, options: 12/24/48/Never)
- [ ] Manual archive button: "Archive now" on completed box
- [ ] Notification: "5 boxes archived" (optional, can be disabled)

### Technical Notes
- Database field:
  ```sql
  ALTER TABLE boxes ADD COLUMN archived BOOLEAN DEFAULT FALSE;
  ALTER TABLE boxes ADD COLUMN archived_at TIMESTAMP;
  ```
- Cron job:
  ```typescript
  // Run every hour
  cron.schedule('0 * * * *', async () => {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - 24);

    const boxesToArchive = await prisma.box.findMany({
      where: {
        status: 'completed',
        archived: false,
        endTime: { lt: cutoffTime }
      }
    });

    await prisma.box.updateMany({
      where: {
        id: { in: boxesToArchive.map(b => b.id) }
      },
      data: {
        archived: true,
        archivedAt: new Date()
      }
    });

    // Optional: Send notification to users
    const userGroups = groupBy(boxesToArchive, 'userId');
    for (const [userId, boxes] of Object.entries(userGroups)) {
      await notificationService.send({
        userId,
        title: `${boxes.length} boxes archived`,
        body: 'Check your Completed section to review',
        silent: true
      });
    }
  });
  ```
- Query modification:
  ```typescript
  // Main list only shows non-archived
  const activeBoxes = await prisma.box.findMany({
    where: {
      userId,
      archived: false,
      status: { in: ['scheduled', 'active', 'paused'] }
    }
  });

  // Recently completed (last 24 hours)
  const recentlyCompleted = await prisma.box.findMany({
    where: {
      userId,
      archived: false,
      status: 'completed',
      endTime: { gte: twentyFourHoursAgo }
    }
  });
  ```

### Definition of Done
- [ ] Auto-archive cron job working
- [ ] Boxes archived after 24 hours
- [ ] Archived boxes hidden from main list
- [ ] Recently completed section shows <24hr boxes
- [ ] Settings option for archive timing
- [ ] Manual archive button functional
- [ ] Database migration complete
- [ ] Unit tests for archive logic
- [ ] Integration test for cron job
- [ ] QA verified timing accurate

---

## Story 2: Completed Section View

### Story Details
**Story ID**: BB-062
**Title**: As a user, I want to access my completed boxes to review what I've accomplished
**Priority**: P0 (Critical)
**Story Points**: 5
**Sprint**: Sprint 1
**Dependencies**: BB-061

### User Story
```
As a user who wants to reflect on my productivity
I want to see all my past completed boxes
So that I can feel accomplished and review my work history
```

### Acceptance Criteria
- [ ] New "Completed" tab in bottom navigation
- [ ] Shows all archived boxes in reverse chronological order (newest first)
- [ ] Each box displays: name, category, completed date/time, duration
- [ ] Shows completion rate badge: "82% completed" (vs skipped/cancelled)
- [ ] Infinite scroll or pagination (load 50 at a time)
- [ ] Pull-to-refresh updates list
- [ ] Empty state: "No completed boxes yet. Start time-boxing!"
- [ ] Visual differentiation: Muted colors to show they're archived
- [ ] Tap box to see full details in modal

### Technical Notes
- Endpoint: `GET /api/boxes/completed?limit=50&offset=0`
- Query:
  ```typescript
  async function getCompletedBoxes(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ) {
    const boxes = await prisma.box.findMany({
      where: {
        userId,
        archived: true,
        status: 'completed'
      },
      orderBy: { endTime: 'desc' },
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        category: true,
        startTime: true,
        endTime: true,
        duration: true,
        actualDuration: true,
        notes: true
      }
    });

    const total = await prisma.box.count({
      where: { userId, archived: true, status: 'completed' }
    });

    const completionRate = await calculateCompletionRate(userId);

    return { boxes, total, completionRate };
  }

  async function calculateCompletionRate(userId: string) {
    const stats = await prisma.box.groupBy({
      by: ['status'],
      where: { userId, archived: true },
      _count: true
    });

    const completed = stats.find(s => s.status === 'completed')?._count || 0;
    const total = stats.reduce((sum, s) => sum + s._count, 0);

    return total > 0 ? (completed / total) * 100 : 0;
  }
  ```

### UI Design
```
┌─────────────────────────────────────────┐
│ Completed                         [🔍]  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Completion Rate: 82%             🎉     │
├─────────────────────────────────────────┤
│ Today - Dec 10                          │
│                                         │
│ ✓ Team Meeting                     Work │
│   9:00 AM - 10:00 AM · 1h               │
│                                         │
│ ✓ Focus Block: Write Report        Work │
│   10:30 AM - 12:00 PM · 1.5h            │
│                                         │
│ Yesterday - Dec 9                       │
│                                         │
│ ✓ Gym Workout                    Health │
│   7:00 AM - 8:00 AM · 1h                │
│                                         │
│ [Load More]                             │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] Completed tab in navigation
- [ ] List displays archived boxes correctly
- [ ] Completion rate badge accurate
- [ ] Infinite scroll/pagination working
- [ ] Pull-to-refresh functional
- [ ] Empty state UI
- [ ] Detail modal opens on tap
- [ ] Visual styling appropriate
- [ ] Performance: List scrolls smoothly
- [ ] Unit tests for data fetching
- [ ] QA verified all interactions

---

## Story 3: Search and Filter Completed Boxes

### Story Details
**Story ID**: BB-063
**Title**: As a user, I want to search my completed boxes to find past work
**Priority**: P1 (High)
**Story Points**: 5
**Sprint**: Sprint 2
**Dependencies**: BB-062

### User Story
```
As a user with months of history
I want to search and filter my completed boxes
So that I can find specific past work or analyze patterns
```

### Acceptance Criteria
- [ ] Search bar at top of Completed section
- [ ] Search by: box name, notes, category
- [ ] Real-time search (debounced, updates as user types)
- [ ] Filter options: Category, Date range, Duration
- [ ] Filter UI: Bottom sheet or modal with options
- [ ] Combined filters: Search "meeting" + Category "Work" + Last 30 days
- [ ] Clear filters button when filters applied
- [ ] Show filter count badge: "3 filters active"
- [ ] Results highlight matching text
- [ ] Empty state: "No results found. Try different keywords."

### Technical Notes
- Search endpoint: `GET /api/boxes/completed/search?q=meeting&category=work&dateFrom=2024-11-01`
- Query with filters:
  ```typescript
  async function searchCompletedBoxes(
    userId: string,
    searchQuery?: string,
    category?: string,
    dateFrom?: Date,
    dateTo?: Date,
    minDuration?: number,
    maxDuration?: number
  ) {
    const where: any = {
      userId,
      archived: true,
      status: 'completed'
    };

    // Text search
    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { notes: { contains: searchQuery, mode: 'insensitive' } }
      ];
    }

    // Category filter
    if (category) {
      where.category = category;
    }

    // Date range filter
    if (dateFrom || dateTo) {
      where.endTime = {};
      if (dateFrom) where.endTime.gte = dateFrom;
      if (dateTo) where.endTime.lte = dateTo;
    }

    // Duration filter
    if (minDuration || maxDuration) {
      where.duration = {};
      if (minDuration) where.duration.gte = minDuration;
      if (maxDuration) where.duration.lte = maxDuration;
    }

    const boxes = await prisma.box.findMany({
      where,
      orderBy: { endTime: 'desc' },
      take: 100
    });

    return boxes;
  }
  ```
- Full-text search (PostgreSQL):
  ```sql
  -- Add full-text search index
  CREATE INDEX boxes_name_notes_search_idx ON boxes
  USING gin(to_tsvector('english', name || ' ' || COALESCE(notes, '')));

  -- Query with full-text search
  SELECT * FROM boxes
  WHERE to_tsvector('english', name || ' ' || COALESCE(notes, ''))
        @@ to_tsquery('english', 'meeting')
    AND user_id = $1
    AND archived = true;
  ```

### UI Design - Filters
```
┌─────────────────────────────────────────┐
│ Filter Completed Boxes              ✕   │
├─────────────────────────────────────────┤
│ Category                                │
│ ○ All  ◉ Work  ○ Personal  ○ Health    │
│                                         │
│ Date Range                              │
│ [Last 7 days ▼]                         │
│                                         │
│ Duration                                │
│ Min: [30 min] Max: [2 hours]           │
│                                         │
│ [Clear All]           [Apply Filters]   │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] Search bar implemented
- [ ] Real-time search working (debounced)
- [ ] Filter options UI created
- [ ] All filter types functional (category, date, duration)
- [ ] Combined filters work together
- [ ] Clear filters button working
- [ ] Filter badge shows active count
- [ ] Results highlight matching text
- [ ] Empty state for no results
- [ ] Performance: Search returns in <500ms
- [ ] Unit tests for search/filter logic
- [ ] QA verified search accuracy

---

## Story 4: Completion Statistics and Streaks

### Story Details
**Story ID**: BB-064
**Title**: As a user, I want to see my completion stats and streaks for motivation
**Priority**: P1 (High)
**Story Points**: 5
**Sprint**: Sprint 2
**Dependencies**: BB-062

### User Story
```
As a user motivated by progress
I want to see my completion statistics and streaks
So that I feel accomplished and stay motivated
```

### Acceptance Criteria
- [ ] Stats card at top of Completed section showing:
  - Total boxes completed (all time)
  - Completion rate % (completed vs total)
  - Current streak (consecutive days with ≥1 completed box)
  - Longest streak
  - Total focus time (sum of all durations)
- [ ] Weekly/Monthly view toggle for time-scoped stats
- [ ] Visual chart: Boxes completed per day (last 30 days)
- [ ] Category breakdown: Pie chart or bar graph
- [ ] Tap stat to see details/breakdown
- [ ] Motivational message based on stats: "You're on fire! 7-day streak 🔥"
- [ ] Share stats button (screenshot or social share)

### Technical Notes
- Stats calculation:
  ```typescript
  async function getCompletionStats(userId: string, timeframe: 'week' | 'month' | 'all') {
    const where: any = {
      userId,
      archived: true,
      status: 'completed'
    };

    if (timeframe === 'week') {
      where.endTime = { gte: subDays(new Date(), 7) };
    } else if (timeframe === 'month') {
      where.endTime = { gte: subDays(new Date(), 30) };
    }

    // Total completed
    const totalCompleted = await prisma.box.count({ where });

    // Total boxes (including skipped/cancelled)
    const totalBoxes = await prisma.box.count({
      where: { userId, archived: true }
    });

    // Completion rate
    const completionRate = (totalCompleted / totalBoxes) * 100;

    // Total focus time
    const boxes = await prisma.box.findMany({
      where,
      select: { duration: true }
    });
    const totalFocusTime = boxes.reduce((sum, box) => sum + box.duration, 0);

    // Current streak
    const currentStreak = await calculateStreak(userId);

    // Category breakdown
    const categoryStats = await prisma.box.groupBy({
      by: ['category'],
      where,
      _count: true
    });

    return {
      totalCompleted,
      completionRate,
      totalFocusTime,
      currentStreak,
      categoryStats
    };
  }

  async function calculateStreak(userId: string) {
    // Fetch completed boxes grouped by date
    const boxesByDate = await prisma.$queryRaw`
      SELECT DATE(end_time) as date, COUNT(*) as count
      FROM boxes
      WHERE user_id = ${userId}
        AND status = 'completed'
        AND archived = true
      GROUP BY DATE(end_time)
      ORDER BY date DESC
    `;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const entry of boxesByDate) {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);

      const daysDiff = differenceInDays(currentDate, entryDate);

      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff > streak) {
        break;
      }
    }

    return streak;
  }
  ```

### UI Design - Stats Card
```
┌─────────────────────────────────────────┐
│ Your Stats                   [Week ▼]   │
├─────────────────────────────────────────┤
│ 🔥 7-Day Streak · Keep it going!        │
│                                         │
│ 156                  82%          24.5h │
│ Completed       Completion      Focus   │
│                    Rate          Time   │
│                                         │
│ Boxes Completed (Last 30 Days)          │
│ ▂▄▅▇█▆▅▃▄▅▆▅▄▃▂▃▄▅▆▅▄▃▂▃▄▅▆▅▄▃ │
│                                         │
│ By Category                             │
│ ████████ Work (45%)                     │
│ █████ Personal (28%)                    │
│ ███ Health (18%)                        │
│ ██ Learning (9%)                        │
│                                         │
│ [Share Stats]                           │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] Stats calculation implemented
- [ ] Stats card UI created
- [ ] All metrics accurate (total, rate, streak, time)
- [ ] Timeframe toggle working (week/month/all)
- [ ] Chart visualization implemented
- [ ] Category breakdown shown
- [ ] Motivational messages appear
- [ ] Share functionality working
- [ ] Performance: Stats load in <1s
- [ ] Unit tests for stats calculations
- [ ] QA verified accuracy with test data

---

## Story 5: Restore Completed Box

### Story Details
**Story ID**: BB-065
**Title**: As a user, I want to restore a completed box if I need to redo it
**Priority**: P2 (Medium)
**Story Points**: 3
**Sprint**: Sprint 2
**Dependencies**: BB-062

### User Story
```
As a user who sometimes needs to redo tasks
I want to restore a completed box back to my active list
So that I can reschedule it without creating from scratch
```

### Acceptance Criteria
- [ ] Swipe left on completed box shows "Restore" option
- [ ] Tap "Restore" moves box back to main list
- [ ] Restored box status changes to 'scheduled'
- [ ] Restored box `archived` flag set to `false`
- [ ] Restored box appears in main list immediately
- [ ] Option to restore with new time or keep original time
- [ ] Confirmation dialog: "Restore 'Team Meeting' to your schedule?"
- [ ] Bulk restore: Select multiple boxes and restore all
- [ ] Undo restore within 5 seconds

### Technical Notes
- Restore operation:
  ```typescript
  async function restoreBox(boxId: string, newStartTime?: Date) {
    const box = await prisma.box.findUnique({
      where: { id: boxId }
    });

    if (!box || !box.archived) {
      throw new Error('Box not found or not archived');
    }

    const updateData: any = {
      archived: false,
      archivedAt: null,
      status: 'scheduled'
    };

    // If new time provided, update it
    if (newStartTime) {
      updateData.startTime = newStartTime;
      updateData.endTime = null; // Clear old end time
      updateData.actualDuration = null;
    }

    const restoredBox = await prisma.box.update({
      where: { id: boxId },
      data: updateData
    });

    return restoredBox;
  }
  ```
- Bulk restore:
  ```typescript
  async function restoreBulk(boxIds: string[]) {
    await prisma.box.updateMany({
      where: { id: { in: boxIds } },
      data: {
        archived: false,
        archivedAt: null,
        status: 'scheduled'
      }
    });
  }
  ```

### UI Design
```
┌─────────────────────────────────────────┐
│ Restore Box?                        ✕   │
├─────────────────────────────────────────┤
│ Restore "Team Meeting" to your schedule?│
│                                         │
│ Original time: Dec 9, 2:00 PM           │
│                                         │
│ ○ Keep original time                    │
│ ◉ Schedule for new time:                │
│   [Dec 11, 2:00 PM ▼]                   │
│                                         │
│ [Cancel]              [Restore]         │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] Restore functionality implemented
- [ ] Swipe gesture working
- [ ] Confirmation dialog appears
- [ ] Restored box appears in main list
- [ ] Time update option working
- [ ] Bulk restore functional
- [ ] Undo option (5 second window)
- [ ] Database update correct
- [ ] Unit tests for restore logic
- [ ] QA verified restore flow

---

## Additional Stories (Future Backlog)

### Backlog Stories
**BB-066**: Export completed boxes as CSV/PDF report
**BB-067**: AI insights from completed boxes (patterns, recommendations)
**BB-068**: Compare stats with previous week/month (trending up/down)
**BB-069**: Permanent delete option (remove from database)
**BB-070**: Recurring box creation from completed box

---

## Story Dependencies Graph

```
BB-061 (Auto-archive)
   ↓
BB-062 (Completed view)
   ├──→ BB-063 (Search & filter)
   ├──→ BB-064 (Stats & streaks)
   └──→ BB-065 (Restore box)
```

---

## Sprint Planning

### Sprint 1 (2 weeks)
- BB-061: Auto-archive completed boxes
- BB-062: Completed section view
- **Goal**: Completed boxes automatically archived, viewable in dedicated section

### Sprint 2 (2 weeks)
- BB-063: Search and filter
- BB-064: Stats and streaks
- BB-065: Restore box
- **Goal**: Complete archived boxes feature with search and analytics

---

## Testing Plan

### Unit Tests
- Auto-archive cron: Boxes archived after 24 hours
- Archive timing: Respects user settings (12/24/48 hours)
- Stats calculation: Streak, completion rate, totals accurate
- Restore logic: Box moves back to active correctly

### Integration Tests
- End-to-end: Complete box → Wait 24hr → Auto-archive → Appears in Completed
- Search/filter: Multiple filters combine correctly
- Restore: Restored box syncs to calendar if integration enabled

### Performance Tests
- List loading: 1000+ completed boxes load in <2s
- Search: Results return in <500ms
- Stats calculation: Completes in <1s for 10,000+ boxes

### User Acceptance Testing
- 10 users test completed section for 2 weeks
- Metrics: % who use search, % who view stats weekly
- Success criteria: 70%+ find completed section useful
- Collect feedback on stats motivational value

---

## Technical Considerations

### Data Retention
- Keep completed boxes indefinitely (no auto-delete)
- Optional: Add setting for auto-delete after X days (advanced users)
- Privacy: Ensure deleted account removes all boxes

### Performance Optimization
- Index on `archived` and `endTime` columns for fast queries
- Pagination to avoid loading all completed boxes at once
- Cache stats calculations (update hourly)
  ```sql
  CREATE INDEX idx_boxes_archived_endtime ON boxes(archived, end_time DESC);
  CREATE INDEX idx_boxes_user_archived_status ON boxes(user_id, archived, status);
  ```

### Mobile Storage
- Don't sync all completed boxes to mobile (too much data)
- Lazy load as user scrolls
- Cache last 100 completed boxes for offline viewing

---

**Document End**

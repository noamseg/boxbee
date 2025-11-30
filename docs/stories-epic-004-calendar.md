# User Stories: EPIC-004 - Google Calendar Integration

## Epic Context
**Epic**: Google Calendar Integration
**Epic ID**: EPIC-004
**Priority**: High
**Dependencies**: None
**Business Value**: Prevent conflicts and integrate with existing workflows

---

## Story 1: Connect Google Calendar

### Story Details
**Story ID**: BB-041
**Title**: As a user, I want to connect my Google Calendar so my boxes appear on my calendar
**Priority**: P0 (Critical)
**Story Points**: 5
**Sprint**: Sprint 1

### User Story
```
As a professional who lives in Google Calendar
I want to connect my calendar to BoxBee
So that my time boxes integrate with my existing schedule
```

### Acceptance Criteria
- [ ] "Connect Google Calendar" button in Settings > Integrations
- [ ] Tapping opens Google OAuth consent screen
- [ ] User authenticates and grants calendar permissions
- [ ] App receives OAuth token and stores securely
- [ ] Success message: "Google Calendar connected! 📅"
- [ ] Shows connected calendar email/account
- [ ] "Disconnect" option to remove connection
- [ ] Handles multiple Google accounts (select which to use)
- [ ] Error handling: OAuth cancelled, network errors, insufficient permissions

### Technical Notes
- OAuth 2.0 Flow: Authorization Code
- Required Scopes:
  ```
  - https://www.googleapis.com/auth/calendar.events (read/write events)
  - https://www.googleapis.com/auth/calendar.readonly (read calendars list)
  ```
- Backend endpoint: `POST /api/integrations/calendar/auth`
- Database schema:
  ```sql
  ALTER TABLE users ADD COLUMN google_calendar_email TEXT;
  ALTER TABLE users ADD COLUMN google_calendar_access_token TEXT;
  ALTER TABLE users ADD COLUMN google_calendar_refresh_token TEXT;
  ALTER TABLE users ADD COLUMN google_calendar_token_expires_at TIMESTAMP;
  ALTER TABLE users ADD COLUMN sync_boxes_to_calendar BOOLEAN DEFAULT TRUE;
  ```
- SDK: `googleapis` npm package
- Token refresh: Implement automatic refresh before expiry (tokens expire in 1 hour)

### OAuth Flow
```
1. User taps "Connect Google Calendar"
2. Redirect to: https://accounts.google.com/o/oauth2/v2/auth?
   - client_id
   - redirect_uri=boxbee://google-calendar-callback
   - scope=calendar.events
   - response_type=code
   - access_type=offline (to get refresh token)
3. User approves in Google
4. Redirect: boxbee://google-calendar-callback?code=XYZ789
5. Backend exchanges code for access_token + refresh_token
6. Store tokens securely (encrypted)
7. Fetch and display user's calendar email
```

### Definition of Done
- [ ] Google OAuth implemented
- [ ] Tokens stored securely (encrypted)
- [ ] Connection status UI complete
- [ ] Disconnect functionality working
- [ ] Multiple account selection working
- [ ] Error handling for all edge cases
- [ ] Token auto-refresh implemented
- [ ] Unit tests for OAuth flow
- [ ] Integration test with Google Calendar API
- [ ] QA tested on iOS and Android
- [ ] Google app verification completed (if required)

---

## Story 2: Auto-Sync Boxes to Calendar

### Story Details
**Story ID**: BB-042
**Title**: As a user, I want boxes to automatically sync to my calendar
**Priority**: P0 (Critical)
**Story Points**: 8
**Sprint**: Sprint 1
**Dependencies**: BB-041

### User Story
```
As a busy professional
I want my BoxBee boxes to appear on my Google Calendar
So that my time is blocked and others can see I'm busy
```

### Acceptance Criteria
- [ ] New/updated boxes automatically create/update calendar events
- [ ] Event title matches box name
- [ ] Event time matches box start time and duration
- [ ] Event description includes: "Created by BoxBee" + box notes
- [ ] Color coding: Different colors for work/personal/health categories
- [ ] Sync happens within 5 seconds of box creation
- [ ] "Auto-sync" toggle in Settings (default: ON)
- [ ] Sync status indicator on each box: ✓ Synced, ⟳ Syncing, ⚠ Failed
- [ ] Manual "Sync now" button for failed syncs
- [ ] Deleted boxes remove calendar events

### Technical Notes
- Sync trigger: After box create/update/delete
  ```typescript
  async function createBox(data: CreateBoxInput, userId: string) {
    // Create box in database
    const box = await prisma.box.create({ data });

    // Sync to Google Calendar if enabled
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        syncBoxesToCalendar: true,
        googleCalendarAccessToken: true
      }
    });

    if (user.syncBoxesToCalendar && user.googleCalendarAccessToken) {
      await calendarService.createEvent({
        userId,
        boxId: box.id,
        summary: box.name,
        description: `Created by BoxBee\n\n${box.notes || ''}`,
        start: box.startTime,
        end: new Date(box.startTime.getTime() + box.duration * 60000),
        colorId: getCategoryColor(box.category)
      });
    }

    return box;
  }
  ```
- Event format:
  ```json
  {
    "summary": "Team Meeting",
    "description": "Created by BoxBee\n\nDiscuss Q4 goals",
    "start": {
      "dateTime": "2024-12-10T14:00:00-08:00",
      "timeZone": "America/Los_Angeles"
    },
    "end": {
      "dateTime": "2024-12-10T15:00:00-08:00",
      "timeZone": "America/Los_Angeles"
    },
    "colorId": "9",
    "reminders": { "useDefault": false }
  }
  ```
- Sync log table:
  ```sql
  CREATE TABLE calendar_sync_log (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    box_id UUID REFERENCES boxes(id),
    calendar_event_id TEXT,
    sync_status VARCHAR(20), -- 'synced', 'syncing', 'failed'
    error_message TEXT,
    last_synced_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```
- Color mapping:
  ```typescript
  const colorMap = {
    work: '9',      // Blue
    personal: '10', // Green
    health: '4',    // Red/Pink
    learning: '5',  // Yellow
    default: '1'    // Lavender
  };
  ```

### Definition of Done
- [ ] Auto-sync on create/update/delete working
- [ ] Calendar events created correctly
- [ ] Event details accurate (title, time, description)
- [ ] Color coding implemented
- [ ] Sync status tracking in database
- [ ] Settings toggle functional
- [ ] Failed sync retry mechanism
- [ ] Performance: Sync completes in <5s
- [ ] Unit tests for sync logic
- [ ] Integration tests with Google Calendar API
- [ ] QA verified events appear correctly in Google Calendar

---

## Story 3: Conflict Detection and Warnings

### Story Details
**Story ID**: BB-043
**Title**: As a user, I want to be warned when a box conflicts with a calendar event
**Priority**: P0 (Critical)
**Story Points**: 8
**Sprint**: Sprint 2
**Dependencies**: BB-042

### User Story
```
As a user with a busy calendar
I want to know when I'm double-booking myself
So that I can avoid scheduling conflicts
```

### Acceptance Criteria
- [ ] When creating/editing box, check for calendar conflicts
- [ ] Conflict defined as: overlapping time with existing calendar event
- [ ] Warning banner: "⚠ Conflict: Team Meeting (2-3pm)"
- [ ] Show conflicting event details: name, time, calendar
- [ ] User can: Cancel, Reschedule, or Create Anyway
- [ ] "Suggest time" button finds next available slot
- [ ] Conflicts checked in real-time (debounced as user adjusts time)
- [ ] Exclude all-day events from conflict detection
- [ ] Exclude declined events from conflict detection
- [ ] Setting: "Warn me about conflicts" toggle (default: ON)

### Technical Notes
- Conflict detection algorithm:
  ```typescript
  async function checkConflicts(
    userId: string,
    startTime: Date,
    duration: number
  ): Promise<CalendarEvent[]> {
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // Fetch events from Google Calendar in time range
    const events = await googleCalendar.events.list({
      calendarId: 'primary',
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    // Filter conflicts
    const conflicts = events.data.items?.filter(event => {
      // Skip all-day events
      if (!event.start?.dateTime) return false;

      // Skip declined events
      if (event.attendees?.some(a => a.self && a.responseStatus === 'declined')) {
        return false;
      }

      // Check overlap
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);

      return (
        (startTime >= eventStart && startTime < eventEnd) ||
        (endTime > eventStart && endTime <= eventEnd) ||
        (startTime <= eventStart && endTime >= eventEnd)
      );
    });

    return conflicts || [];
  }
  ```
- Find next available slot:
  ```typescript
  async function suggestNextAvailableTime(
    userId: string,
    duration: number,
    preferredStart: Date
  ): Promise<Date> {
    const workdayStart = 9; // 9am
    const workdayEnd = 18; // 6pm
    let candidate = preferredStart;

    // Try next 7 days
    for (let day = 0; day < 7; day++) {
      for (let hour = workdayStart; hour < workdayEnd; hour++) {
        candidate = new Date(preferredStart);
        candidate.setDate(candidate.getDate() + day);
        candidate.setHours(hour, 0, 0, 0);

        const conflicts = await checkConflicts(userId, candidate, duration);
        if (conflicts.length === 0) {
          return candidate;
        }
      }
    }

    return preferredStart; // Fallback to original time
  }
  ```

### UI Design
```
┌─────────────────────────────────────────┐
│ ⚠ Conflict Detected                     │
├─────────────────────────────────────────┤
│ This box overlaps with:                 │
│                                         │
│ Team Standup                            │
│ 9:00 AM - 9:30 AM                       │
│ Work Calendar                           │
│                                         │
│ [Suggest Available Time]                │
│                                         │
│ [Cancel]  [Create Anyway]               │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] Conflict detection algorithm working
- [ ] Real-time conflict checking (debounced)
- [ ] Warning UI displays conflicts
- [ ] Suggest time functionality working
- [ ] All-day and declined events excluded
- [ ] Settings toggle functional
- [ ] Performance: Detection completes in <1s
- [ ] Unit tests for conflict algorithm
- [ ] Integration tests with sample calendars
- [ ] QA verified accurate conflict detection

---

## Story 4: Import Calendar Events as Boxes

### Story Details
**Story ID**: BB-044
**Title**: As a user, I want to import calendar events as boxes
**Priority**: P1 (High)
**Story Points**: 5
**Sprint**: Sprint 2
**Dependencies**: BB-041

### User Story
```
As a user who already has events in Google Calendar
I want to import them as BoxBee boxes
So that I can time-box my existing commitments
```

### Acceptance Criteria
- [ ] "Import from Calendar" button in home screen or settings
- [ ] Date range selector: Today, This Week, Next 7 Days, Custom
- [ ] Shows list of calendar events in selected range
- [ ] User can multi-select events to import
- [ ] Checkbox: "Skip all-day events" (default: ON)
- [ ] Checkbox: "Skip declined events" (default: ON)
- [ ] "Import X events" button
- [ ] Imported events become boxes with correct time/duration
- [ ] Box name matches event title
- [ ] Box notes include event description and location
- [ ] Success message: "Imported 8 events as boxes!"
- [ ] Duplicate prevention: Don't reimport already synced boxes

### Technical Notes
- Import flow:
  ```typescript
  async function importCalendarEvents(
    userId: string,
    timeMin: Date,
    timeMax: Date,
    options: ImportOptions
  ) {
    // Fetch events from Google Calendar
    const events = await googleCalendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    const filteredEvents = events.data.items?.filter(event => {
      // Skip all-day events if option set
      if (options.skipAllDay && !event.start?.dateTime) return false;

      // Skip declined if option set
      if (options.skipDeclined && event.attendees?.some(
        a => a.self && a.responseStatus === 'declined'
      )) return false;

      // Check if already imported
      const existingSyncLog = await prisma.calendarSyncLog.findFirst({
        where: {
          userId,
          calendarEventId: event.id
        }
      });
      if (existingSyncLog) return false;

      return true;
    });

    // Create boxes
    const boxes = await Promise.all(
      filteredEvents.map(event => {
        const startTime = new Date(event.start.dateTime);
        const endTime = new Date(event.end.dateTime);
        const duration = (endTime.getTime() - startTime.getTime()) / 60000;

        return prisma.box.create({
          data: {
            userId,
            name: event.summary,
            startTime,
            duration,
            notes: `${event.description || ''}\n\nLocation: ${event.location || 'N/A'}`,
            category: inferCategory(event.summary),
            status: 'scheduled',
            calendarEventId: event.id
          }
        });
      })
    );

    return boxes;
  }
  ```
- Category inference:
  ```typescript
  function inferCategory(eventTitle: string): string {
    const title = eventTitle.toLowerCase();
    if (title.includes('meeting') || title.includes('call')) return 'work';
    if (title.includes('gym') || title.includes('workout')) return 'health';
    if (title.includes('lunch') || title.includes('dinner')) return 'personal';
    return 'work'; // default
  }
  ```

### UI Design
```
┌─────────────────────────────────────────┐
│ Import from Google Calendar             │
├─────────────────────────────────────────┤
│ Time Range: [This Week ▼]              │
│                                         │
│ ☑ Skip all-day events                   │
│ ☑ Skip declined events                  │
│                                         │
│ Select events to import:                │
│                                         │
│ ☑ Team Standup                          │
│   Today, 9:00 AM - 9:30 AM              │
│                                         │
│ ☑ Client Meeting                        │
│   Today, 2:00 PM - 3:00 PM              │
│                                         │
│ ☐ Lunch with Sarah                      │
│   Today, 12:00 PM - 1:00 PM             │
│                                         │
│ [Import 2 Events]                       │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] Import UI implemented
- [ ] Date range selection working
- [ ] Event list fetches from calendar
- [ ] Multi-select functionality
- [ ] Filter options working (all-day, declined)
- [ ] Duplicate prevention working
- [ ] Boxes created with correct data
- [ ] Category inference reasonable
- [ ] Success/error messaging
- [ ] Unit tests for import logic
- [ ] QA verified import accuracy

---

## Story 5: Calendar View in BoxBee

### Story Details
**Story ID**: BB-045
**Title**: As a user, I want to view my calendar within BoxBee
**Priority**: P2 (Medium)
**Story Points**: 8
**Sprint**: Sprint 3
**Dependencies**: BB-042

### User Story
```
As a user who wants to see my full schedule
I want to view my calendar inside BoxBee
So that I don't have to switch between apps
```

### Acceptance Criteria
- [ ] New "Calendar" tab in navigation
- [ ] Shows week view by default (7 days, time grid)
- [ ] Toggle: Week view / Month view
- [ ] Displays: BoxBee boxes (highlighted) + Google Calendar events (muted)
- [ ] Tap event/box to see details
- [ ] Tap empty slot to create new box at that time
- [ ] Color coding: Boxes in accent color, calendar events in gray
- [ ] Current time indicator (red line)
- [ ] Scroll to current time on load
- [ ] Pull-to-refresh syncs latest data
- [ ] Today button to jump to current day

### Technical Notes
- Calendar component: Use react-native-calendars or custom implementation
- Data structure:
  ```typescript
  interface CalendarItem {
    id: string;
    type: 'box' | 'event';
    title: string;
    startTime: Date;
    endTime: Date;
    color: string;
    category?: string;
  }

  async function getCalendarItems(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<CalendarItem[]> {
    // Fetch boxes
    const boxes = await prisma.box.findMany({
      where: {
        userId,
        startTime: { gte: startDate, lte: endDate }
      }
    });

    // Fetch calendar events
    const events = await googleCalendar.events.list({
      calendarId: 'primary',
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true
    });

    // Combine and format
    return [
      ...boxes.map(box => ({
        id: box.id,
        type: 'box',
        title: box.name,
        startTime: box.startTime,
        endTime: new Date(box.startTime.getTime() + box.duration * 60000),
        color: theme.colors.primary
      })),
      ...events.data.items.map(event => ({
        id: event.id,
        type: 'event',
        title: event.summary,
        startTime: new Date(event.start.dateTime),
        endTime: new Date(event.end.dateTime),
        color: theme.colors.gray
      }))
    ];
  }
  ```

### UI Design - Week View
```
┌─────────────────────────────────────────┐
│ Calendar         [Week] [Month]  [Today]│
├─────────────────────────────────────────┤
│     Mon 4  Tue 5  Wed 6  Thu 7  Fri 8  │
├─────────────────────────────────────────┤
│ 9am  ──────────────────────────────────│
│      [Team Meeting]                     │
│ 10am ──────────────────────────────────│
│      [Focus Work Box] ───────→          │
│ 11am ──────────────────────────────────│
│ 12pm ──────────────────────────────────│
│      Client Call                        │
│ 1pm  ──────────────────────────────────│
│                                         │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] Calendar view component implemented
- [ ] Week view working with time grid
- [ ] Month view implemented
- [ ] Boxes and events displayed correctly
- [ ] Color coding consistent
- [ ] Tap interactions working (details, create)
- [ ] Current time indicator visible
- [ ] Pull-to-refresh syncing
- [ ] Today button navigation
- [ ] Performance: Smooth scrolling (60fps)
- [ ] Unit tests for data fetching
- [ ] QA tested calendar interactions

---

## Story 6: Sync Status Indicators

### Story Details
**Story ID**: BB-046
**Title**: As a user, I want sync status indicators so I know what's synced
**Priority**: P2 (Medium)
**Story Points**: 3
**Sprint**: Sprint 3
**Dependencies**: BB-042

### User Story
```
As a user who wants transparency
I want to see the sync status of each box
So that I know if it's on my calendar or not
```

### Acceptance Criteria
- [ ] Each box shows sync status icon:
  - ✅ Synced to calendar
  - ⟳ Syncing in progress
  - ⚠️ Sync failed (with retry button)
  - ○ Not synced (sync disabled or calendar not connected)
- [ ] Tap sync icon to see details: "Synced to Google Calendar at 2:34 PM"
- [ ] Failed sync shows error: "Failed: Unauthorized. Reconnect calendar?"
- [ ] Bulk sync status in settings: "Last synced: 5 minutes ago"
- [ ] "Sync all boxes" button to manually trigger full sync
- [ ] Real-time updates when sync completes

### Technical Notes
- Status component:
  ```typescript
  const SyncStatusIcon: React.FC<{ box: Box }> = ({ box }) => {
    const [syncLog, setSyncLog] = useState<SyncLog | null>(null);

    useEffect(() => {
      fetchSyncLog(box.id).then(setSyncLog);
    }, [box.id]);

    if (!syncLog) return <Icon name="circle-outline" color="gray" />;

    switch (syncLog.syncStatus) {
      case 'synced':
        return <Icon name="checkmark-circle" color="green" />;
      case 'syncing':
        return <ActivityIndicator size="small" />;
      case 'failed':
        return (
          <TouchableOpacity onPress={() => retrySync(box.id)}>
            <Icon name="warning" color="orange" />
          </TouchableOpacity>
        );
      default:
        return <Icon name="circle-outline" color="gray" />;
    }
  };
  ```
- Real-time updates: Use WebSocket or polling
  ```typescript
  // Poll for sync status updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshSyncStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  ```

### Definition of Done
- [ ] Sync status icons implemented
- [ ] All states displayed correctly
- [ ] Tap for details working
- [ ] Retry functionality for failed syncs
- [ ] Real-time status updates
- [ ] Bulk sync button functional
- [ ] Unit tests for status logic
- [ ] QA verified status accuracy

---

## Story 7: Bi-directional Sync

### Story Details
**Story ID**: BB-047
**Title**: As a user, I want changes in one system to reflect in the other
**Priority**: P1 (High)
**Story Points**: 8
**Sprint**: Sprint 3
**Dependencies**: BB-042, BB-044

### User Story
```
As a user who edits in both systems
I want changes to sync both ways
So that my data stays consistent
```

### Acceptance Criteria
- [ ] Edit box in BoxBee → Calendar event updates
- [ ] Edit event in Google Calendar → Box updates in BoxBee
- [ ] Delete box in BoxBee → Calendar event deleted
- [ ] Delete event in Google Calendar → Box marked as cancelled/deleted
- [ ] Time changes sync bidirectionally
- [ ] Title/description changes sync
- [ ] Conflict resolution: Last edit wins (with timestamp)
- [ ] Sync runs every 5 minutes for calendar → BoxBee updates
- [ ] Manual "Sync now" button
- [ ] Notification when external changes detected: "3 boxes updated from calendar"

### Technical Notes
- Webhook approach (preferred):
  ```typescript
  // Set up Google Calendar push notifications
  await googleCalendar.events.watch({
    calendarId: 'primary',
    requestBody: {
      id: uuid(),
      type: 'web_hook',
      address: 'https://api.boxbee.app/webhooks/google-calendar'
    }
  });

  // Webhook handler
  app.post('/webhooks/google-calendar', async (req, res) => {
    const { channelId, resourceId } = req.headers;

    // Fetch latest events
    const events = await googleCalendar.events.list({
      calendarId: 'primary',
      updatedMin: lastSyncTime.toISOString()
    });

    // Sync changes to BoxBee
    await syncCalendarChangesToBoxes(events.data.items);

    res.status(200).send('OK');
  });
  ```
- Polling approach (fallback):
  ```typescript
  // Run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    const users = await prisma.user.findMany({
      where: { syncBoxesToCalendar: true }
    });

    for (const user of users) {
      await syncCalendarToBoxes(user.id);
    }
  });

  async function syncCalendarToBoxes(userId: string) {
    const lastSync = await getLastSyncTime(userId);

    const events = await googleCalendar.events.list({
      calendarId: 'primary',
      updatedMin: lastSync.toISOString()
    });

    for (const event of events.data.items) {
      const existingBox = await prisma.box.findFirst({
        where: { calendarEventId: event.id }
      });

      if (existingBox) {
        // Update existing box
        await prisma.box.update({
          where: { id: existingBox.id },
          data: {
            name: event.summary,
            startTime: new Date(event.start.dateTime),
            duration: calculateDuration(event.start, event.end)
          }
        });
      }
    }
  }
  ```

### Definition of Done
- [ ] BoxBee → Calendar sync working
- [ ] Calendar → BoxBee sync working
- [ ] All CRUD operations sync correctly
- [ ] Webhook or polling implemented
- [ ] Conflict resolution logic working
- [ ] Manual sync button functional
- [ ] Notifications for external changes
- [ ] Performance: Sync completes in <10s
- [ ] Unit tests for sync logic
- [ ] Integration tests both directions
- [ ] QA verified data consistency

---

## Additional Stories (Future Backlog)

### Backlog Stories
**BB-048**: Multi-calendar support (work + personal calendars)
**BB-049**: Outlook Calendar integration
**BB-050**: Apple Calendar integration
**BB-051**: Calendar sharing (share BoxBee calendar with others)
**BB-052**: Recurring events sync

---

## Story Dependencies Graph

```
BB-041 (Connect Calendar)
   ├──→ BB-042 (Auto-sync boxes) ──→ BB-046 (Sync status)
   │                           └──→ BB-045 (Calendar view)
   │                           └──→ BB-047 (Bi-directional)
   ├──→ BB-043 (Conflict detection)
   └──→ BB-044 (Import events)
```

---

## Sprint Planning

### Sprint 1 (2 weeks)
- BB-041: Connect Google Calendar
- BB-042: Auto-sync boxes to calendar
- **Goal**: Boxes appear on Google Calendar

### Sprint 2 (2 weeks)
- BB-043: Conflict detection
- BB-044: Import calendar events
- **Goal**: Full integration with conflict prevention

### Sprint 3 (2 weeks)
- BB-045: Calendar view
- BB-046: Sync status indicators
- BB-047: Bi-directional sync
- **Goal**: Complete calendar feature with real-time sync

---

## Testing Plan

### Unit Tests
- OAuth flow: Token exchange, refresh
- Conflict detection: Overlap algorithm, edge cases
- Sync logic: Create, update, delete operations
- Bi-directional sync: Data consistency

### Integration Tests
- End-to-end: Create box → Event appears in Google Calendar
- Import: Calendar events → Boxes created correctly
- Conflict: Overlapping time → Warning shown
- Bi-directional: Edit in Calendar → Box updates

### Performance Tests
- Sync latency: <5 seconds for single box
- Bulk operations: 50 boxes sync in <30 seconds
- Conflict detection: <1 second response time

### User Acceptance Testing
- 15 users test calendar integration for 3 weeks
- Metrics: Sync accuracy (99%+ target), conflict prevention rate
- Success criteria: 85%+ find calendar integration valuable
- Collect feedback on sync reliability and conflict UX

---

**Document End**

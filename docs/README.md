# BoxBee V2 Documentation Index

## Overview

This directory contains comprehensive product and technical documentation for BoxBee V2 - a major enhancement release transforming BoxBee into an AI-powered productivity platform.

---

## Document Structure

### 📋 Product Requirements
**[prd-v2-enhancements.md](./prd-v2-enhancements.md)**
- **Type**: Product Requirements Document
- **Status**: Draft
- **Purpose**: Comprehensive PRD for all 6 V2 features
- **Contains**:
  - Executive summary with business objectives
  - Problem statements and user impact
  - Detailed solution overview for each feature
  - Technical architecture and API specifications
  - Implementation plan (4 phases, 9 weeks)
  - Dependencies, risks, and success criteria
  - Competitive analysis

### 🗺️ Roadmap & Epic Breakdown
**[epics-v2-roadmap.md](./epics-v2-roadmap.md)**
- **Type**: Epic Breakdown & Implementation Roadmap
- **Purpose**: Break down PRD into manageable epics with timeline
- **Contains**:
  - 6 epic descriptions with business value
  - Story counts and effort estimates (32 stories, 136 points)
  - 4-phase implementation roadmap (11 weeks)
  - Epic prioritization (Must-Have, Should-Have, Nice-to-Have)
  - Next steps for kickoff

---

## User Stories by Epic

### 🎵 EPIC-001: Spotify Integration
**[stories-epic-001-spotify.md](./stories-epic-001-spotify.md)**
- **Priority**: High
- **Stories**: 5 (21 story points)
- **Estimated Duration**: 3 weeks
- **Sprint Planning**: 2 sprints

**Stories:**
1. **BB-011**: Connect Spotify Account (5 pts) - OAuth integration
2. **BB-012**: Auto-Play Focus Music (8 pts) - Music starts with box
3. **BB-013**: Focus Playlist Selection (5 pts) - User chooses playlist
4. **BB-014**: Auto-Pause on Complete (3 pts) - Music pauses when done
5. **BB-015**: In-App Playback Controls (5 pts) - Control music in BoxBee

**Key Technical Components:**
- Spotify OAuth 2.0 with PKCE
- Spotify Web Playback SDK integration
- Native SDK for iOS/Android
- Premium account requirement

---

### 🤖 EPIC-002: OpenAI Integration & AI Insights
**[stories-epic-002-openai.md](./stories-epic-002-openai.md)**
- **Priority**: High
- **Stories**: 6 (34 story points)
- **Estimated Duration**: 4 weeks
- **Sprint Planning**: 3 sprints

**Stories:**
1. **BB-021**: Weekly Productivity Summaries (8 pts) - Email summaries every Monday
2. **BB-022**: Peak Productivity Hours (5 pts) - Identify best work times
3. **BB-023**: Intelligent Time Estimation (8 pts) - AI learns task durations
4. **BB-024**: Contextual Coaching (5 pts) - Helpful suggestions when struggling
5. **BB-025**: User-Provided API Key (3 pts) - Power users bring own key
6. **BB-026**: Insights History Page (5 pts) - View all past insights

**Key Technical Components:**
- OpenAI GPT-4 Turbo integration
- Prompt engineering for insights
- Pattern recognition algorithms
- Email template system
- Rate limiting and cost controls

---

### ⚡ EPIC-003: BoxIt - AI-Powered Bulk Time-Boxing
**[stories-epic-003-boxit.md](./stories-epic-003-boxit.md)**
- **Priority**: Critical (highest priority)
- **Stories**: 5 (21 story points)
- **Estimated Duration**: 3 weeks
- **Sprint Planning**: 2 sprints
- **Dependencies**: EPIC-002 (OpenAI service)

**Stories:**
1. **BB-031**: Paste Task List & Create Boxes (8 pts) - Natural language input
2. **BB-032**: AI Estimates Realistic Time (8 pts) - Smart duration suggestions
3. **BB-033**: Preview & Edit Schedule (5 pts) - Review before confirming
4. **BB-034**: Optimal Task Scheduling (5 pts) - Schedule at peak productivity times
5. **BB-035**: Batch Creation with One Tap (5 pts) - Create all boxes instantly

**Key Technical Components:**
- GPT-4 task parsing endpoint
- Time estimation algorithm
- Scheduling optimization engine
- Batch box creation API
- Preview UI component

**Business Impact:**
- Reduces box creation time from 10 minutes to 30 seconds
- Eliminates #1 user friction point
- Expected to increase box creation by 40%

---

### 📅 EPIC-004: Google Calendar Integration
**[stories-epic-004-calendar.md](./stories-epic-004-calendar.md)**
- **Priority**: High
- **Stories**: 7 (34 story points)
- **Estimated Duration**: 4 weeks
- **Sprint Planning**: 3 sprints

**Stories:**
1. **BB-041**: Connect Google Calendar (5 pts) - OAuth integration
2. **BB-042**: Auto-Sync Boxes to Calendar (8 pts) - Boxes appear on calendar
3. **BB-043**: Conflict Detection (8 pts) - Warn about overlapping events
4. **BB-044**: Import Calendar Events (5 pts) - Turn events into boxes
5. **BB-045**: Calendar View in BoxBee (8 pts) - Week/month view
6. **BB-046**: Sync Status Indicators (3 pts) - Show sync state
7. **BB-047**: Bi-directional Sync (8 pts) - Changes sync both ways

**Key Technical Components:**
- Google Calendar OAuth 2.0
- Bidirectional sync engine
- Conflict detection algorithm
- Webhook or polling for real-time updates
- Calendar view component

---

### 🎨 EPIC-005: UI/Visual Polish Pass
**[stories-epic-005-ui-polish.md](./stories-epic-005-ui-polish.md)**
- **Priority**: Medium
- **Stories**: 4 (13 story points)
- **Estimated Duration**: 2 weeks
- **Sprint Planning**: 2 sprints
- **Note**: Should be done after other epics are complete

**Stories:**
1. **BB-051**: Consistent Icon System (3 pts) - SF Symbols/Material Icons
2. **BB-052**: Improved Visual Hierarchy (5 pts) - Typography, spacing, color
3. **BB-053**: Smooth Transitions (3 pts) - Animations and micro-interactions
4. **BB-054**: Dark Mode Optimization (2 pts) - OLED-optimized dark theme

**Key Technical Components:**
- Icon library integration (react-native-vector-icons)
- Typography scale and design system
- Animation library (react-native-reanimated)
- Theme provider with auto-switching
- 8px spacing grid system

---

### 📦 EPIC-006: Completed Boxes Section
**[stories-epic-006-completed.md](./stories-epic-006-completed.md)**
- **Priority**: Medium
- **Stories**: 5 (13 story points)
- **Estimated Duration**: 2 weeks
- **Sprint Planning**: 2 sprints

**Stories:**
1. **BB-061**: Auto-Archive Completed Boxes (3 pts) - Remove from main view after 24hr
2. **BB-062**: Completed Section View (5 pts) - Dedicated archive view
3. **BB-063**: Search and Filter (5 pts) - Find past boxes
4. **BB-064**: Stats and Streaks (5 pts) - Motivational completion metrics
5. **BB-065**: Restore Completed Box (3 pts) - Bring box back to active

**Key Technical Components:**
- Cron job for auto-archiving
- Full-text search with PostgreSQL
- Stats calculation algorithms
- Streak tracking logic
- Filter and pagination system

---

## Implementation Summary

### Story Count by Epic
| Epic ID | Epic Name | Stories | Points | Duration |
|---------|-----------|---------|--------|----------|
| EPIC-001 | Spotify Integration | 5 | 21 | 3 weeks |
| EPIC-002 | OpenAI Integration | 6 | 34 | 4 weeks |
| EPIC-003 | BoxIt | 5 | 21 | 3 weeks |
| EPIC-004 | Google Calendar | 7 | 34 | 4 weeks |
| EPIC-005 | UI Polish | 4 | 13 | 2 weeks |
| EPIC-006 | Completed Section | 5 | 13 | 2 weeks |
| **Total** | | **32** | **136** | **11 weeks** |

### Implementation Phases

#### Phase 1: Foundation (Weeks 1-4)
**Focus**: Core AI infrastructure and critical features
- EPIC-002: OpenAI service setup + basic insights
- EPIC-003: BoxIt MVP (depends on EPIC-002)
- EPIC-006: Completed section

**Deliverables**:
- BoxIt feature live
- Completed boxes auto-archive
- Weekly insights email

#### Phase 2: Integrations (Weeks 5-8)
**Focus**: External service connections
- EPIC-001: Spotify OAuth + playback
- EPIC-004: Google Calendar sync

**Deliverables**:
- Spotify focus music
- Calendar bidirectional sync
- Conflict detection

#### Phase 3: Intelligence & Polish (Weeks 9-10)
**Focus**: AI maturity and UX refinement
- EPIC-002: Advanced insights (ongoing)
- EPIC-005: UI polish pass

**Deliverables**:
- Pattern recognition
- Coaching suggestions
- Consistent icons and animations

#### Phase 4: Testing & Launch (Week 11)
**Focus**: Quality assurance and rollout
- Beta testing with 50 users
- Bug fixes and optimization
- Phased rollout (10% → 50% → 100%)

---

## Technical Architecture

### New Backend Services
```
/backend/src/services/
  - spotify.service.ts      // Spotify OAuth & playback
  - openai.service.ts       // GPT-4 integration
  - calendar.service.ts     // Google Calendar API
  - boxIt.service.ts        // AI parsing & scheduling
```

### Database Schema Changes
```sql
-- User integrations
ALTER TABLE users ADD COLUMN spotify_access_token TEXT;
ALTER TABLE users ADD COLUMN google_calendar_token TEXT;
ALTER TABLE users ADD COLUMN openai_api_key TEXT;
ALTER TABLE users ADD COLUMN preferred_focus_playlist TEXT;

-- Box archiving
ALTER TABLE boxes ADD COLUMN archived BOOLEAN DEFAULT FALSE;
ALTER TABLE boxes ADD COLUMN archived_at TIMESTAMP;

-- New tables
CREATE TABLE insights (...);
CREATE TABLE calendar_sync_log (...);
```

### New API Endpoints
```
POST /api/integrations/spotify/auth
POST /api/integrations/spotify/play
GET  /api/integrations/spotify/playlists

POST /api/integrations/calendar/auth
POST /api/integrations/calendar/sync
GET  /api/integrations/calendar/conflicts

POST /api/ai/boxit
GET  /api/ai/insights
POST /api/ai/insights/:id/acknowledge

GET  /api/boxes/completed
POST /api/boxes/:id/archive
POST /api/boxes/batch
```

---

## Success Metrics

### Feature Adoption (30 days post-launch)
- ✅ 60% of active users try BoxIt
- ✅ 30% create boxes via BoxIt weekly
- ✅ 40% use Spotify integration in focus sessions
- ✅ 50% enable Google Calendar sync
- ✅ 70% view completed section

### Engagement & Retention
- ✅ 40% increase in boxes created per user
- ✅ 25% improvement in Day 7 retention
- ✅ 30% increase in completed boxes (vs skipped)
- ✅ NPS improvement to 45+

### Business Metrics
- ✅ Reduce time-to-first-box by 80% (BoxIt)
- ✅ Increase session completion rate by 20% (Spotify)
- ✅ Reduce calendar conflicts by 50% (Calendar sync)

---

## Dependencies & Risks

### External Dependencies
- **Spotify API**: Requires app approval (2-3 days)
- **Google Calendar API**: OAuth verification (1-2 weeks)
- **OpenAI API**: Usage costs (~$0.002 per BoxIt request)

### Technical Risks
| Risk | Mitigation |
|------|------------|
| OpenAI costs exceed budget | User API keys, rate limiting, caching |
| Spotify API rate limits | Caching, graceful degradation |
| Calendar sync conflicts | Robust conflict resolution UI |
| iOS background restrictions | Use supported background modes |
| Battery drain (music) | Optimize background tasks, user education |

---

## Next Steps

1. ✅ **Review & Approve** - Product owner reviews all documentation
2. ⏳ **Refine Estimates** - Engineering team reviews story points
3. ⏳ **Sprint Planning** - Create first sprint backlog (Phase 1, Week 1-2)
4. ⏳ **Set Up Tracking** - Configure Linear/Jira/GitHub Projects
5. ⏳ **Kick Off Development** - Begin with EPIC-002 (OpenAI service)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-30 | Product Team | Initial V2 documentation created |

---

## Related Documentation

### Internal Links
- [PRD: V2 Enhancements](./prd-v2-enhancements.md)
- [Epics & Roadmap](./epics-v2-roadmap.md)
- [Story: Spotify Integration](./stories-epic-001-spotify.md)
- [Story: OpenAI Integration](./stories-epic-002-openai.md)
- [Story: BoxIt Feature](./stories-epic-003-boxit.md)
- [Story: Google Calendar](./stories-epic-004-calendar.md)
- [Story: UI Polish](./stories-epic-005-ui-polish.md)
- [Story: Completed Section](./stories-epic-006-completed.md)

### External Resources
- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Google Calendar API](https://developers.google.com/calendar/api)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Expo Documentation](https://docs.expo.dev/)

---

**Last Updated**: November 30, 2025
**Status**: Ready for Engineering Review
**Contact**: Product Team

---

*This documentation represents the complete V2 enhancement plan for BoxBee. All stories include acceptance criteria, technical notes, UI designs, and definition of done.*

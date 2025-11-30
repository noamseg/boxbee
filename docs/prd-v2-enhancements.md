# Product Requirements Document: BoxBee V2 Enhancements

## Document Control
- **Status**: Draft
- **Version**: 1.0
- **Last Updated**: 2025-11-30
- **Owner**: Product Team
- **Type**: Brownfield Enhancement

---

## Executive Summary

### Overview
BoxBee V2 introduces six major enhancements to transform BoxBee from a simple time-boxing app into an AI-powered productivity platform with rich integrations. These enhancements focus on improving focus sessions, automating time-boxing, calendar synchronization, and overall user experience.

### Strategic Context
BoxBee has established product-market fit with users who value structured time management. V2 builds on this foundation by:
- Reducing friction in creating time boxes (AI-powered BoxIt)
- Enhancing focus quality (Spotify integration)
- Improving visibility and planning (Google Calendar sync)
- Providing intelligent insights (OpenAI integration)
- Polishing the user experience (UI improvements + completed section)

### Business Objectives
1. **Increase daily active usage** by 40% through improved focus experience and reduced setup friction
2. **Improve user retention** by 25% through calendar integration and AI insights
3. **Enhance perceived value** to support future premium tier introduction

### Success Metrics
- **Engagement**: 40% increase in boxes created per active user
- **Retention**: 25% improvement in Day 7 and Day 30 retention
- **Feature Adoption**: 60% of active users try BoxIt within first week
- **Quality**: 30% increase in completed boxes (vs. skipped)
- **NPS**: Improve from baseline to 45+

---

## Problem Statement

### Current State Challenges

**1. Focus Session Quality**
- Users struggle to maintain focus during boxes
- No built-in tools to enhance concentration
- External context switching to find focus music

**2. Time-Boxing Friction**
- Creating multiple boxes is time-consuming
- Users delay planning, reducing effectiveness
- Manual entry discourages comprehensive planning

**3. Calendar Disconnect**
- Boxes exist in isolation from user's calendar
- Double-booking conflicts
- Lack of integration with existing workflows

**4. Limited Intelligence**
- No insights into productivity patterns
- Missed opportunities for AI-powered suggestions
- Generic experience for all users

**5. UI Polish Needed**
- Icon inconsistencies reduce professional feel
- Visual hierarchy could be improved
- Missing key organizational features (completed section)

### User Impact
- **Power users**: Spend 5-10 minutes daily managing boxes manually
- **New users**: 40% churn within first week due to setup friction
- **All users**: Miss 30% of planned boxes due to calendar conflicts

---

## Solution Overview

### Feature Set

#### 1. Spotify Integration for Focus Mode
**What**: Native Spotify playback within BoxBee for curated focus music during active boxes

**Why**: Research shows music improves focus quality by 20-30% for knowledge work. Integration eliminates context switching.

**Key Capabilities**:
- Auto-play focus playlists when box starts
- Pause/resume music with box timer
- User-selectable focus playlists (saved preferences)
- Background playback (iOS/Android native)

#### 2. OpenAI Integration & Insights
**What**: GPT-4 powered insights engine analyzing user productivity patterns

**Why**: Personalized insights drive 2x higher engagement than generic tips

**Key Capabilities**:
- Weekly productivity summaries
- Time estimation learning (improve accuracy over time)
- Pattern recognition (peak productivity hours)
- Contextual coaching suggestions
- Task categorization and optimization

#### 3. BoxIt - AI-Powered Bulk Time-Boxing
**What**: One-click feature that converts raw task list text into time-boxed schedule

**Why**: Eliminates #1 friction point - reduces planning from 10 minutes to 30 seconds

**Key Capabilities**:
- Natural language parsing ("write report, call client, review designs")
- Intelligent time estimation per task
- Optimal scheduling based on user patterns
- Batch creation with one tap
- Edit-before-confirm workflow

#### 4. Google Calendar Integration
**What**: Bi-directional sync between BoxBee boxes and Google Calendar

**Why**: 80% of professionals use Google Calendar. Integration prevents conflicts and increases visibility.

**Key Capabilities**:
- Export boxes to Google Calendar as events
- Import calendar events as boxes
- Real-time conflict detection
- Calendar view in BoxBee
- Sync status indicators

#### 5. UI/Visual Polish Pass
**What**: Comprehensive design system update for icons, spacing, and visual consistency

**Why**: Professional polish increases perceived value and reduces cognitive load

**Key Improvements**:
- Consistent icon library (SF Symbols/Material Icons)
- Improved spacing and visual hierarchy
- Color system refinement
- Micro-interactions and transitions
- Dark mode optimization

#### 6. Completed Boxes Section
**What**: Dedicated archive view for completed boxes, separate from active list

**Why**: Keeps main view focused while preserving history for insights

**Key Capabilities**:
- Auto-archive completed boxes after 24 hours
- Filterable/searchable archive
- Completion statistics and streaks
- Quick restore to active
- Bulk deletion options

---

## User Experience

### User Flows

#### BoxIt Flow
1. User has messy task list (notes app, email, memory)
2. Opens BoxBee → Taps "BoxIt" button
3. Pastes or types task list in natural language
4. AI parses and presents schedule preview
5. User reviews, adjusts if needed
6. Taps "Create All" → Boxes appear in timeline
7. **Time saved**: 9 minutes → 30 seconds

#### Focus Music Flow
1. User starts a box → Timer begins
2. BoxBee prompts: "Play focus music?"
3. User selects saved playlist or chooses new
4. Spotify starts in background
5. Music pauses when box completes
6. **Context switches eliminated**: 2 → 0

#### Calendar Sync Flow
1. User creates box in BoxBee
2. Auto-sync to Google Calendar (or manual)
3. BoxBee detects calendar conflict → Suggests new time
4. User accepts → Both systems update
5. **Conflicts prevented**: Real-time awareness

---

## Technical Specification

### Architecture Changes

#### New Services
```
/backend/src/services/
  - spotify.service.ts (OAuth, playback control)
  - openai.service.ts (GPT-4 API, prompts)
  - calendar.service.ts (Google Calendar API)
  - boxIt.service.ts (AI parsing, scheduling)
```

#### Database Schema Updates
```sql
-- User table additions
ALTER TABLE users ADD COLUMN spotify_token TEXT;
ALTER TABLE users ADD COLUMN spotify_refresh_token TEXT;
ALTER TABLE users ADD COLUMN google_calendar_token TEXT;
ALTER TABLE users ADD COLUMN openai_api_key TEXT; -- Optional user-provided key
ALTER TABLE users ADD COLUMN preferred_focus_playlist TEXT;

-- New tables
CREATE TABLE insights (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50), -- 'weekly_summary', 'pattern', 'suggestion'
  content JSONB,
  generated_at TIMESTAMP,
  acknowledged BOOLEAN DEFAULT FALSE
);

CREATE TABLE calendar_sync_log (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  box_id UUID REFERENCES boxes(id),
  calendar_event_id TEXT,
  sync_status VARCHAR(20),
  last_synced TIMESTAMP
);
```

#### API Endpoints
```
POST /api/integrations/spotify/auth
POST /api/integrations/spotify/play
GET  /api/integrations/spotify/playlists

POST /api/integrations/calendar/auth
POST /api/integrations/calendar/sync
GET  /api/integrations/calendar/conflicts

POST /api/ai/boxit (input: raw text → output: parsed boxes)
GET  /api/ai/insights
POST /api/ai/insights/:id/acknowledge

GET  /api/boxes/completed
POST /api/boxes/:id/archive
DELETE /api/boxes/completed (bulk)
```

### Integration Requirements

#### Spotify Web API
- OAuth 2.0 flow
- Required scopes: `streaming`, `user-read-playback-state`, `user-modify-playback-state`, `playlist-read-private`
- SDK: spotify-web-api-node
- Fallback: Deep link to Spotify app if web playback unavailable

#### Google Calendar API
- OAuth 2.0 flow
- Required scopes: `calendar.events`
- SDK: googleapis npm package
- Rate limits: 1M requests/day (more than sufficient)

#### OpenAI API
- GPT-4 Turbo (cost-effective for prompts)
- System prompt engineering for consistency
- User API key option for power users
- Rate limiting: 50 requests/day per user
- Fallback: Cache previous insights if quota exceeded

### Mobile Implementation (React Native/Expo)

#### New Components
```typescript
// Spotify
<SpotifyPlayer />
<FocusPlaylistSelector />

// BoxIt
<BoxItInput /> // Multi-line text input
<BoxItPreview /> // Parsed boxes preview
<BoxItConfirmation />

// Calendar
<CalendarSyncToggle />
<ConflictWarning />
<CalendarView /> // Month/week view

// Completed
<CompletedBoxesList />
<CompletedBoxCard />
```

#### New Hooks
```typescript
useSpotifyAuth()
useSpotifyPlayback()
useGoogleCalendar()
useBoxIt()
useInsights()
```

---

## Design Specifications

### Visual Design Updates

#### Icon System
- **Current**: Mix of custom SVGs and inconsistent icons
- **New**: Unified SF Symbols (iOS) / Material Icons (Android)
- **Key Icons to Update**:
  - Box states: scheduled, active, paused, completed, cancelled
  - Categories: work, personal, health, etc.
  - Actions: create, edit, delete, archive
  - Integrations: Spotify, Calendar, AI

#### Color Palette Refinement
```
Primary (Honey): #F7B32B
Secondary (Bee Black): #2D2D2D
Success (Green): #4CAF50
Warning (Amber): #FF9800
Error (Red): #F44336
Background: #FFFFFF / #121212 (dark)
Surface: #F5F5F5 / #1E1E1E (dark)
```

#### Spacing System
- Base unit: 8px
- Component spacing: 8px, 16px, 24px, 32px
- Layout margins: 16px mobile, 24px tablet

### Interaction Design

#### BoxIt Interaction
- **Input State**: Large text area, placeholder with example
- **Processing State**: Loading spinner + "AI analyzing tasks..."
- **Preview State**: List of boxes with editable time/duration
- **Success State**: Confirmation toast + scroll to first box

#### Music Playback
- **Playing**: Mini player bar at bottom
- **Controls**: Play/pause, skip, volume
- **Playlist Button**: Bottom sheet selector

---

## Implementation Plan

### Phase 1: Foundation (Weeks 1-2)
- Set up OpenAI service
- Implement BoxIt parsing logic
- Backend API for BoxIt
- Basic UI for BoxIt input

### Phase 2: Integrations (Weeks 3-4)
- Spotify OAuth + playback
- Google Calendar OAuth + basic sync
- Calendar conflict detection

### Phase 3: Intelligence (Weeks 5-6)
- AI insights generation
- Weekly summary emails
- Pattern recognition algorithms

### Phase 4: Polish (Weeks 7-8)
- Icon system update
- Visual refinements
- Completed section
- Dark mode optimization
- Performance optimization

### Phase 5: Testing & Launch (Week 9)
- Beta testing with 50 users
- Bug fixes and refinements
- Phased rollout (10% → 50% → 100%)

---

## Dependencies & Risks

### External Dependencies
- **Spotify API**: Requires approved app (2-3 days review)
- **Google Calendar API**: OAuth verification (1-2 weeks)
- **OpenAI API**: Cost per request (~$0.002 per BoxIt)

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Spotify API rate limits | Medium | Medium | Implement caching, graceful degradation |
| OpenAI costs exceed budget | High | High | User API key option, rate limiting |
| Calendar sync conflicts | Medium | High | Robust conflict resolution UI |
| Battery drain (music playback) | Medium | Medium | Optimize background tasks, user education |
| iOS background restrictions | High | High | Use supported background modes |

### Business Risks
- **Cost**: OpenAI usage at scale could be expensive
  - *Mitigation*: Freemium model, user API keys, caching
- **Privacy**: Calendar/Spotify data sensitivity
  - *Mitigation*: Clear privacy policy, opt-in integrations

---

## Open Questions

1. **BoxIt Limits**: Should we limit BoxIt to X tasks per request to control costs?
   - *Recommendation*: 20 tasks/request for free tier

2. **Spotify Free vs Premium**: Support both or Premium only?
   - *Recommendation*: Premium only initially (simpler, better UX)

3. **Calendar Conflicts**: Auto-resolve or always ask user?
   - *Recommendation*: Ask user but suggest smart defaults

4. **OpenAI API Keys**: Require user key or build into pricing?
   - *Recommendation*: Built-in for free tier (limited), power users can add own key

5. **Completed Auto-Archive**: 24 hours or configurable?
   - *Recommendation*: 24 hours default, add setting later

---

## Success Criteria

### MVP Launch Criteria
- [ ] BoxIt creates ≥5 boxes from natural language with 90% accuracy
- [ ] Spotify plays music during active box (iOS + Android)
- [ ] Google Calendar bidirectional sync works without data loss
- [ ] Weekly AI insights email sent successfully
- [ ] Completed section archives boxes and remains searchable
- [ ] All icons updated to new system
- [ ] App passes performance benchmarks (60fps, <3s load time)

### Post-Launch Success (30 days)
- [ ] 60%+ of active users try BoxIt
- [ ] 30%+ create boxes via BoxIt weekly
- [ ] Spotify integration used in 40%+ of focus sessions
- [ ] Calendar sync enabled by 50%+ of users
- [ ] NPS improves by 10+ points
- [ ] Day 7 retention improves by 15%+

---

## Appendix

### Competitive Analysis

#### Time-Boxing Apps
- **Sunsama**: Has calendar sync + task import (no AI bulk creation)
- **Reclaim.ai**: AI scheduling but no focus music integration
- **Motion**: AI calendar but complex, enterprise-focused

**BoxBee Differentiation**: Only app combining AI bulk creation + focus music + lightweight UX

### Research & Validation
- User interviews (n=12): 100% wanted "paste tasks and auto-schedule"
- Survey (n=150): 78% use Spotify daily, 82% use Google Calendar
- Usage data: Users with 5+ boxes have 3x better retention

### Technical Research
- Spotify Web Playback SDK supports iOS/Android via WebView
- OpenAI GPT-4 Turbo: $0.01/1K input tokens, $0.03/1K output tokens
- Google Calendar API: Free tier sufficient for 10K users

---

**Document End**

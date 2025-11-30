# BoxBee V2 - Epics Breakdown

## Epic Overview

This document breaks down the BoxBee V2 PRD into 6 major epics for implementation.

---

## Epic 1: Spotify Integration for Focus Mode 🎵

**Epic ID**: EPIC-001
**Priority**: High
**Business Value**: Increase focus session quality and completion rate
**Estimated Effort**: 3 weeks
**Dependencies**: None

### Description
Integrate Spotify playback within BoxBee to provide seamless focus music during active time boxes. Users can select focus playlists that auto-play when a box starts and pause when it completes.

### Success Criteria
- Users can authenticate with Spotify
- Music plays automatically when box starts
- Music pauses when box completes
- Users can select and save preferred focus playlists
- Background playback works on iOS and Android

### Technical Components
- Spotify OAuth integration (backend)
- Spotify Web SDK integration (mobile)
- Playlist selection UI
- Playback state management
- Background audio permissions

### User Stories (5)
1. As a user, I want to connect my Spotify account so I can play focus music
2. As a user, I want my focus music to start automatically when I begin a box
3. As a user, I want to choose my preferred focus playlist
4. As a user, I want music to pause when my box timer completes
5. As a user, I want to control music playback (play/pause/skip) within BoxBee

---

## Epic 2: OpenAI Integration & AI Insights 🤖

**Epic ID**: EPIC-002
**Priority**: High
**Business Value**: Provide personalized intelligence to improve productivity
**Estimated Effort**: 4 weeks
**Dependencies**: None

### Description
Integrate OpenAI's GPT-4 to power intelligent insights, weekly summaries, pattern recognition, and personalized coaching. This establishes the AI foundation for future features.

### Success Criteria
- Weekly productivity summaries generated and emailed
- AI identifies peak productivity hours
- Time estimation accuracy improves over time
- Contextual coaching suggestions appear in-app
- User API key option available for power users

### Technical Components
- OpenAI API service integration
- Prompt engineering for insights
- Insights data model and storage
- Email template for weekly summaries
- Pattern recognition algorithms
- Rate limiting and cost controls

### User Stories (6)
1. As a user, I want weekly summaries of my productivity so I can track progress
2. As a user, I want AI to learn when I'm most productive so it can suggest optimal box times
3. As a user, I want AI to improve time estimates based on my history
4. As a user, I want coaching tips when I'm struggling with focus
5. As a user, I want to add my own OpenAI API key to unlock unlimited insights
6. As a user, I want to view all my past insights in one place

---

## Epic 3: BoxIt - AI-Powered Bulk Time-Boxing ⚡

**Epic ID**: EPIC-003
**Priority**: Critical
**Business Value**: Eliminate #1 friction point in creating time boxes
**Estimated Effort**: 3 weeks
**Dependencies**: EPIC-002 (OpenAI service)

### Description
"BoxIt" is a one-click feature that converts raw task list text into a fully time-boxed schedule. Users paste or type tasks in natural language, and AI intelligently parses, estimates time, and schedules each box.

### Success Criteria
- Parse 5-20 tasks from natural language with 90%+ accuracy
- Estimate appropriate time per task
- Generate schedule considering user's typical patterns
- Allow preview and edit before confirmation
- Create all boxes with one tap
- Handle edge cases gracefully (invalid input, too many tasks)

### Technical Components
- Natural language parsing (GPT-4)
- Task extraction and categorization
- Intelligent time estimation algorithm
- Scheduling optimization engine
- Preview UI component
- Bulk box creation API

### User Stories (5)
1. As a user, I want to paste my to-do list and have AI create boxes for each task
2. As a user, I want AI to estimate realistic time for each task
3. As a user, I want to review and edit the suggested schedule before confirming
4. As a user, I want tasks scheduled at optimal times based on my patterns
5. As a user, I want to save time by creating 10 boxes in 30 seconds instead of 10 minutes

---

## Epic 4: Google Calendar Integration 📅

**Epic ID**: EPIC-004
**Priority**: High
**Business Value**: Prevent conflicts and integrate with existing workflows
**Estimated Effort**: 4 weeks
**Dependencies**: None

### Description
Bi-directional sync between BoxBee boxes and Google Calendar. Users can export boxes to their calendar, import calendar events as boxes, and get real-time conflict warnings.

### Success Criteria
- Boxes sync to Google Calendar as events
- Calendar events can be imported as boxes
- Real-time conflict detection and warnings
- Sync status visible for each box
- Calendar view available in-app
- Handles edge cases (deleted events, modified times)

### Technical Components
- Google Calendar OAuth integration
- Bidirectional sync engine
- Conflict detection algorithm
- Sync status tracking
- Calendar view component (month/week)
- Webhook/polling for real-time updates

### User Stories (7)
1. As a user, I want to connect my Google Calendar so my boxes appear on my calendar
2. As a user, I want boxes to automatically sync to my calendar
3. As a user, I want to be warned when a box conflicts with a calendar event
4. As a user, I want to import calendar events as boxes
5. As a user, I want to view my calendar within BoxBee
6. As a user, I want sync status indicators so I know what's synced
7. As a user, I want changes in one system to reflect in the other

---

## Epic 5: UI/Visual Polish Pass 🎨

**Epic ID**: EPIC-005
**Priority**: Medium
**Business Value**: Improve perceived quality and reduce cognitive load
**Estimated Effort**: 2 weeks
**Dependencies**: None (but should be done last)

### Description
Comprehensive visual design update to create consistent, professional UI. Update all icons to a unified system, refine color usage, improve spacing/hierarchy, and optimize dark mode.

### Success Criteria
- All icons use SF Symbols (iOS) / Material Icons (Android)
- Consistent spacing using 8px grid system
- Refined color palette applied throughout
- Smooth micro-interactions and transitions
- Dark mode optimized for OLED
- Improved visual hierarchy

### Technical Components
- Icon library integration
- Theme system refinement
- Component library updates
- Animation/transition updates
- Design system documentation

### User Stories (4)
1. As a user, I want consistent icons so the app feels more professional
2. As a user, I want better visual hierarchy so I can scan my boxes quickly
3. As a user, I want smooth transitions so the app feels polished
4. As a user, I want dark mode to look great on OLED screens

---

## Epic 6: Completed Boxes Section 📦

**Epic ID**: EPIC-006
**Priority**: Medium
**Business Value**: Keeps main view focused while preserving history
**Estimated Effort**: 2 weeks
**Dependencies**: None

### Description
Dedicated archive section for completed boxes that auto-hides from the main list after 24 hours. Users can browse history, see completion stats, and restore boxes if needed.

### Success Criteria
- Boxes auto-archive 24 hours after completion
- Completed section accessible via navigation
- Search and filter within completed boxes
- Completion statistics and streaks displayed
- Quick restore to active list
- Bulk deletion option

### Technical Components
- Auto-archive cron job/scheduler
- Completed boxes view
- Search and filter logic
- Statistics calculation
- Restore functionality
- Bulk operations

### User Stories (5)
1. As a user, I want completed boxes to disappear from my main view so it stays clean
2. As a user, I want to access my completed boxes to review what I've accomplished
3. As a user, I want to search my completed boxes to find past work
4. As a user, I want to see my completion stats and streaks for motivation
5. As a user, I want to restore a completed box if I need to redo it

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
**Focus**: Core integrations and infrastructure

| Epic | Work Items | Duration |
|------|------------|----------|
| EPIC-002 | OpenAI service setup + basic insights | 2 weeks |
| EPIC-003 | BoxIt parsing + UI (depends on EPIC-002) | 2 weeks |
| EPIC-006 | Completed section (parallel with above) | 2 weeks |

**Deliverables**:
- BoxIt feature live (MVP)
- Completed section working
- Weekly insights email template

---

### Phase 2: Integrations (Weeks 5-8)
**Focus**: External service connections

| Epic | Work Items | Duration |
|------|------------|----------|
| EPIC-001 | Spotify OAuth + playback | 3 weeks |
| EPIC-004 | Google Calendar basic sync | 4 weeks (start week 5) |

**Deliverables**:
- Spotify focus music working
- Google Calendar bidirectional sync
- Conflict detection

---

### Phase 3: Intelligence & Polish (Weeks 9-10)
**Focus**: AI maturity and UX refinement

| Epic | Work Items | Duration |
|------|------------|----------|
| EPIC-002 | Advanced insights (pattern recognition, coaching) | Ongoing from Phase 1 |
| EPIC-005 | UI/Visual polish pass | 2 weeks |

**Deliverables**:
- Pattern recognition live
- Coaching suggestions
- New icon system
- Visual refinements

---

### Phase 4: Testing & Launch (Week 11)
**Focus**: Quality assurance and gradual rollout

- Beta testing with 50 users
- Bug fixes
- Performance optimization
- Phased rollout (10% → 50% → 100%)

---

## Epic Prioritization

### Must-Have (MVP)
1. **EPIC-003** - BoxIt (Critical user request, eliminates #1 pain point)
2. **EPIC-004** - Google Calendar (Integration with existing workflow)
3. **EPIC-006** - Completed Section (Keeps app usable as usage grows)

### Should-Have (V2.1)
4. **EPIC-001** - Spotify Integration (Enhances existing feature)
5. **EPIC-002** - AI Insights (Adds intelligence layer)

### Nice-to-Have (V2.2)
6. **EPIC-005** - UI Polish (Can be done iteratively)

---

## Story Count Summary

| Epic | Stories | Story Points (est.) |
|------|---------|---------------------|
| EPIC-001 | 5 | 21 |
| EPIC-002 | 6 | 34 |
| EPIC-003 | 5 | 21 |
| EPIC-004 | 7 | 34 |
| EPIC-005 | 4 | 13 |
| EPIC-006 | 5 | 13 |
| **Total** | **32** | **136** |

---

## Next Steps

1. **Review & Approve** this epic breakdown
2. **Refine Story Estimates** with engineering team
3. **Create Detailed Stories** for Phase 1 epics (EPIC-002, EPIC-003, EPIC-006)
4. **Set Up Project Tracking** in Linear/Jira/GitHub Projects
5. **Kick Off Phase 1** with sprint planning

---

**Document End**

# User Stories: EPIC-003 - BoxIt Feature

## Epic Context
**Epic**: BoxIt - AI-Powered Bulk Time-Boxing
**Epic ID**: EPIC-003
**Priority**: Critical
**Dependencies**: EPIC-002 (OpenAI Integration)

---

## Story 1: Paste Task List & Create Boxes

### Story Details
**Story ID**: BB-031
**Title**: As a user, I want to paste my to-do list and have AI create boxes for each task
**Priority**: P0 (Critical)
**Story Points**: 8
**Sprint**: Sprint 1

### User Story
```
As a busy professional
I want to paste my messy to-do list into BoxBee
So that I can quickly create multiple time boxes without manual entry
```

### Acceptance Criteria
- [ ] User can access "BoxIt" button from home screen
- [ ] Tapping BoxIt opens a text input screen
- [ ] Text input accepts multi-line text (minimum 500 characters)
- [ ] Text input has placeholder text with example format
- [ ] "Analyze" button becomes enabled when text is entered
- [ ] Tapping "Analyze" sends text to AI parsing endpoint
- [ ] Loading state shows "AI analyzing your tasks..." with spinner
- [ ] Parsing completes within 5 seconds for 20 tasks
- [ ] Error handling for invalid/empty input
- [ ] Error handling for API failures with retry option

### Technical Notes
- Endpoint: `POST /api/ai/boxit`
- Request body: `{ text: string, userId: string }`
- Response: `{ boxes: Box[], estimatedDuration: number }`
- Use GPT-4 Turbo for cost efficiency
- Implement timeout after 10 seconds
- Cache system prompt for performance

### Design Specs
- Button placement: Main screen, bottom right FAB
- Text area: Full screen modal with 80% height
- Font: Monospace for input (better for lists)
- Character counter: Show remaining characters
- Example text: "Write report\nCall client\nReview designs"

### Definition of Done
- [ ] Code complete and peer reviewed
- [ ] Unit tests written (>80% coverage)
- [ ] Integration test with mock AI response
- [ ] UI matches Figma designs
- [ ] Accessibility: Screen reader compatible
- [ ] Performance: <5s parse time
- [ ] QA tested on iOS and Android
- [ ] Product owner demo complete

---

## Story 2: AI Estimates Realistic Time

### Story Details
**Story ID**: BB-032
**Title**: As a user, I want AI to estimate realistic time for each task
**Priority**: P0 (Critical)
**Story Points**: 8
**Sprint**: Sprint 1
**Dependencies**: BB-031

### User Story
```
As a user who struggles with time estimation
I want the AI to suggest realistic durations for my tasks
So that my schedule is achievable and I don't over-commit
```

### Acceptance Criteria
- [ ] AI assigns time estimate to each parsed task (15min to 4 hours)
- [ ] Estimates based on task complexity indicators (keywords: "quick", "review" = shorter; "write", "plan" = longer)
- [ ] Learning: AI considers user's historical data if available
- [ ] Each box in preview shows estimated duration
- [ ] Estimates sum to total estimated time displayed at top
- [ ] Warning if total time > 8 hours: "This might be too much for one day"
- [ ] Default estimate for vague tasks: 30 minutes

### Technical Notes
- Prompt engineering: Include time estimation instructions
- Algorithm: Parse keywords + historical avg for similar tasks
- Database query: Fetch user's past box durations by category
- Fallback: Default estimates if no history (meeting=60min, email=15min, etc.)
- Max duration cap: 4 hours per box

### Example Input/Output
```
Input: "Write quarterly report, Quick email to team, Review 3 design mockups"

Output:
- Write quarterly report → 2 hours
- Quick email to team → 15 minutes
- Review 3 design mockups → 45 minutes
Total: 3 hours
```

### Definition of Done
- [ ] Time estimation logic implemented
- [ ] Prompt includes time estimation instructions
- [ ] Historical data query working
- [ ] Fallback estimates defined for 10+ task types
- [ ] Unit tests for estimation algorithm
- [ ] Accuracy measured: 70%+ match user's historical avg
- [ ] Edge cases handled (tasks with no clear type)
- [ ] QA verified estimates reasonable

---

## Story 3: Preview & Edit Schedule

### Story Details
**Story ID**: BB-033
**Title**: As a user, I want to review and edit the suggested schedule before confirming
**Priority**: P0 (Critical)
**Story Points**: 5
**Sprint**: Sprint 2
**Dependencies**: BB-032

### User Story
```
As a cautious user
I want to see and edit the AI-generated boxes before they're created
So that I can fix any mistakes or adjust times to my preference
```

### Acceptance Criteria
- [ ] After parsing, show preview screen with all boxes
- [ ] Each box displays: task name, duration, suggested start time
- [ ] User can tap any box to edit: name, duration, or delete
- [ ] User can drag to reorder boxes (optional, could be later)
- [ ] Edit modal has: text input (name), time picker (duration), delete button
- [ ] Changes update preview in real-time
- [ ] "Create All" button at bottom (disabled if 0 boxes)
- [ ] "Cancel" button returns to input screen
- [ ] Confirmation count: "Create 8 boxes" (updates with edits)

### Technical Notes
- State management: Use React state or Redux for preview data
- Validation: Ensure duration is 15min-4hour range
- Delete animation: Smooth removal from list
- Edit persistence: Changes saved to preview state until confirmed
- No API calls during preview (all local state)

### Design Specs
- Preview card design: Box component with edit icon
- Swipe actions: Swipe left to delete (iOS pattern)
- Edit modal: Bottom sheet on mobile, modal on tablet
- Visual feedback: Highlight edited boxes with subtle border
- Empty state: If all deleted, show "No boxes to create"

### Definition of Done
- [ ] Preview screen renders all boxes
- [ ] Edit functionality working (name, duration)
- [ ] Delete functionality working with animation
- [ ] Validation prevents invalid durations
- [ ] UI matches design system
- [ ] Smooth animations (60fps)
- [ ] Accessibility: Edit actions keyboard accessible
- [ ] QA tested edit workflows

---

## Story 4: Optimal Task Scheduling

### Story Details
**Story ID**: BB-034
**Title**: As a user, I want tasks scheduled at optimal times based on my patterns
**Priority**: P1 (High)
**Story Points**: 5
**Sprint**: Sprint 2
**Dependencies**: BB-032, EPIC-002 (AI insights)

### User Story
```
As a productive user
I want BoxIt to schedule tasks at my peak productivity times
So that I'm more likely to complete them successfully
```

### Acceptance Criteria
- [ ] AI analyzes user's historical box completion patterns
- [ ] Tasks scheduled during user's typical productive hours
- [ ] Complex tasks scheduled during peak focus times
- [ ] Quick tasks scheduled during low-energy periods
- [ ] Respects user's calendar availability (if calendar connected)
- [ ] Default scheduling: 9am-5pm if no history available
- [ ] Gaps between boxes for breaks (10-15 min buffer)
- [ ] No more than 6 hours of boxes in one day

### Technical Notes
- Query: User's box completion rate by hour of day
- Algorithm:
  ```
  peakHours = hours where completionRate > 75%
  lowEnergyHours = hours where completionRate < 50%
  complexTasks → schedule in peakHours
  quickTasks → schedule in lowEnergyHours
  ```
- Integration: Check calendar for conflicts (if EPIC-004 complete)
- Fallback: Morning for complex, afternoon for quick

### Examples
```
User history shows:
- 9am-11am: 90% completion rate (peak focus)
- 2pm-4pm: 60% completion rate
- 4pm-6pm: 40% completion rate (afternoon slump)

BoxIt schedules:
- "Write quarterly report" (2 hours) → 9am-11am
- "Review designs" (45 min) → 2pm-2:45pm
- "Quick emails" (15 min) → 4pm-4:15pm
```

### Definition of Done
- [ ] Scheduling algorithm implemented
- [ ] Historical data query working
- [ ] Peak hours correctly identified
- [ ] Tasks assigned to optimal times
- [ ] Unit tests for scheduling logic
- [ ] Integration test with sample user data
- [ ] QA verified schedules make sense

---

## Story 5: Batch Creation with One Tap

### Story Details
**Story ID**: BB-035
**Title**: As a user, I want to save time by creating 10 boxes in 30 seconds instead of 10 minutes
**Priority**: P0 (Critical)
**Story Points**: 5
**Sprint**: Sprint 2
**Dependencies**: BB-033

### User Story
```
As a time-conscious user
I want to create all my boxes with a single tap after reviewing
So that I can start my day quickly without tedious data entry
```

### Acceptance Criteria
- [ ] "Create All" button on preview screen
- [ ] Button shows count: "Create 8 Boxes"
- [ ] Tapping button calls batch creation API
- [ ] Loading state during creation: "Creating your boxes..."
- [ ] Success: Navigate to home screen with new boxes visible
- [ ] Success toast: "8 boxes created! 🎉"
- [ ] Boxes appear in chronological order in main list
- [ ] Creation completes within 3 seconds
- [ ] Error handling: If API fails, show retry option
- [ ] Error handling: Partial success (5/8 created) shows which failed

### Technical Notes
- Endpoint: `POST /api/boxes/batch`
- Request: `{ boxes: Box[] }`
- Response: `{ created: Box[], failed: { index: number, error: string }[] }`
- Transaction: Use database transaction for atomic creation
- Rollback: If any fail, rollback all (or flag partial success)
- Optimistic UI: Show boxes immediately, update if failures

### Performance Requirements
- API latency: <2 seconds for 20 boxes
- Database: Batch insert in single query
- No N+1 queries (use bulk operations)
- Cache invalidation: Clear boxes cache on success

### Definition of Done
- [ ] Batch creation API implemented
- [ ] Frontend calls API on button tap
- [ ] Loading and success states working
- [ ] Error handling implemented
- [ ] Transaction ensures data consistency
- [ ] Performance meets <3s requirement
- [ ] Unit tests for batch creation logic
- [ ] Integration test end-to-end flow
- [ ] Load tested with 50 boxes (edge case)
- [ ] QA verified happy path and error cases

---

## Additional Stories (Future Sprints)

### Backlog Stories
**BB-036**: Paste from clipboard automatically
**BB-037**: Voice input for tasks ("Hey BoxBee, box my tasks...")
**BB-038**: Templates: Save common task lists for re-use
**BB-039**: Keyboard shortcuts for power users
**BB-040**: BoxIt suggestions: "Looks like you have tasks in your notes app"

---

## Story Dependencies Graph

```
BB-031 (Parse tasks)
   ↓
BB-032 (Time estimation)
   ↓
BB-033 (Preview & edit)
   ↓
BB-034 (Optimal scheduling) ← Parallel with BB-035
   ↓
BB-035 (Batch creation)
```

---

## Sprint Planning

### Sprint 1 (2 weeks)
- BB-031: Paste & parse
- BB-032: Time estimation
- **Goal**: Demo BoxIt MVP (input → parse → show preview)

### Sprint 2 (2 weeks)
- BB-033: Preview & edit UI
- BB-034: Optimal scheduling
- BB-035: Batch creation
- **Goal**: Complete BoxIt (end-to-end working)

### Sprint 3 (Optional - polish)
- BB-036-040: Enhancements based on user feedback

---

## Testing Plan

### Unit Tests
- AI parsing accuracy: 90%+ task extraction
- Time estimation accuracy: 70%+ match historical avg
- Scheduling algorithm: Assigns to peak hours correctly

### Integration Tests
- End-to-end: Input text → Create boxes → Verify in database
- API error handling: Test timeout, 500 errors, invalid input
- Load test: 50 boxes created simultaneously

### User Acceptance Testing
- 10 beta users try BoxIt feature
- Success criteria: 80%+ complete flow without help
- Measure time savings: Before (manual) vs After (BoxIt)
- Collect qualitative feedback on AI accuracy

---

**Document End**

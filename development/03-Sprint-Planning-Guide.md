# BoxBee Sprint Planning Guide

**Version:** 1.0
**Date:** November 28, 2024
**Purpose:** Detailed sprint-by-sprint execution plan for 20-week MLP delivery

---

## Overview

This guide breaks down the 137-point MLP into 10 two-week sprints with clear objectives, deliverables, and success criteria for each sprint.

**Assumptions:**
- Solo developer or small team (2-3 people)
- Velocity: 7-8 points per week (14-16 points per 2-week sprint)
- Buffer included for unknowns, bugs, and technical debt
- AI integration requires extra time for learning/iteration

---

## Release Roadmap

```
Sprints 1-2:  Foundation        (Weeks 1-4)    → Auth + Infrastructure
Sprints 3-4:  Core Loop         (Weeks 5-8)    → Create → Work → Complete
Sprints 5-6:  AI Integration    (Weeks 9-12)   → Smart features
Sprints 7-8:  Platform Features (Weeks 13-16)  → Dashboard + Monetization
Sprints 9-10: Launch Prep       (Weeks 17-20)  → Polish + Beta + Deploy
```

---

## Sprint 1: Infrastructure Setup (Week 1-2)

### Goal
Set up development environment, backend API, and basic authentication.

### Stories (Total: ~15 points)
- **Infrastructure Setup** (8pts):
  - [ ] Initialize React Native project (0.73+)
  - [ ] Set up backend (Node.js/Express or Python/FastAPI)
  - [ ] Configure PostgreSQL database
  - [ ] Set up deployment pipeline (Heroku/Railway/AWS)
  - [ ] Configure environment variables
  - [ ] Set up error tracking (Sentry)
  - [ ] Configure analytics (Mixpanel/Amplitude)

- **US-7.1: User Account Creation** (8pts) - Partial
  - [ ] Email/password signup backend
  - [ ] JWT token generation
  - [ ] Basic signup UI (mobile)

### Technical Spikes
- [ ] Choose backend framework (Node.js vs Python)
- [ ] Choose hosting provider
- [ ] Database schema review and approval

### Deliverables
- ✅ Working dev environment
- ✅ Backend API responding
- ✅ Database schema deployed
- ✅ User can sign up (email/password)
- ✅ CI/CD pipeline working

### Success Criteria
- Backend API response time: <200ms
- Database properly indexed
- All tests passing
- Deployment automated

### Blockers & Risks
- ⚠️ Hosting provider setup delays
- ⚠️ Database design changes

---

## Sprint 2: Authentication Complete + Navigation (Week 3-4)

### Goal
Complete authentication with social login and set up app navigation structure.

### Stories (Total: ~16 points)
- **US-7.1: User Account Creation** (Remaining ~5pts):
  - [ ] Social login (Google + Apple)
  - [ ] Email verification flow
  - [ ] Profile creation
  - [ ] Token refresh mechanism

- **Navigation Setup** (5pts):
  - [ ] React Navigation configured
  - [ ] Tab navigator (Home, Insights, Settings)
  - [ ] Stack navigators for flows
  - [ ] Deep linking setup

- **Database & Sync** (5pts):
  - [ ] SQLite local storage
  - [ ] Sync logic (online/offline)
  - [ ] Conflict resolution

### Deliverables
- ✅ Users can sign up with email or social
- ✅ Email verification works
- ✅ Navigation structure in place
- ✅ Offline storage configured

### Success Criteria
- Social login success rate: >95%
- Navigation transitions smooth (60 FPS)
- Offline mode functional

### Blockers & Risks
- ⚠️ Apple Sign-In review process
- ⚠️ OAuth configuration complexity

---

## Sprint 3: Onboarding + Basic Box Creation (Week 5-6)

### Goal
Complete user onboarding and enable basic box creation (without AI).

### Stories (Total: ~18 points)
- **US-1.1: First-Time User Onboarding** (5pts)
- **US-1.2: Permission Requests** (3pts)
- **US-2.1: Quick Box Creation** (5pts) - Basic version (no AI)
  - Manual task input
  - Manual duration selection
  - "Start Now" only (no scheduling)
- **US-2.2: Start Immediately** (2pts) - "Now" option only

### Deliverables
- ✅ Complete onboarding flow (4 screens)
- ✅ Permissions requested appropriately
- ✅ Users can create a box manually
- ✅ Box saved to database

### Success Criteria
- Onboarding completion: >70%
- Onboarding duration: <60 seconds
- Box creation time: <20 seconds (manual)

### Blockers & Risks
- ⚠️ Onboarding copy needs final approval
- ⚠️ Permission flows differ iOS/Android

---

## Sprint 4: Focus Mode + Completion (Week 7-8)

### Goal
Build the core "doing" experience - focus mode with timer and completion flow.

### Stories (Total: ~18 points)
- **US-3.1: Immersive Focus Mode** (8pts)
- **US-3.2: Box Controls During Work** (5pts)
- **US-4.1: Quick Completion Reflection** (5pts)

### Technical Work
- [ ] Timer logic with accurate countdown
- [ ] Background execution permissions
- [ ] Lock screen integration
- [ ] Performance optimization (60 FPS)

### Deliverables
- ✅ Full-screen focus mode
- ✅ Timer counts down accurately
- ✅ Pause/resume/extend controls work
- ✅ Completion reflection prompt

### Success Criteria
- Timer accuracy: ±2 seconds over 60 minutes
- 60 FPS sustained during animations
- Battery drain: <2% per hour
- Completion reflection: <5 seconds

### Blockers & Risks
- ⚠️ Performance on older devices
- ⚠️ Background timer reliability
- ⚠️ iOS background execution limits

### Testing Focus
- [ ] Performance profiling
- [ ] Battery drain measurement
- [ ] Interruption handling (calls, notifications)

---

## Sprint 5: AI Integration - Part 1 (Week 9-10)

### Goal
Integrate OpenAI API for natural language task parsing and time estimation.

### Stories (Total: ~16 points)
- **US-2.1: AI-Powered Box Creation** (8pts) - AI completion
  - OpenAI GPT-4o-mini integration
  - Natural language parsing
  - Time estimation (cold start)
- **US-6.1: Real-Time AI Assistance** (8pts) - Partial
  - AI estimation algorithm
  - Category embeddings

### Technical Spikes
- [ ] OpenAI API setup and testing
- [ ] Prompt engineering for task parsing
- [ ] Cost optimization strategy
- [ ] Error handling and fallbacks

### Deliverables
- ✅ OpenAI API integrated
- ✅ Natural language box creation works
- ✅ AI suggests durations accurately
- ✅ Fallback to defaults if AI fails

### Success Criteria
- AI parsing accuracy: >90%
- API response time: <1 second (P95)
- Cost per box: <$0.002
- User override rate: <30%

### Blockers & Risks
- ⚠️ OpenAI API rate limits
- ⚠️ Cost overruns if not optimized
- ⚠️ Prompt accuracy varies by task type

### Testing Focus
- [ ] Test 100+ diverse task inputs
- [ ] Measure API costs in real usage
- [ ] A/B test AI vs manual input

---

## Sprint 6: Notifications + Scheduling (Week 11-12)

### Goal
Add notifications, scheduling, and complete AI learning loop.

### Stories (Total: ~15 points)
- **US-3.3: Time-Based Notifications** (5pts)
- **US-2.2: Scheduling** (3pts) - Complete with scheduling UI
- **US-6.1: AI Assistance** (5pts) - Complete with warm start learning
- **Polish** (2pts): Bug fixes from Sprints 3-5

### Deliverables
- ✅ Notifications work (5-min warning, completion)
- ✅ Users can schedule boxes for later
- ✅ AI learns from user's completion history
- ✅ AI suggestions improve over time

### Success Criteria
- Notification delivery: >98%
- Notifications respect DND settings
- AI warm start accuracy: >80% within ±15 min
- Week-over-week estimation improvement measurable

### Blockers & Risks
- ⚠️ Notification permissions on different Android versions
- ⚠️ iOS notification delivery reliability

---

## Sprint 7: Today View + Progress Tracking (Week 13-14)

### Goal
Build main dashboard with today's boxes and weekly progress.

### Stories (Total: ~18 points)
- **US-5.1: Today View Home Screen** (8pts)
- **US-5.3: Weekly Progress Tracking** (5pts)
- **US-7.3: Notification Preferences** (3pts)
- **Performance optimization** (2pts)

### Deliverables
- ✅ Complete Today View dashboard
- ✅ Active box prominently displayed
- ✅ Scheduled boxes list
- ✅ Weekly progress indicator
- ✅ Notification settings page

### Success Criteria
- Today View load time: <1 second
- Smooth scrolling with 100+ boxes
- Real-time updates on box completion
- Weekly progress accurate

### Blockers & Risks
- ⚠️ Performance with large datasets
- ⚠️ Complex UI interactions

---

## Sprint 8: Insights + Monetization (Week 15-16)

### Goal
Pattern recognition, insights, and subscription management.

### Stories (Total: ~21 points)
- **US-6.2: Pattern Recognition Insights** (13pts)
- **US-7.2: Subscription Management** (8pts)

### Technical Spikes
- [ ] RevenueCat setup
- [ ] App Store Connect configuration
- [ ] Google Play Console configuration
- [ ] Pattern analysis SQL optimization

### Deliverables
- ✅ AI detects user patterns (time-of-day, duration, etc.)
- ✅ Insights delivered on home screen
- ✅ In-app purchases functional (iOS + Android)
- ✅ 14-day trial implemented
- ✅ Subscription management UI

### Success Criteria
- Insights marked "helpful": >60%
- Pattern detection accurate
- IAP success rate: >95%
- Trial-to-paid conversion: >10% (early beta)

### Blockers & Risks
- ⚠️ App Store review of IAP implementation
- ⚠️ RevenueCat webhook configuration
- ⚠️ Pattern detection requires sufficient data

---

## Sprint 9: Polish + P1 Features (Week 17-18)

### Goal
Complete remaining P1 features and polish for beta.

### Stories (Total: ~26 points)
- **US-2.3: Quick Box Presets** (5pts)
- **US-3.4: AI Coaching During Box** (3pts)
- **US-4.2: Box Completion Celebration** (3pts)
- **US-5.2: AI Smart Suggestions** (8pts)
- **US-7.4: AI Coach Customization** (5pts)
- **Polish & Bug Fixes** (2pts)

### Deliverables
- ✅ Recent boxes and AI presets
- ✅ Coaching messages during focus
- ✅ Completion celebration animation
- ✅ AI suggests next box
- ✅ AI customization settings
- ✅ All P0 bugs fixed

### Success Criteria
- All P0 features complete and tested
- No critical bugs remaining
- App feels polished and professional
- Beta-ready build

### Focus
- [ ] User testing with 10-15 beta testers
- [ ] Gather feedback on UX flows
- [ ] Performance testing on variety of devices

---

## Sprint 10: Beta Testing + Launch Prep (Week 19-20)

### Goal
Beta test with real users, fix issues, submit to app stores.

### Stories (Total: ~15 points)
- **US-6.3: Weekly Hive Report** (8pts)
- **US-7.5: Data Export** (3pts)
- **Beta Testing** (4pts):
  - [ ] 50-100 beta testers recruited
  - [ ] TestFlight (iOS) / Play Store beta (Android)
  - [ ] Feedback collection and triage
  - [ ] Critical bug fixes
  - [ ] A/B tests analyzed

### Launch Checklist
- [ ] App Store assets (screenshots, video, description)
- [ ] Privacy policy finalized
- [ ] Terms of service finalized
- [ ] Support email/system configured
- [ ] Analytics dashboards set up
- [ ] Marketing materials prepared
- [ ] Product Hunt launch planned
- [ ] Website landing page live

### Deliverables
- ✅ Weekly Hive Report generates and delivers
- ✅ Data export functionality works
- ✅ Beta testing complete with >40% D7 retention
- ✅ App submitted to both stores
- ✅ Marketing campaign ready

### Success Criteria (Beta)
- Activation (first box created): >65%
- D7 retention: >40%
- Completion rate: >75%
- Average rating: >4.0
- AI acceptance rate: >50%
- <3 critical bugs

### Blockers & Risks
- ⚠️ App Store review rejection
- ⚠️ Critical bugs discovered in beta
- ⚠️ Low beta tester retention

---

## Post-Launch (Week 21+)

### Immediate (Week 21-22)
- Monitor production metrics
- Respond to user feedback
- Fix critical bugs
- Iterate on onboarding based on data

### Month 2 (Week 23-30)
- Optimize AI prompts based on real data
- Improve pattern recognition algorithms
- A/B test pricing and messaging
- Build v1.1 features based on usage

### Month 3+ (Week 31+)
- Continue growth and optimization
- Plan v2.0 features
- Consider additional platforms (web, desktop)

---

## Resource Planning

### Development Team
**Option 1: Solo Developer**
- Velocity: 6-8 points/week
- Timeline: 20-24 weeks
- Budget: $50K (living expenses + services)

**Option 2: 2-Person Team (Dev + Designer)**
- Velocity: 10-12 points/week
- Timeline: 16-18 weeks
- Budget: $80K

**Option 3: 3-Person Team (2 Devs + Designer)**
- Velocity: 14-16 points/week
- Timeline: 12-14 weeks
- Budget: $120K

### External Resources
- **Designer** (Contract): $10K for UI/UX and assets
- **Backend Developer** (Optional): $20K if needed
- **QA Tester** (Beta phase): $3K

---

## Budget Breakdown (Solo Developer)

### Development Costs
- Living expenses (5 months): $30K
- Designer (contract): $10K
- **Subtotal: $40K**

### Tools & Services
- OpenAI API: $500 (development + early users)
- Cloud hosting: $100/month × 5 = $500
- RevenueCat: Free tier → $0
- Analytics: Free tier → $0
- Email service: $50
- **Subtotal: $1,050**

### Marketing & Launch
- App store fees: $200
- Product Hunt promo: $500
- Initial ad spend: $2,000
- Website/domain: $200
- Legal (privacy, ToS): $1,500
- **Subtotal: $4,400**

### Contingency (20%)
- $9,000

**Total Budget: ~$55K**

---

## Risk Management

### High-Risk Items
1. **AI accuracy/costs** (Mitigation: Extensive testing, caching, fallbacks)
2. **App store rejection** (Mitigation: Follow guidelines, legal review)
3. **Performance issues** (Mitigation: Early and continuous testing)
4. **Low trial conversion** (Mitigation: A/B testing, user research)

### Mitigation Strategies
- Start AI integration early (Sprint 5)
- Continuous performance testing
- Weekly user testing sessions
- Buffer time in each sprint
- Regular stakeholder check-ins

---

## Definition of Done (Per Sprint)

A sprint is considered complete when:
- [ ] All planned stories are complete
- [ ] All tests passing (unit + integration)
- [ ] Code reviewed and merged to main
- [ ] Deployed to staging
- [ ] Manual QA completed
- [ ] Demo-able to stakeholders
- [ ] Documentation updated
- [ ] No critical bugs
- [ ] Sprint retrospective completed

---

## Key Metrics to Track

### Development Metrics
- Velocity (points completed per sprint)
- Bug count (by severity)
- Code coverage
- Deploy frequency

### Product Metrics (Post-Launch)
- Activation rate (first box created)
- Retention (D1, D7, D30)
- Completion rate (boxes finished)
- AI acceptance rate
- Trial-to-paid conversion
- NPS score

---

## Sprint Planning Template

For each sprint:

```markdown
## Sprint X: [Name] (Week Y-Z)

### Goals
- [Primary goal]
- [Secondary goal]

### Stories
- [ ] US-X.Y: [Name] ([X]pts)
- [ ] US-X.Y: [Name] ([X]pts)
**Total: ~XXpts**

### Technical Spikes
- [ ] [Spike name]

### Deliverables
- ✅ [Deliverable 1]
- ✅ [Deliverable 2]

### Success Criteria
- [Metric]: [Target]

### Blockers & Risks
- ⚠️ [Risk and mitigation]

### Testing Focus
- [ ] [Test type/area]
```

---

## Next Steps

1. **Review and approve sprint plan**
2. **Set up project management tool** (Jira, Linear, GitHub Projects)
3. **Import user stories** from 02-User-Stories-Sprint-Ready.md
4. **Schedule Sprint 1 planning meeting**
5. **Set up development environment**
6. **Begin Sprint 1 execution**

---

**Questions? Review the full PRD and Epic Breakdown for additional context.**

**Ready to build! 🚀**

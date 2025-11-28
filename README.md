# 🐝 BoxBee

**AI-native time-boxing productivity app for mobile**

BoxBee helps you focus on what matters by breaking your day into manageable time-boxed tasks (called "boxes"). With AI-powered time estimation and personalized insights, BoxBee learns your work patterns and helps you become more productive over time.

## ✨ Key Features

- **⚡ Quick Box Creation** - Create time-boxed tasks in seconds using natural language
- **🤖 AI Time Estimation** - Smart duration suggestions that improve as you work
- **🎯 Focus Mode** - Distraction-free environment with beautiful hexagon-themed UI
- **📊 Pattern Insights** - Learn when you're most productive and optimize your schedule
- **📈 Weekly Reports** - Track your progress with AI-generated Hive Reports
- **🐝 Bee Theme** - Modern, minimal design with honey colors and hexagon patterns

## 🏗️ Project Structure

```
boxbee/
├── mobile/              # React Native mobile app (iOS + Android)
├── backend/             # Node.js/Express API with PostgreSQL
├── design/              # Design system, screen specs, and assets
│   ├── 01-Design-System.md
│   ├── 02-Screen-Specifications.md
│   └── 03-Asset-Requirements.md
├── development/         # Development planning and documentation
│   ├── 01-Epic-Breakdown.md
│   ├── 02-User-Stories-Sprint-Ready.md
│   ├── 03-Sprint-Planning-Guide.md
│   └── README.md
├── BoxBee-PRD.md       # Complete Product Requirements Document
└── BoxBee-Project-Brief.md  # Strategic overview
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- React Native development environment (for mobile)
- OpenAI API key (for AI features)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run db:migrate
npm run dev
```

See [backend/README.md](backend/README.md) for detailed setup instructions.

### Mobile App Setup

```bash
cd mobile
npm install
npm start
```

Then press `i` for iOS simulator or `a` for Android emulator.

See [mobile/README.md](mobile/README.md) for detailed setup instructions.

## 📱 Tech Stack

### Mobile App
- **Framework:** React Native 0.73+ with Expo
- **Language:** TypeScript
- **UI:** Custom bee-themed design system
- **State:** React Context + hooks
- **Storage:** SQLite (offline-first)
- **Navigation:** React Navigation

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** JWT + bcrypt
- **AI:** OpenAI GPT-4o-mini

### Infrastructure (Future)
- **Hosting:** Railway/Heroku (backend), Expo EAS (mobile)
- **Monitoring:** Sentry
- **Analytics:** Mixpanel/Amplitude
- **Payments:** RevenueCat (In-App Purchases)

## 📋 Development Roadmap

### ✅ Sprint 1 (Weeks 1-2) - Foundation [COMPLETED]
- [x] Project setup and repository
- [x] Backend infrastructure (Express + PostgreSQL)
- [x] Database schema with Prisma
- [x] Basic authentication (JWT)
- [x] React Native mobile app initialization

### 🔄 Sprint 2 (Weeks 3-4) - Auth Complete
- [ ] Social login (Google + Apple)
- [ ] Email verification
- [ ] Navigation structure
- [ ] Offline storage (SQLite)

### 📦 Sprint 3-4 (Weeks 5-8) - Core Loop
- [ ] Onboarding flow
- [ ] Box creation (manual, no AI yet)
- [ ] Focus mode with timer
- [ ] Completion reflection

### 🤖 Sprint 5-6 (Weeks 9-12) - AI Integration
- [ ] OpenAI API integration
- [ ] Natural language task parsing
- [ ] AI time estimation
- [ ] Learning from completion history

### 📊 Sprint 7-8 (Weeks 13-16) - Dashboard & Insights
- [ ] Today View dashboard
- [ ] Pattern recognition
- [ ] Weekly Hive Report
- [ ] Subscription management (RevenueCat)

### 🎨 Sprint 9-10 (Weeks 17-20) - Polish & Launch
- [ ] P1 features (celebrations, presets, coaching)
- [ ] Beta testing (50-100 users)
- [ ] App store submission (iOS + Android)
- [ ] Marketing materials

See [development/03-Sprint-Planning-Guide.md](development/03-Sprint-Planning-Guide.md) for detailed sprint breakdown.

## 📐 Design System

BoxBee uses a modern, minimal design with bee/honey/hexagon theme:

- **Colors:** Honey spectrum (#FDB44B, #F5A623, #E69500) + bee black/white
- **Typography:** Inter (UI) + JetBrains Mono (timer)
- **Spacing:** 8-point grid system
- **Icons:** Custom hexagonal icons with honey accents
- **Animations:** Honey drip, hexagon fill, breathing backgrounds

See [design/01-Design-System.md](design/01-Design-System.md) for implementation details.

## 🎯 Success Metrics

**Activation:**
- Onboarding completion: >70%
- First box created: >65%
- Time to first value: <5 minutes

**Engagement:**
- Boxes per week: >15
- Completion rate: >75%
- DAU/MAU: >30%

**Retention:**
- D7: >40%
- D30: >25%

**Revenue:**
- Trial-to-paid: >15%
- Churn: <5%/month

## 🤝 Contributing

This is a solo project, but contributions are welcome! Please read the PRD and development docs before contributing.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by time-boxing methodology and productivity research
- Bee mascot designed with modern minimalism in mind
- Built with amazing open-source tools

---

**Made with 🐝 by the BoxBee team**

*Time-box your day, accomplish more.*

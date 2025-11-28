# 🐝 BoxBee - AI-Native Time-Boxing Productivity App

BoxBee is a modern productivity app that combines AI-powered insights with focused time-boxing to help you work smarter, not harder.

## ✨ Key Features

### 📦 Smart Box Creation
- Create focused work sessions ("boxes") with just a task name and duration
- **AI-powered duration estimation** - Get intelligent time suggestions with reasoning
- Natural language support (foundation ready)
- Simple, distraction-free interface

### ⏱️ Immersive Focus Mode
- Beautiful countdown timer with progress visualization
- Start/Pause/Resume controls
- 5-minute warning notifications
- App background handling (auto-pauses)
- Motivational messages based on timer state

### 🧘 Completion Reflection
- Rate your focus quality (Great/Okay/Rough)
- Track completion status (Completed/Partial/Skipped)
- Add optional notes for learning
- All data captured for insights

### 📊 Weekly Analytics & Insights
- **Track your streak** - Consecutive days with completed boxes
- View key metrics: boxes completed, focus time, quality scores
- **AI-powered personal insights** - Data-driven, actionable recommendations
- Pattern recognition: best day/time to focus
- Category tracking

### 🤖 AI Integration
- Smart time estimation with confidence levels
- Task complexity analysis and breakdown suggestions
- Personalized coaching based on your habits
- Context-aware insights generation

### ⚙️ Customizable Settings
- Notification preferences (5-min warning, completion alerts, coaching)
- AI assistant configuration (learning, auto-adjust, personality)
- Theme options (light/dark/auto)
- Account management

## 🏗️ Tech Stack

### Mobile App (React Native + Expo)
- **Framework**: React Native 0.73+ with Expo
- **Language**: TypeScript for type safety
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: React Context API
- **Storage**: Expo SecureStore for sensitive data
- **UI**: Custom design system with honey/bee theme

### Backend API (Node.js + Express)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM v7
- **Authentication**: JWT with refresh tokens (30-day rotation)
- **AI**: OpenAI GPT-4o-mini for smart features
- **Email**: Nodemailer with SendGrid (production ready)
- **Validation**: express-validator

### AI & Analytics
- **Model**: GPT-4o-mini (fast, cost-effective)
- **Features**: Time estimation, task breakdown, insights generation
- **Cost**: ~$0.001 per request, ~$30-50/month for 1000 users
- **Fallbacks**: Graceful degradation when AI unavailable

## 📁 Project Structure

```
boxbee/
├── backend/                 # Node.js API server
│   ├── prisma/             # Database schema & migrations
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic (AI, insights, email)
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth, error handling
│   │   └── utils/          # Helper functions
│   └── AI_SETUP.md        # OpenAI configuration guide
│
├── mobile/                 # React Native mobile app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── screens/        # App screens (auth, main, onboarding, focus)
│   │   ├── navigation/     # Navigation configuration
│   │   ├── services/       # API client services
│   │   ├── contexts/       # React Context providers
│   │   ├── types/          # TypeScript type definitions
│   │   └── constants/      # Theme, colors, typography
│   └── App.tsx            # Root component
│
└── design/                 # Design system & specifications
    ├── 01-Design-System.md
    ├── 02-Screen-Specifications.md
    └── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key (optional, for AI features)
- Expo CLI: `npm install -g expo-cli`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL, JWT secret, and optionally OpenAI API key
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:3000

### Mobile App Setup

1. **Navigate to mobile directory**
   ```bash
   cd mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update `src/services/api.service.ts` with your backend URL

4. **Start Expo**
   ```bash
   npm start
   ```
   Scan QR code with Expo Go app (iOS/Android)

## 🔑 AI Features Setup

See [backend/AI_SETUP.md](backend/AI_SETUP.md) for detailed instructions on:
- Getting an OpenAI API key
- Configuring environment variables
- Understanding AI features and costs
- Testing AI endpoints

**Note**: App works perfectly without AI - features gracefully degrade to manual operation.

## 📱 User Flow

1. **Onboarding** (new users)
   - Welcome screens explaining BoxBee features
   - Notification permissions request
   - Interactive first box creation tutorial

2. **Create a Box**
   - Enter task name
   - Get AI duration suggestion (optional)
   - Select or adjust duration
   - Create and it appears in Today view

3. **Focus Mode**
   - Tap box to start
   - Immersive timer with large display
   - Progress ring visualization
   - Pause/resume as needed

4. **Reflect**
   - Timer completes → Reflection screen
   - Rate focus quality
   - Mark completion status
   - Add optional notes

5. **Track Progress**
   - View weekly stats in Insights tab
   - See productivity patterns
   - Get personalized AI coaching
   - Track your streak

## 🎨 Design System

BoxBee uses a carefully crafted **honey/bee theme**:

- **Primary Color**: Honey (#F5A623) - CTAs, accents
- **Backgrounds**: Honeycream (#FFF5E1) - soft highlights
- **Text**: Bee Black (#1A1A1A) - high contrast
- **Typography**: Inter for UI, JetBrains Mono for timer
- **Spacing**: 8-point grid system
- **Metaphor**: Hexagons (bees) + Boxes (time-boxing)

## 📋 Development Status

### ✅ Sprint 1 - Infrastructure & Auth (COMPLETE)
- [x] Backend setup (Node.js + Express + TypeScript)
- [x] PostgreSQL database with Prisma ORM
- [x] JWT authentication with refresh tokens
- [x] Mobile app initialization (React Native + Expo)
- [x] Email verification backend
- [x] Design system implementation

### ✅ Sprint 2 - Navigation & Screens (COMPLETE)
- [x] React Navigation setup (Stack + Bottom Tabs)
- [x] Authentication screens (Welcome, Signup, Login)
- [x] Main app screens (Today, Insights, Settings)
- [x] AuthContext for global state
- [x] API service layer with interceptors

### ✅ Sprint 3 - Core Loop (COMPLETE)
- [x] Onboarding flow (4 screens)
- [x] Box creation modal
- [x] Box CRUD endpoints
- [x] Focus mode screen with timer
- [x] Completion reflection modal
- [x] Today View with box management

### ✅ Sprint 4 - AI Integration (COMPLETE)
- [x] OpenAI GPT-4o-mini integration
- [x] AI time estimation with confidence
- [x] Task breakdown suggestions
- [x] Natural language parsing foundation
- [x] AI-powered coaching messages
- [x] CreateBoxModal AI features

### ✅ Sprint 5 - Insights & Analytics (COMPLETE)
- [x] Weekly statistics calculation
- [x] Pattern recognition (day/time/category)
- [x] Streak tracking
- [x] AI-powered insights generation
- [x] InsightsScreen with rich analytics
- [x] Data visualization components

### ✅ Sprint 6 - Settings & Polish (COMPLETE)
- [x] Comprehensive settings screen
- [x] Notification preferences UI
- [x] AI assistant configuration
- [x] Account management
- [x] User settings backend
- [x] App polish and UX improvements

## 📄 API Documentation

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Sign in
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

### Email
- `POST /api/email/send-verification` - Send verification email
- `POST /api/email/verify` - Verify email with token
- `POST /api/email/resend-verification` - Resend verification

### Boxes
- `POST /api/boxes` - Create box
- `GET /api/boxes` - List boxes (with filters)
- `GET /api/boxes/:id` - Get single box
- `PATCH /api/boxes/:id` - Update box
- `DELETE /api/boxes/:id` - Delete box
- `POST /api/boxes/:id/start` - Start focus mode
- `POST /api/boxes/:id/complete` - Complete with reflection

### AI Features
- `POST /api/ai/estimate-duration` - Get time estimation
- `POST /api/ai/breakdown-task` - Break down complex task
- `POST /api/ai/parse-task` - Parse natural language
- `GET /api/ai/coaching-message` - Get personalized coaching

### Insights
- `GET /api/insights/weekly` - Weekly statistics
- `GET /api/insights/ai-insights` - AI-generated insights

### Settings
- `GET /api/settings` - Get user settings
- `PATCH /api/settings` - Update settings

## 🔐 Security

- Passwords hashed with bcrypt
- JWT tokens with 7-day expiry
- Refresh tokens with 30-day expiry + automatic rotation
- Secure token storage (Expo SecureStore)
- API key never exposed to frontend
- CORS configured for security
- Input validation on all endpoints

## 🎯 Key Achievements

- **Full-stack TypeScript** - Type safety across frontend and backend
- **AI-powered features** - Smart, cost-effective OpenAI integration
- **Beautiful UI** - Custom design system with honey/bee theme
- **Complete user flow** - Onboarding → Create → Focus → Reflect → Insights
- **Production-ready** - Error handling, validation, security best practices
- **Graceful degradation** - Works perfectly without AI configured

## 🙏 Acknowledgments

- Built with Claude Code (Anthropic)
- Powered by OpenAI GPT-4o-mini
- Inspired by time-boxing methodology
- Design system influenced by modern productivity apps

## 📝 License

MIT License - feel free to use this project for learning and inspiration.

---

**Made with 🐝 and AI** • BoxBee v1.0.0 • © 2024

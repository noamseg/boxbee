# BoxBee Mobile App

React Native mobile application for BoxBee - AI-native time-boxing productivity app.

## Tech Stack

- **Framework:** React Native 0.73+ with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **State Management:** React Context + Hooks
- **Storage:** Expo SecureStore (auth tokens) + Expo SQLite (offline data)
- **API Client:** Axios
- **UI:** Custom bee-themed design system

## Prerequisites

- Node.js 18+
- npm or yarn
- iOS Simulator (Mac only) or Android Emulator
- Expo CLI
- BoxBee backend running on `http://localhost:3000`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

This will start the Expo development server. You'll see a QR code and options to:
- Press `i` - Open iOS Simulator
- Press `a` - Open Android Emulator
- Press `w` - Open web browser
- Scan QR code with Expo Go app on physical device

### 3. Configure API Endpoint

The app defaults to `http://localhost:3000/api` in development mode.

To change the API endpoint:
1. Edit `src/services/api.service.ts`
2. Update the `API_URL` constant

**For physical device testing:**
- Replace `localhost` with your computer's local IP address
- Example: `http://192.168.1.100:3000/api`

## Project Structure

```
mobile/
├── src/
│   ├── navigation/          # Navigation setup
│   │   ├── AppNavigator.tsx      # Root navigator
│   │   ├── AuthNavigator.tsx     # Auth stack (Welcome, Login, Signup)
│   │   └── MainNavigator.tsx     # Main tabs (Today, Insights, Settings)
│   ├── screens/
│   │   ├── auth/                 # Authentication screens
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   └── main/                 # Main app screens
│   │       ├── TodayScreen.tsx
│   │       ├── InsightsScreen.tsx
│   │       └── SettingsScreen.tsx
│   ├── contexts/                 # React contexts
│   │   └── AuthContext.tsx       # Authentication state
│   ├── services/                 # API services
│   │   ├── api.service.ts        # Axios client
│   │   └── auth.service.ts       # Auth API calls
│   ├── types/                    # TypeScript types
│   │   └── auth.types.ts
│   ├── constants/                # Theme and constants
│   │   └── theme.ts              # Design system tokens
│   ├── components/               # Reusable components (future)
│   └── utils/                    # Utility functions (future)
├── assets/                       # Images, fonts, icons
├── App.tsx                       # App entry point
└── package.json
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## Features Implemented (Sprint 2)

### ✅ Navigation
- Root navigator with conditional auth/main flow
- Auth stack navigator (Welcome → Login/Signup)
- Main tab navigator (Today, Insights, Settings)

### ✅ Authentication
- Welcome screen with bee branding
- Signup with email/password validation
- Login with error handling
- Secure token storage (Expo SecureStore)
- Auto-login on app restart
- Logout functionality

### ✅ Design System
- Complete theme constants (colors, typography, spacing)
- Honey/bee color palette
- 8-point grid spacing system
- Typography scale based on design specs

### ✅ API Integration
- Axios client with interceptors
- Automatic token attachment to requests
- Error handling (401 auto-logout)
- TypeScript types for all API calls

## Testing the App

### 1. Start Backend

Make sure the BoxBee backend is running:

```bash
cd ../backend
npm run dev
```

### 2. Start Mobile App

```bash
npm start
```

### 3. Test Authentication Flow

1. Launch app → See Welcome screen
2. Tap "Get Started" → Signup screen
3. Enter email, password, optional name
4. Tap "Create Account" → Auto-login to Today view
5. Navigate to Settings → Tap "Sign Out"
6. Tap "Sign In" → Login screen
7. Enter credentials → Back to Today view

### 4. Test on Physical Device

**iOS (with Expo Go):**
1. Install Expo Go from App Store
2. Scan QR code from terminal
3. Update API_URL to use computer's IP address

**Android (with Expo Go):**
1. Install Expo Go from Play Store
2. Scan QR code from terminal
3. Update API_URL to use computer's IP address

## Design System

The app implements the BoxBee design system with:

### Colors
- **Honey:** `#F5A623` (primary actions)
- **Honey Light:** `#FDB44B` (highlights)
- **Honey Deep:** `#E69500` (links, active states)
- **Bee Black:** `#1A1A1A` (text, headers)
- **Grays:** Full spectrum for backgrounds and text

### Typography
- **Display:** 32px, Bold - Major titles
- **H1:** 28px, Bold - Screen titles
- **H2:** 24px, SemiBold - Section headers
- **Body:** 16px, Regular - Main text
- **Caption:** 14px, Regular - Helper text

### Spacing
Uses 8-point grid: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64...`

## Known Issues & Limitations

### Current Sprint (Sprint 2)
- No social login yet (Google/Apple) - Sprint 2 goal
- No email verification - Sprint 2 goal
- No offline sync - Sprint 2 goal
- Placeholder icons for tabs (need custom icons)
- No password reset flow
- Main screens (Today, Insights) are placeholders

### Future Sprints
- Box creation and management (Sprint 3-4)
- Focus mode with timer (Sprint 3-4)
- AI integration (Sprint 5-6)
- Insights and reports (Sprint 7-8)

## Troubleshooting

### "Cannot connect to backend"
- Check backend is running on `http://localhost:3000`
- If using physical device, update API_URL with computer's IP
- Check firewall settings

### "Login/Signup fails"
- Check backend logs for errors
- Verify database is set up (`npm run db:migrate` in backend)
- Check password validation (8+ chars, uppercase, lowercase, number)

### Expo Go connection issues
- Ensure phone and computer are on same Wi-Fi network
- Try restarting Expo dev server
- Clear Expo cache: `expo start -c`

### TypeScript errors
```bash
# Restart TypeScript server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

## Next Steps (Sprint 2 Continuation)

- [ ] Add Google OAuth
- [ ] Add Apple Sign In
- [ ] Implement email verification
- [ ] Set up SQLite for offline storage
- [ ] Add token refresh mechanism
- [ ] Create reusable Button component
- [ ] Add form validation helpers
- [ ] Implement loading states

## Contributing

See root [README.md](../README.md) for contribution guidelines.

## License

MIT

# BoxBee Testing Guide

Complete guide to test your BoxBee app locally before deployment.

## Prerequisites

### 1. Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**macOS (Postgres.app):**
- Download from https://postgresapp.com/
- Install and start the app
- Add to PATH: `export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/latest/bin`

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Run installer and remember your password

**Linux:**
```bash
sudo apt-get install postgresql
sudo service postgresql start
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE boxbee_dev;

# Exit psql
\q
```

### 3. Verify Environment Variables

Check `backend/.env` file exists with:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/boxbee_dev?schema=public"
PORT=3000
NODE_ENV=development
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
OPENAI_API_KEY="your-openai-api-key-here"  # Optional for testing
```

## Backend Testing

### 1. Setup Database Schema

```bash
cd backend
npx prisma migrate dev --name init
```

This will:
- Create all database tables
- Generate Prisma Client
- Seed any initial data

### 2. Start Backend Server

```bash
npm run dev
```

Expected output:
```
🐝 BoxBee API server running on port 3000
🔗 Health check: http://localhost:3000/health
📝 Environment: development
```

### 3. Test Backend Endpoints

Open a new terminal and test:

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Create a User (Signup):**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456!",
    "name": "Test User"
  }'
```

You should receive a response with a token and user data.

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456!"
  }'
```

Save the token from the response for authenticated requests.

**Get User Info (requires token):**
```bash
# Replace YOUR_TOKEN with the actual token from login/signup
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Test AI Features (Optional)

If you have an OpenAI API key:

```bash
curl -X POST http://localhost:3000/api/ai/estimate-duration \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "taskName": "Write a blog post about productivity"
  }'
```

### 5. Test Box Creation

```bash
curl -X POST http://localhost:3000/api/boxes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "taskName": "Test Task",
    "duration": 30
  }'
```

## Mobile App Testing

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Update API URL

Edit `mobile/src/services/api.service.ts`:

```typescript
const API_URL = __DEV__
  ? 'http://localhost:3000/api'  // For iOS Simulator
  // ? 'http://10.0.2.2:3000/api'  // For Android Emulator
  : 'https://api.boxbee.app/api';
```

**Note:**
- iOS Simulator: Use `http://localhost:3000/api`
- Android Emulator: Use `http://10.0.2.2:3000/api`
- Physical Device: Use your computer's IP address (e.g., `http://192.168.1.100:3000/api`)

### 3. Start Expo Development Server

```bash
npm start
```

### 4. Run on Device/Simulator

**iOS Simulator (Mac only):**
```bash
# Press 'i' in the Expo terminal
# Or
npx expo run:ios
```

**Android Emulator:**
```bash
# Press 'a' in the Expo terminal
# Or
npx expo run:android
```

**Physical Device:**
1. Install Expo Go app from App Store/Play Store
2. Scan QR code shown in terminal
3. Make sure your phone and computer are on same WiFi network

## Testing Complete User Flow

### 1. Test Onboarding (First Time User)

1. Open the app
2. Should see Welcome screen
3. Tap "Get Started"
4. See 3 info slides → tap "Next"
5. Permissions screen → tap "Enable Notifications"
6. First Box Tutorial:
   - Enter task name: "Test My First Box"
   - Select duration: 25 minutes
   - Tap "Create My First Box"

### 2. Test Box Creation

1. From Today screen, tap "+" button
2. Enter task name
3. (Optional) Tap "✨ AI Suggest" to test AI
4. Select duration
5. Tap "Create Box"
6. Box should appear in Today view

### 3. Test Focus Mode

1. Tap on a scheduled box
2. Timer should show in idle state
3. Tap "Start Focus"
4. Timer counts down
5. Test "Pause" button
6. Test "Resume" button
7. Test "End Session" (confirm dialog)

### 4. Test Completion Reflection

1. Let timer run to completion (or end early)
2. See Completion Reflection screen
3. Select focus quality (Great/Okay/Rough)
4. Select completion status
5. (Optional) Add notes
6. Tap "Complete"
7. Returns to Today screen

### 5. Test Insights Screen

1. Tap "Insights" tab
2. Should see:
   - Streak badge (if you have one)
   - Key metrics cards
   - Patterns section
   - AI insights (if AI is configured)
3. Pull down to refresh

### 6. Test Settings Screen

1. Tap "Settings" tab
2. View user profile
3. Toggle notification switches
4. Toggle AI settings
5. Changes should save automatically
6. Pull down to refresh and verify saved

## Testing Without AI

If you don't have an OpenAI API key:

1. The app will work fine without AI features
2. "AI Suggest" button will show error message
3. Insights screen won't show AI-generated insights
4. Duration estimation will be manual only

## Common Issues & Solutions

### Backend won't start

**Error:** "PrismaClientValidationError"
```bash
# Clean and regenerate Prisma
cd backend
rm -rf node_modules/@prisma node_modules/.prisma
npm install
npx prisma generate
npx prisma migrate dev
```

**Error:** "Database connection failed"
```bash
# Check PostgreSQL is running
brew services list  # Mac
# or
sudo service postgresql status  # Linux

# Test connection
psql -U postgres -c "SELECT 1"
```

### Mobile app can't connect to backend

1. **Check backend is running** (visit http://localhost:3000/health)
2. **Update API URL** in `api.service.ts` to match your setup
3. **For Physical Device:** Use your computer's local IP
   ```bash
   # Find your IP (Mac/Linux)
   ifconfig | grep "inet "
   # Use format: http://192.168.x.x:3000/api
   ```

### AI features not working

1. Check `.env` file has valid `OPENAI_API_KEY`
2. Test API key: https://platform.openai.com/api-keys
3. Check OpenAI account has credits
4. App will work without AI - features gracefully degrade

### Database migrations fail

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or create fresh database
dropdb boxbee_dev  # If exists
createdb boxbee_dev
npx prisma migrate dev
```

## Database GUI Tools (Optional)

View your database easily:

**Prisma Studio (Recommended):**
```bash
cd backend
npx prisma studio
# Opens at http://localhost:5555
```

**Other Options:**
- TablePlus: https://tableplus.com/
- pgAdmin: https://www.pgadmin.org/
- DBeaver: https://dbeaver.io/

## API Testing Tools (Optional)

**Postman:**
1. Download from https://www.postman.com/
2. Import collection: Create requests for each endpoint
3. Use environment variables for token management

**Insomnia:**
1. Download from https://insomnia.rest/
2. Similar to Postman, good alternative

**VS Code REST Client:**
1. Install "REST Client" extension
2. Create `.http` files with requests
3. Click "Send Request" in editor

## Next Steps After Testing

Once everything works locally:

1. **Fix any bugs** found during testing
2. **Set up production database** (Railway, Supabase, etc.)
3. **Deploy backend** (Railway, Render, Fly.io)
4. **Update mobile app** with production API URL
5. **Build and publish** mobile app to App Store/Play Store

## Support

If you encounter issues:

1. Check error messages in terminal
2. Review `TESTING_GUIDE.md` (this file)
3. Check backend logs for API errors
4. Use browser dev tools/Reactotron for mobile debugging

---

**Happy Testing! 🐝**

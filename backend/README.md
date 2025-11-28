# BoxBee Backend API

Backend API for BoxBee - AI-native time-boxing productivity app.

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (JSON Web Tokens)
- **AI Integration:** OpenAI GPT-4o-mini (for future features)

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- OpenAI API key (for AI features in later sprints)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

Update the following variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/boxbee_dev"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# OpenAI (for AI features - Sprint 5+)
OPENAI_API_KEY="your-openai-api-key-here"
```

### 3. Set Up Database

#### Option A: Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create database
createdb boxbee_dev

# Run migrations
npm run db:migrate
```

#### Option B: Prisma Dev (Recommended for Development)

Prisma can run a local PostgreSQL instance for you:

```bash
npx prisma dev
```

This will start a local PostgreSQL instance and create the database automatically.

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server (requires `npm run build` first)
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database (no migration files)
- `npm run db:migrate` - Create and apply migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)

## API Endpoints

### Health Check

```
GET /health
```

Returns API status and timestamp.

### Authentication

#### Sign Up

```
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe" (optional)
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx...",
      "email": "user@example.com",
      "name": "John Doe",
      "emailVerified": false,
      "createdAt": "2024-11-28T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:** Same as signup

#### Get Current User

```
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx...",
      "email": "user@example.com",
      "name": "John Doe",
      "emailVerified": false,
      "createdAt": "2024-11-28T...",
      "updatedAt": "2024-11-28T..."
    }
  }
}
```

## Database Schema

### Models

- **User** - User accounts and authentication
- **UserSettings** - User preferences and settings
- **Box** - Time-boxed tasks
- **Insight** - AI-generated insights

See `prisma/schema.prisma` for full schema definition.

### Viewing Database

Open Prisma Studio to view and edit database records:

```bash
npm run db:studio
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/      # Route controllers
│   │   └── auth.controller.ts
│   ├── middleware/       # Express middleware
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/          # API routes
│   │   └── auth.routes.ts
│   ├── services/        # Business logic (future)
│   ├── utils/           # Utility functions
│   │   ├── auth.utils.ts
│   │   └── prisma.ts
│   └── index.ts         # App entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── prisma.config.ts     # Prisma configuration
├── .env                 # Environment variables
├── .env.example         # Example environment file
├── tsconfig.json        # TypeScript config
├── nodemon.json         # Nodemon config
└── package.json
```

## Development Notes

### Sprint 1 Scope (Current)

✅ Basic infrastructure setup
✅ PostgreSQL database with Prisma
✅ User authentication (email/password)
✅ JWT token generation
✅ Basic API structure

### Future Sprints

- **Sprint 2:** Social auth (Google, Apple), email verification
- **Sprint 3-4:** Box CRUD operations, basic focus mode
- **Sprint 5-6:** OpenAI integration for AI features
- **Sprint 7-8:** Insights and pattern recognition
- **Sprint 9-10:** Polish and production deployment

## Testing API

### Using cURL

```bash
# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'

# Get current user
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman/Insomnia

Import the endpoints above or use the built-in HTTP client in VS Code with the REST Client extension.

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
pg_isready

# Verify DATABASE_URL in .env is correct
echo $DATABASE_URL
```

### Prisma Issues

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Regenerate Prisma Client
npm run db:generate
```

### Port Already in Use

Change `PORT` in `.env` to a different port (e.g., 3001).

## Security Notes

- Never commit `.env` file to version control
- Use strong JWT_SECRET in production
- Enable HTTPS in production
- Implement rate limiting (future sprint)
- Add input sanitization (already using express-validator)

## License

MIT

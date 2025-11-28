# BoxBee AI Features Setup

BoxBee uses OpenAI's GPT-4o-mini model to power intelligent features like time estimation, task breakdown, and coaching.

## Setup Instructions

1. **Get an OpenAI API Key**
   - Visit https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Add to Environment Variables**
   ```bash
   # In backend/.env
   OPENAI_API_KEY=sk-your-api-key-here
   ```

3. **Restart the Backend Server**
   ```bash
   npm run dev
   ```

## Available AI Features

### 1. Task Duration Estimation
**Endpoint:** `POST /api/ai/estimate-duration`

Analyzes a task and suggests how long it should take:
```json
{
  "taskName": "Write blog post about productivity"
}
```

Response:
```json
{
  "estimatedDuration": 45,
  "confidence": "high",
  "reasoning": "Writing a blog post typically takes 30-60 minutes for quality content"
}
```

### 2. Task Breakdown
**Endpoint:** `POST /api/ai/breakdown-task`

Breaks complex tasks into smaller subtasks:
```json
{
  "taskName": "Prepare quarterly presentation"
}
```

Response:
```json
{
  "subtasks": [
    "Gather data and metrics",
    "Create slide outline",
    "Design slides",
    "Practice presentation"
  ],
  "suggestion": "This task benefits from breaking into focused steps"
}
```

### 3. Natural Language Parsing
**Endpoint:** `POST /api/ai/parse-task`

Parses natural language input:
```json
{
  "input": "Write blog post for 45 minutes"
}
```

Response:
```json
{
  "taskName": "Write blog post",
  "suggestedDuration": 45,
  "category": "writing"
}
```

### 4. Coaching Messages
**Endpoint:** `GET /api/ai/coaching-message`

Gets personalized productivity coaching based on recent activity.

## Cost Considerations

- **Model:** GPT-4o-mini (cost-effective, fast)
- **Average cost per request:** ~$0.001
- **Estimated monthly cost for 1000 users:** $30-50

The model is specifically chosen for:
- Low latency (fast responses)
- Low cost (affordable at scale)
- High quality (good enough for productivity features)

## Graceful Degradation

If the OpenAI API key is not configured:
- AI features return fallback responses
- Mobile app shows "AI unavailable" messages
- Core functionality (creating boxes manually) works perfectly
- No errors or broken features

## Security

- API key is stored in environment variables (never in code)
- API key is never exposed to the frontend
- All AI endpoints require user authentication
- Rate limiting recommended for production

## Future Enhancements

Potential AI features for future sprints:
- Smart scheduling suggestions
- Pattern recognition in work habits
- Personalized productivity insights
- Voice-to-task input
- Task priority recommendations

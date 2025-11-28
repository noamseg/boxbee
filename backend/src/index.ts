import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import emailRoutes from './routes/email.routes';
import boxRoutes from './routes/box.routes';
import aiRoutes from './routes/ai.routes';
import insightsRoutes from './routes/insights.routes';
import settingsRoutes from './routes/settings.routes';
import { errorHandler } from './middleware/error.middleware';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'BoxBee API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/boxes', boxRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/settings', settingsRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🐝 BoxBee API server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});

export default app;

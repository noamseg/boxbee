import apiService from './api.service';
import {
  DurationEstimation,
  TaskBreakdown,
  ParsedTask,
  CoachingMessage,
  AIResponse,
} from '../types/ai.types';

class AIService {
  /**
   * Get AI estimation for task duration
   */
  async estimateDuration(taskName: string): Promise<DurationEstimation> {
    const response = await apiService.post<AIResponse<DurationEstimation>>(
      '/ai/estimate-duration',
      { taskName }
    );
    return response.data;
  }

  /**
   * Get AI suggestions for breaking down a complex task
   */
  async breakdownTask(taskName: string): Promise<TaskBreakdown> {
    const response = await apiService.post<AIResponse<TaskBreakdown>>(
      '/ai/breakdown-task',
      { taskName }
    );
    return response.data;
  }

  /**
   * Parse natural language task input
   */
  async parseTask(input: string): Promise<ParsedTask> {
    const response = await apiService.post<AIResponse<ParsedTask>>(
      '/ai/parse-task',
      { input }
    );
    return response.data;
  }

  /**
   * Get personalized AI coaching message
   */
  async getCoachingMessage(): Promise<string> {
    const response = await apiService.get<AIResponse<CoachingMessage>>(
      '/ai/coaching-message'
    );
    return response.data.message;
  }

  /**
   * Check if AI features are likely available
   * This is a best-effort check - actual availability depends on backend config
   */
  isLikelyAvailable(): boolean {
    // Could add a health check endpoint in the future
    return true;
  }
}

export default new AIService();

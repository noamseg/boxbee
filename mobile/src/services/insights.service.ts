import apiService from './api.service';
import {
  WeeklyStats,
  WeeklyStatsResponse,
  AIInsightsResponse,
} from '../types/insights.types';

class InsightsService {
  /**
   * Get weekly statistics for authenticated user
   */
  async getWeeklyStats(): Promise<WeeklyStats> {
    const response = await apiService.get<WeeklyStatsResponse>('/insights/weekly');
    return response.data.stats;
  }

  /**
   * Get AI-generated insights based on user data
   */
  async getAIInsights(): Promise<string[]> {
    const response = await apiService.get<AIInsightsResponse>('/insights/ai-insights');
    return response.data.insights;
  }
}

export default new InsightsService();

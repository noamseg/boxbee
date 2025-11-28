import { prisma } from '../config/database';
import aiService from './ai.service';

interface WeeklyStats {
  totalBoxes: number;
  completedBoxes: number;
  totalFocusTime: number; // in minutes
  averageFocusQuality: number; // 0-100
  completionRate: number; // percentage
  mostProductiveDay: string;
  mostProductiveTime: string; // morning, afternoon, evening
  topCategory?: string;
  streakDays: number;
}

interface DailyBreakdown {
  day: string;
  boxesCompleted: number;
  focusTime: number;
  averageQuality: number;
}

class InsightsService {
  /**
   * Calculate weekly statistics for a user
   */
  async getWeeklyStats(userId: string): Promise<WeeklyStats> {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get all boxes from the past week
    const boxes = await prisma.box.findMany({
      where: {
        userId,
        createdAt: {
          gte: weekAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const completedBoxes = boxes.filter((b) => b.status === 'completed');

    // Calculate total focus time
    const totalFocusTime = completedBoxes.reduce(
      (sum, box) => sum + (box.actualDuration || box.duration),
      0
    );

    // Calculate average focus quality
    const qualityMap = { great: 100, okay: 60, rough: 30 };
    const qualityScores = completedBoxes
      .filter((b) => b.focusQuality)
      .map((b) => qualityMap[b.focusQuality as keyof typeof qualityMap] || 0);

    const averageFocusQuality =
      qualityScores.length > 0
        ? qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length
        : 0;

    // Calculate completion rate
    const completionRate =
      boxes.length > 0 ? (completedBoxes.length / boxes.length) * 100 : 0;

    // Find most productive day
    const dayBreakdown = this.calculateDailyBreakdown(completedBoxes);
    const mostProductiveDay = this.getMostProductiveDay(dayBreakdown);

    // Find most productive time
    const mostProductiveTime = this.getMostProductiveTime(completedBoxes);

    // Find top category
    const topCategory = this.getTopCategory(completedBoxes);

    // Calculate streak
    const streakDays = await this.calculateStreak(userId);

    return {
      totalBoxes: boxes.length,
      completedBoxes: completedBoxes.length,
      totalFocusTime,
      averageFocusQuality: Math.round(averageFocusQuality),
      completionRate: Math.round(completionRate),
      mostProductiveDay,
      mostProductiveTime,
      topCategory,
      streakDays,
    };
  }

  /**
   * Get daily breakdown for the week
   */
  private calculateDailyBreakdown(boxes: any[]): DailyBreakdown[] {
    const dayMap: { [key: string]: any[] } = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    boxes.forEach((box) => {
      const day = days[new Date(box.completedAt || box.createdAt).getDay()];
      if (!dayMap[day]) dayMap[day] = [];
      dayMap[day].push(box);
    });

    return days.map((day) => {
      const dayBoxes = dayMap[day] || [];
      const qualityMap = { great: 100, okay: 60, rough: 30 };
      const qualities = dayBoxes
        .filter((b) => b.focusQuality)
        .map((b) => qualityMap[b.focusQuality as keyof typeof qualityMap] || 0);

      return {
        day,
        boxesCompleted: dayBoxes.length,
        focusTime: dayBoxes.reduce((sum, b) => sum + (b.actualDuration || b.duration), 0),
        averageQuality: qualities.length > 0
          ? qualities.reduce((sum, q) => sum + q, 0) / qualities.length
          : 0,
      };
    });
  }

  /**
   * Find most productive day
   */
  private getMostProductiveDay(breakdown: DailyBreakdown[]): string {
    if (breakdown.length === 0) return 'N/A';

    const sorted = [...breakdown].sort((a, b) => b.focusTime - a.focusTime);
    return sorted[0].day;
  }

  /**
   * Find most productive time of day
   */
  private getMostProductiveTime(boxes: any[]): string {
    if (boxes.length === 0) return 'N/A';

    const timeBlocks = { morning: 0, afternoon: 0, evening: 0 };

    boxes.forEach((box) => {
      const hour = new Date(box.completedAt || box.createdAt).getHours();
      if (hour >= 5 && hour < 12) timeBlocks.morning++;
      else if (hour >= 12 && hour < 17) timeBlocks.afternoon++;
      else timeBlocks.evening++;
    });

    const maxTime = Math.max(timeBlocks.morning, timeBlocks.afternoon, timeBlocks.evening);
    if (timeBlocks.morning === maxTime) return 'morning';
    if (timeBlocks.afternoon === maxTime) return 'afternoon';
    return 'evening';
  }

  /**
   * Find top category
   */
  private getTopCategory(boxes: any[]): string | undefined {
    if (boxes.length === 0) return undefined;

    const categoryCount: { [key: string]: number } = {};
    boxes.forEach((box) => {
      if (box.category) {
        categoryCount[box.category] = (categoryCount[box.category] || 0) + 1;
      }
    });

    const sorted = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0];
  }

  /**
   * Calculate current streak (days with at least one completed box)
   */
  private async calculateStreak(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let currentDate = new Date(today);

    for (let i = 0; i < 30; i++) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);

      const boxCount = await prisma.box.count({
        where: {
          userId,
          status: 'completed',
          completedAt: {
            gte: currentDate,
            lt: nextDay,
          },
        },
      });

      if (boxCount > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * Generate AI-powered insights based on user data
   */
  async generateInsights(userId: string): Promise<string[]> {
    if (!aiService.isAvailable()) {
      return this.getFallbackInsights();
    }

    const stats = await this.getWeeklyStats(userId);
    const recentBoxes = await prisma.box.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const prompt = `You are BoxBee, an AI productivity coach. Generate 3 personalized insights based on this user's data:

Weekly Stats:
- Completed ${stats.completedBoxes} out of ${stats.totalBoxes} boxes (${stats.completionRate}% completion rate)
- Total focus time: ${stats.totalFocusTime} minutes
- Average focus quality: ${stats.averageFocusQuality}%
- Most productive: ${stats.mostProductiveDay} ${stats.mostProductiveTime}
- Current streak: ${stats.streakDays} days

Recent tasks: ${recentBoxes.map(b => b.taskName).join(', ')}

Generate 3 specific, actionable insights. Each should:
1. Be encouraging and positive
2. Reference specific data points
3. Suggest one concrete action
4. Be 1-2 sentences max

Format as JSON array of strings: ["insight1", "insight2", "insight3"]`;

    try {
      const completion = await aiService['openai']?.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are BoxBee, a friendly productivity coach. Respond only with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 300,
      });

      const response = completion?.choices[0]?.message?.content;
      if (response) {
        const insights = JSON.parse(response);
        return Array.isArray(insights) ? insights : this.getFallbackInsights();
      }
    } catch (error) {
      console.error('Error generating AI insights:', error);
    }

    return this.getFallbackInsights();
  }

  /**
   * Fallback insights when AI is unavailable
   */
  private getFallbackInsights(): string[] {
    return [
      "Great work this week! Keep building your focus habit one box at a time. 🐝",
      "Try scheduling your most important tasks during your peak productivity hours.",
      "Consistency is key - aim for at least one focused session every day!",
    ];
  }
}

export default new InsightsService();

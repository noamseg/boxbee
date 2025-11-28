export interface WeeklyStats {
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

export interface WeeklyStatsResponse {
  success: boolean;
  data: {
    stats: WeeklyStats;
  };
}

export interface AIInsightsResponse {
  success: boolean;
  data: {
    insights: string[];
  };
}

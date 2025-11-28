export interface DurationEstimation {
  estimatedDuration: number;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
}

export interface TaskBreakdown {
  subtasks: string[];
  suggestion: string;
}

export interface ParsedTask {
  taskName: string;
  suggestedDuration?: number;
  category?: string;
}

export interface CoachingMessage {
  message: string;
}

export interface AIResponse<T> {
  success: boolean;
  data: T;
}

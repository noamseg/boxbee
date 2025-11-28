export interface UserSettings {
  id: string;
  userId: string;

  // Notification Preferences
  notifyFiveMinWarning: boolean;
  notifyCompletion: boolean;
  notifyCoaching: boolean;
  notifyMorningPlanning: boolean;
  morningPlanningTime: string | null;
  notifyEveningReflection: boolean;
  notifyWeeklyReport: boolean;
  weeklyReportDay: string;
  weeklyReportTime: string;

  // Quiet Hours
  quietHoursEnabled: boolean;
  quietHoursStart: string | null;
  quietHoursEnd: string | null;

  // AI Coach Settings
  coachPersonality: 'friendly' | 'professional' | 'minimal';
  coachFrequency: 'lots' | 'often' | 'some' | 'rare';
  aiLearningEnabled: boolean;
  aiAutoAdjustTime: boolean;

  // Appearance
  theme: 'light' | 'dark' | 'auto';

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSettingsRequest {
  notifyFiveMinWarning?: boolean;
  notifyCompletion?: boolean;
  notifyCoaching?: boolean;
  notifyMorningPlanning?: boolean;
  morningPlanningTime?: string;
  notifyEveningReflection?: boolean;
  notifyWeeklyReport?: boolean;
  weeklyReportDay?: string;
  weeklyReportTime?: string;
  quietHoursEnabled?: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  coachPersonality?: 'friendly' | 'professional' | 'minimal';
  coachFrequency?: 'lots' | 'often' | 'some' | 'rare';
  aiLearningEnabled?: boolean;
  aiAutoAdjustTime?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

export interface SettingsResponse {
  success: boolean;
  data: {
    settings: UserSettings;
  };
}

import apiService from './api.service';
import {
  UserSettings,
  UpdateSettingsRequest,
  SettingsResponse,
} from '../types/settings.types';

class SettingsService {
  /**
   * Get user settings
   */
  async getSettings(): Promise<SettingsResponse> {
    return apiService.get<SettingsResponse>('/settings');
  }

  /**
   * Update user settings
   */
  async updateSettings(data: UpdateSettingsRequest): Promise<SettingsResponse> {
    return apiService.patch<SettingsResponse>('/settings', data);
  }
}

export default new SettingsService();

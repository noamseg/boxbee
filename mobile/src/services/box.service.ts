import apiService from './api.service';
import {
  Box,
  CreateBoxRequest,
  UpdateBoxRequest,
  CompleteBoxRequest,
  BoxResponse,
  BoxesResponse,
  GetBoxesParams,
} from '../types/box.types';

class BoxService {
  /**
   * Create a new box
   */
  async createBox(data: CreateBoxRequest): Promise<BoxResponse> {
    return apiService.post<BoxResponse>('/boxes', data);
  }

  /**
   * Get all boxes for the authenticated user
   */
  async getBoxes(params?: GetBoxesParams): Promise<BoxesResponse> {
    return apiService.get('/boxes', { params });
  }

  /**
   * Get a single box by ID
   */
  async getBoxById(id: string): Promise<BoxResponse> {
    return apiService.get(`/boxes/${id}`);
  }

  /**
   * Update a box
   */
  async updateBox(id: string, data: UpdateBoxRequest): Promise<BoxResponse> {
    return apiService.patch<BoxResponse>(`/boxes/${id}`, data);
  }

  /**
   * Delete a box
   */
  async deleteBox(id: string): Promise<{ success: boolean; message: string }> {
    return apiService.delete(`/boxes/${id}`);
  }

  /**
   * Start a box (enter focus mode)
   */
  async startBox(id: string): Promise<BoxResponse> {
    return apiService.post<BoxResponse>(`/boxes/${id}/start`);
  }

  /**
   * Complete a box with reflection data
   */
  async completeBox(id: string, data: CompleteBoxRequest): Promise<BoxResponse> {
    return apiService.post<BoxResponse>(`/boxes/${id}/complete`, data);
  }

  /**
   * Get today's boxes
   */
  async getTodayBoxes(): Promise<BoxesResponse> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.getBoxes({
      startDate: today.toISOString(),
      endDate: tomorrow.toISOString(),
    });
  }
}

export default new BoxService();

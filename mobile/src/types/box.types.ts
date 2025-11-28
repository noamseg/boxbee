export interface Box {
  id: string;
  userId: string;
  taskName: string;
  category?: string;
  duration: number; // in minutes
  scheduledFor?: string;
  startedAt?: string;
  completedAt?: string;
  status: 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
  actualDuration?: number;
  focusQuality?: 'great' | 'okay' | 'rough';
  completionStatus?: 'completed' | 'partial' | 'skipped';
  notes?: string;
  aiSuggested: boolean;
  aiEstimated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBoxRequest {
  taskName: string;
  category?: string;
  duration: number;
  scheduledFor?: string;
  aiSuggested?: boolean;
  aiEstimated?: boolean;
}

export interface UpdateBoxRequest {
  taskName?: string;
  category?: string;
  duration?: number;
  scheduledFor?: string;
  status?: 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
  startedAt?: string;
  completedAt?: string;
  actualDuration?: number;
  focusQuality?: 'great' | 'okay' | 'rough';
  completionStatus?: 'completed' | 'partial' | 'skipped';
  notes?: string;
}

export interface CompleteBoxRequest {
  focusQuality: 'great' | 'okay' | 'rough';
  completionStatus: 'completed' | 'partial' | 'skipped';
  notes?: string;
  actualDuration?: number;
}

export interface BoxResponse {
  success: boolean;
  data: {
    box: Box;
  };
}

export interface BoxesResponse {
  success: boolean;
  data: {
    boxes: Box[];
  };
}

export interface GetBoxesParams {
  status?: 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate?: string;
  endDate?: string;
}

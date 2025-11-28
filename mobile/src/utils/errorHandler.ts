import { Alert } from 'react-native';

export interface ApiError {
  response?: {
    data?: {
      error?: {
        message?: string;
        code?: string;
      };
    };
    status?: number;
  };
  message?: string;
  code?: string;
}

/**
 * Get a user-friendly error message from an API error
 */
export const getErrorMessage = (error: any): string => {
  // Network errors
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
    return 'Connection timeout. Please check your internet connection.';
  }

  if (error.code === 'ERR_NETWORK') {
    return 'Network error. Please check your internet connection.';
  }

  // API error responses
  if (error.response?.data?.error?.message) {
    return error.response.data.error.message;
  }

  // HTTP status code errors
  const status = error.response?.status;
  if (status) {
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Session expired. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This action conflicts with existing data.';
      case 422:
        return 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return `An error occurred (${status}). Please try again.`;
    }
  }

  // Generic error message
  if (error.message) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};

/**
 * Show an error alert with a user-friendly message
 */
export const showErrorAlert = (error: any, title: string = 'Error') => {
  const message = getErrorMessage(error);
  Alert.alert(title, message, [{ text: 'OK' }]);
};

/**
 * Log error to console (in development) and optionally to error tracking service
 */
export const logError = (error: any, context?: string) => {
  if (__DEV__) {
    console.error(`[${context || 'Error'}]:`, error);
  }

  // TODO: Add error tracking service integration (e.g., Sentry)
  // Example: Sentry.captureException(error, { extra: { context } });
};

/**
 * Handle error with logging and optional user notification
 */
export const handleError = (
  error: any,
  options: {
    context?: string;
    showAlert?: boolean;
    alertTitle?: string;
  } = {}
) => {
  const { context, showAlert = false, alertTitle = 'Error' } = options;

  logError(error, context);

  if (showAlert) {
    showErrorAlert(error, alertTitle);
  }
};

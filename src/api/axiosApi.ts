import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Define custom error type
interface ApiError extends Error {
  response?: any;
  status?: number;
  isApiError: boolean;
}

// Response type for token refresh
interface RefreshTokenResponse {
  access_token: string;
  refresh_token?: string;
}

// Create API client instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  withCredentials: true
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config: any): Promise<any> => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any): Promise<never> => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: any): Promise<any> => {
    const originalRequest = error.config;
    
    // Check if error is due to unauthorized access and retry hasn't been attempted yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const response: AxiosResponse<RefreshTokenResponse> = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh-token`, 
          {}, 
          { withCredentials: true }
        );
        
        const newToken = response.data.access_token;
        
        // Store the new token
        localStorage.setItem('access_token', newToken);
        
        // Update axios instance header
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        // Update request header
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error - usually redirecting to login
        console.error('Token refresh failed', refreshError);
        
        // Clear tokens since they're invalid
        localStorage.removeItem('access_token');
        
        // Create a custom error
        const tokenError: ApiError = new Error('Authentication failed. Please log in again.') as ApiError;
        tokenError.isApiError = true;
        tokenError.status = 401;
        
        return Promise.reject(tokenError);
      }
    }
    
    // For other errors, just pass them through
    // Format the error for consistent handling
    const apiError: ApiError = new Error(error.response?.data?.message || 'An error occurred') as ApiError;
    apiError.isApiError = true;
    apiError.response = error.response;
    apiError.status = error.response?.status;
    
    return Promise.reject(apiError);
  }
);

// HTTP methods type
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Define the backendApiCall function with TypeScript
export const backendApiCall = async <T = any>(
  endpoint: string, 
  method: HttpMethod = 'POST', 
  data: any = {}, 
  headers: Record<string, string> = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient({
      url: endpoint,
      method,
      data: method === 'GET' ? null  : data,
      params: method === 'GET' ? data : null,
      headers
    });
    
    return response.data;
  } catch (error: any) {
    // Re-throw the error for handling by the caller
    throw error;
  }
};

// Export typed convenience methods
export const get = <T = any>(endpoint: string, params = {}, headers = {}) => 
  backendApiCall<T>(endpoint, 'GET', params, headers);

export const post = <T = any>(endpoint: string, data = {}, headers = {}) => 
  backendApiCall<T>(endpoint, 'POST', data, headers);

export const put = <T = any>(endpoint: string, data = {}, headers = {}) => 
  backendApiCall<T>(endpoint, 'PUT', data, headers);

export const patch = <T = any>(endpoint: string, data = {}, headers = {}) => 
  backendApiCall<T>(endpoint, 'PATCH', data, headers);

export const del = <T = any>(endpoint: string, data = {}, headers = {}) => 
  backendApiCall<T>(endpoint, 'DELETE', data, headers);

// Export the API client for direct use if needed
export default apiClient;

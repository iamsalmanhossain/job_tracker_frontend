import { useAuthStore } from '@/store/auth.store';
import { handleSessionExpired } from '@/lib/auth-utils';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Helper function to get headers and attach token
const getHeaders = (customToken?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = customToken || (typeof window !== 'undefined' ? useAuthStore.getState().token : null);
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Queue & Promise tracking for concurrent refresh token requests
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export const requestNewToken = async (): Promise<string | null> => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      let refreshToken = useAuthStore.getState().refreshToken;

      // Fallback check from localStorage if Zustand state isn't immediately populated
      if (!refreshToken && typeof window !== 'undefined') {
        const stored = localStorage.getItem('auth-storage');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            refreshToken = parsed?.state?.refreshToken || null;
          } catch (e) {}
        }
      }

      if (!refreshToken) {
        return null;
      }

      const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        return null;
      }

      const json = await res.json();
      const newAccessToken = json?.data?.accessToken || json?.accessToken;

      if (newAccessToken) {
        useAuthStore.getState().setToken(newAccessToken);
        return newAccessToken;
      }

      return null;
    } catch (e) {
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

// Unified request runner with 401 interceptor and automatic retry
const requestWithInterceptor = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body?: any
): Promise<any> => {
  const isAuthRoute =
    endpoint.includes('/auth/login') ||
    endpoint.includes('/auth/admin/login') ||
    endpoint.includes('/auth/register') ||
    endpoint.includes('/auth/verify-email') ||
    endpoint.includes('/auth/forgot-password') ||
    endpoint.includes('/auth/reset-password') ||
    endpoint.includes('/auth/refresh-token');

  const makeRequest = async (tokenOverride?: string) => {
    return await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: getHeaders(tokenOverride),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  };

  let response = await makeRequest();

  // If 401 Unauthorized occurs on protected routes, attempt silent token refresh
  if (response.status === 401 && !isAuthRoute) {
    const newAccessToken = await requestNewToken();

    if (newAccessToken) {
      // Retry failed original request with new access token
      response = await makeRequest(newAccessToken);
    } else {
      // Refresh failed or no refresh token available: clear auth and redirect to login
      handleSessionExpired('Your session has expired. Please log in again.');
      const err: any = new Error('Session expired');
      err.status = 401;
      err.response = { data: { message: 'Session expired' } };
      throw err;
    }
  }

  // Handle Response Payload & Errors
  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: `API error: ${response.status}` };
    }

    const errorMsg = typeof errorData?.message === 'string' ? errorData.message.toLowerCase() : '';
    const isSessionExpired =
      response.status === 401 ||
      (response.status === 403 &&
        (errorMsg.includes('token') || errorMsg.includes('expired') || errorMsg.includes('jwt')));

    if (isSessionExpired && !isAuthRoute) {
      handleSessionExpired(errorData?.message || 'Your session has expired. Please log in again.');
    }

    const error: any = new Error(errorData?.message || `API error: ${response.status}`);
    error.response = { data: errorData };
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return null;
  return response.json();
};

// Simple reusable API wrapper
export const api = {
  get: async (endpoint: string) => requestWithInterceptor(endpoint, 'GET'),
  post: async (endpoint: string, data?: any) => requestWithInterceptor(endpoint, 'POST', data),
  put: async (endpoint: string, data?: any) => requestWithInterceptor(endpoint, 'PUT', data),
  patch: async (endpoint: string, data?: any) => requestWithInterceptor(endpoint, 'PATCH', data),
  delete: async (endpoint: string) => requestWithInterceptor(endpoint, 'DELETE'),
};

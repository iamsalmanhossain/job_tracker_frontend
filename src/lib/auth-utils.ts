import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';

let isExpiring = false;

/**
 * Safely parses the payload of a JWT token.
 */
export const parseJwtPayload = (token: string | null): { exp?: number; [key: string]: any } | null => {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

/**
 * Checks if the JWT token is expired.
 */
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const payload = parseJwtPayload(token);
  if (!payload || !payload.exp) return false;
  // exp is in seconds, Date.now() is in milliseconds.
  return Date.now() >= payload.exp * 1000;
};

/**
 * Calculates remaining time in milliseconds until token expiration.
 */
export const getTokenRemainingTime = (token: string | null): number => {
  if (!token) return 0;
  const payload = parseJwtPayload(token);
  if (!payload || !payload.exp) return Infinity;
  return Math.max(0, payload.exp * 1000 - Date.now());
};

/**
 * Centralized session expiration handler.
 * Automatically clears auth store, triggers toast notification, and redirects to /login.
 */
export const handleSessionExpired = (message = 'Your session has expired. Please log in again.') => {
  if (isExpiring) return;
  isExpiring = true;

  const store = useAuthStore.getState();
  store.logout();

  if (typeof window !== 'undefined') {
    toast.error(message, { id: 'session-expired' });
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  setTimeout(() => {
    isExpiring = false;
  }, 2500);
};

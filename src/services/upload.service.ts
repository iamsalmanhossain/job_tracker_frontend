import { requestNewToken } from '@/lib/api';
import { handleSessionExpired } from '@/lib/auth-utils';
import { useAuthStore } from '@/store/auth.store';

export interface UploadResponse {
  success: boolean;
  message?: string;
  data?: {
    fileUrl: string;
    fileId?: string;
    originalName?: string;
    url?: string;
  };
}

export const UploadService = {
  /**
   * Uploads a single file to the specified endpoint using multipart/form-data.
   */
  uploadFile: async (file: File, endpoint = '/upload'): Promise<UploadResponse> => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

    const getToken = () => {
      let token = typeof window !== 'undefined' ? useAuthStore.getState().token : null;
      if (!token && typeof window !== 'undefined') {
        const authState = localStorage.getItem('auth-storage');
        if (authState) {
          try {
            const parsed = JSON.parse(authState);
            token = parsed.state?.token || '';
          } catch (e) {}
        }
      }
      return token || '';
    };

    const doFetch = async (tokenOverride?: string) => {
      const formData = new FormData();
      formData.append('file', file);

      const headers: HeadersInit = {};
      const token = tokenOverride !== undefined ? tokenOverride : getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      return await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });
    };

    let response = await doFetch();

    // If 401, attempt silent token refresh and retry
    if (response.status === 401) {
      const newToken = await requestNewToken();
      if (newToken) {
        response = await doFetch(newToken);
      } else {
        handleSessionExpired('Your session has expired. Please log in again.');
        throw new Error('Your session has expired. Please log in again.');
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 401) {
        handleSessionExpired(errorData?.message || 'Your session has expired. Please log in again.');
      }
      throw new Error(errorData.message || `Upload failed with status ${response.status}`);
    }

    return response.json();
  },
};

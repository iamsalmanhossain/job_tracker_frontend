import { api } from '@/lib/api';

export interface UploadResponse {
  success: boolean;
  message?: string;
  data?: {
    fileUrl: string;
    fileId?: string;
    originalName?: string;
  };
}

export const UploadService = {
  /**
   * Uploads a single file to the specified endpoint using multipart/form-data.
   * Note: The standard `api` wrapper in `src/lib/api.ts` uses `JSON.stringify`, 
   * so for FormData we need to use a custom fetch call or modify the wrapper. 
   * Here we provide a direct fetch implementation that attaches the Auth token.
   */
  uploadFile: async (file: File, endpoint = '/upload'): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    
    // Get token dynamically
    let token = '';
    if (typeof window !== 'undefined') {
      const authState = localStorage.getItem('auth-storage');
      if (authState) {
        try {
          const parsed = JSON.parse(authState);
          token = parsed.state?.token || '';
        } catch (e) {}
      }
    }

    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    // Note: Do NOT set 'Content-Type': 'multipart/form-data'. 
    // The browser sets it automatically with the correct boundary when body is FormData.

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Upload failed with status ${response.status}`);
    }

    return response.json();
  },
};

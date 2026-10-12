import { api } from '@/lib/api';
import { NotificationResponseData, NotificationItem } from '@/types/notification.types';
import { SingleResponse } from '@/types/job-application.types';

export const NotificationService = {
  getAll: async (params?: { isRead?: boolean }): Promise<SingleResponse<NotificationResponseData>> => {
    const query = new URLSearchParams();
    if (params?.isRead !== undefined) query.append('isRead', String(params.isRead));
    const queryString = query.toString() ? `?${query.toString()}` : '';

    const res = await api.get(`/notifications${queryString}`);
    // If backend returns data directly or wrapped in standard response
    if (res?.data?.notifications) {
      return res as SingleResponse<NotificationResponseData>;
    }
    if (Array.isArray(res?.data)) {
      const items = res.data as NotificationItem[];
      return {
        success: true,
        message: '',
        data: {
          notifications: items,
          unreadCount: items.filter((n) => !n.isRead).length,
        },
      };
    }
    return res as SingleResponse<NotificationResponseData>;
  },

  markAsRead: async (id: string): Promise<SingleResponse<NotificationItem>> => {
    return (await api.patch(`/notifications/${id}`, { isRead: true })) as SingleResponse<NotificationItem>;
  },

  markAllAsRead: async (): Promise<SingleResponse<{ count?: number }>> => {
    return (await api.post('/notifications/mark-all-read', {})) as SingleResponse<{ count?: number }>;
  },

  delete: async (id: string): Promise<SingleResponse<null>> => {
    return (await api.delete(`/notifications/${id}`)) as SingleResponse<null>;
  },
};

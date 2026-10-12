export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'INTERVIEW' | 'FOLLOW_UP';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: NotificationType | string;
  isRead: boolean;
  readAt?: string | null;
  createdAt: string;
  link?: string | null;
}

export interface NotificationResponseData {
  notifications: NotificationItem[];
  unreadCount: number;
}

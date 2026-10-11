export type FollowUpStatus = 'PENDING' | 'COMPLETED' | 'CANCELED';

export interface FollowUp {
  id: string;
  applicationId: string;
  title: string;
  description?: string | null;
  scheduledAt: string;
  status: FollowUpStatus;
  completedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  application?: {
    id: string;
    companyName: string;
    jobTitle: string;
  };
}

export interface CreateFollowUpDTO {
  applicationId: string;
  title: string;
  description?: string;
  scheduledAt: string;
  status?: FollowUpStatus;
}

export interface UpdateFollowUpDTO {
  title?: string;
  description?: string;
  scheduledAt?: string;
  status?: FollowUpStatus;
  completedAt?: string | null;
}

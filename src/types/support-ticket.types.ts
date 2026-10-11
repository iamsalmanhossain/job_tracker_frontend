export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface SupportTicket {
  id: string;
  userId?: string;
  subject: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt?: string;
  user?: {
    id: string;
    name?: string;
    email?: string;
    profileImage?: string;
  };
}

export interface CreateSupportTicketDTO {
  subject: string;
  description: string;
}

export interface SupportTicketMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SupportTicketsResponse {
  success: boolean;
  message?: string;
  data: SupportTicket[];
  meta?: SupportTicketMeta;
}

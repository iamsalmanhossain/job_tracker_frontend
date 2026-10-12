import { api } from '@/lib/api';
import {
  SupportTicket,
  CreateSupportTicketDTO,
  SupportTicketsResponse,
  TicketStatus,
} from '@/types/support-ticket.types';
import { SingleResponse } from '@/types/job-application.types';

export const SupportTicketService = {
  getMyTickets: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<SupportTicketsResponse> => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.status && params.status !== 'ALL') query.append('status', params.status);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res: any = await api.get(`/support-tickets/my-tickets${queryString}`);

    let tickets: SupportTicket[] = [];
    if (Array.isArray(res)) {
      tickets = res;
    } else if (Array.isArray(res?.data)) {
      tickets = res.data;
    } else if (Array.isArray(res?.data?.tickets)) {
      tickets = res.data.tickets;
    }

    return {
      success: true,
      data: tickets,
      meta: res?.meta || {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: tickets.length,
        totalPages: 1,
      },
    };
  },

  getById: async (id: string): Promise<SingleResponse<SupportTicket>> => {
    return (await api.get(`/support-tickets/${id}`)) as SingleResponse<SupportTicket>;
  },

  create: async (data: CreateSupportTicketDTO): Promise<SingleResponse<SupportTicket>> => {
    return (await api.post('/support-tickets', data)) as SingleResponse<SupportTicket>;
  },

  /**
   * Admin: Get all tickets across all users
   */
  getAllTicketsAdmin: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<SupportTicketsResponse> => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.status && params.status !== 'ALL') query.append('status', params.status);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res: any = await api.get(`/support-tickets${queryString}`);

    let tickets: SupportTicket[] = [];
    if (Array.isArray(res)) {
      tickets = res;
    } else if (Array.isArray(res?.data)) {
      tickets = res.data;
    } else if (Array.isArray(res?.data?.tickets)) {
      tickets = res.data.tickets;
    }

    return {
      success: true,
      data: tickets,
      meta: res?.meta || {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: tickets.length,
        totalPages: 1,
      },
    };
  },

  /**
   * Admin: Update ticket status
   */
  updateStatusAdmin: async (id: string, status: TicketStatus): Promise<SingleResponse<SupportTicket>> => {
    return (await api.patch(`/support-tickets/${id}`, { status })) as SingleResponse<SupportTicket>;
  },
};

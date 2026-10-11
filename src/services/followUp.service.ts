import { api } from '@/lib/api';
import { FollowUp, CreateFollowUpDTO, UpdateFollowUpDTO } from '@/types/follow-up.types';
import { SingleResponse } from '@/types/job-application.types';

export const FollowUpService = {
  getAll: async (params?: { applicationId?: string }): Promise<SingleResponse<FollowUp[]>> => {
    const query = new URLSearchParams();
    if (params?.applicationId) query.append('applicationId', params.applicationId);
    const queryString = query.toString() ? `?${query.toString()}` : '';

    const res: any = await api.get(`/follow-ups${queryString}`);
    let list: FollowUp[] = [];
    if (Array.isArray(res)) {
      list = res;
    } else if (Array.isArray(res?.data)) {
      list = res.data;
    } else if (Array.isArray(res?.data?.followUps)) {
      list = res.data.followUps;
    } else if (Array.isArray(res?.data?.data)) {
      list = res.data.data;
    }
    return { success: true, message: res?.message || '', data: list };
  },

  create: async (data: CreateFollowUpDTO): Promise<SingleResponse<FollowUp>> => {
    return (await api.post('/follow-ups', data)) as SingleResponse<FollowUp>;
  },

  update: async (id: string, data: UpdateFollowUpDTO): Promise<SingleResponse<FollowUp>> => {
    return (await api.patch(`/follow-ups/${id}`, data)) as SingleResponse<FollowUp>;
  },

  delete: async (id: string): Promise<SingleResponse<null>> => {
    return (await api.delete(`/follow-ups/${id}`)) as SingleResponse<null>;
  },
};

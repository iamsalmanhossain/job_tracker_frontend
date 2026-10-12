import { api } from '@/lib/api';
import { Interview, CreateInterviewDTO, UpdateInterviewDTO } from '@/types/interview.types';
import { SingleResponse } from '@/types/job-application.types';

export const InterviewService = {
  getAll: async (params?: { applicationId?: string; status?: string }): Promise<SingleResponse<Interview[]>> => {
    const query = new URLSearchParams();
    if (params?.applicationId) query.append('applicationId', params.applicationId);
    if (params?.status) query.append('status', params.status);
    const queryString = query.toString() ? `?${query.toString()}` : '';

    const res: any = await api.get(`/interviews${queryString}`);
    let list: Interview[] = [];
    if (Array.isArray(res)) {
      list = res;
    } else if (Array.isArray(res?.data)) {
      list = res.data;
    } else if (Array.isArray(res?.data?.interviews)) {
      list = res.data.interviews;
    } else if (Array.isArray(res?.data?.data)) {
      list = res.data.data;
    }
    return { success: true, message: res?.message || '', data: list };
  },

  getById: async (id: string): Promise<SingleResponse<Interview>> => {
    return (await api.get(`/interviews/${id}`)) as SingleResponse<Interview>;
  },

  create: async (data: CreateInterviewDTO): Promise<SingleResponse<Interview>> => {
    return (await api.post('/interviews', data)) as SingleResponse<Interview>;
  },

  update: async (id: string, data: UpdateInterviewDTO): Promise<SingleResponse<Interview>> => {
    return (await api.patch(`/interviews/${id}`, data)) as SingleResponse<Interview>;
  },

  delete: async (id: string): Promise<SingleResponse<null>> => {
    return (await api.delete(`/interviews/${id}`)) as SingleResponse<null>;
  },
};

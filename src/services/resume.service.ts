import { api } from '@/lib/api';
import { Resume, CreateResumeDTO, UpdateResumeDTO } from '@/types/resume.types';
import { SingleResponse } from '@/types/job-application.types';

export const ResumeService = {
  getAll: async (): Promise<SingleResponse<Resume[]>> => {
    const res: any = await api.get('/resumes');
    let list: Resume[] = [];
    if (Array.isArray(res)) {
      list = res;
    } else if (Array.isArray(res?.data)) {
      list = res.data;
    } else if (Array.isArray(res?.data?.resumes)) {
      list = res.data.resumes;
    } else if (Array.isArray(res?.data?.data)) {
      list = res.data.data;
    }
    return { success: true, message: res?.message || '', data: list };
  },

  getById: async (id: string): Promise<SingleResponse<Resume>> => {
    return (await api.get(`/resumes/${id}`)) as SingleResponse<Resume>;
  },

  create: async (data: CreateResumeDTO): Promise<SingleResponse<Resume>> => {
    return (await api.post('/resumes', data)) as SingleResponse<Resume>;
  },

  update: async (id: string, data: UpdateResumeDTO): Promise<SingleResponse<Resume>> => {
    return (await api.patch(`/resumes/${id}`, data)) as SingleResponse<Resume>;
  },

  delete: async (id: string): Promise<SingleResponse<null>> => {
    return (await api.delete(`/resumes/${id}`)) as SingleResponse<null>;
  },

  setDefault: async (id: string): Promise<SingleResponse<Resume>> => {
    return (await api.patch(`/resumes/${id}`, { isDefault: true })) as SingleResponse<Resume>;
  },
};

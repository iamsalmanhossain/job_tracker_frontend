import { api } from '@/lib/api';
import { 
  CreateJobApplicationDTO, 
  JobApplicationDetail, 
  JobApplicationListItem, 
  JobApplicationStats, 
  PaginatedResponse, 
  SingleResponse 
} from '@/types/job-application.types';

export const JobApplicationService = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<JobApplicationListItem>> => {
    return await api.get(`/job-applications?page=${page}&limit=${limit}`) as PaginatedResponse<JobApplicationListItem>;
  },

  getStats: async (): Promise<SingleResponse<JobApplicationStats>> => {
    return await api.get(`/job-applications/stats`) as SingleResponse<JobApplicationStats>;
  },

  getById: async (id: string): Promise<SingleResponse<JobApplicationDetail>> => {
    return await api.get(`/job-applications/${id}`) as SingleResponse<JobApplicationDetail>;
  },

  create: async (data: CreateJobApplicationDTO): Promise<SingleResponse<JobApplicationDetail>> => {
    return await api.post(`/job-applications`, data) as SingleResponse<JobApplicationDetail>;
  },

  update: async (id: string, data: Partial<CreateJobApplicationDTO>): Promise<SingleResponse<JobApplicationDetail>> => {
    return await api.patch(`/job-applications/${id}`, data) as SingleResponse<JobApplicationDetail>;
  },

  delete: async (id: string): Promise<SingleResponse<null>> => {
    return await api.delete(`/job-applications/${id}`) as SingleResponse<null>;
  }
};

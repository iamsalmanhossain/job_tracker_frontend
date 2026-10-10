import { api } from '@/lib/api';
import { DashboardResponse } from '@/types/dashboard.types';

export const DashboardService = {
  getDashboardData: async (): Promise<DashboardResponse> => {
    const response = await api.get('/user-dashboard');
    return response as DashboardResponse;
  }
};

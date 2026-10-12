import { api } from '@/lib/api';
import { ApplicationNote, CreateNoteDTO, UpdateNoteDTO } from '@/types/note.types';
import { SingleResponse } from '@/types/job-application.types';

export const NoteService = {
  getAll: async (params?: { applicationId?: string }): Promise<SingleResponse<ApplicationNote[]>> => {
    const query = new URLSearchParams();
    if (params?.applicationId) query.append('applicationId', params.applicationId);
    const queryString = query.toString() ? `?${query.toString()}` : '';

    const res: any = await api.get(`/notes${queryString}`);
    let list: ApplicationNote[] = [];
    if (Array.isArray(res)) {
      list = res;
    } else if (Array.isArray(res?.data)) {
      list = res.data;
    } else if (Array.isArray(res?.data?.notes)) {
      list = res.data.notes;
    } else if (Array.isArray(res?.data?.data)) {
      list = res.data.data;
    }
    return { success: true, message: res?.message || '', data: list };
  },

  getById: async (id: string): Promise<SingleResponse<ApplicationNote>> => {
    return (await api.get(`/notes/${id}`)) as SingleResponse<ApplicationNote>;
  },

  create: async (data: CreateNoteDTO): Promise<SingleResponse<ApplicationNote>> => {
    return (await api.post('/notes', data)) as SingleResponse<ApplicationNote>;
  },

  update: async (id: string, data: UpdateNoteDTO): Promise<SingleResponse<ApplicationNote>> => {
    return (await api.patch(`/notes/${id}`, data)) as SingleResponse<ApplicationNote>;
  },

  delete: async (id: string): Promise<SingleResponse<null>> => {
    return (await api.delete(`/notes/${id}`)) as SingleResponse<null>;
  },
};

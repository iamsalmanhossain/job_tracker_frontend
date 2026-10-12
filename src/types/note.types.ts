export interface ApplicationNote {
  id: string;
  applicationId: string;
  userId?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateNoteDTO {
  applicationId: string;
  content: string;
}

export interface UpdateNoteDTO {
  content: string;
}

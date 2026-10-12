export interface Resume {
  id: string;
  userId: string;
  title: string;
  fileUrl: string;
  publicId?: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateResumeDTO {
  title: string;
  fileUrl: string;
  publicId?: string;
  isDefault?: boolean;
}

export interface UpdateResumeDTO {
  title?: string;
  fileUrl?: string;
  publicId?: string;
  isDefault?: boolean;
}

export interface ResumeResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

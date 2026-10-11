export type InterviewType = 
  | 'PHONE' 
  | 'VIDEO' 
  | 'TECHNICAL' 
  | 'HR' 
  | 'ONSITE' 
  | 'FINAL' 
  | 'OTHER';

export type InterviewStatus = 
  | 'SCHEDULED' 
  | 'COMPLETED' 
  | 'PASSED' 
  | 'FAILED' 
  | 'CANCELLED' 
  | 'RESCHEDULED';

export interface Interview {
  id: string;
  applicationId: string;
  type: InterviewType;
  status: InterviewStatus;
  scheduledAt: string;
  meetingLink?: string | null;
  interviewerName?: string | null;
  interviewerEmail?: string | null;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
  application?: {
    id: string;
    companyName: string;
    jobTitle: string;
    location?: string;
    status?: string;
  };
}

export interface CreateInterviewDTO {
  applicationId: string;
  type: InterviewType;
  status?: InterviewStatus;
  scheduledAt: string;
  meetingLink?: string;
  interviewerName?: string;
  interviewerEmail?: string;
  notes?: string;
}

export interface UpdateInterviewDTO {
  applicationId?: string;
  type?: InterviewType;
  status?: InterviewStatus;
  scheduledAt?: string;
  meetingLink?: string;
  interviewerName?: string;
  interviewerEmail?: string;
  notes?: string;
}

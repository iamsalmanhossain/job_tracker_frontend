export type JobStatus = 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
export type JobPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE' | 'INTERNSHIP';
export type JobSource = 'LINKEDIN' | 'INDEED' | 'COMPANY_WEBSITE' | 'REFERRAL' | 'OTHER';

export interface CreateJobApplicationDTO {
  companyName: string;
  jobTitle: string;
  jobType: JobType;
  location: string;
  isRemote: boolean;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  jobUrl: string;
  source: JobSource;
  status: JobStatus;
  priority: JobPriority;
  isFavorite: boolean;
  description: string;
  requirements: string;
  appliedAt: string;
  deadline: string;
}

export interface JobApplicationListItem {
  id: string;
  companyName: string;
  companyLogo: string | null;
  jobTitle: string;
  jobType: JobType;
  location: string;
  status: JobStatus;
  priority: JobPriority;
  isFavorite: boolean;
  appliedAt: string;
  jobUrl: string;
}

export interface JobApplicationDetail {
  id: string;
  userId: string;
  resumeId: string | null;
  companyName: string;
  companyLogo: string | null;
  jobTitle: string;
  jobType: JobType;
  location: string;
  isRemote: boolean;
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: string;
  jobUrl: string;
  source: JobSource;
  status: JobStatus;
  priority: JobPriority;
  isFavorite: boolean;
  description: string;
  requirements: string;
  appliedAt: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplicationStats {
  totalApplications: number;
  applied: number;
  screening: number;
  interview: number;
  offer: number;
  rejected: number;
  activePipeline: number;
  interviewRate: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T[];
}

export interface SingleResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

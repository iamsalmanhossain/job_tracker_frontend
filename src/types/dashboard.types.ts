export interface DashboardStats {
  totalApplications: number;
  applied: number;
  screening: number;
  interview: number;
  offer: number;
  rejected: number;
  activePipeline: number;
  interviewRate: string;
}

export interface JobApplicationShort {
  companyName: string;
  jobTitle: string;
}

export interface UpcomingInterview {
  id: string;
  userId: string;
  applicationId: string;
  type: string;
  status: string;
  scheduledAt: string;
  meetingLink: string;
  interviewerName: string;
  interviewerEmail: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  jobApplication: JobApplicationShort;
}

export interface PendingFollowUp {
  id: string;
  userId: string;
  applicationId: string;
  title: string;
  description: string;
  scheduledAt: string;
  completedAt: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  jobApplication: JobApplicationShort;
}

export interface RecentApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  status: string;
  appliedAt: string;
  createdAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  upcomingInterviews: UpcomingInterview[];
  pendingFollowUps: PendingFollowUp[];
  recentApplications: RecentApplication[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

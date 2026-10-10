import { z } from "zod";

export const JobApplicationSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  jobTitle: z.string().min(1, "Job Title is required"),
  jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP']),
  location: z.string().min(1, "Location is required"),
  isRemote: z.boolean().default(false),
  salaryMin: z.coerce.number().optional().default(0),
  salaryMax: z.coerce.number().optional().default(0),
  salaryCurrency: z.string().default("USD"),
  jobUrl: z.string({message:'Invalid URL'}),
  source: z.enum(['LINKEDIN', 'INDEED', 'COMPANY_WEBSITE', 'REFERRAL', 'OTHER']),
  status: z.enum(['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  isFavorite: z.boolean().default(false),
  description: z.string().optional().default(""),
  requirements: z.string().optional().default(""),
  appliedAt: z.string().min(1, "Application Date is required"),
  deadline: z.string().optional().default(""),
});

export type TJobApplicationSchema = z.infer<typeof JobApplicationSchema>;

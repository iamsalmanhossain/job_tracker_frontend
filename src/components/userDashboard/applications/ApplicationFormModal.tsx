import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { X, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { JobApplicationSchema, TJobApplicationSchema } from "@/validations/job-application.validation"
import { JobApplicationService } from "@/services/jobApplication.service"
import { Button } from "@/components/ui/button"

interface ApplicationFormModalProps {
  isOpen: boolean
  onClose: () => void
  appId: string | null
}

export function ApplicationFormModal({ isOpen, onClose, appId }: ApplicationFormModalProps) {
  const queryClient = useQueryClient()
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TJobApplicationSchema>({
    resolver: zodResolver(JobApplicationSchema) as any,
    defaultValues: {
      status: 'APPLIED',
      priority: 'MEDIUM',
      jobType: 'FULL_TIME',
      source: 'LINKEDIN',
      isRemote: false,
      isFavorite: false,
      salaryCurrency: 'USD',
      salaryMin: 0,
      salaryMax: 0,
      appliedAt: new Date().toISOString().split('T')[0],
      jobUrl: '',
      description: '',
      requirements: '',
    }
  })

  // Fetch details if editing
  const { data: appData, isLoading: isFetching } = useQuery({
    queryKey: ['applicationDetails', appId],
    queryFn: () => JobApplicationService.getById(appId!),
    enabled: !!appId,
  })

  useEffect(() => {
    if (appData?.data) {
      const d = appData.data
      reset({
        companyName: d.companyName,
        jobTitle: d.jobTitle,
        jobType: d.jobType,
        location: d.location,
        isRemote: d.isRemote,
        salaryMin: Number(d.salaryMin),
        salaryMax: Number(d.salaryMax),
        salaryCurrency: d.salaryCurrency,
        jobUrl: d.jobUrl,
        source: d.source,
        status: d.status,
        priority: d.priority,
        isFavorite: d.isFavorite,
        description: d.description,
        requirements: d.requirements,
        appliedAt: new Date(d.appliedAt).toISOString().split('T')[0],
        deadline: d.deadline ? new Date(d.deadline).toISOString().split('T')[0] : '',
      })
    }
  }, [appData, reset])

  const mutation = useMutation({
    mutationFn: (data: TJobApplicationSchema) => 
      appId ? JobApplicationService.update(appId, data) : JobApplicationService.create(data),
    onSuccess: () => {
      toast.success(`Application ${appId ? 'updated' : 'created'} successfully!`)
      queryClient.invalidateQueries({ queryKey: ['applicationsList'] })
      queryClient.invalidateQueries({ queryKey: ['applicationsStats'] })
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] })
      onClose()
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to save application")
    }
  })

  const onSubmit = (data: TJobApplicationSchema) => {
    mutation.mutate(data)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white dark:bg-[#111D15] w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-[600px] sm:rounded-2xl shadow-2xl flex flex-col animate-in sm:slide-in-from-right-8 fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/10 shrink-0">
          <h2 className="text-xl font-bold text-foreground">{appId ? 'Edit Application' : 'New Application'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {isFetching ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <form id="app-form" onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Company Name *</label>
                  <input {...register("companyName")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]" />
                  {errors.companyName && <p className="text-xs text-red-500">{errors.companyName.message}</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Job Title *</label>
                  <input {...register("jobTitle")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]" />
                  {errors.jobTitle && <p className="text-xs text-red-500">{errors.jobTitle.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Location *</label>
                  <input {...register("location")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]" />
                  {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Job Type</label>
                  <select {...register("jobType")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]">
                    <option className="dark:bg-[#111D15] dark:text-white" value="FULL_TIME">Full Time</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="PART_TIME">Part Time</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="CONTRACT">Contract</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="FREELANCE">Freelance</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="INTERNSHIP">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Status</label>
                  <select {...register("status")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]">
                    <option className="dark:bg-[#111D15] dark:text-white" value="APPLIED">Applied</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="SCREENING">Screening</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="INTERVIEW">Interview</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="OFFER">Offer</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="REJECTED">Rejected</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Priority</label>
                  <select {...register("priority")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]">
                    <option className="dark:bg-[#111D15] dark:text-white" value="LOW">Low</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="MEDIUM">Medium</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="HIGH">High</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Source</label>
                  <select {...register("source")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]">
                    <option className="dark:bg-[#111D15] dark:text-white" value="LINKEDIN">LinkedIn</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="INDEED">Indeed</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="COMPANY_WEBSITE">Company Website</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="REFERRAL">Referral</option>
                    <option className="dark:bg-[#111D15] dark:text-white" value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Applied At *</label>
                  <input type="date" {...register("appliedAt")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]" />
                  {errors.appliedAt && <p className="text-xs text-red-500">{errors.appliedAt.message}</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Deadline</label>
                  <input type="date" {...register("deadline")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Job URL</label>
                <input type="url" {...register("jobUrl")} placeholder="https://..." className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]" />
                {errors.jobUrl && <p className="text-xs text-red-500">{errors.jobUrl.message}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Min Salary</label>
                  <input type="number" {...register("salaryMin")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Max Salary</label>
                  <input type="number" {...register("salaryMax")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Currency</label>
                  <input type="text" {...register("salaryCurrency")} className="w-full h-10 px-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]" />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" {...register("isRemote")} className="w-4 h-4 rounded border-gray-300 text-[#1C3627] focus:ring-[#1C3627]" />
                  <span className="text-sm font-medium">Remote Job</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" {...register("isFavorite")} className="w-4 h-4 rounded border-gray-300 text-[#1C3627] focus:ring-[#1C3627]" />
                  <span className="text-sm font-medium">Mark as Favorite</span>
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Job Description</label>
                <textarea {...register("description")} rows={4} className="w-full p-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A] resize-none" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Requirements</label>
                <textarea {...register("requirements")} rows={3} className="w-full p-3 rounded-lg border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A] resize-none" />
              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border/10 flex items-center justify-end gap-3 shrink-0">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Cancel</Button>
          <Button 
            type="submit" 
            form="app-form" 
            disabled={mutation.isPending || isFetching}
            className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold"
          >
            {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {appId ? 'Save Changes' : 'Create Application'}
          </Button>
        </div>
      </div>
    </div>
  )
}

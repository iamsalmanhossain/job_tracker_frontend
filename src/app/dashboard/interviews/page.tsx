import { Metadata } from "next"
import { InterviewsPageContent } from "@/components/userDashboard/interviews/InterviewsPageContent"

export const metadata: Metadata = {
  title: "Interview Tracking | Next Job Track",
  description: "Schedule, track, and log job application interviews and meeting details.",
}

export default function InterviewsPage() {
  return <InterviewsPageContent />
}

import { Metadata } from "next"
import { ResumesPageContent } from "@/components/userDashboard/resumes/ResumesPageContent"

export const metadata: Metadata = {
  title: "Resumes Management | Next Job Track",
  description: "Manage, preview, and organize your tailored resumes.",
}

export default function ResumesPage() {
  return <ResumesPageContent />
}

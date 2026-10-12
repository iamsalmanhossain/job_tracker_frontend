import { Metadata } from "next"
import { FollowUpsPageContent } from "@/components/userDashboard/follow-ups/FollowUpsPageContent"

export const metadata: Metadata = {
  title: "Follow-up Reminders | Next Job Track",
  description: "Track and organize upcoming follow-up reminders for your job applications.",
}

export default function FollowUpsPage() {
  return <FollowUpsPageContent />
}

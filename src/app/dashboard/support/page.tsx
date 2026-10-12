import { Metadata } from "next"
import { SupportPageContent } from "@/components/userDashboard/support/SupportPageContent"

export const metadata: Metadata = {
  title: "Support Tickets | Next Job Track",
  description: "Create support tickets, report issues, and check response statuses.",
}

export default function SupportPage() {
  return <SupportPageContent />
}

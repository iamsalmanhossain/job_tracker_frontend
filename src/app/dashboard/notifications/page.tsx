import { Metadata } from "next";
import { NotificationsContent } from "@/components/userDashboard/notifications/NotificationsContent";

export const metadata: Metadata = {
  title: "Notifications & Alerts | Next Job Track",
  description: "View all your job tracking notifications, interview reminders, and system announcements.",
};

export default function NotificationsPage() {
  return <NotificationsContent />;
}

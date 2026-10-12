import { Metadata } from "next"
import { AdminLogin } from "@/components/auth/AdminLogin"

export const metadata: Metadata = {
  title: "Admin Portal Login | Next Job Track",
  description: "Secure administrative login portal.",
}

export default function AuthAdminLoginPage() {
  return <AdminLogin />
}

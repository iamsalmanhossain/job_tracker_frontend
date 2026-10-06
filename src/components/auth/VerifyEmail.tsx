"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MailCheck } from "lucide-react"

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-green-900/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8 relative z-10 text-center"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <MailCheck className="w-8 h-8 text-green-600 dark:text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-foreground">Verify your email</h1>
        <p className="text-muted-foreground mb-8">
          We've sent a verification link to <span className="font-medium text-foreground">m@example.com</span>. 
          Please check your inbox and click the link to verify your account.
        </p>

        <div className="space-y-4">
          <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold">
            Open Email App
          </Button>
          
          <Button variant="outline" className="w-full h-12 border-border hover:bg-secondary">
            Resend Email
          </Button>
        </div>

        <div className="mt-8">
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-500 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}


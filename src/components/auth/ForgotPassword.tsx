"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, KeyRound } from "lucide-react"

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8 relative z-10"
      >
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
          <KeyRound className="w-6 h-6 text-green-600 dark:text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-foreground">Forgot password?</h1>
        <p className="text-muted-foreground mb-8">
          No worries, we'll send you reset instructions.
        </p>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required className="h-12 bg-background" />
          </div>

          <Button type="submit" className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold">
            Reset password
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to log in
          </Link>
        </div>
      </motion.div>
    </div>
  )
}


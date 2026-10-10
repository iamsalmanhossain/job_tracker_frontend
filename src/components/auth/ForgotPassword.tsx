"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { AuthSchemas, TForgotPassword } from "@/validations/auth.validation"
import { AuthService } from "@/services/auth.service"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const router = useRouter()
  
  const { register, handleSubmit, formState: { errors } } = useForm<TForgotPassword>({
    resolver: zodResolver(AuthSchemas.forgotPassword),
  })

  const mutation = useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: (_, variables) => {
      toast.success("OTP sent to your email!")
      // Redirect to reset password page and pass email in URL
      router.push(`/reset-password?email=${encodeURIComponent(variables.email)}`)
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || "Failed to send reset email"
      toast.error(msg)
    }
  })

  const onSubmit = (data: TForgotPassword) => mutation.mutate(data)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-[#1C3627]/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8 relative z-10"
      >
        <div className="w-12 h-12 bg-[#1C3627]/10 dark:bg-[#A3B18A]/20 rounded-xl flex items-center justify-center mb-6">
          <KeyRound className="w-6 h-6 text-[#1C3627] dark:text-[#A3B18A]" />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-foreground">Forgot password?</h1>
        <p className="text-muted-foreground mb-8">
          No worries, we'll send you a reset OTP to your email.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              {...register("email")}
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              className="h-12 bg-background focus:border-[#A3B18A]" 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <Button type="submit" disabled={mutation.isPending} className="w-full h-12 bg-[#1C3627] hover:bg-[#15291d] dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] text-white font-semibold">
            {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Send OTP
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


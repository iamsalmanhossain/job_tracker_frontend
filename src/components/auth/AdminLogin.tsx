"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Shield, Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { AuthSchemas, TLogin } from "@/validations/auth.validation"
import { AuthService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AdminLogin() {
  const router = useRouter()
  const setCredentials = useAuthStore((state) => state.setCredentials)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(AuthSchemas.login),
  })

  const mutation = useMutation({
    mutationFn: AuthService.adminLogin,
    onSuccess: (res: any) => {
      const token = res.data?.token || res.token || res.data?.accessToken || res.accessToken
      const refreshToken = res.data?.refreshToken || res.refreshToken || null
      const user = res.data?.user || res.user || res.data?.userData || res.userData

      if (token && user) {
        setCredentials(user, token, refreshToken)
        toast.success(res?.message || "Admin authentication successful!")
        router.push("/dashboard/admin")
      } else {
        if (token) setCredentials({ id: "admin", name: "Administrator", email: "demoAdmin@jobtracker.com", role: "ADMIN" } as any, token, refreshToken)
        toast.success("Welcome back, Admin!")
        router.push("/dashboard/admin")
      }
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || "Admin authorization failed"
      toast.error(msg)
    },
  })

  const onSubmit = (data: TLogin) => {
    mutation.mutate(data)
  }

  const handleDemoAdmin = () => {
    mutation.mutate({
      email: "demoAdmin@jobtracker.com",
      password: "DemoAdmin123!",
    })
  }

  return (
    <div className="min-h-screen bg-[#080C0A] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1C3627]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#A3B18A]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Back link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <Link
          href="/login"
          className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to User Login
        </Link>
        <span className="text-[11px] font-semibold text-[#A3B18A] uppercase tracking-wider">
          Secure Gateway
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-[#111D15] border border-border/20 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#1C3627] border border-[#A3B18A]/20 flex items-center justify-center mx-auto mb-4 shadow-lg text-[#A3B18A]">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Portal</h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            Authorized administrative access only. Enter your credentials to manage operations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-email" className="text-xs font-semibold text-foreground">
              Admin Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                {...register("email")}
                id="admin-email"
                type="email"
                placeholder="admin@jobtracker.com"
                className="h-11 pl-10 bg-black/30 border-border/20 focus:border-[#A3B18A] rounded-xl text-sm"
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="admin-password" className="text-xs font-semibold text-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                {...register("password")}
                id="admin-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="h-11 pl-10 pr-10 bg-black/30 border-border/20 focus:border-[#A3B18A] rounded-xl text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-11 rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-bold text-sm mt-4 shadow-lg shadow-[#1C3627]/20"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Authenticating...
              </>
            ) : (
              "Sign In to Admin Portal"
            )}
          </Button>

          {/* Quick Demo Access */}
          <div className="pt-3 border-t border-border/10 mt-4">
            <Button
              type="button"
              variant="outline"
              disabled={mutation.isPending}
              onClick={handleDemoAdmin}
              className="w-full h-10 rounded-xl border-border/30 bg-black/40 hover:bg-[#A3B18A]/10 hover:border-[#A3B18A]/40 text-xs font-bold flex items-center justify-center gap-2 transition-all text-[#A3B18A] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A3B18A]" />
              <span>1-Click Demo Admin Access</span>
            </Button>
          </div>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-border/10 text-center">
          <p className="text-[11px] text-muted-foreground">
            Strict confidentiality and audit logs active for all sessions.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

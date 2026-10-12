"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, LayoutDashboard, Lock, Loader2, Eye, EyeOff, User, Shield, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { AuthSchemas, TLogin, TRegister } from "@/validations/auth.validation"
import { AuthService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"

// --- LOGIN FORM COMPONENT ---
const LoginForm = ({ isMobile, toggleMode }: { isMobile?: boolean, toggleMode: (mode: "login" | "register") => void }) => {
  const router = useRouter()
  const setCredentials = useAuthStore((state) => state.setCredentials)
  const [showPassword, setShowPassword] = useState(false)
  const [demoLoading, setDemoLoading] = useState<"user" | "admin" | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<TLogin>({
    resolver: zodResolver(AuthSchemas.login),
  })

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (res: any) => {
      const token = res.data?.token || res.token || res.data?.accessToken || res.accessToken
      const refreshToken = res.data?.refreshToken || res.refreshToken || null
      const user = res.data?.user || res.user || res.data?.userData || res.userData

      if (token && user) {
        setCredentials(user, token, refreshToken)
        toast.success(res?.message || "Sign in successful!")
        router.push("/dashboard")
      } else {
        console.warn("Unexpected response structure:", res)
        if (token) setCredentials({ id: '', name: '', email: '' } as any, token, refreshToken)
        toast.success("Welcome back!")
        router.push("/dashboard")
      }
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || "Login failed"
      toast.error(msg)
    }
  })

  const onSubmit = (data: TLogin) => mutation.mutate(data)

  // 1-Click Quick Demo Login Handler
  const handleDemoLogin = async (role: "user" | "admin") => {
    setDemoLoading(role)
    try {
      if (role === "user") {
        const res: any = await AuthService.login({
          email: "demoUser@jobtracker.com",
          password: "DemoUser123!",
        })
        const token = res.data?.token || res.token || res.data?.accessToken || res.accessToken
        const refreshToken = res.data?.refreshToken || res.refreshToken || null
        const user = res.data?.user || res.user || res.data?.userData || res.userData

        if (token && user) {
          setCredentials(user, token, refreshToken)
        } else if (token) {
          setCredentials({ id: "demo-user", name: "Demo User", email: "demoUser@jobtracker.com", role: "USER" } as any, token, refreshToken)
        }
        toast.success(res?.message || "Welcome! Logged in as Demo User.")
        router.push("/dashboard")
      } else {
        const res: any = await AuthService.adminLogin({
          email: "demoAdmin@jobtracker.com",
          password: "DemoAdmin123!",
        })
        const token = res.data?.token || res.token || res.data?.accessToken || res.accessToken
        const refreshToken = res.data?.refreshToken || res.refreshToken || null
        const user = res.data?.user || res.user || res.data?.userData || res.userData

        if (token && user) {
          setCredentials(user, token, refreshToken)
        } else if (token) {
          setCredentials({ id: "demo-admin", name: "Demo Admin", email: "demoAdmin@jobtracker.com", role: "ADMIN" } as any, token, refreshToken)
        }
        toast.success(res?.message || "Welcome! Logged in as Demo Admin.")
        router.push("/dashboard/admin")
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || `Demo ${role} login failed`
      toast.error(msg)
    } finally {
      setDemoLoading(null)
    }
  }

  const formVariants = isMobile ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  } : {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }

  return (
    <motion.div 
      key={`login-form-${isMobile ? 'm' : 'd'}`}
      initial={formVariants.initial}
      animate={formVariants.animate}
      exit={formVariants.exit}
      transition={{ duration: 0.3 }}
      className={isMobile ? "" : "w-full max-w-sm mx-auto mt-6"}
    >
      <div className={isMobile ? "mb-5" : "mb-5"}>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-[#1C3627] dark:text-[#E8EDE6]">Sign in</h1>
        <p className="text-muted-foreground text-xs sm:text-sm">Enter your details {isMobile ? "to continue" : "below to access your account"}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        <div className="space-y-1.5">
          <Label htmlFor={`email-login-${isMobile ? 'm' : 'd'}`} className="text-xs sm:text-sm font-medium text-foreground">Email</Label>
          <div className="relative">
            {!isMobile && <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
            <Input 
              {...register("email")}
              id={`email-login-${isMobile ? 'm' : 'd'}`} 
              type="email" 
              placeholder="m@example.com" 
              className={`h-11 ${!isMobile ? "pl-10" : ""} bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl text-sm`} 
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor={`password-login-${isMobile ? 'm' : 'd'}`} className="text-xs sm:text-sm font-medium text-foreground">Password</Label>
            <Link href="/forgot-password" className="text-xs font-medium text-[#A3B18A] hover:text-[#1C3627] dark:hover:text-white transition-colors">
              Forgot{isMobile ? "?" : " password?"}
            </Link>
          </div>
          <div className="relative">
            {!isMobile && <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />}
            <Input 
              {...register("password")}
              id={`password-login-${isMobile ? 'm' : 'd'}`} 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className={`h-11 ${!isMobile ? "pl-10" : "pl-4"} pr-10 bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl text-sm`} 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <Button 
          type="submit" 
          disabled={mutation.isPending || demoLoading !== null} 
          className="w-full h-11 rounded-xl bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-bold text-sm mt-1 shadow-lg shadow-[#1C3627]/10"
        >
          {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isMobile ? "Sign In" : "Login"}
        </Button>
      </form>

      {/* Quick Demo Access Section */}
      <div className="mt-5 pt-4 border-t border-border/20">
        <div className="flex items-center justify-center gap-1.5 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#1C3627] dark:text-[#A3B18A]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Quick Demo Access
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2.5">
          {/* Demo User Button */}
          <Button
            type="button"
            variant="outline"
            disabled={demoLoading !== null || mutation.isPending}
            onClick={() => handleDemoLogin("user")}
            className="h-10 px-3 rounded-xl border-border/40 bg-[#F6F8F6] dark:bg-[#0D140F] hover:bg-[#1C3627]/10 dark:hover:bg-[#A3B18A]/15 hover:border-[#1C3627]/30 dark:hover:border-[#A3B18A]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-foreground cursor-pointer shadow-sm"
          >
            {demoLoading === "user" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1C3627] dark:text-[#A3B18A]" />
            ) : (
              <User className="w-3.5 h-3.5 text-blue-500" />
            )}
            <span>Demo User</span>
          </Button>

          {/* Demo Admin Button */}
          <Button
            type="button"
            variant="outline"
            disabled={demoLoading !== null || mutation.isPending}
            onClick={() => handleDemoLogin("admin")}
            className="h-10 px-3 rounded-xl border-border/40 bg-[#F6F8F6] dark:bg-[#0D140F] hover:bg-[#1C3627]/10 dark:hover:bg-[#A3B18A]/15 hover:border-[#1C3627]/30 dark:hover:border-[#A3B18A]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-foreground cursor-pointer shadow-sm"
          >
            {demoLoading === "admin" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1C3627] dark:text-[#A3B18A]" />
            ) : (
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
            )}
            <span>Demo Admin</span>
          </Button>
        </div>
      </div>

      <p className={`text-center text-xs sm:text-sm text-muted-foreground ${isMobile ? "mt-4" : "mt-5"}`}>
        Don't have an account?{" "}
        <button type="button" onClick={() => toggleMode("register")} className="font-bold text-[#1C3627] dark:text-[#A3B18A] hover:underline">
          Sign up
        </button>
      </p>
    </motion.div>
  )
}


// --- REGISTER FORM COMPONENT ---
const RegisterForm = ({ isMobile, toggleMode }: { isMobile?: boolean, toggleMode: (mode: "login" | "register") => void }) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<TRegister>({
    resolver: zodResolver(AuthSchemas.register),
  })

  const mutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: (_, variables) => {
      toast.success("Registration successful! Please verify your email.")
      router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`)
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || "Registration failed"
      toast.error(msg)
    }
  })

  const onSubmit = (data: TRegister) => mutation.mutate(data)

  const formVariants = isMobile ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  } : {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <motion.div 
      key={`register-form-${isMobile ? 'm' : 'd'}`}
      initial={formVariants.initial}
      animate={formVariants.animate}
      exit={formVariants.exit}
      transition={{ duration: 0.3 }}
      className={isMobile ? "" : "w-full max-w-sm mx-auto mt-12"}
    >
      <div className={isMobile ? "mb-6" : "mb-8"}>
        <h1 className="text-3xl font-bold mb-2 text-[#1C3627] dark:text-[#E8EDE6]">{isMobile ? "Create account" : "Create an account"}</h1>
        <p className="text-muted-foreground text-sm">Start tracking {isMobile ? "today." : "your job applications today."}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`name-reg-${isMobile ? 'm' : 'd'}`} className="text-sm font-medium text-foreground">Full name</Label>
          <div className="relative">
            {!isMobile && <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />}
            <Input 
              {...register("name")}
              id={`name-reg-${isMobile ? 'm' : 'd'}`} 
              placeholder="John Doe" 
              className={`h-11 ${!isMobile ? "pl-10" : "pl-4"} bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl`} 
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`email-reg-${isMobile ? 'm' : 'd'}`} className="text-sm font-medium text-foreground">Email</Label>
          <div className="relative">
            {!isMobile && <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />}
            <Input 
              {...register("email")}
              id={`email-reg-${isMobile ? 'm' : 'd'}`} 
              type="email" 
              placeholder="m@example.com" 
              className={`h-11 ${!isMobile ? "pl-10" : "pl-4"} bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl`} 
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`password-reg-${isMobile ? 'm' : 'd'}`} className="text-sm font-medium text-foreground">Password</Label>
          <div className="relative">
            {!isMobile && <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />}
            <Input 
              {...register("password")}
              id={`password-reg-${isMobile ? 'm' : 'd'}`} 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className={`h-11 ${!isMobile ? "pl-10" : "pl-4"} pr-10 bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl`} 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <Button type="submit" disabled={mutation.isPending} className="w-full h-11 rounded-xl bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-bold text-base mt-2 shadow-lg shadow-[#1C3627]/10">
          {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isMobile ? "Create Account" : "Sign up"}
        </Button>
      </form>

      <p className={`text-center text-sm text-muted-foreground ${isMobile ? "mt-6" : "mt-8"}`}>
        Already have an account?{" "}
        <button type="button" onClick={() => toggleMode("login")} className="font-bold text-[#1C3627] dark:text-[#A3B18A] hover:underline">
          Sign in
        </button>
      </p>
    </motion.div>
  )
}


export default function AuthContainer({ initialMode = "login" }: { initialMode?: "login" | "register" }) {
  const [mode, setMode] = useState(initialMode)
  
  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

  const toggleMode = (newMode: "login" | "register") => {
    setMode(newMode)
    window.history.pushState(null, "", `/${newMode === "login" ? "login" : "register"}`)
  }

  // Define transition settings for the cross-animation
  const crossTransition: any = { type: "tween", ease: "easeInOut", duration: 0.7 }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F6F8F6] dark:bg-[#0D140F] p-4 sm:p-6 lg:p-8 lg:overflow-hidden lg:fixed lg:inset-0">
      {/* Back to Home button floating outside for Desktop */}
      <Link href="/" className="hidden lg:inline-flex absolute top-6 left-6 z-50 items-center text-sm font-medium text-[#1C3627]/60 dark:text-[#A3B18A]/60 hover:text-[#1C3627] dark:hover:text-[#A3B18A] transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to home
      </Link>

      {/* Main Centered Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md lg:max-w-5xl bg-white dark:bg-[#131C16] rounded-3xl lg:rounded-[2rem] shadow-2xl shadow-[#1C3627]/5 border border-border/50 relative overflow-hidden flex flex-col lg:block lg:min-h-[620px] lg:max-h-[680px]"
      >
        
        {/* DESKTOP LAYOUT (Uses crossing animation and side-by-side illustration image) */}
        <div className="hidden lg:block w-full h-full relative">
          
          {/* FORM CONTAINER (Moves Left <-> Right) */}
          <motion.div 
            animate={{ left: mode === "login" ? "0%" : "50%" }}
            transition={crossTransition}
            className="absolute top-0 w-1/2 h-full z-20 bg-white dark:bg-[#131C16] shadow-2xl flex flex-col justify-center px-10 py-8 overflow-y-auto"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-6 absolute top-8 left-10 group">
              <BrandLogo size={32} showText textClassName="text-xl font-bold text-foreground group-hover:opacity-90 transition-opacity" />
            </Link>

            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <LoginForm toggleMode={toggleMode} />
              ) : (
                <RegisterForm toggleMode={toggleMode} />
              )}
            </AnimatePresence>
          </motion.div>

          {/* IMAGE CONTAINER (Moves Right <-> Left) - Displayed ONLY on large screens */}
          <motion.div 
            animate={{ left: mode === "login" ? "50%" : "0%" }}
            transition={crossTransition}
            className="absolute top-0 w-1/2 h-full z-10 bg-[#1C3627] overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.div
                  key="image-login"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src="/images/auth/login_visualization.jpg" 
                    alt="Job Tracking Dashboard Visualization" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="eager"
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-700" 
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C3627]/80 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <h2 className="text-3xl font-bold mb-2">Track your success.</h2>
                    <p className="text-[#A3B18A]">Manage applications, interviews, and offers in one beautifully simple place.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="image-register"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src="/images/auth/register_visualization.jpg" 
                    alt="Career Growth Visualization" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                    priority 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C3627]/80 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <h2 className="text-3xl font-bold mb-2">Accelerate your career.</h2>
                    <p className="text-[#A3B18A]">Join thousands of professionals finding their path with ease.</p>
                  </div>
                </motion.div>
              )}
             </AnimatePresence>
          </motion.div>
        </div>

        {/* MOBILE & TABLET LAYOUT - Clean direct form without the huge image pushing it down */}
        <div className="lg:hidden w-full flex flex-col p-6 sm:p-8">
          {/* Top Header with Logo and Back link */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/20">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size={28} showText textClassName="text-lg font-bold text-foreground" />
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Home
            </Link>
          </div>

          {/* Direct Mobile Form */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <LoginForm isMobile toggleMode={toggleMode} />
              ) : (
                <RegisterForm isMobile toggleMode={toggleMode} />
              )}
            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </div>
  )
}


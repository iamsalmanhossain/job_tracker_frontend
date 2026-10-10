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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, LayoutDashboard, Lock, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { AuthSchemas, TLogin, TRegister } from "@/validations/auth.validation"
import { AuthService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"

// --- LOGIN FORM COMPONENT ---
const LoginForm = ({ isMobile, toggleMode }: { isMobile?: boolean, toggleMode: (mode: "login" | "register") => void }) => {
  const router = useRouter()
  const setCredentials = useAuthStore((state) => state.setCredentials)

  const { register, handleSubmit, formState: { errors } } = useForm<TLogin>({
    resolver: zodResolver(AuthSchemas.login),
  })

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (res: any) => {
      const token = res.data?.token || res.token || res.data?.accessToken || res.accessToken
      const user = res.data?.user || res.user || res.data?.userData || res.userData

      if (token && user) {
        setCredentials(user, token)
        router.push("/dashboard")
      } else {
        // Fallback if structure is unknown, still redirect so the user isn't stuck
        console.warn("Unexpected response structure:", res)
        if (token) setCredentials({}, token)
        router.push("/dashboard")
      }
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || "Login failed"
      toast.error(msg)
    }
  })

  const onSubmit = (data: TLogin) => mutation.mutate(data)

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
      className={isMobile ? "" : "w-full max-w-sm mx-auto mt-12"}
    >
      <div className={isMobile ? "mb-6" : "mb-8"}>
        <h1 className="text-3xl font-bold mb-2 text-[#1C3627] dark:text-[#E8EDE6]">Sign in</h1>
        <p className="text-muted-foreground text-sm">Enter your details {isMobile ? "to continue" : "below to access your account"}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`email-login-${isMobile ? 'm' : 'd'}`} className="text-sm font-medium text-foreground">Email</Label>
          <div className="relative">
            {!isMobile && <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
            <Input 
              {...register("email")}
              id={`email-login-${isMobile ? 'm' : 'd'}`} 
              type="email" 
              placeholder="m@example.com" 
              className={`h-12 ${!isMobile ? "pl-10" : ""} bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl`} 
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`password-login-${isMobile ? 'm' : 'd'}`} className="text-sm font-medium text-foreground">Password</Label>
            <Link href="/forgot-password" className="text-xs font-medium text-[#A3B18A] hover:text-[#1C3627] dark:hover:text-white transition-colors">
              Forgot{isMobile ? "?" : " password?"}
            </Link>
          </div>
          <div className="relative">
            {!isMobile && <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
            <Input 
              {...register("password")}
              id={`password-login-${isMobile ? 'm' : 'd'}`} 
              type="password" 
              placeholder="••••••••" 
              className={`h-12 ${!isMobile ? "pl-10" : ""} bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl`} 
            />
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <Button type="submit" disabled={mutation.isPending} className="w-full h-12 rounded-xl bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-bold text-base mt-2 shadow-lg shadow-[#1C3627]/10">
          {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isMobile ? "Sign In" : "Login"}
        </Button>
      </form>

      <p className={`text-center text-sm text-muted-foreground ${isMobile ? "mt-6" : "mt-8"}`}>
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`name-reg-${isMobile ? 'm' : 'd'}`} className="text-sm font-medium">Full name</Label>
            <Input 
              {...register("name")}
              id={`name-reg-${isMobile ? 'm' : 'd'}`} 
              placeholder="John Doe" 
              className="h-11 bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl" 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          {/* Note: The Zod schema provided only has 'name' not firstName/lastName. Using name for full width or spanning 2 columns, but modifying grid for UI */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor={`email-reg-${isMobile ? 'm' : 'd'}`} className="text-sm font-medium">Email</Label>
            <div className="relative">
              {!isMobile && <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
              <Input 
                {...register("email")}
                id={`email-reg-${isMobile ? 'm' : 'd'}`} 
                type="email" 
                placeholder="m@example.com" 
                className={`h-11 ${!isMobile ? "pl-10" : ""} bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl`} 
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`password-reg-${isMobile ? 'm' : 'd'}`} className="text-sm font-medium">Password</Label>
          <div className="relative">
            {!isMobile && <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
            <Input 
              {...register("password")}
              id={`password-reg-${isMobile ? 'm' : 'd'}`} 
              type="password" 
              placeholder="••••••••" 
              className={`h-11 ${!isMobile ? "pl-10" : ""} bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl`} 
            />
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
  const crossTransition = { type: "tween", ease: "easeInOut", duration: 0.7 }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F6F8F6] dark:bg-[#0D140F] p-4 sm:p-8 lg:overflow-hidden lg:fixed lg:inset-0">
      {/* Back to Home button floating outside */}
      <Link href="/" className="absolute top-6 left-6 z-50 inline-flex items-center text-sm font-medium text-[#1C3627]/60 dark:text-[#A3B18A]/60 hover:text-[#1C3627] dark:hover:text-[#A3B18A] transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to home
      </Link>

      {/* Main Centered Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl h-full max-h-[600px] bg-white dark:bg-[#131C16] rounded-[2rem] shadow-2xl shadow-[#1C3627]/5 border border-border/50 relative overflow-hidden flex flex-col lg:block"
      >
        
        {/* DESKTOP LAYOUT (Uses crossing animation) */}
        <div className="hidden lg:block w-full h-full relative">
          
          {/* FORM CONTAINER (Moves Left <-> Right) */}
          <motion.div 
            animate={{ left: mode === "login" ? "0%" : "50%" }}
            transition={crossTransition}
            className="absolute top-0 w-1/2 h-full z-20 bg-white dark:bg-[#131C16] shadow-2xl flex flex-col justify-center p-12"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-10 absolute top-12 left-12">
              <div className="w-8 h-8 rounded bg-[#1C3627] dark:bg-[#A3B18A] flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-white dark:text-[#1C3627]" />
              </div>
              <span className="text-xl font-bold text-foreground">nextstep.</span>
            </Link>

            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <LoginForm toggleMode={toggleMode} />
              ) : (
                <RegisterForm toggleMode={toggleMode} />
              )}
            </AnimatePresence>
          </motion.div>

          {/* IMAGE CONTAINER (Moves Right <-> Left) */}
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

        {/* MOBILE LAYOUT (No crossing, just standard stacked flex) */}
        <div className="lg:hidden w-full h-full flex flex-col overflow-y-auto">
          {/* Mobile Image Header */}
          <div className="w-full h-64 relative shrink-0">
             <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.div key="m-img-login" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0">
                  <Image src="/images/auth/login_visualization.jpg" alt="Login" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </motion.div>
              ) : (
                <motion.div key="m-img-register" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0">
                  <Image src="/images/auth/register_visualization.jpg" alt="Register" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </motion.div>
              )}
             </AnimatePresence>
             <Link href="/" className="absolute top-4 left-4 z-10 w-10 h-10 bg-background/50 backdrop-blur rounded-full flex items-center justify-center">
               <ArrowLeft className="w-5 h-5" />
             </Link>
          </div>

          {/* Mobile Form */}
          <div className="w-full flex-1 bg-background p-6 z-10 -mt-10 rounded-t-3xl relative">
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


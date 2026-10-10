"use client"

import { motion } from "framer-motion"
import NextLink from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, MailCheck } from "lucide-react"
import { InputOTP, Label, Link as HeroUILink } from "@heroui/react"
import { toast } from "sonner"

import { AuthSchemas, TVerifyEmail } from "@/validations/auth.validation"
import { AuthService } from "@/services/auth.service"
import { Suspense, useEffect, useState } from "react"

function obfuscateEmail(email: string) {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
}

function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailQuery = searchParams.get("email") || ""
  const displayEmail = emailQuery ? obfuscateEmail(emailQuery) : "a****@gmail.com"

  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<TVerifyEmail>({
    resolver: zodResolver(AuthSchemas.verifyEmail),
    defaultValues: {
      email: emailQuery,
      otp: ""
    }
  })

  useEffect(() => {
    register("email")
  }, [register])

  useEffect(() => {
    setMounted(true)
    const storedTime = localStorage.getItem("otp_resend_time")
    if (storedTime) {
      const remaining = Math.floor((parseInt(storedTime) - Date.now()) / 1000)
      if (remaining > 0) {
        setTimeLeft(remaining)
      } else {
        setTimeLeft(0)
      }
    } else {
      const endTime = Date.now() + 120 * 1000
      localStorage.setItem("otp_resend_time", endTime.toString())
      setTimeLeft(120)
    }
  }, [])

  useEffect(() => {
    if (!mounted || timeLeft <= 0) return
    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerId)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerId)
  }, [timeLeft, mounted])

  const mutation = useMutation({
    mutationFn: AuthService.verifyEmail,
    onSuccess: () => {
      toast.success("Email verified successfully! You can now login.")
      router.push("/login")
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || "Verification failed"
      toast.error(msg)
    }
  })

  const resendMutation = useMutation({
    mutationFn: (email: string) => AuthService.resendOtp(email as any),
    onSuccess: () => {
      toast.success("A new OTP has been sent to your email.")
      const endTime = Date.now() + 120 * 1000
      localStorage.setItem("otp_resend_time", endTime.toString())
      setTimeLeft(120) // Reset timer to 2 minutes
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || "Failed to resend OTP"
      toast.error(msg)
    }
  })

  const onSubmit = (data: TVerifyEmail) => mutation.mutate(data)

  const handleResend = (e: React.MouseEvent) => {
    e.preventDefault()
    if (emailQuery) {
      resendMutation.mutate({ email: emailQuery } as any)
    } else {
      toast.error("Email is missing. Cannot resend.")
    }
  }

  const otpValue = watch("otp")
  useEffect(() => {
    if (otpValue?.length === 6) {
      handleSubmit(onSubmit)()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpValue])

  const slotClassName = "w-10 h-10 sm:w-12 sm:h-12 bg-[#27272a] rounded-xl text-white text-lg flex items-center justify-center shrink-0 border-2 border-transparent focus-within:border-[#A3B18A] data-[active=true]:border-[#A3B18A] transition-colors duration-200"

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center w-full mx-auto">
      
      <div className="w-16 h-16 bg-[#1C3627] rounded-full flex items-center justify-center mb-2 shadow-lg shadow-[#1C3627]/20">
        <MailCheck className="w-8 h-8 text-[#A3B18A]" />
      </div>
      <div className="w-full text-center mb-2">
        <h2 className="text-3xl font-bold text-[#1C3627] dark:text-[#E8EDE6]">Verification</h2>
      </div>

      <div className="flex w-full flex-col gap-2 items-center">
        <div className="flex flex-col gap-1 w-full text-center">
          <Label className="text-foreground">Verify account</Label>
          <p className="text-sm text-muted-foreground">We&apos;ve sent a code to <span className="font-medium text-foreground">{displayEmail}</span></p>
        </div>
        
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <div className="w-full flex justify-center py-4 overflow-hidden">
              <InputOTP 
                {...field}    
                maxLength={6} 
                value={field.value} 
                onChange={field.onChange}
              >
                <InputOTP.Group className="flex flex-row flex-nowrap gap-2">
                  <InputOTP.Slot index={0} className={slotClassName} />
                  <InputOTP.Slot index={1} className={slotClassName} />
                  <InputOTP.Slot index={2} className={slotClassName} />
                  <InputOTP.Slot index={3} className={slotClassName} />
                  <InputOTP.Slot index={4} className={slotClassName} />
                  <InputOTP.Slot index={5} className={slotClassName} />
                </InputOTP.Group>
              </InputOTP>
            </div>
          )}
        />
        {errors.otp && <p className="text-red-500 text-xs mt-1 w-full text-center">{errors.otp.message}</p>}

        <div className="flex items-center justify-center gap-[5px] px-1 pt-1 w-full">
          <p className="text-sm text-muted-foreground">Didn&apos;t receive a code?</p>
          {resendMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#A3B18A]" />
          ) : timeLeft > 0 ? (
            <span className="text-sm font-medium text-muted-foreground">
              Resend in {formatTime(timeLeft)}
            </span>
          ) : (
            <HeroUILink 
              className="text-[#1C3627] dark:text-[#A3B18A] underline cursor-pointer font-bold text-sm" 
              onPress={(e: any) => handleResend(e as unknown as React.MouseEvent)}
            >
              Resend
            </HeroUILink>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6 w-full max-w-[280px]">
        <Button type="submit" disabled={mutation.isPending} className="w-full h-12 rounded-xl bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-bold text-base shadow-lg shadow-[#1C3627]/10">
          {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Verify Account
        </Button>

        <NextLink href="/login" className="inline-flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mt-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </NextLink>
      </div>
    </form>
  )
}

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F8F6] dark:bg-[#0D140F] p-4 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-[#131C16] p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-[#1C3627]/5 border border-border/50 relative z-10 flex flex-col items-center"
      >
        <Suspense fallback={<p>Loading...</p>}>
          <VerifyEmailForm />
        </Suspense>
      </motion.div>
    </div>
  )
}


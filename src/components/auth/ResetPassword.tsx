"use client"

import { useState, Suspense, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NextLink from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, LockKeyhole, Loader2, Lock } from "lucide-react"
import { InputOTP } from "@heroui/react"
import { toast } from "sonner"

import { AuthSchemas } from "@/validations/auth.validation"
import { AuthService } from "@/services/auth.service"

// Extend reset password schema locally to include confirm password
const ResetPasswordSchemaLocal = AuthSchemas.resetPassword.extend({
  confirmPassword: z.string().min(1, "Confirm password is required")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type TResetPasswordLocal = z.infer<typeof ResetPasswordSchemaLocal>;

function obfuscateEmail(email: string) {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
}

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailQuery = searchParams.get("email") || ""
  const initialStep = (parseInt(searchParams.get("step") || "1") === 2 ? 2 : 1) as 1 | 2
  const displayEmail = emailQuery ? obfuscateEmail(emailQuery) : "a****@gmail.com"

  const [step, setStep] = useState<1 | 2>(initialStep)
  const [showPassword, setShowPassword] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  // Recover OTP from sessionStorage if available
  const [savedOtp, setSavedOtp] = useState("")

  useEffect(() => {
    setMounted(true)
    const storedOtp = sessionStorage.getItem("reset_otp")
    if (storedOtp) setSavedOtp(storedOtp)

    const storedTime = localStorage.getItem("reset_otp_time")
    if (storedTime) {
      const remaining = Math.floor((parseInt(storedTime) - Date.now()) / 1000)
      if (remaining > 0) {
        setTimeLeft(remaining)
      } else {
        setTimeLeft(0)
      }
    } else {
      const endTime = Date.now() + 120 * 1000
      localStorage.setItem("reset_otp_time", endTime.toString())
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

  const { register, control, handleSubmit, trigger, clearErrors, getValues, formState: { errors, touchedFields, isSubmitted } } = useForm<TResetPasswordLocal>({
    resolver: zodResolver(ResetPasswordSchemaLocal),
    defaultValues: {
      email: emailQuery,
      otp: typeof window !== "undefined" ? sessionStorage.getItem("reset_otp") || "" : "",
      newPassword: "",
      confirmPassword: ""
    }
  })

  const mutation = useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully! You can now login.")
      sessionStorage.removeItem("reset_otp")
      router.push("/login")
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || "Failed to reset password"
      toast.error(msg)
    }
  })

  const resendMutation = useMutation({
    mutationFn: (email: string) => AuthService.forgotPassword({ email }),
    onSuccess: () => {
      toast.success("A new OTP has been sent to your email.")
      const endTime = Date.now() + 120 * 1000
      localStorage.setItem("reset_otp_time", endTime.toString())
      setTimeLeft(120) // Reset timer to 2 minutes
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || "Failed to resend OTP"
      toast.error(msg)
    }
  })

  const handleResend = (e: React.MouseEvent) => {
    e.preventDefault()
    if (emailQuery) {
      resendMutation.mutate(emailQuery)
    } else {
      toast.error("Email is missing. Cannot resend.")
    }
  }

  const onSubmit = (data: TResetPasswordLocal) => {
    // Only send the fields expected by the backend
    mutation.mutate({
      email: data.email,
      otp: data.otp,
      newPassword: data.newPassword
    })
  }

  const onInvalid = (validationErrors: any) => {
    console.error("Form validation failed:", validationErrors);
    if (validationErrors.email) toast.error(`Email: ${validationErrors.email.message}`);
    if (validationErrors.otp) {
      toast.error(`OTP: ${validationErrors.otp.message}`);
      setStep(1); // Go back to step 1 to fix OTP
    }
  }

  const handleNextStep = async () => {
    const isOtpValid = await trigger("otp")
    if (isOtpValid) {
      const currentOtp = getValues("otp")
      sessionStorage.setItem("reset_otp", currentOtp)
      clearErrors(["newPassword", "confirmPassword"])
      setStep(2)
      window.history.pushState(null, "", `?email=${encodeURIComponent(emailQuery)}&step=2`)
    }
  }

  const slotClassName = "w-10 h-10 sm:w-12 sm:h-12 bg-[#27272a] rounded-xl text-white text-lg flex items-center justify-center shrink-0 border-2 border-transparent focus-within:border-[#A3B18A] data-[active=true]:border-[#A3B18A] transition-colors duration-200"

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6 flex flex-col items-center w-full mx-auto">
      {/* Hidden inputs to ensure these values are always registered and submitted even when step 1 unmounts */}
      <input type="hidden" {...register("email")} />
      {/* OTP hidden input removed to prevent conflicting with Controller */}
      
      <div className="w-16 h-16 bg-[#1C3627] rounded-full flex items-center justify-center mb-2 shadow-lg shadow-[#1C3627]/20">
        <LockKeyhole className="w-8 h-8 text-[#A3B18A]" />
      </div>
      <div className="w-full text-center mb-2">
        <h2 className="text-3xl font-bold text-[#1C3627] dark:text-[#E8EDE6]">Set new password</h2>
      </div>
      <br />
      <div className="flex w-full flex-col gap-2 items-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full flex flex-col items-center"
            >
              <div className="flex flex-col gap-1 w-full text-center mb-4 ">
                <Label className="text-foreground ml-2">Verification OTP</Label>
                <p className="text-sm text-muted-foreground">Enter the code sent to <span className="font-medium text-foreground">{displayEmail}</span></p>
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
                      <InputOTP.Group className="flex flex-row flex-nowrap gap-2 items-center justify-center">
                        <InputOTP.Slot index={0} className={slotClassName} />
                        <InputOTP.Slot index={1} className={slotClassName} />
                        <InputOTP.Slot index={2} className={slotClassName} />
                        <span>-</span>
                        <InputOTP.Slot index={3} className={slotClassName} />
                        <InputOTP.Slot index={4} className={slotClassName} />
                        <InputOTP.Slot index={5} className={slotClassName} />
                      </InputOTP.Group>
                    </InputOTP>
                  </div>
                )}
              />
              {errors.otp && <p className="text-red-500 text-xs mt-1 w-full text-center">{errors.otp.message}</p>}

              <div className="flex items-center gap-[5px] px-1 pt-4 text-center justify-center">
                <p className="text-sm text-muted-foreground">Didn&apos;t receive a code?</p>
                {timeLeft > 0 ? (
                  <span className="text-sm font-medium text-foreground">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendMutation.isPending}
                    className="text-sm font-medium text-[#1C3627] dark:text-[#A3B18A] hover:underline focus:outline-none"
                  >
                    Resend
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full space-y-4 max-w-[280px]"
            >
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-foreground">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register("newPassword")}
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 pl-10 bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl"
                  />
                </div>
                {errors.newPassword && (touchedFields.newPassword || isSubmitted) && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 pl-10 bg-[#F6F8F6] dark:bg-[#0D140F] border-transparent focus:border-[#A3B18A] rounded-xl"
                  />
                </div>
                {errors.confirmPassword && (touchedFields.confirmPassword || isSubmitted) && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1C3627] focus:ring-[#A3B18A] bg-background"
                />
                <label htmlFor="showPassword" className="text-sm text-muted-foreground select-none cursor-pointer">
                  Show password
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-4 mt-6 w-full max-w-[280px]">
        {step === 1 ? (
          <Button type="button" onClick={handleNextStep} className="w-full h-12 rounded-xl bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-bold text-base shadow-lg shadow-[#1C3627]/10">
            Verify OTP
          </Button>
        ) : (
          <Button type="submit" disabled={mutation.isPending} className="w-full h-12 rounded-xl bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-bold text-base shadow-lg shadow-[#1C3627]/10">
            {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Reset Password
          </Button>
        )}

        <NextLink href="/login" className="inline-flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mt-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </NextLink>
      </div>
    </form>
  )
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F8F6] dark:bg-[#0D140F] p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-[#131C16] p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-[#1C3627]/5 border border-border/50 relative z-10 flex flex-col items-center"
      >
        <Suspense fallback={<p>Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </motion.div>
    </div>
  )
}

"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import { AuthService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"

export default function LogoutButton({ variant = "default", allDevices = false }: { variant?: "default" | "outline" | "ghost", allDevices?: boolean }) {
  const router = useRouter()
  const logoutAction = useAuthStore(state => state.logout)

  const mutation = useMutation({
    mutationFn: allDevices ? AuthService.logoutAll : AuthService.logout,
    onSettled: () => {
      // Regardless of success or failure (e.g., token already expired),
      // we must clear local state and force redirect to login.
      logoutAction()
      router.push("/login")
    }
  })

  return (
    <Button 
      variant={variant} 
      onClick={() => mutation.mutate()} 
      disabled={mutation.isPending}
      className={variant === "default" ? "bg-[#1C3627] hover:bg-[#15291d] text-white" : ""}
    >
      {mutation.isPending ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4 mr-2" />
      )}
      {allDevices ? "Logout All Devices" : "Logout"}
    </Button>
  )
}

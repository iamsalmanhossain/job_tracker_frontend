import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Trash2, AlertTriangle, Loader2 } from "lucide-react"
import { AuthService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function ProfileSecurity() {
  const [isLoggingOutAll, setIsLoggingOutAll] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogoutAll = async () => {
    try {
      setIsLoggingOutAll(true)
      await AuthService.logoutAll()
      toast.success("Successfully logged out from all devices")
      logout()
      router.push("/login")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to logout from all devices")
    } finally {
      setIsLoggingOutAll(false)
    }
  }

  const handleDeleteClick = () => {
    setDeleteConfirmText("")
    setShowConfirmModal(true)
  }

  const executeDelete = async () => {
    try {
      setIsDeleting(true)
      await AuthService.deleteProfile()
      toast.success("Account deleted successfully")
      setShowConfirmModal(false)
      logout()
      router.push("/login")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete account")
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-bold tracking-wider uppercase text-red-500 border-b border-red-500/20 pb-2 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" /> Danger Zone
      </h4>
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/40 bg-background/50">
          <div>
            <h5 className="font-semibold text-foreground">Log out of all devices</h5>
            <p className="text-sm text-muted-foreground mt-1">Log out of all other active sessions across your devices.</p>
          </div>
          <Button 
            variant="outline" 
            className="shrink-0 text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            onClick={handleLogoutAll}
            disabled={isLoggingOutAll}
          >
            {isLoggingOutAll ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <LogOut className="w-4 h-4 mr-2" />}
            Log out all
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
          <div>
            <h5 className="font-semibold text-red-500">Delete Account</h5>
            <p className="text-sm text-muted-foreground mt-1">Permanently delete your account and all of your data.</p>
          </div>
          <Button 
            variant="destructive" 
            className="shrink-0 bg-red-500 hover:bg-red-600 text-white"
            onClick={handleDeleteClick}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
            Delete account
          </Button>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111D15] rounded-[2rem] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-border/10 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">Delete Account</h3>
            <p className="text-muted-foreground mb-6 text-[15px] leading-relaxed">
              Are you absolutely sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.
            </p>
            
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-foreground">
                Please type <span className="font-bold text-red-500">{user?.name}</span> to confirm.
              </label>
              <input 
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-border/20 bg-black/5 dark:bg-white/5 text-foreground outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                placeholder="Type your name"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 w-full">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmModal(false)}
                className="w-full sm:w-auto h-12 px-6 rounded-xl border-border/20 hover:bg-black/5 dark:hover:bg-white/5"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={executeDelete} 
                disabled={isDeleting || deleteConfirmText.trim().toLowerCase() !== (user?.name || "").trim().toLowerCase()}
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Yes, delete my account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

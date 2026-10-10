import { useRef } from "react"
import { useFormContext } from "react-hook-form"
import { User, Camera, Loader2 } from "lucide-react"
import { UploadService } from "@/services/upload.service"
import { toast } from "sonner"
import { useState } from "react"

export function ProfileAvatar({ isEditing, profileData }: { isEditing: boolean, profileData: any }) {
  const { setValue, watch } = useFormContext()
  const currentImage = watch("profileImage") || profileData?.profileImage
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const response = await UploadService.uploadFile(file, "/upload")
      const url = response.data?.fileUrl || (response.data as any)?.url || (response as any).url
      if (url) {
        setValue("profileImage", url, { shouldDirty: true })
        toast.success("Image uploaded successfully!")
      } else {
        toast.error("Image upload failed: no URL returned.")
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const displayName = profileData?.name || (profileData?.firstName ? `${profileData.firstName} ${profileData?.lastName || ''}` : "Junior")

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background bg-gradient-to-br from-[#1C3627] to-[#A3B18A] flex items-center justify-center shadow-md relative">
            {currentImage ? (
              <img src={currentImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-[#F6F8F6]" />
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>
          {isEditing && (
            <>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
                disabled={isUploading}
              />
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#1C3627] dark:bg-[#A3B18A] border-4 border-background flex items-center justify-center text-white dark:text-[#1C3627] hover:scale-105 transition-transform shadow-sm disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="text-center space-y-4 pt-2 w-full">
        <div>
          <h3 className="text-xl font-bold text-foreground">{displayName}</h3>
          <p className="text-muted-foreground">{profileData?.email}</p>
        </div>
      </div>
    </div>
  )
}

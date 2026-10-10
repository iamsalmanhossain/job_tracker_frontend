"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { AuthSchemas, TUpdateProfile } from "@/validations/auth.validation"
import { AuthService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"

import { ProfileHeader } from "./ProfileHeader"
import { ProfileAvatar } from "./ProfileAvatar"
import { ProfileBasicInfo } from "./ProfileBasicInfo"
import { ProfileLinks } from "./ProfileLinks"
import { ProfileSecurity } from "./ProfileSecurity"


export function Profile() {
  const { user, updateUser } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: AuthService.getProfile
  })

  const profileData = profileResponse?.data?.user || profileResponse?.data || user || {}
  console.log('profileData',profileData)

  useEffect(() => {
    if (profileResponse?.data) {
      const fetchedUser = profileResponse.data.user || profileResponse.data;
      updateUser(fetchedUser);
    }
  }, [profileResponse, updateUser])

  const methods = useForm<TUpdateProfile>({
    resolver: zodResolver(AuthSchemas.updateProfile),
    values: {
      name: profileData.name || "",
      profileImage: profileData.profileImage || "",
      phone: profileData.profile?.phone || profileData.phone || "",
      location: profileData.profile?.location || profileData.location || "",
      bio: profileData.profile?.bio || profileData.bio || "",
      headline: profileData.profile?.headline || profileData.headline || "",
      website: profileData.profile?.website || profileData.website || "",
      linkedinUrl: profileData.profile?.linkedinUrl || profileData.linkedinUrl || "",
      githubUrl: profileData.profile?.githubUrl || profileData.githubUrl || "",
      skills: profileData.profile?.skills || profileData.skills || "",
    }
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateMutation = useMutation({
    mutationFn: AuthService.updateProfile,
    onSuccess: (res: any) => {
      toast.success("Profile updated successfully")
      const updatedData = res?.data?.user || res?.user || res?.data || {}
      updateUser(updatedData)
      setIsEditing(false)
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || "Failed to update profile")
    }
  })

  const onSubmit = (data: TUpdateProfile) => {
    updateMutation.mutate(data)
  }

  if (!mounted) return null

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <ProfileHeader isEditing={isEditing} setIsEditing={setIsEditing} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            
            {/* Left Column: Avatar & Summary */}
            <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0">
              <div className="bg-white dark:bg-[#111D15] rounded-[2rem] shadow-sm border border-border/10 lg:sticky lg:top-6 flex flex-col items-center text-center overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-[#1C3627] to-[#A3B18A] w-full" />
                <div className="px-6 sm:px-8 pb-8 -mt-16 w-full flex flex-col items-center">
                  <ProfileAvatar isEditing={isEditing} profileData={profileData} />
                </div>
              </div>
            </div>

            {/* Right Column: Forms */}
            <div className="flex-1 flex flex-col gap-8">
              <div className="bg-white dark:bg-[#111D15] rounded-[2rem] p-6 sm:p-10 shadow-sm border border-border/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3B18A]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                <ProfileBasicInfo isEditing={isEditing} />
              </div>

              <div className="bg-white dark:bg-[#111D15] rounded-[2rem] p-6 sm:p-10 shadow-sm border border-border/10 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1C3627]/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
                <ProfileLinks isEditing={isEditing} />
              </div>

              {/* Security & Danger Zone - Only visible when not editing (or always visible, let's keep it in a separate card) */}
              {!isEditing && (
                <div className="bg-white dark:bg-[#111D15] rounded-[2rem] p-6 sm:p-10 shadow-sm border border-border/10 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none" />
                  <ProfileSecurity />
                </div>
              )}

              {isEditing && (
                <div className="bg-white dark:bg-[#111D15] rounded-[2rem] p-6 shadow-sm border border-border/10 flex flex-col sm:flex-row justify-end gap-4 sticky bottom-6 z-10">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="h-12 px-8 rounded-xl font-semibold w-full sm:w-auto border-border/20 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={updateMutation.isPending}
                    className="bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-bold h-12 px-8 rounded-xl w-full sm:w-auto"
                  >
                    {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

          </form>
        </FormProvider>
      </motion.div>
    </div>
  )
}

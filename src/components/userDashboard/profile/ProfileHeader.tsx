import { Button } from "@/components/ui/button"

export function ProfileHeader({ isEditing, setIsEditing }: { isEditing: boolean, setIsEditing: (v: boolean) => void }) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your personal information and preferences.</p>
      </div>
      {!isEditing && (
        <Button 
          type="button"
          onClick={() => setIsEditing(true)}
          className="bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] border-none rounded-xl h-10 px-6 font-semibold"
        >
          Edit Profile
        </Button>
      )}
    </div>
  )
}

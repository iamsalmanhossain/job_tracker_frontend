import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Briefcase, MapPin, Phone } from "lucide-react"

export function ProfileBasicInfo({ isEditing }: { isEditing: boolean }) {
  const { register, formState: { errors } } = useFormContext<any>()

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-bold tracking-wider uppercase text-muted-foreground border-b border-border/10 pb-2">Basic Info</h4>
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input disabled={!isEditing} {...register("name")} id="name" placeholder="John Doe" className="pl-10 h-11 bg-background rounded-xl border-border/40 focus:border-[#A3B18A] disabled:opacity-70 disabled:cursor-not-allowed" />
        </div>
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name?.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="headline">Professional Headline</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input disabled={!isEditing} {...register("headline")} id="headline" placeholder="Software Engineer" className="pl-10 h-11 bg-background rounded-xl border-border/40 focus:border-[#A3B18A] disabled:opacity-70 disabled:cursor-not-allowed" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input disabled={!isEditing} {...register("location")} id="location" placeholder="San Francisco, CA" className="pl-10 h-11 bg-background rounded-xl border-border/40 focus:border-[#A3B18A] disabled:opacity-70 disabled:cursor-not-allowed" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input disabled={!isEditing} {...register("phone")} id="phone" placeholder="+1 (555) 000-0000" className="pl-10 h-11 bg-background rounded-xl border-border/40 focus:border-[#A3B18A] disabled:opacity-70 disabled:cursor-not-allowed" />
        </div>
      </div>
    </div>
  )
}

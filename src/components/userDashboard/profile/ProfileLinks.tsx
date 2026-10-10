import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Link as LinkIcon, Globe, Code, ExternalLink } from "lucide-react"

export function ProfileLinks({ isEditing }: { isEditing: boolean }) {
  const { register, watch } = useFormContext<any>()
  const website = watch("website")
  const linkedinUrl = watch("linkedinUrl")
  const githubUrl = watch("githubUrl")

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-bold tracking-wider uppercase text-muted-foreground border-b border-border/10 pb-2">Links & About</h4>
      
      <div className="space-y-2">
        <Label htmlFor="website">Personal Website</Label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input disabled={!isEditing} {...register("website")} id="website" placeholder="https://example.com" className={`pl-10 h-11 bg-background rounded-xl border-border/40 focus:border-[#A3B18A] disabled:opacity-70 disabled:cursor-default ${!isEditing && website ? 'pr-10' : ''}`} />
          {!isEditing && website && (
            <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-[#1C3627] dark:hover:text-[#A3B18A] transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input disabled={!isEditing} {...register("linkedinUrl")} id="linkedinUrl" placeholder="https://linkedin.com/in/username" className={`pl-10 h-11 bg-background rounded-xl border-border/40 focus:border-[#A3B18A] disabled:opacity-70 disabled:cursor-default ${!isEditing && linkedinUrl ? 'pr-10' : ''}`} />
          {!isEditing && linkedinUrl && (
            <a href={linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-[#1C3627] dark:hover:text-[#A3B18A] transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="githubUrl">GitHub URL</Label>
        <div className="relative">
          <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input disabled={!isEditing} {...register("githubUrl")} id="githubUrl" placeholder="https://github.com/username" className={`pl-10 h-11 bg-background rounded-xl border-border/40 focus:border-[#A3B18A] disabled:opacity-70 disabled:cursor-default ${!isEditing && githubUrl ? 'pr-10' : ''}`} />
          {!isEditing && githubUrl && (
            <a href={githubUrl.startsWith('http') ? githubUrl : `https://${githubUrl}`} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-[#1C3627] dark:hover:text-[#A3B18A] transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">About Me</Label>
        <Textarea 
          disabled={!isEditing}
          {...register("bio")} 
          id="bio" 
          placeholder="Write a short bio about yourself..." 
          className="min-h-[100px] resize-none bg-background rounded-xl border-border/40 focus:border-[#A3B18A] p-4 disabled:opacity-70 disabled:cursor-not-allowed" 
        />
      </div>
    </div>
  )
}

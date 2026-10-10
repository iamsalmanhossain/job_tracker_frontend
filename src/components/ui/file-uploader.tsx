"use client"

import React, { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UploadCloud, X, File as FileIcon, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { UploadService, UploadResponse } from "@/services/upload.service"
import { toast } from "sonner"

export interface FileUploaderProps {
  /** Accepted file types (e.g. "image/*, .pdf") */
  accept?: string
  /** Maximum file size in bytes */
  maxSize?: number
  /** Maximum number of files allowed */
  maxFiles?: number
  /** Callback when files change */
  onFilesChange?: (files: File[]) => void
  /** External progress percentage (0-100) */
  progress?: number
  /** Error message from parent */
  error?: string
  /** Automatically upload files to the specified endpoint */
  autoUpload?: boolean
  /** Endpoint to upload to (defaults to '/upload') */
  uploadEndpoint?: string
  /** Callback fired when an upload completes successfully */
  onUploadSuccess?: (response: UploadResponse, file: File) => void
}

interface FileState {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  url?: string;
  errorMessage?: string;
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function FileUploader({
  accept = "*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 1,
  onFilesChange,
  progress,
  error: externalError,
  autoUpload = false,
  uploadEndpoint = '/upload',
  onUploadSuccess,
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileState[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [internalError, setInternalError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const processFiles = useCallback((newFiles: File[]) => {
    setInternalError(null)

    // Validate number of files
    if (files.length + newFiles.length > maxFiles) {
      setInternalError(`You can only upload up to ${maxFiles} file(s).`)
      return
    }

    const validFiles: FileState[] = []
    
    for (const file of newFiles) {
      // Validate size
      if (file.size > maxSize) {
        setInternalError(`File ${file.name} exceeds the maximum size of ${formatBytes(maxSize)}.`)
        return
      }
      validFiles.push({ file, progress: 0, status: 'pending' })
    }

    const updatedFiles = [...files, ...validFiles]
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles.map(f => f.file))

    if (autoUpload) {
      validFiles.forEach(f => handleUpload(f.file))
    }
  }, [files, maxFiles, maxSize, onFilesChange, autoUpload])

  const handleUpload = async (fileToUpload: File) => {
    setFiles(prev => prev.map(f => f.file === fileToUpload ? { ...f, status: 'uploading', progress: 10 } : f))
    
    try {
      // Simulate progress since standard fetch doesn't support upload progress natively
      const progressInterval = setInterval(() => {
        setFiles(prev => prev.map(f => f.file === fileToUpload && f.status === 'uploading' && f.progress < 90 
          ? { ...f, progress: f.progress + 15 } 
          : f
        ))
      }, 500)

      const response = await UploadService.uploadFile(fileToUpload, uploadEndpoint)
      
      clearInterval(progressInterval)
      
      setFiles(prev => prev.map(f => f.file === fileToUpload ? { 
        ...f, 
        status: 'success', 
        progress: 100,
        url: response.data?.fileUrl 
      } : f))

      toast.success(`${fileToUpload.name} uploaded successfully!`)
      onUploadSuccess?.(response, fileToUpload)

    } catch (err: any) {
      setFiles(prev => prev.map(f => f.file === fileToUpload ? { 
        ...f, 
        status: 'error', 
        progress: 0,
        errorMessage: err.message 
      } : f))
      toast.error(`Upload failed: ${err.message}`)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files))
    }
  }, [processFiles])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files))
    }
    // Reset input so the same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [processFiles])

  const removeFile = useCallback((indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles.map(f => f.file))
  }, [files, onFilesChange])

  const displayError = externalError || internalError

  return (
    <div className="w-full space-y-4">
      {/* Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out cursor-pointer overflow-hidden flex flex-col items-center justify-center py-10 px-6 group
          ${isDragging 
            ? "border-[#1C3627] dark:border-[#A3B18A] bg-[#1C3627]/5 dark:bg-[#A3B18A]/10 scale-[1.02]" 
            : "border-border/40 hover:border-[#1C3627]/50 dark:hover:border-[#A3B18A]/50 hover:bg-black/5 dark:hover:bg-white/5"
          }
          ${displayError ? "border-red-500/50 hover:border-red-500 bg-red-500/5" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleFileSelect}
        />
        
        <div className="w-16 h-16 mb-4 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-[#1C3627] dark:text-[#A3B18A]' : 'text-muted-foreground'}`} />
        </div>
        
        <h3 className="text-base font-bold text-foreground mb-1 text-center">
          {isDragging ? "Drop files here" : "Click or drag file to this area to upload"}
        </h3>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Support for a single or bulk upload. Maximum file size {formatBytes(maxSize)}.
        </p>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {displayError && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 px-4 py-3 rounded-xl"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{displayError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <AnimatePresence>
            {files.map((fileState, index) => {
              const { file, status, progress: fileProgress, errorMessage } = fileState
              const isImage = file.type.startsWith('image/')
              
              return (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex flex-col p-3 bg-card border rounded-xl group transition-colors overflow-hidden
                    ${status === 'error' ? 'border-red-500/50 bg-red-500/5' : 'border-border/40 hover:border-[#1C3627]/30 dark:hover:border-[#A3B18A]/30'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 overflow-hidden">
                      {/* Preview / Icon */}
                      <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-black/5 dark:bg-white/5 flex items-center justify-center border border-border/40">
                        {isImage ? (
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={file.name} 
                            className="w-full h-full object-cover"
                            onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                          />
                        ) : (
                          <FileIcon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      
                      {/* Details */}
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium text-foreground truncate max-w-[200px] sm:max-w-[300px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-2">
                          {formatBytes(file.size)}
                          {status === 'error' && <span className="text-red-500">- {errorMessage}</span>}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions / Progress */}
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      {status === 'uploading' && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                      
                      {status === 'success' && <CheckCircle2 className="w-5 h-5 text-[#A3B18A]" />}
                      
                      {(!autoUpload || status === 'error' || status === 'pending') && progress === undefined && (
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* File specific progress bar for auto uploads */}
                  {status === 'uploading' && (
                    <div className="w-full h-1 mt-3 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${fileProgress}%` }}
                        className="h-full bg-[#1C3627] dark:bg-[#A3B18A]"
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Global Progress Bar */}
      {progress !== undefined && progress > 0 && (
        <div className="w-full h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#1C3627] dark:bg-[#A3B18A]"
          />
        </div>
      )}
    </div>
  )
}

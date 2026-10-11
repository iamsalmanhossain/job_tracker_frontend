"use client"

import React from "react"
import Image from "next/image"

interface BrandLogoProps {
  size?: number | string
  className?: string
  showText?: boolean
  textClassName?: string
}

export function BrandLogo({
  size = 32,
  className = "",
  showText = false,
  textClassName = "",
}: BrandLogoProps) {
  const numSize = typeof size === "number" ? size : 32

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: numSize, height: numSize }}>
        {/* Light Mode Logo (with high contrast dark-green 'M' element) */}
        <Image
          src="/images/logo-dark-text-cropped.png"
          alt="Next Job Track Logo"
          width={numSize}
          height={numSize}
          className="w-full h-full object-contain block dark:hidden select-none"
          priority
        />
        {/* Dark Mode Logo (with sleek light-cream 'M' element) */}
        <Image
          src="/images/logo-cropped.png"
          alt="Next Job Track Logo"
          width={numSize}
          height={numSize}
          className="w-full h-full object-contain hidden dark:block select-none"
          priority
        />
      </div>

      {showText && (
        <span className={`font-bold tracking-tight text-foreground ${textClassName}`}>
          Next Job Track
        </span>
      )}
    </div>
  )
}

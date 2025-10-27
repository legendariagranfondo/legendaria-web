import type React from "react"
interface PremiumBadgeProps {
  children: React.ReactNode
  className?: string
}

export default function PremiumBadge({ children, className = "" }: PremiumBadgeProps) {
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full bg-gold-500 text-white text-sm font-semibold shimmer ${className}`}
    >
      <span className="mr-1">✨</span>
      {children}
    </div>
  )
}

import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: "default" | "sm" | "lg"
  className?: string
}

export default function PremiumButton({ children, size = "default", className = "", ...props }: PremiumButtonProps) {
  return (
    <Button
      className={cn(
        "btn-gold-premium font-bold shadow-lg hover:shadow-xl transition-all duration-300 glow-gold border-0",
        "hover:scale-105 transform font-inter",
        className,
      )}
      size={size}
      {...props}
    >
      {children}
    </Button>
  )
}

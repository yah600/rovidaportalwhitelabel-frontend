import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-rovida-gold text-white hover:bg-rovida-gold/80", // Accent color for default
        secondary:
          "border-transparent bg-rovida-slate-green-gray text-white hover:bg-rovida-slate-green-gray/80", // Support color for secondary
        destructive:
          "border-transparent bg-rovida-error text-destructive-foreground hover:bg-rovida-error/80", // Error color
        outline: "text-rovida-navy border-rovida-navy", // Outline in primary navy
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
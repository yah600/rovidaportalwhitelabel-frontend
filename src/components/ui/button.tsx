import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-rovida-navy text-white hover:bg-rovida-navy-90", // Primary button
        destructive: "bg-rovida-error text-destructive-foreground hover:bg-rovida-error/90", // Error state
        outline: "border border-rovida-navy bg-white text-rovida-navy hover:bg-rovida-soft-gray hover:text-rovida-navy", // Secondary button
        secondary: "bg-rovida-soft-gray text-rovida-near-black hover:bg-rovida-soft-gray/80", // Muted background
        ghost: "hover:bg-rovida-soft-gray hover:text-rovida-navy",
        link: "text-rovida-navy underline-offset-4 hover:underline hover:decoration-rovida-gold", // Links
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
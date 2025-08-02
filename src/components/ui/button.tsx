import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold uppercase tracking-wider text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform-gpu",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 hover:rotate-1 active:scale-95 border-2 border-primary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 hover:scale-105 hover:rotate-1 active:scale-95 border-2 border-destructive",
        outline:
          "border-2 border-primary bg-transparent text-primary shadow-lg hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:rotate-1 active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 hover:scale-105 hover:rotate-1 active:scale-95 border-2 border-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:rotate-1 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105 active:scale-95",
        nature: "btn-nature text-white font-medium hover:text-white",
        forest: "bg-gradient-to-r from-primary to-primary-glow text-white shadow-leaf hover:shadow-nature animate-grow",
        earth: "bg-gradient-to-br from-secondary to-secondary-glow text-white border-accent/30 hover:animate-sway"
      },
      size: {
        default: "h-10 px-4 py-2 rounded-sharp",
        sm: "h-9 rounded-sharp px-3 text-xs",
        lg: "h-11 rounded-sharp px-8 text-base",
        icon: "h-10 w-10 rounded-sharp",
        xl: "h-14 rounded-sharp px-12 text-xl font-black tracking-widest"
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

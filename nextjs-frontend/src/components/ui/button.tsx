import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] transition-all duration-normal ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
        destructive:
          "bg-error text-white hover:bg-error/90 active:bg-error/80",
        outline:
          "border border-border-primary bg-transparent hover:bg-bg-secondary active:bg-bg-tertiary",
        secondary:
          "bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:bg-secondary-300",
        ghost: "hover:bg-bg-secondary active:bg-bg-tertiary",
        link: "text-primary-600 underline-offset-4 hover:underline",
        success: "bg-success text-white hover:bg-success/90 active:bg-success/80",
        warning: "bg-warning text-white hover:bg-warning/90 active:bg-warning/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      loading: {
        true: "relative text-transparent",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {children}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }


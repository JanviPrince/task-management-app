import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100",
        outline: "border border-white/20 bg-transparent text-neutral-800 dark:text-neutral-100",
      }
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
)

Badge.displayName = "Badge"

import * as React from "react"
import { cn } from "../../lib/utils"

interface DropdownMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null)

export function DropdownMenu({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <DropdownMenuContext.Provider value={{ open, setOpen }}>
        {children}
      </DropdownMenuContext.Provider>
    </div>
  )
}

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("DropdownMenu components must be wrapped in DropdownMenu")
  }
  return context
}

export function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { open, setOpen } = useDropdownMenuContext()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open)
    if (children && React.isValidElement(children)) {
      children.props.onClick?.(event)
    }
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: handleClick,
    })
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

export function DropdownMenuContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useDropdownMenuContext()

  if (!open) {
    return null
  }

  return (
    <div
      className={cn(
        "absolute right-0 z-50 mt-2 min-w-[180px] overflow-hidden rounded-3xl border border-white/10 bg-white/95 shadow-xl backdrop-blur-xl dark:bg-black/90 dark:border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDropdownMenuContext()

  return (
    <button
      type="button"
      onClick={(event) => {
        setOpen(false)
        onClick?.(event)
      }}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-accent/10 dark:text-white dark:hover:bg-white/10",
        className
      )}
      {...props}
    />
  )
}

export function DropdownMenuLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-3 py-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400", className)} {...props} />
  )
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-1 h-px bg-neutral-200 dark:bg-neutral-800", className)} {...props} />
}

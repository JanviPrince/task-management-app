import * as React from "react"
import { cn } from "../../lib/utils"

interface SelectContextValue {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  items: Array<{ value: string; label: React.ReactNode }>
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

export function Select({
  value,
  onValueChange,
  children,
  ...props
}: {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  const itemList: Array<{ value: string; label: React.ReactNode }> = []

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return
    }

    if (child.type === SelectContent) {
      React.Children.forEach(child.props.children, (item) => {
        if (!React.isValidElement(item) || item.type !== SelectItem) {
          return
        }

        const itemValue = String(item.props.value)
        itemList.push({ value: itemValue, label: item.props.children ?? itemValue })
      })
    }
  })

  return (
    <SelectContext.Provider value={{ value, onValueChange, items: itemList, placeholder: undefined }}>
      <div className={cn("relative inline-flex w-full", props.className)} {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(SelectContext)

  if (!context) {
    throw new Error("SelectTrigger must be used within Select")
  }

  const selected = context.items.find((item) => item.value === context.value)
  const display = selected ? selected.label : React.Children.toArray(children).find((child) => React.isValidElement(child))

  return (
    <div className={cn("relative flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/80 px-3 py-2 text-sm text-neutral-700 outline-none focus-within:ring-2 focus-within:ring-accent dark:border-white/10 dark:bg-white/5 dark:text-white", className)} {...props}>
      <div className="min-w-0 truncate">{display}</div>
      <select
        value={context.value}
        onChange={(event) => context.onValueChange(event.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer appearance-none"
      >
        {context.items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function SelectContent() {
  return null
}

export function SelectItem({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return null
}

export function SelectValue({
  placeholder,
  className,
}: {
  placeholder?: string
  className?: string
}) {
  const context = React.useContext(SelectContext)

  if (!context) {
    throw new Error("SelectValue must be used within Select")
  }

  const selected = context.items.find((item) => item.value === context.value)
  return (
    <span className={cn("truncate", className)}>
      {selected ? selected.label : placeholder}
    </span>
  )
}

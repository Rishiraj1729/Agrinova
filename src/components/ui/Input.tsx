import { cn } from '../../lib/utils'
import type { InputHTMLAttributes } from 'react'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-nv-border bg-white px-3 py-2.5 text-sm text-nv-fg placeholder:text-nv-muted',
        'focus:border-nv-green focus:outline-none focus:ring-2 focus:ring-nv-green/20',
        className,
      )}
      {...props}
    />
  )
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('mb-1.5 block text-xs font-medium text-nv-muted', className)} {...props} />
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full rounded-lg border border-nv-border bg-white px-3 py-2.5 text-sm text-nv-fg',
        'focus:border-nv-green focus:outline-none focus:ring-2 focus:ring-nv-green/20',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-[88px] w-full rounded-lg border border-nv-border bg-white px-3 py-2.5 text-sm text-nv-fg',
        'focus:border-nv-green focus:outline-none focus:ring-2 focus:ring-nv-green/20',
        className,
      )}
      {...props}
    />
  )
}

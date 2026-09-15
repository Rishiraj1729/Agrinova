import { cn } from '../../lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-lg font-semibold shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nv-green/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'bg-nv-green text-white hover:-translate-y-0.5 hover:bg-nv-green-light hover:shadow-md',
        variant === 'secondary' && 'border border-nv-saffron/40 bg-nv-saffron/10 text-nv-fg hover:bg-nv-saffron/20',
        variant === 'ghost' && 'text-nv-muted hover:bg-nv-elevated hover:text-nv-fg',
        variant === 'outline' && 'border border-nv-border bg-white text-nv-fg hover:border-nv-green hover:text-nv-green',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        className,
      )}
      {...props}
    />
  )
}

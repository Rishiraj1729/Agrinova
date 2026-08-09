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
        'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nv-green/50 disabled:opacity-50',
        variant === 'primary' && 'bg-nv-green text-nv-dark hover:bg-nv-green-light',
        variant === 'secondary' && 'bg-nv-card text-nv-fg border border-nv-border hover:bg-nv-muted/10',
        variant === 'ghost' && 'text-nv-muted hover:text-nv-fg hover:bg-nv-muted/10',
        variant === 'outline' && 'border border-nv-border text-nv-fg hover:border-nv-green/40',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        className,
      )}
      {...props}
    />
  )
}

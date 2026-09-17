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
        'inline-flex cursor-pointer items-center justify-center rounded-full font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nv-green/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45',
        variant === 'primary' && 'bg-nv-green text-white hover:bg-nv-green-light',
        variant === 'secondary' && 'bg-nv-elevated text-nv-fg hover:bg-[#e8e6e1]',
        variant === 'ghost' && 'text-nv-muted hover:bg-nv-elevated hover:text-nv-fg',
        variant === 'outline' && 'border border-nv-border bg-white text-nv-fg hover:bg-nv-elevated',
        size === 'sm' && 'px-3.5 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-[15px]',
        className,
      )}
      {...props}
    />
  )
}

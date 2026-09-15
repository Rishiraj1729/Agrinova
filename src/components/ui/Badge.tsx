import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-nv-elevated text-nv-muted',
        variant === 'success' && 'bg-nv-green/15 text-nv-green',
        variant === 'warning' && 'bg-nv-saffron/20 text-nv-credit',
        variant === 'danger' && 'bg-red-100 text-red-700',
        variant === 'info' && 'bg-nv-navy/10 text-nv-navy',
        className,
      )}
    >
      {children}
    </span>
  )
}

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
        variant === 'default' && 'bg-nv-muted/15 text-nv-muted',
        variant === 'success' && 'bg-nv-green/15 text-nv-green',
        variant === 'warning' && 'bg-amber-500/15 text-amber-400',
        variant === 'danger' && 'bg-red-500/15 text-red-400',
        variant === 'info' && 'bg-blue-500/15 text-blue-400',
        className,
      )}
    >
      {children}
    </span>
  )
}

import { Info } from 'lucide-react'
import { cn } from '../../lib/utils'

interface TrustBadgeProps {
  confidence?: number
  reason?: string
  updatedAt?: string
  label?: string
  className?: string
}

export function TrustBadge({ confidence, reason, updatedAt, label = 'Estimated', className }: TrustBadgeProps) {
  return (
    <div className={cn('rounded-lg border border-nv-border/60 bg-nv-dark/50 p-3 text-xs', className)}>
      <div className="flex items-center gap-2 text-nv-muted">
        <Info className="h-3.5 w-3.5 shrink-0" />
        <span className="font-medium">{label}</span>
        {confidence !== undefined && (
          <span className="ml-auto text-nv-green">{confidence}% confidence</span>
        )}
      </div>
      {reason && <p className="mt-1.5 text-nv-muted/80">{reason}</p>}
      {updatedAt && <p className="mt-1 text-nv-muted/60">Last updated: {updatedAt}</p>}
    </div>
  )
}

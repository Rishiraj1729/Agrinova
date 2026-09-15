import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

/** Consistent page hierarchy across every desk */
export function PageHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  icon?: LucideIcon
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}) {
  return (
    <header className={cn('flex flex-wrap items-start justify-between gap-4 pb-1', className)}>
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {Icon && (
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nv-green/10 text-nv-green">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-nv-saffron">{eyebrow}</p>
          )}
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-nv-fg">{title}</h1>
          {description && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-nv-muted">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  )
}

/** Compact metric tile used on dashboards */
export function StatTile({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'default',
}: {
  label: string
  value: ReactNode
  hint?: ReactNode
  icon?: LucideIcon
  tone?: 'default' | 'green' | 'saffron' | 'navy'
}) {
  const toneText = {
    default: 'text-nv-fg',
    green: 'text-nv-green',
    saffron: 'text-nv-credit',
    navy: 'text-nv-navy',
  }[tone]

  return (
    <div className="rounded-2xl border border-nv-border bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-nv-muted">{label}</p>
        {Icon && <Icon className={cn('h-4 w-4', toneText)} />}
      </div>
      <p className={cn('mt-2 text-2xl font-bold tracking-tight', toneText)}>{value}</p>
      {hint && <div className="mt-1 text-[11px] leading-relaxed text-nv-muted">{hint}</div>}
    </div>
  )
}

/** Friendly placeholder instead of a blank table */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-nv-border bg-white/70 p-8 text-center">
      {Icon && (
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-nv-elevated text-nv-muted">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <p className="font-semibold text-nv-fg">{title}</p>
      {description && <p className="mx-auto mt-1 max-w-sm text-sm text-nv-muted">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  )
}

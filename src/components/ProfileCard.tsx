import { cn } from '../lib/utils'
import type { DemoProfile } from '../data/profiles'
import { Sprout, Building2, Landmark, Shield } from 'lucide-react'

const roleTone: Record<DemoProfile['role'], string> = {
  seller: 'bg-nv-green/15 text-nv-green',
  buyer: 'bg-nv-saffron/20 text-nv-credit',
  government: 'bg-nv-navy/10 text-nv-navy',
  admin: 'bg-nv-elevated text-nv-muted',
}

const roleIcon = {
  seller: Sprout,
  buyer: Building2,
  government: Landmark,
  admin: Shield,
}

/** Display-only card — never jumps into another profile’s desk */
export function ProfileCard({ profile, compact }: { profile: DemoProfile; compact?: boolean }) {
  const Icon = roleIcon[profile.role]
  return (
    <div className="h-full rounded-xl border border-nv-border bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-nv-elevated text-sm font-semibold text-nv-fg">
          {profile.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm">{profile.name}</p>
          <p className="text-xs text-nv-muted">{profile.title} · {profile.org}</p>
          <span
            className={cn(
              'mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide',
              roleTone[profile.role],
            )}
          >
            <Icon className="h-3 w-3" />
            {profile.role}
          </span>
        </div>
      </div>
      {!compact && (
        <>
          <p className="mt-3 text-sm text-nv-fg/90 leading-relaxed">“{profile.quote}”</p>
          <ul className="mt-3 space-y-1 text-xs text-nv-muted">
            {profile.story.map((s) => (
              <li key={s}>· {s}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

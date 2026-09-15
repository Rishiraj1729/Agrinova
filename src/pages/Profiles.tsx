import { Link } from 'react-router-dom'
import { LogIn, Sprout, Building2, Landmark, Shield } from 'lucide-react'
import { ProfileCard } from '../components/ProfileCard'
import { ProvenanceBadge } from '../components/ProvenanceBadge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { demoProfiles } from '../data/profiles'
import { dataSources } from '../data/sources'
import { useAuth } from '../contexts/AuthContext'

const sections = [
  { role: 'seller' as const, title: 'Farmers', Icon: Sprout },
  { role: 'buyer' as const, title: 'Buyers', Icon: Building2 },
  { role: 'government' as const, title: 'Government', Icon: Landmark },
  { role: 'admin' as const, title: 'Admin', Icon: Shield },
]

export default function ProfilesPage() {
  const { user, logout } = useAuth()

  return (
    <div className="animate-fade-in space-y-10 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold">Profile directory</h1>
        <p className="text-sm text-nv-muted mt-2 max-w-2xl">
          Roles are kept separate. You are{' '}
          <span className="text-nv-fg font-medium">{user?.displayName ?? 'signed out'}</span>
          {user ? ` (${user.role})` : ''}. Switch account to open another desk — never mid-session.
        </p>
        <Link to="/login" className="inline-block mt-4" onClick={() => logout()}>
          <Button variant="outline"><LogIn className="mr-2 h-4 w-4" /> Switch account</Button>
        </Link>
      </div>

      {sections.map(({ role, title, Icon }) => {
        const list = demoProfiles.filter((p) => p.role === role)
        if (!list.length) return null
        return (
          <section key={role}>
            <h2 className="text-sm font-medium uppercase tracking-wide text-nv-muted mb-3 flex items-center gap-2">
              <Icon className="h-4 w-4" /> {title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {list.map((p) => {
                const isYou = user?.profileId === p.id
                return (
                  <div key={p.id} className={isYou ? 'ring-1 ring-nv-green rounded-xl' : undefined}>
                    <ProfileCard profile={p} />
                    {isYou && (
                      <p className="text-[10px] text-nv-green px-4 pb-2 -mt-2">Active session</p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      <section>
        <h2 className="text-lg font-semibold mb-3">Data authenticity</h2>
        <div className="space-y-3">
          {dataSources.map((s) => (
            <Card key={s.id}>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base">{s.label}</CardTitle>
                  <ProvenanceBadge provenance={s.provenance} />
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>{s.what}</p>
                <p className="text-nv-muted text-xs">{s.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

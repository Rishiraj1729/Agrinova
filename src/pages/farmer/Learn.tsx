import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Mic } from 'lucide-react'
import { AgentChat } from '../../components/AgentChat'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { farmingPractices, type FarmingPractice } from '../../data/farmingPractices'
import { useAuth } from '../../contexts/AuthContext'
import { cn } from '../../lib/utils'

const cats = [
  { id: 'all', label: 'All' },
  { id: 'residue', label: 'Residue' },
  { id: 'sowing', label: 'Sowing' },
  { id: 'soil', label: 'Soil' },
  { id: 'water', label: 'Water' },
  { id: 'income', label: 'Income' },
] as const

export default function LearnPage() {
  const { user } = useAuth()
  const [cat, setCat] = useState<(typeof cats)[number]['id']>('all')
  const [active, setActive] = useState<FarmingPractice | null>(farmingPractices[0])

  if (!user) {
    return (
      <div className="p-6">
        <Link to="/login?portal=citizen"><Button>Sign in as farmer</Button></Link>
      </div>
    )
  }

  const list = farmingPractices.filter((p) => cat === 'all' || p.category === cat)

  return (
    <div className="animate-fade-in mx-auto max-w-4xl space-y-6">
      <div>
        <Badge variant="info" className="mb-2">Kisan learning</Badge>
        <h1 className="text-2xl font-semibold">New farming methods</h1>
        <p className="mt-2 text-sm text-nv-muted">
          Pick a practice, then ask Kisan AI by text or voice (OpenAI). Hindi + English ok.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {cats.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs',
              cat === c.id ? 'border-nv-green bg-nv-green/10 text-nv-green' : 'border-nv-border text-nv-muted',
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p)}
            className={cn(
              'rounded-xl border p-4 text-left transition',
              active?.id === p.id ? 'border-nv-green bg-nv-green/10' : 'border-nv-border bg-nv-card hover:border-nv-green/40',
            )}
          >
            <div className="flex items-start gap-2">
              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-nv-credit" />
              <div>
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="text-[11px] text-nv-muted">{p.hindi}</p>
                <p className="mt-2 text-xs leading-relaxed text-nv-muted">{p.summary}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <Card>
          <CardContent className="space-y-3 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{active.title}</p>
                <ul className="mt-1 text-xs text-nv-muted">
                  {active.benefits.map((b) => (
                    <li key={b}>· {b}</li>
                  ))}
                </ul>
              </div>
              <p className="inline-flex items-center gap-1 text-xs text-nv-muted">
                <Mic className="h-3.5 w-3.5" /> Voice on in chat
              </p>
            </div>
            <AgentChat
              key={active.id}
              role="farmer"
              title={`Learn: ${active.title}`}
              subtitle={`${user.displayName} · ${user.district}`}
              seedPrompt={active.askPrompt}
            />
          </CardContent>
        </Card>
      )}

      <Link to="/farmer/kisansathi" className="text-sm text-nv-green hover:underline">
        Open full Kisan AI →
      </Link>
    </div>
  )
}

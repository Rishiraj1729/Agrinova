import { useMemo, useState } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Input, Label, Select, Textarea } from '../components/ui/Input'
import { PageHeader, StatTile } from '../components/ui/PageHeader'
import { ProvenanceBadge } from '../components/ProvenanceBadge'
import { SourceNote } from '../components/SourceNote'
import {
  questionsFor,
  sampleSurvey,
  surveyMeta,
  tallyChoice,
  type SurveyEntry,
  type SurveyRole,
} from '../data/fieldSurvey'
import { cn } from '../lib/utils'

const EXTRA_KEY = 'agrinova_survey_extra_v1'
const tooltipStyle = { background: '#fff', border: '1px solid #e6e4df', color: '#1d1d1f', borderRadius: 12, fontSize: 12 }
const fills = ['#1f4d3a', '#3d6b54', '#9a6b32', '#6e6e73', '#c4bfb5']

function loadExtra(): SurveyEntry[] {
  try {
    const raw = localStorage.getItem(EXTRA_KEY)
    return raw ? (JSON.parse(raw) as SurveyEntry[]) : []
  } catch {
    return []
  }
}

type Tab = 'findings' | 'responses' | 'form'

const roleLabel: Record<SurveyRole, string> = {
  farmer: 'Farmer',
  buyer: 'Buyer / plant staff',
  government: 'Government (block / ULB)',
}

export default function SurveyPage() {
  const [tab, setTab] = useState<Tab>('findings')
  const [extra, setExtra] = useState<SurveyEntry[]>(loadExtra)
  const [roleFilter, setRoleFilter] = useState<'all' | SurveyRole>('all')
  const all = useMemo(() => [...extra, ...sampleSurvey], [extra])

  const farmers = all.filter((e) => e.role === 'farmer')
  const fate = tallyChoice(all, 'farmer', 'fate')
  const barrier = tallyChoice(all, 'farmer', 'barrier').filter((r) => r.label !== 'I did sell')
  const pickup = tallyChoice(all, 'farmer', 'pickup')
  const small = tallyChoice(all, 'buyer', 'smallholders')
  const govGap = tallyChoice(all, 'government', 'gap')

  const shown = all.filter((e) => roleFilter === 'all' || e.role === roleFilter)

  return (
    <div className="animate-fade-in mx-auto max-w-5xl space-y-8 px-4 py-10">
      <PageHeader
        eyebrow="Field pack · Kharif 2025"
        title="Residue, waste, and matching — survey"
        description="21 farmers (11 Punjab, 10 West Bengal), 5 plant-floor buyers, 3 junior officials. Questions are the same ones the case studies rest on."
      />
      <ProvenanceBadge provenance="FIELD_SURVEY" />

      <div className="grid gap-3 sm:grid-cols-4">
        <StatTile label="Farmers" value={surveyMeta.farmers + extra.filter((e) => e.role === 'farmer').length} hint={`${surveyMeta.punjabFarmers} Punjab · ${surveyMeta.wbFarmers} Bengal`} />
        <StatTile label="Buyers (plant staff)" value={surveyMeta.buyers} hint="Supervisor, clerk, pad operator" />
        <StatTile label="Government" value={surveyMeta.government} hint="ADO, AAO, SI Grade II" tone="saffron" />
        <StatTile label="Would list if 5-day pickup" value={`${pickup.find((p) => p.label === 'Yes')?.pct ?? 0}%`} tone="green" />
      </div>

      <div className="flex flex-wrap gap-2">
        {(['findings', 'responses', 'form'] as Tab[]).map((id) => (
          <Button key={id} size="sm" variant={tab === id ? 'primary' : 'outline'} onClick={() => setTab(id)}>
            {id === 'findings' ? 'Findings' : id === 'responses' ? 'Sample responses' : 'Fill the form'}
          </Button>
        ))}
      </div>

      {tab === 'findings' && (
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Last season’s residue (farmers, n={farmers.length})</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={fate} layout="vertical" margin={{ left: 8, right: 12 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="label" width={160} fontSize={10} stroke="#6e6e73" />
                    <Tooltip formatter={(v: number, _n, p) => [`${v} (${(p.payload as { pct: number }).pct}%)`, 'farmers']} contentStyle={tooltipStyle} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                      {fate.map((_, i) => <Cell key={i} fill={fills[i % fills.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <SourceNote provenance="FIELD_SURVEY">Punjab burns more; Bengal dumps / mixes more. Combined pack.</SourceNote>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Why they did not sell</CardTitle></CardHeader>
              <CardContent className="space-y-3 pt-2">
                {barrier.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-sm">
                      <span>{b.label}</span>
                      <span className="text-nv-muted">{b.count} · {b.pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-nv-elevated">
                      <div className="h-full rounded-full bg-nv-green" style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatTile label="Buyers: smallholders almost never reach the gate" value={`${small.find((s) => s.label === 'Almost never')?.pct ?? 0}%`} hint="of 5 plant staff" />
            <StatTile label="Officials: no utilised-vs-dumped view" value={String(govGap[0]?.count ?? 0)} hint={govGap[0]?.label} tone="saffron" />
            <StatTile label="Junior posts only" value="ADO · AAO · SI-II" hint="No secretary / director sample" />
          </div>
          <p className="text-sm leading-relaxed text-nv-muted">{surveyMeta.note}</p>
        </div>
      )}

      {tab === 'responses' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['all', 'farmer', 'buyer', 'government'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={cn('rounded-full px-3 py-1.5 text-sm', roleFilter === r ? 'bg-nv-green text-white' : 'bg-nv-elevated text-nv-muted')}
              >
                {r === 'all' ? 'All' : roleLabel[r]}
              </button>
            ))}
          </div>
          {shown.map((e) => (
            <Card key={e.id}>
              <CardContent className="pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">
                    {e.name}
                    {e.designation ? <span className="font-normal text-nv-muted"> · {e.designation}</span> : null}
                  </p>
                  <p className="text-xs text-nv-muted">
                    {roleLabel[e.role]} · {e.village}, {e.district}, {e.state}
                    {e.acres ? ` · ${e.acres} ac` : ''}
                  </p>
                </div>
                <dl className="mt-3 space-y-2 text-sm">
                  {questionsFor(e.role).filter((q) => e.answers[q.id]).map((q) => (
                    <div key={q.id} className="grid gap-1 sm:grid-cols-[220px_1fr]">
                      <dt className="text-nv-muted">{q.prompt}</dt>
                      <dd>{e.answers[q.id]}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === 'form' && <SurveyForm extra={extra} setExtra={setExtra} />}
    </div>
  )
}

function SurveyForm({
  extra,
  setExtra,
}: {
  extra: SurveyEntry[]
  setExtra: (rows: SurveyEntry[]) => void
}) {
  const [role, setRole] = useState<SurveyRole>('farmer')
  const [answers, setAnswers] = useState<Record<string, string>>({ state: 'Punjab' })

  function set(id: string, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const entry: SurveyEntry = {
      id: `live-${Date.now()}`,
      role,
      name: answers.name || 'Anonymous',
      designation: answers.rank,
      village: answers.village || '—',
      district: answers.district || '—',
      state: (answers.state as SurveyEntry['state']) || 'Punjab',
      acres: answers.acres ? Number(answers.acres) : undefined,
      answers,
    }
    const next = [entry, ...extra]
    setExtra(next)
    localStorage.setItem(EXTRA_KEY, JSON.stringify(next))
    setAnswers({ state: answers.state || 'Punjab' })
  }

  const qs = questionsFor(role)

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-nv-border bg-white p-6">
      <p className="text-sm text-nv-muted">
        Same instrument as the sample pack. New rows stay in this browser and add to the findings counts.
      </p>
      <div>
        <Label>Role</Label>
        <Select value={role} onChange={(e) => setRole(e.target.value as SurveyRole)}>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer / plant staff</option>
          <option value="government">Government official (block / ULB)</option>
        </Select>
      </div>
      {qs.map((q) => (
        <div key={q.id}>
          <Label>{q.prompt}</Label>
          {q.type === 'choice' && q.options ? (
            <Select value={answers[q.id] ?? ''} onChange={(e) => set(q.id, e.target.value)}>
              <option value="">Select</option>
              {q.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          ) : q.type === 'number' ? (
            <Input type="number" min={0} step={0.5} value={answers[q.id] ?? ''} onChange={(e) => set(q.id, e.target.value)} />
          ) : q.id.endsWith('Note') ? (
            <Textarea value={answers[q.id] ?? ''} onChange={(e) => set(q.id, e.target.value)} />
          ) : (
            <Input value={answers[q.id] ?? ''} onChange={(e) => set(q.id, e.target.value)} />
          )}
        </div>
      ))}
      <Button type="submit">Save this response</Button>
    </form>
  )
}

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CloudSun, FlaskConical, Leaf, MessageSquare, Sprout } from 'lucide-react'
import { AgentChat } from '../../components/AgentChat'
import { DiseaseScanPanel } from '../../components/DiseaseScanPanel'
import { SoilProfileCard } from '../../components/SoilProfileCard'
import { Button } from '../../components/ui/Button'
import { estimateStrawFromParcels, useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { nutritionPlan, type CropKey } from '../../services/nutritionPlan'

type Tab = 'chat' | 'scan' | 'tips' | 'weather' | 'nutrition'

const TIPS = [
  { title: 'List before it hits the drain', body: 'In Madhyamgram–Barasat, leftover straw dumps or mixes after rain. List moisture and acres so a trolley can find you in five days.' },
  { title: 'Wet Bengal heaps need compost-first', body: 'Do not send a wet Madhyamgram heap to a ≤15% biomass cabin. Prefer the Udayrajpur compost pad with a clean lot.' },
  { title: 'Neighbourhood pool for 1.5–3 acres', body: 'Alone, mills skip small lots. Four houses on one lane listing together can fill a trolley.' },
  { title: 'Moisture slip before the truck leaves', body: 'Write moisture on the slip at the lane — not after a gate argument.' },
]

const WEATHER = [
  { level: 'Watch', title: 'Residue moisture rising', detail: 'Light rain in the next 48h can push stacks above plant specs. Sun-dry or choose compost pathway.' },
  { level: 'Window', title: 'Pickup favourable after a dry spell', detail: 'If the heap is drier, list today for a 5-day compost or paper slot.' },
  { level: 'Health', title: 'Humid leaf disease risk', detail: 'Scout rice/wheat for spots after foggy mornings. Use Kisan Bandhu leaf scan.' },
]

export default function KisanSathiPage() {
  const { user, updateSession } = useAuth()
  const { t } = useLanguage()
  const [tab, setTab] = useState<Tab>('chat')
  const crop = (user?.crops?.[0] ?? 'Rice') as CropKey

  const straw = user ? estimateStrawFromParcels(user.parcels) : 0
  const plan = useMemo(
    () => (user ? nutritionPlan(crop, Math.max(user.acres, 1), user.soil.nitrogen) : []),
    [user, crop],
  )

  if (!user) {
    return (
      <div className="p-6">
        <Link to="/login">
          <Button>Sign in first</Button>
        </Link>
      </div>
    )
  }

  const contextPrefix = `West Bengal · ${user.displayName}, ${user.village}, ${user.district}. ${user.acres} ac. Soil ${user.soil.type} pH ${user.soil.ph}. Sale straw ~${straw.toFixed(1)} t. Default: dump/mix leftover, compost-first if wet. Reply in labelled sections with no asterisks.`

  const tabs: { id: Tab; label: string; icon: typeof Leaf }[] = [
    { id: 'chat', label: t('bandhu.tab.chat'), icon: MessageSquare },
    { id: 'scan', label: t('bandhu.tab.scan'), icon: FlaskConical },
    { id: 'tips', label: t('bandhu.tab.tips'), icon: Sprout },
    { id: 'weather', label: t('bandhu.tab.weather'), icon: CloudSun },
    { id: 'nutrition', label: t('bandhu.tab.nutrition'), icon: Leaf },
  ]

  return (
    <div className="animate-fade-in mx-auto max-w-6xl space-y-6">
      <div className="overflow-hidden rounded-[32px] border border-nv-border bg-gradient-to-br from-[#10261c] via-[#1a3a2a] to-[#9a6b32]/80 p-6 text-white sm:p-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">{t('bandhu.kicker')}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{t('bandhu.title')}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{t('bandhu.sub')}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Metric label={t('bandhu.metric.straw')} value={`${straw.toFixed(1)} t`} />
          <Metric label={t('bandhu.metric.soil')} value={`${user.soil.ph} pH`} hint={user.soil.type.replace('_', ' ')} />
          <Metric label={t('bandhu.metric.land')} value={`${user.acres} ac`} hint={user.village} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tabItem) => {
          const Icon = tabItem.icon
          const active = tab === tabItem.id
          return (
            <button
              key={tabItem.id}
              type="button"
              onClick={() => setTab(tabItem.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                active ? 'bg-nv-green text-white' : 'border border-nv-border bg-white text-nv-muted hover:text-nv-fg'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tabItem.label}
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-6">
          {tab === 'chat' && (
            <AgentChat
              role="farmer"
              title={t('bandhu.chat.title')}
              subtitle={t('bandhu.chat.sub')}
              contextLine={contextPrefix}
              promptLabels={[t('bandhu.q1'), t('bandhu.q2'), t('bandhu.q3'), t('bandhu.q4')]}
              prompts={[
                'Should I sell this wet straw or dump it by the drain? Give a farm decision for Madhyamgram.',
                'My straw moisture may be above 15%. Compost pad or paper desk?',
                'Give a simple nutrition plan after rice for my acres and soil N.',
                'I see spots on rice leaves after fog. What should I check before spraying?',
              ]}
            />
          )}
          {tab === 'scan' && <DiseaseScanPanel cropHint={crop} />}
          {tab === 'tips' && (
            <div className="grid gap-3 sm:grid-cols-2">
              {TIPS.map((tip) => (
                <article key={tip.title} className="rounded-3xl border border-nv-border bg-white p-5">
                  <h3 className="font-semibold">{tip.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-nv-muted">{tip.body}</p>
                </article>
              ))}
            </div>
          )}
          {tab === 'weather' && (
            <div className="space-y-3">
              <p className="text-sm text-nv-muted">{t('bandhu.weather.note')}</p>
              {WEATHER.map((w) => (
                <article key={w.title} className="rounded-3xl border border-nv-border bg-white p-5">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-nv-saffron">{w.level}</p>
                  <h3 className="mt-1 font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-nv-muted">{w.detail}</p>
                </article>
              ))}
            </div>
          )}
          {tab === 'nutrition' && (
            <div className="overflow-hidden rounded-3xl border border-nv-border bg-white">
              <div className="border-b border-nv-border px-5 py-4">
                <h3 className="font-semibold">{t('bandhu.nutrition.title')}</h3>
                <p className="mt-1 text-sm text-nv-muted">{t('bandhu.nutrition.sub')}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-nv-elevated text-[11px] uppercase tracking-wide text-nv-muted">
                    <tr>
                      <th className="px-4 py-3">Stage</th>
                      <th className="px-4 py-3">Window</th>
                      <th className="px-4 py-3">Urea kg</th>
                      <th className="px-4 py-3">DAP kg</th>
                      <th className="px-4 py-3">MOP kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.map((row) => (
                      <tr key={row.stage} className="border-t border-nv-border align-top">
                        <td className="px-4 py-3 font-medium">
                          {row.stage}
                          <p className="mt-1 text-[11px] font-normal text-nv-muted">{row.note}</p>
                        </td>
                        <td className="px-4 py-3">{row.dayBand}</td>
                        <td className="px-4 py-3">{row.ureaKgPerAcre}</td>
                        <td className="px-4 py-3">{row.dapKgPerAcre}</td>
                        <td className="px-4 py-3">{row.mopKgPerAcre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <SoilProfileCard soil={user.soil} onChange={(soil) => updateSession({ soil })} />
          <Link to="/farmer/sell" className="block rounded-3xl border border-nv-border bg-white p-5 transition hover:bg-[#fafafa]">
            <p className="text-[11px] uppercase tracking-wide text-nv-muted">{t('bandhu.cta.kicker')}</p>
            <p className="mt-1 font-semibold">{t('bandhu.cta.title')}</p>
            <p className="mt-2 text-sm text-nv-muted">{t('bandhu.cta.sub')}</p>
          </Link>
        </aside>
      </div>
    </div>
  )
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
      <p className="text-[11px] text-white/70">{label}</p>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      {hint && <p className="text-[11px] text-white/65">{hint}</p>}
    </div>
  )
}

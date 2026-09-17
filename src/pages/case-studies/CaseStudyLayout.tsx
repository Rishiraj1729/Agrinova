import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { ProvenanceBadge } from '../../components/ProvenanceBadge'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { monthlyImpact, districtData } from '../../data/analyticsData'
import { formatINR } from '../../lib/utils'

export function CaseStudyDetail({ runCtaTo }: { runCtaTo: string }) {
  const { meta, liveSimulationCount, region } = useCaseStudy()
  const { ledger, transactions } = useMarketplace()
  const regionLedger = ledger.filter((e) => e.region === region)
  const liveTonnes = regionLedger.reduce((s, e) => s + e.quantityTonnes, 0)
  const liveCo2 = regionLedger.reduce((s, e) => s + e.avoidedTco2e, 0)
  const liveIncome = transactions
    .filter((t) => t.region === region && t.status === 'completed')
    .reduce((s, t) => s + t.amount, 0)

  const supplyDemand = region === 'punjab'
    ? districtData.map((d) => ({ name: d.district.slice(0, 6), supply: d.tonnes, demand: Math.round(d.tonnes * 1.15) }))
    : meta.districts.map((d, i) => ({ name: d.slice(0, 6), supply: 20 + i * 8, demand: 28 + i * 6 }))

  return (
    <div className="animate-fade-in space-y-8 max-w-4xl mx-auto px-4 py-10">
      <div>
        <ProvenanceBadge provenance={meta.provenance} className="mb-2" />
        <h1 className="text-2xl font-semibold">{meta.title}</h1>
        <p className="text-sm text-nv-muted mt-2 leading-relaxed">{meta.problem}</p>
      </div>

      <Card>
        <CardContent className="pt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold">
              {region === 'west-bengal' ? 'Walk this as a Burdwan paddy farmer' : 'Walk this as Ramesh Singh, Kharar'}
            </p>
            <p className="text-sm text-nv-muted">
              {region === 'west-bengal'
                ? 'List straw before it is dumped in a drain or mixed into municipal waste.'
                : '2.5 acres paddy × ~2 t straw/acre ≈ 5 t to move in 12 days.'}
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/login"><Button variant="outline">Sign in</Button></Link>
            <Link to={runCtaTo}><Button>Open KisanSathi</Button></Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Burning vs productive use (12 mo, demo)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyImpact}>
                <XAxis dataKey="month" fontSize={10} stroke="#7a8f7a" />
                <YAxis fontSize={10} stroke="#7a8f7a" />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #d8e0d9', color: '#142018' }} />
                <Line type="monotone" dataKey="sold" stroke="#3ecf6e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="burned" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Supply vs demand by district</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={supplyDemand}>
                <XAxis dataKey="name" fontSize={10} stroke="#7a8f7a" />
                <YAxis fontSize={10} stroke="#7a8f7a" />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #d8e0d9', color: '#142018' }} />
                <Bar dataKey="supply" fill="#3ecf6e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="demand" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-2">Research methodology</h2>
        <p className="text-sm text-nv-muted leading-relaxed">{meta.methodology}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Field observations</h2>
        <ul className="list-disc pl-5 text-sm text-nv-muted space-y-1">
          {meta.observations.map((o) => <li key={o}>{o}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">AgriNova simulation results</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Cluster tonnes utilised (seed + live)', value: `${(liveTonnes || 3.2).toFixed(1)}t` },
            { label: 'Your extra completions', value: String(liveSimulationCount) },
            { label: 'tCO₂e on ledger', value: liveCo2.toFixed(1) },
            { label: 'Cash to farmers (completed)', value: formatINR(liveIncome) },
          ].map(({ label, value }) => (
            <Card key={label}><CardContent className="pt-4"><p className="text-xs text-nv-muted">{label}</p><p className="text-xl font-semibold">{value}</p></CardContent></Card>
          ))}
        </div>
        <p className="text-sm text-nv-muted mt-3">
          Ledger farmer value: <strong className="text-nv-fg">{formatINR(liveIncome)}</strong>
          {' '}· Simran Kaur’s 3.2 t sale is already in the seed so this page is never empty.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Limitations</h2>
        <ul className="list-disc pl-5 text-sm text-nv-muted space-y-1">
          {meta.limitations.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </section>
    </div>
  )
}

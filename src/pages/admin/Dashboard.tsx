import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { ProvenanceBadge } from '../../components/ProvenanceBadge'
import { SourceNote } from '../../components/SourceNote'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { demoProfiles } from '../../data/profiles'
import { formatINR } from '../../lib/utils'

export default function AdminDashboard() {
  const { listings, transactions, ledger, mrv, offers, requirements, resetDemo, wallets } = useMarketplace()
  const { farmers } = useCaseStudy()
  const kavya = demoProfiles.find((p) => p.id === 'kavya')!
  const creditsOut = Object.values(wallets ?? {}).reduce((s, w) => s + w.lifetimeEarned, 0)

  return (
    <div className="animate-fade-in space-y-6 max-w-5xl">
      <div className="flex flex-wrap justify-between gap-4 items-start">
        <div className="flex gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-nv-elevated font-semibold">{kavya.initials}</div>
          <div>
            <h1 className="text-2xl font-semibold">{kavya.name}</h1>
            <p className="text-sm text-nv-muted">{kavya.title} · {kavya.org}</p>
            <p className="text-sm mt-1 max-w-lg">“{kavya.quote}”</p>
            <ProvenanceBadge provenance="DEMONSTRATION_DATA" className="mt-2" />
          </div>
        </div>
        <Button variant="outline" onClick={resetDemo}>Reload lived-in demo</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Open + in-play listings', value: listings.filter((l) => l.status !== 'completed').length },
          { label: 'Pending offers', value: offers.filter((o) => o.status === 'pending').length },
          { label: 'RFQs', value: requirements.length },
          { label: 'Credits issued', value: creditsOut.toLocaleString() },
        ].map(({ label, value }) => (
          <Card key={label}><CardContent className="pt-4"><p className="text-xs text-nv-muted">{label}</p><p className="text-2xl font-semibold mt-1">{value}</p></CardContent></Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Pipeline</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm max-h-72 overflow-auto">
            {listings.map((l) => (
              <div key={l.id} className="flex justify-between gap-2 border-b border-nv-border pb-2">
                <span>
                  {l.farmerName} · {l.quantityTonnes}t {l.residueType}
                  {l.details ? ` · ${l.details.moisturePercent}% H₂O` : ''}
                </span>
                <Badge>{l.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">MRV evidence</CardTitle>
            <Link to="/carbon/mrv" className="text-xs text-nv-green">Queue</Link>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            {mrv.map((r) => (
              <p key={r.id}>{r.txnId.slice(-8)} — {r.status} · {r.evidence.filter((e) => e.done).length}/{r.evidence.length} proofs</p>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Money & climate (this cluster)</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-nv-muted">Completed value</p>
            <p className="text-xl font-semibold">{formatINR(transactions.filter((t) => t.status === 'completed').reduce((s, t) => s + t.amount, 0))}</p>
          </div>
          <div>
            <p className="text-nv-muted">tCO₂e avoided</p>
            <p className="text-xl font-semibold">{ledger.reduce((s, e) => s + e.avoidedTco2e, 0).toFixed(1)}</p>
          </div>
          <div>
            <p className="text-nv-muted">Farmers in pack</p>
            <p className="text-xl font-semibold">{farmers.length}</p>
          </div>
        </CardContent>
        <div className="px-5 pb-4">
          <SourceNote provenance="DEMONSTRATION_DATA">
            Cluster of 25 fictional farms. Emission factor is a model (see Data authenticity). Credits are platform units, not a registry vintage.
          </SourceNote>
        </div>
      </Card>
    </div>
  )
}

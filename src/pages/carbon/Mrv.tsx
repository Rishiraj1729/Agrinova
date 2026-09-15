import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { ProvenanceBadge } from '../../components/ProvenanceBadge'
import { useMarketplace } from '../../contexts/MarketplaceContext'

export default function MrvPage() {
  const { mrv } = useMarketplace()
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">MRV records</h1>
        <ProvenanceBadge provenance="DEMONSTRATION_DATA" className="mt-2" />
      </div>
      <div className="space-y-3">
        {mrv.map((r) => (
          <Card key={r.id}>
            <CardHeader className="pb-2 flex flex-row justify-between">
              <CardTitle className="text-base">Txn {r.txnId.slice(-8)}</CardTitle>
              <Badge>{r.status}</Badge>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                {r.evidence.map((ev) => (
                  <li key={ev.item} className={ev.done ? 'text-nv-green' : 'text-nv-muted'}>
                    {ev.done ? '✓' : '○'} {ev.item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
        {mrv.length === 0 && <p className="text-nv-muted">No MRV records yet.</p>}
      </div>
    </div>
  )
}

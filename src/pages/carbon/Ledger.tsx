import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { ProvenanceBadge } from '../../components/ProvenanceBadge'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import { formatINR } from '../../lib/utils'

export default function CarbonLedgerPage() {
  const { ledger } = useMarketplace()
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Carbon ledger</h1>
        <p className="text-sm text-nv-muted">Indicative impacts — not certified carbon credits</p>
        <ProvenanceBadge provenance="MODEL_ESTIMATE" className="mt-2" />
      </div>
      <Card>
        <CardHeader><CardTitle>Entries</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-nv-muted text-left">
                <th className="pb-2">Date</th>
                <th>Qty</th>
                <th>Avoided tCO₂e</th>
                <th>Indicative ₹</th>
                <th>MRV</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((e) => (
                <tr key={e.id} className="border-t border-nv-border">
                  <td className="py-2">{e.date}</td>
                  <td>{e.quantityTonnes}t</td>
                  <td>{e.avoidedTco2e.toFixed(2)}</td>
                  <td>{formatINR(e.indicativeValueInr)}</td>
                  <td>{e.mrvStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {ledger.length === 0 && <p className="text-nv-muted py-4">Complete a transaction in the sell wizard.</p>}
        </CardContent>
      </Card>
    </div>
  )
}

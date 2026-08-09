import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { TrustBadge } from '../../components/ui/TrustBadge'
import { cropRisks, weatherEvents } from '../../data/agrinoveData'

export default function RiskPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Risk & Early Warnings</h1>
        <p className="text-sm text-nv-muted">Estimated risks with confidence intervals — not guarantees</p>
      </div>

      <h2 className="text-lg font-medium">Crop Risks</h2>
      <div className="space-y-3">
        {cropRisks.map((r) => (
          <Card key={r.crop} className={r.riskLevel === 'high' ? 'border-red-500/30' : ''}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{r.crop}</p>
                  <p className="text-sm text-nv-muted mt-1">{r.reason}</p>
                  <p className="text-sm mt-2"><strong>Action:</strong> {r.recommendation}</p>
                  <TrustBadge confidence={r.confidence} updatedAt={r.updatedAt} className="mt-3" />
                </div>
                <Badge variant={r.riskLevel === 'high' ? 'danger' : r.riskLevel === 'medium' ? 'warning' : 'success'}>
                  {r.riskLevel}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-medium">Weather Warnings</h2>
      <div className="space-y-3">
        {weatherEvents.map((e) => (
          <Card key={e.id}>
            <CardContent className="pt-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium capitalize">{e.type.replace('_', ' ')}</p>
                  <p className="text-sm text-nv-muted mt-1">{e.description}</p>
                </div>
                <Badge variant={e.severity === 'high' ? 'danger' : 'warning'}>{e.severity}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

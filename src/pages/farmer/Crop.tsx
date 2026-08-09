import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { TrustBadge } from '../../components/ui/TrustBadge'
import { cropRisks, currentFarmer } from '../../data/agrinovaData'

export default function CropPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Crop Intelligence</h1>
        <p className="text-sm text-nv-muted">{currentFarmer.crops.join(', ')} · {currentFarmer.acres} acres</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {cropRisks.map((r) => (
          <Card key={r.crop}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{r.crop}</CardTitle>
              <Badge variant={r.riskLevel === 'high' ? 'danger' : r.riskLevel === 'medium' ? 'warning' : 'success'}>
                {r.riskLevel} risk
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-nv-muted">{r.reason}</p>
              <p className="mt-3 text-sm"><strong className="text-nv-fg">Recommendation:</strong> {r.recommendation}</p>
              <TrustBadge confidence={r.confidence} updatedAt={r.updatedAt} className="mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Irrigation Advisory (Demo)</CardTitle></CardHeader>
        <CardContent className="text-sm text-nv-muted space-y-2">
          <p>• Rice field A: Irrigate 2 hours today (soil moisture 42%)</p>
          <p>• Wheat field B: Skip irrigation — rain expected Nov 12</p>
          <p>• Estimated water savings: 1,200 litres vs yesterday</p>
          <TrustBadge confidence={68} reason="Based on demo soil moisture model + weather forecast" updatedAt="2025-11-08" className="mt-3" />
        </CardContent>
      </Card>
    </div>
  )
}

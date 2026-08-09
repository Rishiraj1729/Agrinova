import { Truck } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { logisticsJobs } from '../../data/agrinovaData'

export default function LogisticsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Logistics</h1>
        <p className="text-sm text-nv-muted">Pickup & delivery tracking · Demo data</p>
      </div>
      <div className="space-y-3">
        {logisticsJobs.map((j) => (
          <Card key={j.id}>
            <CardContent className="flex items-start gap-4 pt-5">
              <Truck className="h-5 w-5 text-nv-green shrink-0" />
              <div className="flex-1">
                <p className="font-medium">{j.from} → {j.to}</p>
                <p className="text-sm text-nv-muted">{j.distanceKm} km · {j.vehicle}</p>
                <p className="text-sm text-nv-muted">ETA: {j.eta}</p>
              </div>
              <Badge variant={j.status === 'in_transit' ? 'info' : 'warning'}>{j.status.replace('_', ' ')}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

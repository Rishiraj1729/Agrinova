import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { TrustBadge } from '../../components/ui/TrustBadge'
import { weatherEvents } from '../../data/agrinovaData'

export default function WeatherPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Weather Intelligence</h1>
        <p className="text-sm text-nv-muted">Madhyamgram, North 24 Parganas · Demo IMD-style data</p>
      </div>

      <Card>
        <CardContent className="flex items-center gap-6 pt-6">
          <Thermometer className="h-10 w-10 text-nv-green" />
          <div>
            <p className="text-4xl font-semibold">28°C</p>
            <p className="text-nv-muted">Partly cloudy · Feels like 30°C</p>
          </div>
          <div className="ml-auto flex gap-4 text-sm text-nv-muted">
            <span className="flex items-center gap-1"><Droplets className="h-4 w-4" /> 62%</span>
            <span className="flex items-center gap-1"><Wind className="h-4 w-4" /> 12 km/h</span>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-lg font-medium">Active Warnings</h2>
      <div className="space-y-3">
        {weatherEvents.map((e) => (
          <Card key={e.id} className={e.severity === 'high' ? 'border-red-500/30' : ''}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Cloud className="h-5 w-5 text-nv-green shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium capitalize">{e.type.replace('_', ' ')} — {e.district}</p>
                    <p className="text-sm text-nv-muted mt-1">{e.description}</p>
                    <TrustBadge confidence={e.confidence} updatedAt={e.date} className="mt-3" />
                  </div>
                </div>
                <Badge variant={e.severity === 'high' ? 'danger' : e.severity === 'medium' ? 'warning' : 'default'}>
                  {e.severity}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

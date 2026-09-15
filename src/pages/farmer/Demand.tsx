import { ProvenanceBadge } from '../../components/ProvenanceBadge'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { getDemandInsights } from '../../services/demandIntel'

export default function DemandPage() {
  const insights = getDemandInsights()
  return (
    <div className="animate-fade-in space-y-4">
      <h1 className="text-2xl font-semibold">Demand intelligence</h1>
      <ProvenanceBadge provenance="MODEL_ESTIMATE" />
      <div className="grid gap-3 sm:grid-cols-2">
        {insights.map((d) => (
          <Card key={d.residueType}>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <p className="font-medium">{d.residueType}</p>
                <Badge variant={d.level === 'high' ? 'success' : d.level === 'medium' ? 'info' : 'default'}>{d.level}</Badge>
              </div>
              <p className="text-sm text-nv-muted mt-2">{d.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

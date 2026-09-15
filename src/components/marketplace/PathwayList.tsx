import type { PathwayRecommendation } from '../../types'
import { Badge } from '../ui/Badge'

export function PathwayList({ pathways }: { pathways: PathwayRecommendation[] }) {
  return (
    <ul className="space-y-2">
      {pathways.map((p, i) => (
        <li key={p.id} className="rounded-lg border border-nv-border p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-sm">{p.label}</p>
            <Badge variant={i === 0 ? 'success' : 'default'}>{p.score}</Badge>
          </div>
          <p className="text-xs text-nv-muted mt-1">{p.rationale}</p>
        </li>
      ))}
    </ul>
  )
}

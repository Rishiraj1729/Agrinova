import type { MatchFactorBreakdown } from '../../types'

const factors: { key: keyof Omit<MatchFactorBreakdown, 'total'>; label: string }[] = [
  { key: 'rating', label: 'Buyer rating' },
  { key: 'distance', label: 'Distance' },
  { key: 'demandFit', label: 'Demand fit' },
  { key: 'priceFit', label: 'Price' },
  { key: 'pathwayFit', label: 'Pathway fit' },
  { key: 'moistureFit', label: 'Moisture fit' },
]

export function MatchScoreBreakdown({ breakdown }: { breakdown: MatchFactorBreakdown }) {
  return (
    <div className="space-y-1.5 text-xs">
      <p className="font-medium text-nv-green">AgriNova Match Score: {breakdown.total}%</p>
      {factors.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-2">
          <span className="w-24 text-nv-muted">{label}</span>
          <div className="h-1.5 flex-1 rounded-full bg-nv-border overflow-hidden">
            <div className="h-full bg-nv-green/70" style={{ width: `${Math.min(100, breakdown[key] * 2.5)}%` }} />
          </div>
          <span className="w-8 text-right">{breakdown[key]}</span>
        </div>
      ))}
    </div>
  )
}

import type { ValuationResult } from '../../types'
import { ProvenanceBadge } from '../ProvenanceBadge'
import { formatINR } from '../../lib/utils'

export function ValuationCard({ valuation }: { valuation: ValuationResult }) {
  return (
    <div className="rounded-lg border border-nv-border bg-nv-dark p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Residue valuation</p>
        <ProvenanceBadge provenance={valuation.provenance} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div><p className="text-nv-muted">Gross</p><p className="font-medium">{formatINR(valuation.gross)}</p></div>
        <div><p className="text-nv-muted">Transport</p><p className="font-medium">−{formatINR(valuation.transport)}</p></div>
        <div><p className="text-nv-muted">Collection</p><p className="font-medium">−{formatINR(valuation.collection)}</p></div>
        <div><p className="text-nv-muted">Net to farmer</p><p className="font-medium text-nv-green">{formatINR(valuation.net)}</p></div>
      </div>
      <p className="text-xs text-nv-muted">
        Range {formatINR(valuation.pricePerTonLow)}–{formatINR(valuation.pricePerTonHigh)} / tonne · {valuation.disclaimer}
      </p>
    </div>
  )
}

import type { DataProvenance } from '../types'
import { cn } from '../lib/utils'

const labels: Record<DataProvenance, string> = {
  DEMONSTRATION_DATA: 'Demonstration data',
  MODEL_ESTIMATE: 'Model estimate',
  AI_OUTPUT: 'AI output',
  PUBLIC_DATA: 'Public data',
  FIELD_SURVEY: 'Field survey',
}

export function ProvenanceBadge({ provenance, className }: { provenance: DataProvenance; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-md border border-nv-border bg-nv-elevated px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-nv-muted',
        className,
      )}
    >
      {labels[provenance]}
    </span>
  )
}

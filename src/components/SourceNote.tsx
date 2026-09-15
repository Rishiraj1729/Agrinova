import type { DataProvenance } from '../types'
import { ProvenanceBadge } from './ProvenanceBadge'

export function SourceNote({
  provenance,
  children,
}: {
  provenance: DataProvenance
  children: React.ReactNode
}) {
  return (
    <p className="text-[11px] text-nv-muted leading-relaxed flex flex-wrap items-center gap-2">
      <ProvenanceBadge provenance={provenance} />
      <span>{children}</span>
    </p>
  )
}

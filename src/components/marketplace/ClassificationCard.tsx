import type { ClassificationResult, ResidueType } from '../../types'
import { ProvenanceBadge } from '../ProvenanceBadge'
import { Button } from '../ui/Button'

const allTypes: ResidueType[] = ['Rice Straw', 'Wheat Stubble', 'Cotton Stalks', 'Sugarcane Tops', 'Maize Stover']

export function ClassificationCard({
  result,
  onOverride,
}: {
  result: ClassificationResult
  onOverride: (t: ResidueType) => void
}) {
  const active = result.userOverride ?? result.residueType
  return (
    <div className="rounded-lg border border-nv-border bg-nv-dark p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-nv-muted">Detected residue</p>
          <p className="text-lg font-semibold">{active}</p>
          <p className="text-xs text-nv-muted">{result.confidence}% confidence</p>
        </div>
        <ProvenanceBadge provenance={result.provenance} />
      </div>
      <div className="flex flex-wrap gap-2">
        {allTypes.map((t) => (
          <Button key={t} size="sm" variant={t === active ? 'primary' : 'outline'} onClick={() => onOverride(t)}>
            {t}
          </Button>
        ))}
      </div>
    </div>
  )
}

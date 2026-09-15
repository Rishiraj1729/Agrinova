import type { DemandInsight, ResidueType } from '../types'

export function getDemandInsights(): DemandInsight[] {
  return [
    { residueType: 'Rice Straw', level: 'high', trend: 'Rising procurement ahead of Rabi sowing (demo)', provenance: 'MODEL_ESTIMATE' },
    { residueType: 'Wheat Stubble', level: 'medium', trend: 'Stable demand from paper and feed units', provenance: 'MODEL_ESTIMATE' },
    { residueType: 'Cotton Stalks', level: 'low', trend: 'Seasonal spike in Nov–Dec', provenance: 'MODEL_ESTIMATE' },
    { residueType: 'Maize Stover', level: 'medium', trend: 'Compost units absorbing surplus', provenance: 'MODEL_ESTIMATE' },
    { residueType: 'Sugarcane Tops', level: 'low', trend: 'Local cattle use dominant', provenance: 'PUBLIC_DATA' },
  ]
}

export function demandLevelFor(residueType: ResidueType): DemandInsight | undefined {
  return getDemandInsights().find((d) => d.residueType === residueType)
}

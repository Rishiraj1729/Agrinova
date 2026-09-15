import type { PathwayId, PathwayRecommendation, ResidueType } from '../types'

export function recommendPathways(residueType: ResidueType, quantityTonnes: number): PathwayRecommendation[] {
  const base: PathwayRecommendation[] = [
    { id: 'biomass', label: 'Biomass power / industry', score: 89, rationale: 'Strong buyer demand and established haul routes.' },
    { id: 'biochar', label: 'Biochar production', score: 82, rationale: 'Higher price per tonne; suitable for dry straw.' },
    { id: 'compost', label: 'Composting', score: 74, rationale: 'Lower transport if local compost units exist.' },
    { id: 'biogas', label: 'Biogas / anaerobic digestion', score: 68, rationale: 'Better at larger consolidated volumes.' },
    { id: 'cattle_feed', label: 'Cattle feed (treated)', score: 61, rationale: 'Moisture and quality constraints apply.' },
  ]
  if (residueType === 'Wheat Stubble') {
    base[2].score += 5
    base[0].score -= 2
  }
  if (quantityTonnes >= 5) base[0].score += 3
  return base.sort((a, b) => b.score - a.score)
}

export function pathwayLabel(id: PathwayId): string {
  const map: Record<PathwayId, string> = {
    biomass: 'Biomass',
    biochar: 'Biochar',
    compost: 'Compost',
    biogas: 'Biogas',
    cattle_feed: 'Cattle feed',
  }
  return map[id]
}

import type { Buyer, MatchFactorBreakdown, PathwayId, ResidueType } from '../types'

export function scoreBuyerMatch(
  buyer: Buyer,
  residueType: ResidueType,
  quantity: number,
  pathway: PathwayId = 'biomass',
  moisturePercent?: number,
): { matchScore: number; breakdown: MatchFactorBreakdown; estimatedValue: number; reasons: string[] } {
  const typeOk = buyer.residueTypes.includes(residueType)
  const reasons: string[] = []
  if (!typeOk) reasons.push('Residue type not accepted by this plant')

  const rating = (buyer.rating / 5) * 22
  const distance = (1 - Math.min(buyer.distanceKm, 50) / 50) * 22
  const demandFit = typeOk ? (Math.min(buyer.demandTonnes, quantity) / Math.max(quantity, 1)) * 18 : 0
  const priceFit = typeOk ? Math.min(buyer.pricePerTon / 900, 1) * 12 : 0
  const pathwayFit =
    pathway === 'biochar' && buyer.type === 'Biochar'
      ? 12
      : pathway === 'biomass' && buyer.type === 'Biomass Plant'
        ? 11
        : pathway === 'compost' && buyer.type === 'Compost Unit'
          ? 10
          : pathway === 'cattle_feed' && buyer.type === 'Cattle Feed'
            ? 10
            : 4

  let moistureFit = 12
  const spec = buyer.moistureSpecMax ?? 16
  if (moisturePercent != null) {
    if (moisturePercent <= spec) {
      moistureFit = 14
      reasons.push(`Moisture ${moisturePercent}% within plant spec (≤${spec}%)`)
    } else if (moisturePercent <= spec + 3) {
      moistureFit = 6
      reasons.push(`Moisture ${moisturePercent}% slightly above ${spec}% — dry/cover before lift`)
    } else {
      moistureFit = 0
      reasons.push(`Moisture ${moisturePercent}% rejects plant max ${spec}%`)
    }
  } else {
    reasons.push('Moisture not declared — assumed average')
  }

  if (buyer.distanceKm <= 15) reasons.push(`Close haul (${buyer.distanceKm} km)`)
  if (buyer.pricePerTon >= 750) reasons.push(`Strong gate price ₹${buyer.pricePerTon}/t`)

  const raw = rating + distance + demandFit + priceFit + pathwayFit + moistureFit
  const total = Math.round(Math.min(100, typeOk ? raw : raw * 0.3))
  return {
    matchScore: total,
    breakdown: {
      rating: Math.round(rating),
      distance: Math.round(distance),
      demandFit: Math.round(demandFit),
      priceFit: Math.round(priceFit),
      pathwayFit: Math.round(pathwayFit),
      moistureFit: Math.round(moistureFit),
      total,
    },
    estimatedValue: quantity * buyer.pricePerTon,
    reasons,
  }
}

export function rankBuyersForListing(
  buyers: Buyer[],
  residueType: ResidueType,
  quantity: number,
  pathway?: PathwayId,
  moisturePercent?: number,
) {
  return buyers
    .filter((b) => b.residueTypes.includes(residueType))
    .map((b) => ({ buyer: b, ...scoreBuyerMatch(b, residueType, quantity, pathway, moisturePercent) }))
    .sort((a, b) => b.matchScore - a.matchScore)
}

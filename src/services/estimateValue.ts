import type { ResidueType, ValuationResult } from '../types'
import type { Buyer } from '../types'

export function estimateValue(
  quantityTonnes: number,
  residueType: ResidueType,
  buyers: Buyer[],
  pricePerTonHint?: number,
): ValuationResult {
  const matching = buyers.filter((b) => b.residueTypes.includes(residueType))
  const avgPrice =
    pricePerTonHint ??
    (matching.length
      ? matching.reduce((s, b) => s + b.pricePerTon, 0) / matching.length
      : 700)
  const gross = Math.round(quantityTonnes * avgPrice)
  const transport = Math.round(quantityTonnes * 120)
  const collection = Math.round(quantityTonnes * 80)
  const net = gross - transport - collection
  return {
    gross,
    transport,
    collection,
    net,
    pricePerTonLow: Math.round(avgPrice * 0.9),
    pricePerTonHigh: Math.round(avgPrice * 1.15),
    disclaimer: 'Model estimate for demonstration. Actual costs vary by baling, moisture, and road access.',
    provenance: 'MODEL_ESTIMATE',
  }
}

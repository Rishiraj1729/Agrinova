import type { CarbonLedgerEntry, MarketplaceTransaction, MrvStatus, PathwayId, ResidueType } from '../types'

export function calculateCarbonImpact(quantityTonnes: number, pathway: 'burn' | 'sell' | PathwayId = 'sell') {
  const baselinePerTonne = 1.5
  const baseline = quantityTonnes * baselinePerTonne
  const altFactor = pathway === 'burn' ? 0 : pathway === 'biochar' ? 0.15 : 0.25
  const alternative = quantityTonnes * altFactor
  const transport = pathway === 'burn' ? 0 : quantityTonnes * 0.05
  return {
    baseline,
    alternative,
    transport,
    avoided: baseline - alternative - transport,
  }
}

export function createLedgerEntry(txn: MarketplaceTransaction, residueType: ResidueType): CarbonLedgerEntry {
  const carbon = calculateCarbonImpact(txn.quantityTonnes, txn.pathway)
  return {
    id: `ledger-${txn.id}`,
    txnId: txn.id,
    farmerId: txn.farmerId,
    residueType,
    quantityTonnes: txn.quantityTonnes,
    baselineTco2e: carbon.baseline,
    alternativeTco2e: carbon.alternative,
    transportTco2e: carbon.transport,
    avoidedTco2e: carbon.avoided,
    indicativeValueInr: Math.round(carbon.avoided * 850),
    pathway: txn.pathway,
    mrvStatus: 'recorded' as MrvStatus,
    region: txn.region,
    date: txn.updatedAt.split('T')[0],
  }
}

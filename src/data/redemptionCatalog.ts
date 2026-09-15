export interface RedemptionItem {
  id: string
  name: string
  category: 'seed' | 'fertiliser' | 'equipment' | 'service'
  creditsCost: number
  description: string
}

/** 1 AgriNova Credit ≈ 1 kg CO₂e avoided (demo unit) */
export const CREDITS_PER_TCO2E = 1000

export const redemptionCatalog: RedemptionItem[] = [
  { id: 'seed-wheat', name: 'Wheat seed pack (5 kg)', category: 'seed', creditsCost: 120, description: 'PBW-343 variety — demo subsidy via credits' },
  { id: 'seed-rice', name: 'Paddy seed (2 kg)', category: 'seed', creditsCost: 95, description: 'Short-duration variety for timely sowing' },
  { id: 'urea', name: 'Urea (1 bag)', category: 'fertiliser', creditsCost: 180, description: 'Redeem at partner agro-dealer (demo)' },
  { id: 'dap', name: 'DAP (1 bag)', category: 'fertiliser', creditsCost: 220, description: 'Phosphorus for Rabi crops' },
  { id: 'baler-rent', name: 'Baler rental (1 day)', category: 'equipment', creditsCost: 350, description: 'Shared baler in Patiala cluster' },
  { id: 'soil-test', name: 'Soil health test', category: 'service', creditsCost: 80, description: 'Lab kit via Krishi Vigyan Kendra partner' },
]

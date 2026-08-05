export interface EmissionFactor {
  id: string
  label: string
  labelHindi: string
  scope: 1 | 2 | 3
  unit: string
  factor: number
  description: string
  goiNote?: string
}

export const emissionFactors: EmissionFactor[] = [
  {
    id: 'stubble-burn',
    label: 'Stubble Burning',
    labelHindi: 'पराली जलाना',
    scope: 1,
    unit: 'tonne residue',
    factor: 1.5,
    description: 'Direct CO₂ + methane from open burning',
    goiNote: 'NGT banned stubble burning — fines up to ₹15,000/acre',
  },
  {
    id: 'diesel-tractor',
    label: 'Diesel (Tractor/Tiller)',
    labelHindi: 'डीजल (ट्रैक्टर)',
    scope: 1,
    unit: 'litre',
    factor: 2.68,
    description: 'On-farm machinery combustion',
  },
  {
    id: 'urea',
    label: 'Urea Application',
    labelHindi: 'यूरिया प्रयोग',
    scope: 1,
    unit: 'kg N applied',
    factor: 5.7,
    description: 'N₂O emissions from nitrogen fertilizer (IPCC Tier 1)',
    goiNote: 'Soil Health Card helps reduce over-application',
  },
  {
    id: 'electric-pump',
    label: 'Electric Irrigation Pump',
    labelHindi: 'बिजली से सिंचाई',
    scope: 2,
    unit: 'kWh',
    factor: 0.82,
    description: 'Grid electricity for tube wells',
    goiNote: 'PM-KUSUM solar pumps can cut Scope 2 to near zero',
  },
  {
    id: 'diesel-pump',
    label: 'Diesel Pump Set',
    labelHindi: 'डीजल पंप',
    scope: 1,
    unit: 'litre',
    factor: 2.68,
    description: 'Diesel-powered irrigation',
  },
  {
    id: 'fertilizer-production',
    label: 'Fertilizer (Supply Chain)',
    labelHindi: 'उर्वरक (उत्पादन)',
    scope: 3,
    unit: 'kg fertilizer',
    factor: 1.9,
    description: 'Embodied emissions from manufacturing & transport',
    goiNote: 'Natural Farming Mission reduces Scope 3 inputs',
  },
  {
    id: 'transport',
    label: 'Produce Transport',
    labelHindi: 'उपज परिवहन',
    scope: 3,
    unit: 'tonne-km',
    factor: 0.12,
    description: 'Truck transport from farm to mandi/buyer',
  },
  {
    id: 'residue-sold',
    label: 'Residue Sold (Avoided)',
    labelHindi: 'पराली बेची (बचत)',
    scope: 1,
    unit: 'tonne',
    factor: -1.5,
    description: 'Emissions avoided by not burning — credit!',
    goiNote: 'Agrinova marketplace helps earn ₹ + avoid emissions',
  },
]

export interface EmissionInput {
  factorId: string
  quantity: number
}

export interface EmissionResult {
  scope1: number
  scope2: number
  scope3: number
  total: number
  avoided: number
  net: number
  breakdown: { label: string; scope: number; kgCO2e: number }[]
}

export function calculateEmissions(inputs: EmissionInput[]): EmissionResult {
  let scope1 = 0
  let scope2 = 0
  let scope3 = 0
  let avoided = 0
  const breakdown: EmissionResult['breakdown'] = []

  for (const input of inputs) {
    if (input.quantity <= 0) continue
    const factor = emissionFactors.find((f) => f.id === input.factorId)
    if (!factor) continue

    const kgCO2e = input.quantity * factor.factor * 1000

    if (factor.factor < 0) {
      avoided += Math.abs(kgCO2e)
      breakdown.push({ label: factor.label, scope: factor.scope, kgCO2e })
      continue
    }

    breakdown.push({ label: factor.label, scope: factor.scope, kgCO2e })

    if (factor.scope === 1) scope1 += kgCO2e
    else if (factor.scope === 2) scope2 += kgCO2e
    else scope3 += kgCO2e
  }

  const total = scope1 + scope2 + scope3
  return { scope1, scope2, scope3, total, avoided, net: total - avoided, breakdown }
}

export const scopeInfo = [
  {
    scope: 1,
    title: 'Scope 1 — Direct',
    titleHindi: 'प्रत्यक्ष उत्सर्जन',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/30',
    examples: 'Stubble burning, diesel tractors, diesel pumps, fertilizer N₂O',
    goi: 'CPCB monitors stubble burning via satellites. NGT enforces penalties.',
  },
  {
    scope: 2,
    title: 'Scope 2 — Energy',
    titleHindi: 'ऊर्जा उत्सर्जन',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/30',
    examples: 'Electricity for tube wells, cold storage, grain dryers',
    goi: 'PM-KUSUM promotes solar pumps — reduces Scope 2 by up to 100%.',
  },
  {
    scope: 3,
    title: 'Scope 3 — Supply Chain',
    titleHindi: 'आपूर्ति श्रृंखला',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
    examples: 'Fertilizer production, pesticide transport, mandi logistics',
    goi: 'Natural Farming Mission & SHC reduce chemical inputs (Scope 3).',
  },
]

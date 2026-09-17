export interface DiseaseScanResult {
  crop: string
  disease: string
  confidence: number
  severity: 'low' | 'medium' | 'high'
  symptoms: string[]
  firstActions: string[]
  whenToEscalate: string
  modelNote: string
  fromApi: boolean
}

/** Curated fallback knowledge for offline / API failure (NCSC educational). */
export const PLANT_DISEASE_KB: Array<{
  id: string
  crops: string[]
  name: string
  symptoms: string[]
  actions: string[]
  escalate: string
}> = [
  {
    id: 'rice-blast',
    crops: ['Rice', 'Paddy'],
    name: 'Rice blast (Magnaporthe)',
    symptoms: ['diamond leaf spots', 'grey centre', 'neck rot'],
    actions: ['Avoid excess nitrogen', 'Keep field drainage clear', 'Ask KVK for fungicide label'],
    escalate: 'If neck blast spreads across tillers in 3 days, visit KVK / ADO.',
  },
  {
    id: 'rice-blight',
    crops: ['Rice', 'Paddy'],
    name: 'Bacterial leaf blight',
    symptoms: ['yellow leaf margins', 'water-soaked lesions', 'wilting'],
    actions: ['Use clean seed next season', 'Avoid flooding after storm', 'Remove severely infected hills'],
    escalate: 'If >30% canopy yellows, seek block agri officer advice.',
  },
  {
    id: 'wheat-rust',
    crops: ['Wheat'],
    name: 'Leaf / stripe rust',
    symptoms: ['orange pustules', 'yellow stripes', 'dusting spores'],
    actions: ['Prefer resistant variety next year', 'Monitor neighbouring fields', 'Do not burn residue as control'],
    escalate: 'Rapid spread in cool humid weather — contact plant protection officer.',
  },
  {
    id: 'general-nutrient',
    crops: ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane'],
    name: 'Likely nutrient stress / abiotic',
    symptoms: ['uniform yellowing', 'no discrete spots', 'older leaves first'],
    actions: ['Check soil card N status', 'Match urea split to stage', 'Rule out waterlogging'],
    escalate: 'If patches are irregular with spots, re-scan focusing on lesion leaves.',
  },
]

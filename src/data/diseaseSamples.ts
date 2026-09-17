import type { DiseaseScanResult } from './plantDiseases'

export interface DiseaseSampleCase {
  id: string
  title: string
  crop: string
  imageSrc: string
  /** Educational result shown when the sample is selected (booth-ready). */
  result: DiseaseScanResult
}

export const DISEASE_SAMPLES: DiseaseSampleCase[] = [
  {
    id: 'rice-blast',
    title: 'Rice — diamond spots',
    crop: 'Rice',
    imageSrc: '/samples/rice-blast.svg',
    result: {
      crop: 'Rice (paddy)',
      disease: 'Rice blast (Magnaporthe-like pattern)',
      confidence: 0.78,
      severity: 'high',
      symptoms: ['Diamond / spindle leaf spots', 'Grey centre with brown border', 'Risk of neck infection'],
      firstActions: [
        'Avoid excess urea this week',
        'Improve drainage; do not keep water stagnant on infected hills',
        'Ask KVK / ADO for labelled fungicide — do not spray by rumour',
      ],
      whenToEscalate: 'If neck symptoms appear on >10% tillers within 3 days, visit block plant-protection desk.',
      modelNote: 'Curated sample for NCSC booth. Educational estimate — not a laboratory diagnosis.',
      fromApi: false,
    },
  },
  {
    id: 'rice-blight',
    title: 'Rice — yellow margins',
    crop: 'Rice',
    imageSrc: '/samples/rice-blight.svg',
    result: {
      crop: 'Rice (paddy)',
      disease: 'Bacterial leaf blight (pattern match)',
      confidence: 0.71,
      severity: 'medium',
      symptoms: ['Yellowing from leaf margin', 'Water-soaked look near tip', 'Wilting on young leaves'],
      firstActions: [
        'Remove severely infected hills from the sample patch',
        'Avoid flooding after storm',
        'Use clean seed next season',
      ],
      whenToEscalate: 'If >30% canopy yellows, seek block agri officer advice.',
      modelNote: 'Curated sample for NCSC booth. Educational estimate — not a laboratory diagnosis.',
      fromApi: false,
    },
  },
  {
    id: 'wheat-rust',
    title: 'Wheat — orange dust',
    crop: 'Wheat',
    imageSrc: '/samples/wheat-rust.svg',
    result: {
      crop: 'Wheat',
      disease: 'Leaf / stripe rust (pattern match)',
      confidence: 0.74,
      severity: 'medium',
      symptoms: ['Orange pustules on leaf', 'Dusting spores on finger', 'Cool humid weather favour'],
      firstActions: [
        'Scout neighbouring fields this week',
        'Prefer resistant variety next year',
        'Do not burn residue as a “control” method',
      ],
      whenToEscalate: 'Rapid spread in cool humid weather — contact plant protection officer.',
      modelNote: 'Curated sample for NCSC booth. Educational estimate — not a laboratory diagnosis.',
      fromApi: false,
    },
  },
]

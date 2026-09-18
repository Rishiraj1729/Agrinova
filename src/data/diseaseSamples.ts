import type { DiseaseScanResult } from './plantDiseases'

export interface DiseaseSampleCase {
  id: string
  title: string
  crop: string
  imageSrc: string
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
      modelNote: 'Booth sample with a known result. Educational estimate — not a laboratory diagnosis.',
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
      modelNote: 'Booth sample with a known result. Educational estimate — not a laboratory diagnosis.',
      fromApi: false,
    },
  },
  {
    id: 'rice-brown-spot',
    title: 'Rice — brown dots',
    crop: 'Rice',
    imageSrc: '/samples/rice-brown-spot.svg',
    result: {
      crop: 'Rice (paddy)',
      disease: 'Brown spot (Bipolaris-like pattern)',
      confidence: 0.69,
      severity: 'medium',
      symptoms: ['Small round brown spots on leaf', 'Yellow halo around older spots', 'More on nutrient-poor patches'],
      firstActions: [
        'Check nitrogen — brown spot often follows hungry soil',
        'Do not mix diseased straw into household waste',
        'Ask KVK before any spray',
      ],
      whenToEscalate: 'If spots cover most of the flag leaf, visit the block plant-protection desk.',
      modelNote: 'Booth sample with a known result. Educational estimate — not a laboratory diagnosis.',
      fromApi: false,
    },
  },
  {
    id: 'rice-sheath',
    title: 'Rice — sheath blight',
    crop: 'Rice',
    imageSrc: '/samples/rice-sheath.svg',
    result: {
      crop: 'Rice (paddy)',
      disease: 'Sheath blight (Rhizoctonia-like pattern)',
      confidence: 0.73,
      severity: 'high',
      symptoms: ['Oval grey-green lesions on leaf sheath', 'Lesions join in humid weather', 'Lodging risk in dense hills'],
      firstActions: [
        'Reduce standing water if the field is stagnant',
        'Avoid very dense transplanting next season',
        'Ask ADO for a labelled product — do not copy a neighbour spray',
      ],
      whenToEscalate: 'If lesions climb to the flag-leaf sheath, seek block advice the same week.',
      modelNote: 'Booth sample with a known result. Educational estimate — not a laboratory diagnosis.',
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
        'Do not burn residue as a control method',
      ],
      whenToEscalate: 'Rapid spread in cool humid weather — contact plant protection officer.',
      modelNote: 'Booth sample with a known result. Educational estimate — not a laboratory diagnosis.',
      fromApi: false,
    },
  },
]

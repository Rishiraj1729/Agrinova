import type { ClassificationResult, ResidueType } from '../types'

export function classifyResidue(_imageUrl?: string, hintText?: string): ClassificationResult {
  let residueType: ResidueType = 'Rice Straw'
  if (hintText && /wheat|गेहूं|पराली|stubble/i.test(hintText)) residueType = 'Wheat Stubble'
  if (hintText && /cotton|कपास/i.test(hintText)) residueType = 'Cotton Stalks'
  return {
    residueType,
    confidence: 96,
    alternatives: [
      { type: 'Wheat Stubble', confidence: 3 },
      { type: 'Maize Stover', confidence: 1 },
    ],
    provenance: 'AI_OUTPUT',
  }
}

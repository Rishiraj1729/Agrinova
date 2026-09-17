/** NPK / fertiliser schedule after plantation — educational rule engine for NCSC. */
export type CropKey = 'Rice' | 'Wheat' | 'Maize' | 'Cotton' | 'Sugarcane'

export interface NutritionRow {
  stage: string
  dayBand: string
  ureaKgPerAcre: number
  dapKgPerAcre: number
  mopKgPerAcre: number
  note: string
}

const TABLES: Record<CropKey, NutritionRow[]> = {
  Rice: [
    { stage: 'Basal / transplant', dayBand: 'Day 0', ureaKgPerAcre: 20, dapKgPerAcre: 40, mopKgPerAcre: 15, note: 'Incorporate with puddle; adjust if soil N is high.' },
    { stage: 'Tillering', dayBand: 'Day 20–25', ureaKgPerAcre: 25, dapKgPerAcre: 0, mopKgPerAcre: 0, note: 'Split urea; avoid if waterlogged.' },
    { stage: 'Panicle initiation', dayBand: 'Day 40–45', ureaKgPerAcre: 20, dapKgPerAcre: 0, mopKgPerAcre: 10, note: 'Keep 2–3 cm water; watch blast.' },
  ],
  Wheat: [
    { stage: 'Sowing', dayBand: 'Day 0', ureaKgPerAcre: 25, dapKgPerAcre: 50, mopKgPerAcre: 15, note: 'After residue cleared or Happy Seeder.' },
    { stage: 'Crown root', dayBand: 'Day 20–25', ureaKgPerAcre: 30, dapKgPerAcre: 0, mopKgPerAcre: 0, note: 'First irrigation window.' },
    { stage: 'Jointing', dayBand: 'Day 40–45', ureaKgPerAcre: 20, dapKgPerAcre: 0, mopKgPerAcre: 10, note: 'Watch stripe rust in cool humid spells.' },
  ],
  Maize: [
    { stage: 'Sowing', dayBand: 'Day 0', ureaKgPerAcre: 20, dapKgPerAcre: 40, mopKgPerAcre: 15, note: 'Band place away from seed.' },
    { stage: 'Knee high', dayBand: 'Day 25–30', ureaKgPerAcre: 30, dapKgPerAcre: 0, mopKgPerAcre: 0, note: 'Side dress before irrigation.' },
    { stage: 'Tasseling', dayBand: 'Day 45–50', ureaKgPerAcre: 20, dapKgPerAcre: 0, mopKgPerAcre: 10, note: 'Do not stress for water.' },
  ],
  Cotton: [
    { stage: 'Sowing', dayBand: 'Day 0', ureaKgPerAcre: 15, dapKgPerAcre: 35, mopKgPerAcre: 15, note: 'Light basal dose.' },
    { stage: 'Squaring', dayBand: 'Day 35–40', ureaKgPerAcre: 25, dapKgPerAcre: 0, mopKgPerAcre: 10, note: 'Scout sucking pests.' },
    { stage: 'Boll formation', dayBand: 'Day 60–70', ureaKgPerAcre: 20, dapKgPerAcre: 0, mopKgPerAcre: 10, note: 'Avoid excess N late.' },
  ],
  Sugarcane: [
    { stage: 'Planting', dayBand: 'Day 0', ureaKgPerAcre: 30, dapKgPerAcre: 50, mopKgPerAcre: 20, note: 'Furrow placement.' },
    { stage: 'Tillering', dayBand: 'Day 45–60', ureaKgPerAcre: 40, dapKgPerAcre: 0, mopKgPerAcre: 15, note: 'Earthing up.' },
    { stage: 'Grand growth', dayBand: 'Day 90–120', ureaKgPerAcre: 30, dapKgPerAcre: 0, mopKgPerAcre: 15, note: 'Irrigation critical.' },
  ],
}

export function nutritionPlan(crop: CropKey, acres: number, soilN: 'low' | 'medium' | 'high'): NutritionRow[] {
  const factor = soilN === 'high' ? 0.85 : soilN === 'low' ? 1.1 : 1
  return TABLES[crop].map((row) => ({
    ...row,
    ureaKgPerAcre: Math.round(row.ureaKgPerAcre * acres * factor),
    dapKgPerAcre: Math.round(row.dapKgPerAcre * acres * factor),
    mopKgPerAcre: Math.round(row.mopKgPerAcre * acres * factor),
    note: `${row.note} Totals scaled to ${acres} ac (soil N: ${soilN}). Educational — follow local package of practices.`,
  }))
}

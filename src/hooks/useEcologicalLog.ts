import { useCallback, useEffect, useMemo, useState } from 'react'

export type EcoStream = 'diverted' | 'compost' | 'paper' | 'biogas' | 'dumped' | 'burned'

export interface EcoRecord {
  id: string
  date: string
  district: string
  stream: EcoStream
  tonnes: number
  notes: string
  officer: string
}

const STREAM_FACTOR: Record<EcoStream, number> = {
  diverted: 1.2,
  compost: 1.1,
  paper: 1.15,
  biogas: 1.25,
  dumped: 0,
  burned: -1.5,
}

const DEMO_SEED: EcoRecord[] = [
  { id: 'eco-1', date: '2025-11-06', district: 'North 24 Parganas', stream: 'compost', tonnes: 8.4, notes: 'Doltala lift to Madhyamgram compost pad.', officer: 'Sudip Biswas (demo desk)' },
  { id: 'eco-2', date: '2025-11-08', district: 'Barasat', stream: 'paper', tonnes: 4.1, notes: 'Drier Noapara lot to Barasat paper desk.', officer: 'Ward 21 desk' },
  { id: 'eco-3', date: '2025-11-09', district: 'Madhyamgram', stream: 'dumped', tonnes: 3.0, notes: 'Unlisted wet heap mixed into biodegradable lift.', officer: 'Sudip Biswas (demo desk)' },
]

export function useEcologicalLog(storageKey: string, seedDemo: boolean) {
  const [records, setRecords] = useState<EcoRecord[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) return JSON.parse(raw) as EcoRecord[]
    } catch {
      /* ignore */
    }
    return seedDemo ? DEMO_SEED : []
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(records))
  }, [storageKey, records])

  const add = useCallback((row: Omit<EcoRecord, 'id'>) => {
    setRecords((r) => [{ ...row, id: `eco-${Date.now()}` }, ...r])
  }, [])

  const totals = useMemo(() => {
    const diverted = records.filter((r) => r.stream !== 'burned' && r.stream !== 'dumped').reduce((s, r) => s + r.tonnes, 0)
    const leaked = records.filter((r) => r.stream === 'burned' || r.stream === 'dumped').reduce((s, r) => s + r.tonnes, 0)
    const tco2e = records.reduce((s, r) => s + r.tonnes * STREAM_FACTOR[r.stream], 0)
    return { diverted, leaked, tco2e, count: records.length }
  }, [records])

  return { records, add, totals }
}

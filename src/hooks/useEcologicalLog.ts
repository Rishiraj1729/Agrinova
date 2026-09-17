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
  { id: 'eco-1', date: '2025-11-06', district: 'Patiala', stream: 'diverted', tonnes: 12.4, notes: 'Kharar cluster lift to GreenPower.', officer: 'Dr. Anil Bedi' },
  { id: 'eco-2', date: '2025-11-08', district: 'Sangrur', stream: 'compost', tonnes: 6.1, notes: 'Sunam straw to municipal compost pad.', officer: 'Dr. Anil Bedi' },
  { id: 'eco-3', date: '2025-11-09', district: 'Patiala', stream: 'burned', tonnes: 3.0, notes: 'Unlisted field, satellite hotspot follow-up.', officer: 'Dr. Anil Bedi' },
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

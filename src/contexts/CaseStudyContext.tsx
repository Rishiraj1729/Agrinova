import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Buyer, CaseStudyMeta, CaseStudyRegion, Farmer, ResidueListing } from '../types'
import { punjabCaseStudy, buyers as punjabBuyers, farmers as punjabFarmers, residueListings as punjabListings, currentFarmer } from '../data/caseStudies/punjab'
import { enrichBuyer, enrichFarmer } from '../data/profiles'
import { westBengalCaseStudy, wbBuyers, wbFarmers, wbListings, wbCurrentFarmer } from '../data/caseStudies/westBengal'

interface CaseStudyContextValue {
  region: CaseStudyRegion
  setRegion: (r: CaseStudyRegion) => void
  meta: CaseStudyMeta
  farmers: Farmer[]
  buyers: Buyer[]
  seedListings: ResidueListing[]
  demoFarmer: Farmer
  liveSimulationCount: number
  incrementSimulation: () => void
}

const CaseStudyContext = createContext<CaseStudyContextValue | null>(null)

const SIM_KEY = 'agrinova_sim_count'

export function CaseStudyProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<CaseStudyRegion>('west-bengal')
  const [liveSimulationCount, setLiveSimulationCount] = useState(() => {
    const n = localStorage.getItem(SIM_KEY)
    return n ? parseInt(n, 10) : 0
  })

  const value = useMemo<CaseStudyContextValue>(() => {
    const isPunjab = region === 'punjab'
    return {
      region,
      setRegion,
      meta: isPunjab ? punjabCaseStudy : westBengalCaseStudy,
      farmers: (isPunjab ? punjabFarmers : wbFarmers).map(enrichFarmer),
      buyers: (isPunjab ? punjabBuyers : wbBuyers).map(enrichBuyer),
      seedListings: (isPunjab ? punjabListings : wbListings).map((l) => ({ ...l, region })),
      demoFarmer: enrichFarmer(isPunjab ? currentFarmer : wbCurrentFarmer),
      liveSimulationCount,
      incrementSimulation: () => {
        setLiveSimulationCount((c) => {
          const next = c + 1
          localStorage.setItem(SIM_KEY, String(next))
          return next
        })
      },
    }
  }, [region, liveSimulationCount])

  return <CaseStudyContext.Provider value={value}>{children}</CaseStudyContext.Provider>
}

export function useCaseStudy() {
  const ctx = useContext(CaseStudyContext)
  if (!ctx) throw new Error('useCaseStudy must be used within CaseStudyProvider')
  return ctx
}

import { useState } from 'react'
import { PathwayList } from '../../components/marketplace/PathwayList'
import { recommendPathways } from '../../services/recommendPathways'
import type { ResidueType } from '../../types'

export default function PathwaysPage() {
  const [residueType] = useState<ResidueType>('Rice Straw')
  const [qty] = useState(5)
  const pathways = recommendPathways(residueType, qty)
  return (
    <div className="animate-fade-in space-y-4 max-w-lg">
      <h1 className="text-2xl font-semibold">Pathway recommendations</h1>
      <PathwayList pathways={pathways} />
    </div>
  )
}

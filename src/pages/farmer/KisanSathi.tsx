import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AgentChat } from '../../components/AgentChat'
import { SoilProfileCard } from '../../components/SoilProfileCard'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { estimateStrawFromParcels, useAuth } from '../../contexts/AuthContext'
import { sendAgentMessage } from '../../services/openaiChat'

export default function KisanSathiPage() {
  const { user, updateSession } = useAuth()
  const [params] = useSearchParams()
  const [boost, setBoost] = useState<string | null>(null)

  useEffect(() => {
    if (params.get('soil') === '1' && user) {
      const straw = estimateStrawFromParcels(user.parcels)
      void sendAgentMessage(
        'farmer',
        [],
        `My soil: ${user.soil.type}, pH ${user.soil.ph}, OC ${user.soil.organicCarbonPercent}%, N ${user.soil.nitrogen}. Notes: ${user.soil.notes}. I have ~${straw.toFixed(1)} t residue from mapped parcels. Advise sowing, fertiliser, and whether to sell straw or incorporate.`,
      ).then((r) => setBoost(r.content))
    }
  }, [params, user])

  if (!user) {
    return (
      <div className="p-6">
        <Link to="/login"><Button>Sign in first</Button></Link>
      </div>
    )
  }

  const straw = estimateStrawFromParcels(user.parcels)
  const contextPrefix = `Farmer ${user.displayName}, ${user.village}, ${user.district}. Land ${user.acres} ac. Soil ${user.soil.type} pH ${user.soil.ph}. Mapped sale straw ~${straw.toFixed(1)} t.`

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Kisan AI</h1>
        <p className="text-sm text-nv-muted">
          Tuned for residue, soil, and sowing — uses your soil card and plot map.
        </p>
      </div>

      <SoilProfileCard soil={user.soil} onChange={(soil) => updateSession({ soil })} />

      {boost && (
        <Card className="border-nv-credit/30">
          <CardContent className="pt-5 text-sm text-nv-muted whitespace-pre-wrap">{boost}</CardContent>
        </Card>
      )}

      <AgentChat
        role="farmer"
        title="KisanSathi"
        subtitle={`${contextPrefix} · Voice mic + spoken replies`}
      />

      <Card>
        <CardContent className="pt-5 flex flex-wrap justify-between items-center gap-3">
          <p className="text-sm text-nv-muted">Mapped sale straw ≈ {straw.toFixed(1)} t</p>
          <div className="flex gap-2">
            <Link to="/farmer/learn"><Button variant="outline">Learn farming</Button></Link>
            <Link to="/farmer/map"><Button variant="outline">Edit plot map</Button></Link>
            <Link to={`/farmer/sell?qty=${Math.max(1, straw).toFixed(1)}`}><Button>List residue</Button></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
